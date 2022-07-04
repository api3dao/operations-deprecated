import { ethers } from 'ethers';
import { NonceManager } from '@ethersproject/experimental';
import { Choice, PromptObject } from 'prompts';
import { encode } from '@api3/airnode-abi';
import { promptQuestions } from './utils/prompts';
import { readAndValidateOperationsRepository } from './utils/read-operations';
import { runAndHandleErrors } from './utils/cli';
import { getDapiServerContract, getDapiServerInterface } from './utils/evm';
import { loadCredentials } from './utils/filesystem';

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
  const operationsRepository = await readAndValidateOperationsRepository();
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

  const subscriptionPromises = Object.entries(apiData.beacons).flatMap(([beaconName, beacon]) =>
    Object.entries(beacon.chains)
      .filter(([, chain]) => 'updateConditionPercentage' in chain)
      .map(async ([chainName, chain]) => {
        const dapiServerInteface = getDapiServerInterface();
        const parameters = '0x';
        const airnodeAddress = beacon.airnodeAddress;
        const templateId = beacon.templateId;
        const threshold = ethers.BigNumber.from(100000000)
          .mul(beacon.chains[chainName].updateConditionPercentage! * 100)
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

        const chainId = parseInt(operationsRepository.chains[chainName].id);
        if (!chainId) throw new Error(`🛑 Unknown chain name: ${chainName}`);

        if (!credentials.networks[chainName].url) throw new Error(`🛑 No public RPC URL for chain ${chainName}`);
        const provider = new ethers.providers.JsonRpcProvider(credentials.networks[chainName].url);
        const gasPrice = await provider.getGasPrice();
        const dapiServerAddress = operationsRepository.chains[chainName].contracts.DapiServer;
        if (!dapiServerAddress) throw new Error(`🛑 No DapiServer contract address for chain ${chainName}`);
        const dapiServer = getDapiServerContract(dapiServerAddress, provider);

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
              dapiServerAddress,
              dapiServerInteface.getSighash('fulfillPspBeaconUpdate'),
            ]
          )
        );
        try {
          console.log(`🔎 checking if subscriptionId ${expectedSubscriptionId} already exists for chain ${chainName}`);

          const beaconId = await dapiServer
            .connect(nonceManagers[chainName])
            .subscriptionIdToBeaconId(expectedSubscriptionId);

          if (beaconId !== ethers.constants.HashZero)
            return `✅ subscriptionId ${expectedSubscriptionId} already exists for chain ${chainName}`;

          console.log(`🔗 Registering subscriptionId for beacon ${beaconName} on chain ${chainName}`);

          const registerBeaconUpdateSubscription = await dapiServer
            .connect(nonceManagers[chainName])
            .registerBeaconUpdateSubscription(
              airnodeAddress,
              templateId,
              encodedBeaconUpdateSubscriptionConditions,
              airnodeAddress,
              sponsor,
              { gasPrice }
            );

          // Check that the transaction is complete
          const tx = await registerBeaconUpdateSubscription.wait();

          const subscriptionId = tx.events.find(
            (event: { event: string }) => event.event === 'RegisteredBeaconUpdateSubscription'
          ).args.subscriptionId;

          if (subscriptionId !== expectedSubscriptionId) {
            throw new Error(
              `🛑 The subscription ID ${subscriptionId} does not match the expected ID ${expectedSubscriptionId}`
            );
          }

          return `✅ Subscription registered with ID ${subscriptionId} for beacon ${beaconName} on chain ${chainName}`;
        } catch (error) {
          console.error(error);
          throw new Error(`🛑 Error registering subscription for beacon ${beaconName} on chain ${chainName}`);
        }
      })
  );

  const results = await Promise.allSettled(subscriptionPromises);
  results.forEach((result) => {
    if (result.status === 'fulfilled') {
      console.log(result.value);
    } else {
      console.log(result.reason);
    }
  });
};

runAndHandleErrors(main);
