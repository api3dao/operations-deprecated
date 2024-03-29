import { ethers } from 'ethers';
import { NonceManager } from '@ethersproject/experimental';
import _ from 'lodash';
import { Choice, PromptObject } from 'prompts';
import { encode } from '@api3/airnode-abi';
import { promptQuestions } from '../utils/prompts';
import { readOperationsRepository } from '../utils/read-operations';
import { runAndHandleErrors } from '../utils/cli';
import { getDapiServerContract, getDapiServerInterface } from '../utils/evm';
import { loadCredentials } from '../utils/filesystem';
import { Beacon, ExtendedChainDescription } from '../types';

const questions = (choices: Choice[]): PromptObject[] => {
  return [
    {
      type: 'autocomplete',
      name: 'apiName',
      message: 'For which API integration do you need to register subscriptionIds for?',
      choices: choices,
    },
  ];
};

const main = async () => {
  const credentials = loadCredentials();
  const operationsRepository = readOperationsRepository();
  const apiChoices = Object.keys(operationsRepository.apis).map((api) => ({ title: api, value: api }));
  const response = await promptQuestions(questions(apiChoices));
  const apiData = operationsRepository.apis[response.apiName];

  // Get all the chains the API will be deployed on
  const apiChains = [...new Set(Object.values(apiData.beacons).flatMap((beacon) => Object.keys(beacon.chains)))];

  // Build NounceManagers for each chain
  const nonceManagers = apiChains.reduce(
    (acc, chainName) => ({
      ...acc,
      [chainName]: new NonceManager(
        ethers.Wallet.fromMnemonic(credentials.networks[chainName].accounts.mnemonic).connect(
          new ethers.providers.JsonRpcProvider(credentials.networks[chainName].url)
        )
      ),
    }),
    {} as { [chainName: string]: NonceManager }
  );

  type BeaconByChain = Omit<Beacon, 'chains'> & ExtendedChainDescription;

  const beaconsByChain = Object.values(apiData.beacons).reduce(
    (acc: { [chainName: string]: BeaconByChain[] }, { chains, ...rest }) => {
      Object.entries(chains).forEach(([chainName, extendedChainDescription]) => {
        if ('updateConditionPercentage' in extendedChainDescription) {
          // eslint-disable-next-line functional/immutable-data
          (acc[chainName] = acc[chainName] || []).push({ ...rest, ...extendedChainDescription });
        }
      });
      return acc;
    },
    {}
  );

  console.log(beaconsByChain);

  const subscriptionPromises = Object.fromEntries(
    Object.entries(beaconsByChain).map(([chainName, beaconArray]) => {
      const chainId = parseInt(operationsRepository.chains[chainName].id);
      if (!chainId) throw new Error(`🛑 Unknown chain name: ${chainName}`);

      if (!credentials.networks[chainName].url) throw new Error(`🛑 No public RPC URL for chain ${chainName}`);
      const provider = new ethers.providers.JsonRpcProvider(credentials.networks[chainName].url);
      const dapiServerAddress = operationsRepository.chains[chainName].contracts.DapiServer;
      if (!dapiServerAddress) throw new Error(`🛑 No DapiServer contract address for chain ${chainName}`);
      const dapiServer = getDapiServerContract(dapiServerAddress, provider);

      return [
        chainName,
        beaconArray.map(async (beacon) => {
          const dapiServerInteface = getDapiServerInterface();
          const parameters = '0x';
          const airnodeAddress = beacon.airnodeAddress;
          const templateId = beacon.templateId;
          const threshold = ethers.BigNumber.from(100000000)
            .mul(beacon.updateConditionPercentage! * 100)
            .div(10000);
          const beaconUpdateSubscriptionConditionParameters = ethers.utils.defaultAbiCoder.encode(
            ['uint256'],
            [threshold]
          );
          const encodedBeaconUpdateSubscriptionConditions = encode([
            {
              type: 'bytes32',
              name: '_conditionFunctionId',
              value: ethers.utils.defaultAbiCoder.encode(
                ['bytes4'],
                [dapiServerInteface.getSighash('conditionPspBeaconUpdate')]
              ),
            },
            { type: 'bytes', name: '_conditionParameters', value: beaconUpdateSubscriptionConditionParameters },
          ]);

          const sponsor = beacon.sponsor;

          const expectedSubscriptionId = ethers.utils.keccak256(
            ethers.utils.defaultAbiCoder.encode(
              ['uint256', 'address', 'bytes32', 'bytes', 'bytes', 'address', 'address', 'address', 'bytes4'],
              [
                chainId,
                airnodeAddress,
                templateId,
                parameters,
                encodedBeaconUpdateSubscriptionConditions,
                airnodeAddress,
                sponsor,
                dapiServerAddress,
                dapiServerInteface.getSighash('fulfillPspBeaconUpdate'),
              ]
            )
          );

          console.log(`🔎 Checking if subscriptionId ${expectedSubscriptionId} already exists for chain ${chainName}`);

          const beaconId = await dapiServer
            .connect(nonceManagers[chainName])
            .subscriptionIdToBeaconId(expectedSubscriptionId);

          if (beaconId === beacon.beaconId) {
            throw new Error(`SubscriptionId ${expectedSubscriptionId} already exists for chain ${chainName}`);
          }

          console.log(`🔗 Creating Multicall data for beacon ${beacon.name} on chain ${chainName}`);

          const calldata = dapiServerInteface.encodeFunctionData('registerBeaconUpdateSubscription', [
            airnodeAddress,
            templateId,
            encodedBeaconUpdateSubscriptionConditions,
            airnodeAddress,
            sponsor,
          ]);

          return calldata;
        }),
      ];
    })
  );

  for (const chainName of Object.keys(subscriptionPromises)) {
    const chainCallDataPromise = await Promise.allSettled(subscriptionPromises[chainName]);
    const chainCallData = chainCallDataPromise.flatMap((callData) => {
      if (callData.status === 'fulfilled') {
        return callData.value;
      } else {
        console.log(`🛑 ${callData.reason}`);
        return [];
      }
    });

    console.log(chainCallData);

    if (!credentials.networks[chainName].url) throw new Error(`🛑 No public RPC URL for chain ${chainName}`);
    const provider = new ethers.providers.JsonRpcProvider(credentials.networks[chainName].url);
    const dapiServerAddress = operationsRepository.chains[chainName].contracts.DapiServer;
    if (!dapiServerAddress) throw new Error(`🛑 No DapiServer contract address for chain ${chainName}`);
    const dapiServer = getDapiServerContract(dapiServerAddress, provider);

    const chainCallDataChunk = _.chunk(chainCallData, 50);

    if (chainCallDataChunk.length > 0) {
      console.log(`🔗 Registering ${chainCallData.length} beacon subscriptions on chain ${chainName}`);
      for (const chunk of chainCallDataChunk) {
        const tx = await dapiServer.connect(nonceManagers[chainName]).multicall(chunk);
        await tx.wait();
      }
      console.log(`✅ Registered ${chainCallData} beacon subscriptions on chain ${chainName}`);
    }
  }
};

if (require.main === module) runAndHandleErrors(main);

export { main as registerSubscriptions };
