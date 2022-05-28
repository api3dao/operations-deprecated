import { ethers } from 'ethers';
import { readOperationsRepository } from './utils/read-operations';
import { runAndHandleErrors } from './utils/cli';
import { DapiServerContract } from './utils/evm';
import { loadCredentials } from './utils/filesystem';

const main = async () => {
  const credentials = loadCredentials();
  const operationsRepository = readOperationsRepository();

  const dapiNamePromises = Object.entries(operationsRepository.dapis).flatMap(([chainName, dAPI]) =>
    Object.entries(dAPI).map(async ([dAPIName, dataFeedId]) => {
      const chainId = parseInt(operationsRepository.chains[chainName].id);
      if (!chainId) throw new Error(`🛑 Unknown chain name: ${chainName}`);

      if (!credentials.networks[chainName].url) throw new Error(`🛑 No public RPC URL for chain ${chainName}`);
      const provider = new ethers.providers.JsonRpcProvider(credentials.networks[chainName].url);

      const dapiServerAddress = operationsRepository.chains[chainName].contracts.DapiServer;
      if (!dapiServerAddress) throw new Error(`🛑 No dapiServer contract address for chain ${chainName}`);
      const dapiServer = DapiServerContract(dapiServerAddress, provider);

      try {
        console.log(
          `🔎 checking if dAPI the name ${dAPIName} - ${ethers.utils.formatBytes32String(
            dAPIName
          )} points to the correct data feedId - ${dataFeedId}`
        );

        const onChainDataFeedId = await dapiServer.dapiNameToDataFeedId(ethers.utils.formatBytes32String(dAPIName));

        if (onChainDataFeedId === dataFeedId) {
          console.log(`✅ dAPI name ${dAPIName} points to the correct data feedId - ${dataFeedId}`);
          return;
        }

        throw new Error(`🛑 dAPI name ${dAPIName} points to the wrong data feedId - ${onChainDataFeedId}`);
      } catch (error) {
        console.error(error);
        throw new Error(`🛑 Error checking dAPI name ${dAPIName}`);
      }
    })
  );

  const dapiNameChecks = await Promise.allSettled(dapiNamePromises);

  const failedDapiNameChecks = dapiNameChecks.filter((result) => result.status === 'rejected');

  if (failedDapiNameChecks.length > 0) throw new Error('🛑 Some subscription checks failed');
};

if (require.main === module) runAndHandleErrors(main);

export { main as checkDapiName };
