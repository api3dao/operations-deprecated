import { ethers } from 'ethers';
import { readOperationsRepository } from './utils/read-operations';
import { runAndHandleErrors } from './utils/cli';
import { chainNameToChainId, DapiServerContract } from './utils/evm';
import { loadCredentials } from './utils/filesystem';

const main = async () => {
  const credentials = loadCredentials();
  const operationsRepository = readOperationsRepository();

  const DapiNamePromises = Object.entries(operationsRepository.dapis).flatMap(([chainName, dAPI]) =>
    Object.entries(dAPI).map(async ([dAPIName, dataFeedId]) => {
      const chainId = chainNameToChainId[chainName];
      if (!chainId) throw new Error(`🛑 Unknown chain name: ${chainName}`);

      if (!credentials.networks[chainName].url) throw new Error(`🛑 No public RPC URL for chain ${chainName}`);
      const provider = new ethers.providers.JsonRpcProvider(credentials.networks[chainName].url);

      const DapiServerAddress = operationsRepository.chains[chainName].contracts.DapiServer;
      if (!DapiServerAddress) throw new Error(`🛑 No DapiServer contract address for chain ${chainName}`);
      const DapiServer = DapiServerContract(DapiServerAddress, provider);

      try {
        console.log(
          `🔎 checking if dAPI the name ${dAPIName} - ${ethers.utils.formatBytes32String(
            dAPIName
          )} points to the correct data feedId - ${dataFeedId}`
        );

        const onChainDataFeedId = await DapiServer.dapiNameToDataFeedId(ethers.utils.formatBytes32String(dAPIName));

        if (onChainDataFeedId !== dataFeedId) {
          throw new Error(`🛑 dAPI name ${dAPIName} points to the wrong data feedId - ${onChainDataFeedId}`);
        }

        if (onChainDataFeedId === dataFeedId)
          return `✅ dAPI name ${dAPIName} points to the correct data feedId - ${dataFeedId}`;
      } catch (error) {
        console.error(error);
        throw new Error(`🛑 Error checking dAPI name ${dAPIName}`);
      }
    })
  );

  const results = await Promise.allSettled(DapiNamePromises);

  results.forEach((result) => {
    if (result.status === 'fulfilled') {
      console.log(result.value);
    } else {
      console.log(result.reason);
    }
  });

  if (results.some((result) => result.status !== 'fulfilled')) throw new Error('🛑 Some dAPI name checks failed');
};

if (require.main === module) runAndHandleErrors(main);

export { main as checkDapiName };
