import { ethers } from 'ethers';
import { readOperationsRepository } from './utils/read-operations';
import { runAndHandleErrors } from './utils/cli';
import { getDapiServerContract } from './utils/evm';
import { loadCredentials } from './utils/filesystem';

const main = async (operationRepositoryTarget?: string) => {
  const credentials = loadCredentials();
  const operationsRepository = readOperationsRepository(operationRepositoryTarget);

  const readerCanReadDataFeedPromises = Object.entries(operationsRepository.policies || {}).flatMap(
    ([chainName, policies]) => {
      if (!credentials.networks[chainName].url) {
        throw new Error(`🛑 Public RPC URL for chain ${chainName} is not defined`);
      }
      const provider = new ethers.providers.JsonRpcProvider(credentials.networks[chainName].url);
      const dapiServerAddress = operationsRepository.chains[chainName].contracts.DapiServer;
      if (!dapiServerAddress) {
        throw new Error(`🛑 DapiServer contract address for chain ${chainName} is not defined`);
      }
      const dapiServer = getDapiServerContract(dapiServerAddress, provider);

      const dapiChecks = Object.values(policies.dapis || {}).map(async ({ dapiName, readerAddress }) => ({
        chainName,
        dapiName,
        readerAddress,
        readerCanReadDataFeed: await dapiServer.readerCanReadDataFeed(dapiName, readerAddress),
      }));
      const dataFeedChecks = Object.values(policies.dataFeeds || {}).map(async ({ dataFeedId, readerAddress }) => ({
        chainName,
        dataFeedId,
        readerAddress,
        readerCanReadDataFeed: await dapiServer.readerCanReadDataFeed(dataFeedId, readerAddress),
      }));

      return [...dapiChecks, ...dataFeedChecks];
    }
  );

  const readerCanReadDataFeedResults = await Promise.allSettled(readerCanReadDataFeedPromises);

  readerCanReadDataFeedResults.forEach((result) => {
    if (result.status === 'rejected') {
      throw new Error(`🛑 ${result.reason}`);
    } else if (!result.value.readerCanReadDataFeed) {
      throw new Error(
        `🛑 Address ${result.value.readerAddress} cannot read data feed ${
          (result.value as any).dapiName ?? (result.value as any).dataFeedId
        } on chain ${result.value.chainName}`
      );
    }
  });
};

if (require.main === module) runAndHandleErrors(main);

export { main as checkPolicyReaders };
