import { ethers } from 'ethers';
import { readOperationsRepository } from './utils/read-operations';
import { runAndHandleErrors } from './utils/cli';
import { getDapiServerContract } from './utils/evm';
import { loadCredentials } from './utils/filesystem';

const main = async (operationRepositoryTarget?: string) => {
  const credentials = loadCredentials();
  const operationsRepository = readOperationsRepository(operationRepositoryTarget);

  const whitelistCheckPromises = Object.entries(operationsRepository.subscriptions || {}).flatMap(
    ([chainName, subscriptions]) => {
      if (!credentials.networks[chainName].url) {
        throw new Error(`🛑 Public RPC URL for chain ${chainName} is not defined`);
      }
      const provider = new ethers.providers.JsonRpcProvider(credentials.networks[chainName].url);
      const dapiServerAddress = operationsRepository.chains[chainName].contracts.DapiServer;
      if (!dapiServerAddress) {
        throw new Error(`🛑 DapiServer contract address for chain ${chainName} is not defined`);
      }
      const dapiServer = getDapiServerContract(dapiServerAddress, provider);

      const dapiChecks = Object.values(subscriptions.dapis || {}).map(({ dapiName, whitelistAddress }) =>
        dapiServer.readerCanReadDataFeed(dapiName, whitelistAddress)
      );
      const dataFeedChecks = Object.values(subscriptions.dataFeeds || {}).map(({ dataFeedId, whitelistAddress }) =>
        dapiServer.readerCanReadDataFeed(dataFeedId, whitelistAddress)
      );

      return [...dapiChecks, ...dataFeedChecks];
    }
  );

  const whitelistCheckResults = await Promise.allSettled(whitelistCheckPromises);

  whitelistCheckResults.forEach((result) => {
    if (result.status === 'rejected') {
      throw new Error(`🛑 ${result.reason}`);
    } else if (result.value === false) {
      throw new Error('🛑 Some consumers are not whitelisted to read data feeds');
    }
  });
};

if (require.main === module) runAndHandleErrors(main);

export { main as checkWhitelist };
