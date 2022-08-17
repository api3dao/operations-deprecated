import { ethers } from 'ethers';
import { encode } from '@api3/airnode-abi';
import { readAndValidateOperationsRepository } from '../utils/read-operations';
import { runAndHandleErrors } from '../utils/cli';
import { getDapiServerContract, getDapiServerInterface } from '../utils/evm';
import { loadCredentials } from '../utils/filesystem';

const main = async () => {
  const credentials = loadCredentials();
  const operationsRepository = await readAndValidateOperationsRepository();
  const allBeacons = Object.values(operationsRepository.apis).flatMap((api) => Object.values(api.beacons));

  const subscriptionPromises = Object.entries(allBeacons).flatMap(([beaconName, beacon]) =>
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

        const expectedBeaconId = ethers.utils.keccak256(
          ethers.utils.solidityPack(['address', 'bytes32'], [airnodeAddress, templateId])
        );
        try {
          console.log(`🔎 checking if subscriptionId ${expectedSubscriptionId} already exists for chain ${chainName}`);

          const beaconId = await dapiServer.subscriptionIdToBeaconId(expectedSubscriptionId);

          if (beaconId === expectedBeaconId) {
            console.log(`✅ subscriptionId ${expectedSubscriptionId} exists for chain ${chainName}`);
            return;
          }

          throw new Error(`🛑 The subscription ID ${expectedSubscriptionId} does not exist`);
        } catch (error) {
          console.error(error);
          throw new Error(`🛑 Error checking subscription for beacon ${beaconName} on chain ${chainName}`);
        }
      })
  );

  const subscriptionChecks = await Promise.allSettled(subscriptionPromises);

  const failedSubscriptionChecks = subscriptionChecks.filter((result) => result.status === 'rejected');

  if (failedSubscriptionChecks.length > 0) throw new Error('🛑 Some subscription checks failed');
};

if (require.main === module) runAndHandleErrors(main);

export { main as checkSubscriptions };
