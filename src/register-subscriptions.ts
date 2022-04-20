import { ethers } from 'ethers';
import { Choice, PromptObject } from 'prompts';
import { encode } from '@api3/airnode-abi';
import { AirnodeRrpAddresses, RequesterAuthorizerWithAirnodeAddresses } from '@api3/airnode-protocol';
import { deriveEndpointId } from '@api3/airnode-admin';
import { OperationsRepository } from './types';
import { promptQuestions } from './utils/prompts';
import { readOperationsRepository } from './utils/read-operations';
import { writeOperationsRepository } from './utils/write-operations';
import { runAndHandleErrors } from './utils/cli';
import { chainNameToChainId, chainNameToPublicRPCUrl, DapiServerContract, DapiServerInterface } from './utils/evm';
import { NonceManager } from '@ethersproject/experimental';
import { sanitiseFilename } from './utils/filesystem';

const questions = (choices: Choice[]): PromptObject[] => {
  return [
    {
      type: 'text',
      name: 'mnemonic',
      message: 'Enter the mnemonic that will be used to make the transaction for registering the subscription Ids',
      initial: '',
    },
    {
      type: 'autocomplete',
      name: 'apiName',
      message: 'For which API integration do you need to register subscriptionIds for?',
      choices: choices,
    },
  ];
};

const main = async () => {
  const operationsRepository = readOperationsRepository();
  const apiChoices = Object.keys(operationsRepository.apis).map((api) => ({ title: api, value: api }));
  const response = await promptQuestions(questions(apiChoices));
  const apiData = operationsRepository.apis[response.apiName];

  if (!response.mnemonic) throw new Error('🛑 No mnemonic provided');
  const registrar = ethers.Wallet.fromMnemonic(response.mnemonic);

  // Get all the chains the API will be deployed on
  const apiChains = [
    ...new Set(Object.values(apiData.beacons).flatMap((beacon) => beacon.chains.map((chain) => chain.name))),
  ];

  // Build NounceManagers for each chain
  const nonceManagers = apiChains.reduce(
    (acc, chainName) => ({
      ...acc,
      [chainName]: new NonceManager(
        registrar.connect(new ethers.providers.JsonRpcProvider(chainNameToPublicRPCUrl[chainName]))
      ),
    }),
    {} as { [chainName: string]: NonceManager }
  );

  const subscriptionPromises = Object.entries(apiData.beacons).flatMap(([beaconName, beacon]) => {
    const DapiServerInteface = DapiServerInterface();
    const parameters = '0x';
    const airnodeAddress = beacon.airnodeAddress;
    const templateId = beacon.templateId;
    const threshold = ethers.BigNumber.from(100000000)
      .mul(beacon.updateConditionPercentage * 100)
      .div(10000);
    const beaconUpdateSubscriptionConditionParameters = ethers.utils.defaultAbiCoder.encode(['uint256'], [threshold]);
    const encodedBeaconUpdateSubscriptionConditions = encode([
      {
        type: 'bytes32',
        name: '_conditionFunctionId',
        value: ethers.utils.defaultAbiCoder.encode(
          ['bytes4'],
          [DapiServerInteface.getSighash('conditionPspBeaconUpdate')]
        ),
      },
      { type: 'bytes', name: '_conditionParameters', value: beaconUpdateSubscriptionConditionParameters },
    ]);
    return beacon.chains.map(async (chain) => {
      const chainId = chainNameToChainId[chain.name];
      if (!chainId) throw new Error(`🛑 Unknown chain name: ${chain.name}`);

      if (!chainNameToPublicRPCUrl[chain.name]) throw new Error(`🛑 No public RPC URL for chain ${chain.name}`);
      const provider = new ethers.providers.JsonRpcProvider(chainNameToPublicRPCUrl[chain.name]);
      const DapiServerAddress = operationsRepository.documentation.chains[chain.name].contracts['DapiServer'];
      if (!DapiServerAddress) throw new Error(`🛑 No DapiServer contract address for chain ${chain.name}`);
      const DapiServer = DapiServerContract(DapiServerAddress, provider);

      const sponsor = chain.sponsor;

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
            DapiServerAddress,
            DapiServerInteface.getSighash('fulfillPspBeaconUpdate'),
          ]
        )
      );

      return new Promise(async (resolve, reject) => {
        try {
          console.log(`🔗 Registering subscriptionId for beacon ${beaconName} on chain ${chain.name}`);

          const registerBeaconUpdateSubscription = await DapiServer.connect(
            nonceManagers[chain.name]
          ).registerBeaconUpdateSubscription(
            airnodeAddress,
            templateId,
            encodedBeaconUpdateSubscriptionConditions,
            airnodeAddress,
            sponsor
          );

          // Check that the transaction is complete
          const tx = await registerBeaconUpdateSubscription.wait();

          const subscriptionId = tx.events.find(
            (event: { event: string }) => event.event === 'RegisteredBeaconUpdateSubscription'
          ).args.subscriptionId;

          if (subscriptionId !== expectedSubscriptionId) {
            reject(`🛑 The subscription ID ${subscriptionId} does not match the expected ID ${expectedSubscriptionId}`);
          }

          resolve(
            `✅ Subscription registered with ID ${subscriptionId} for beacon ${beaconName} on chain ${chain.name}`
          );
        } catch (error) {
          console.error(`🛑 Error registering subscription for beacon ${beaconName} on chain ${chain.name}`);
          reject(error);
        }
      });
    });
  });

  await Promise.allSettled(subscriptionPromises).then((results) => {
    results.forEach((result) => {
      if (result.status === 'fulfilled') {
        console.log(result.value);
      } else {
        console.log(result.reason);
      }
    });
  });
};

runAndHandleErrors(main);
