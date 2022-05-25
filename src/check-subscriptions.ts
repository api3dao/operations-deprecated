import { ethers } from 'ethers';
import { encode } from '@api3/airnode-abi';
import { readOperationsRepository } from './utils/read-operations';
import { runAndHandleErrors } from './utils/cli';
import { chainNameToChainId, DapiServerContract, DapiServerInterface } from './utils/evm';
import { loadCredentials } from './utils/filesystem';

const main = async () => {
  const credentials = loadCredentials();
  const operationsRepository = readOperationsRepository();
  const allBeacons = Object.values(operationsRepository.apis).flatMap((api) => Object.values(api.beacons));

  const subscriptionPromises = Object.entries(allBeacons).flatMap(([beaconName, beacon]) =>
    Object.entries(beacon.chains)
      .filter(([, chain]) => 'updateConditionPercentage' in chain)
      .map(async ([chainName, chain]) => {
        const DapiServerInteface = DapiServerInterface();
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
              [DapiServerInteface.getSighash('conditionPspBeaconUpdate')]
            ),
          },
          { type: 'bytes', name: '_conditionParameters', value: beaconUpdateSubscriptionConditionParameters },
        ]);

        const chainId = chainNameToChainId[chainName];
        if (!chainId) throw new Error(`🛑 Unknown chain name: ${chainName}`);

        if (!credentials.networks[chainName].url) throw new Error(`🛑 No public RPC URL for chain ${chainName}`);
        const provider = new ethers.providers.JsonRpcProvider(credentials.networks[chainName].url);

        const DapiServerAddress = operationsRepository.chains[chainName].contracts.DapiServer;
        if (!DapiServerAddress) throw new Error(`🛑 No DapiServer contract address for chain ${chainName}`);
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

        const expectedBeaconId = ethers.utils.keccak256(
          ethers.utils.solidityPack(['address', 'bytes32'], [airnodeAddress, templateId])
        );
        try {
          console.log(`🔎 checking if subscriptionId ${expectedSubscriptionId} already exists for chain ${chainName}`);

          const beaconId = await DapiServer.subscriptionIdToBeaconId(expectedSubscriptionId);

          if (beaconId !== expectedBeaconId) {
            throw new Error(`🛑 The subscription ID ${expectedSubscriptionId} does not exist`);
          }

          if (beaconId === expectedBeaconId)
            return `✅ subscriptionId ${expectedSubscriptionId} exists for chain ${chainName}`;
        } catch (error) {
          console.error(error);
          throw new Error(`🛑 Error checking subscription for beacon ${beaconName} on chain ${chainName}`);
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

  if (results.some((result) => result.status !== 'fulfilled')) throw new Error('🛑 Some subscription checks failed');
};

if (require.main === module) runAndHandleErrors(main);

export { main as checkSubscriptions };
