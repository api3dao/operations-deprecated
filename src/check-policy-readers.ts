import { ethers } from 'ethers';
import { runAndHandleErrors } from './utils/cli';
import { getDapiServerContract } from './utils/evm';
import { loadCredentials } from './utils/filesystem';
import { readOperationsRepository } from './utils/read-operations';

const main = async (operationRepositoryTarget?: string) => {
  const credentials = loadCredentials();
  const operationsRepository = readOperationsRepository(operationRepositoryTarget);

  const readerCanReadDataFeedPromises = Object.entries(operationsRepository.policies || {}).flatMap(
    ([chainName, policiesByType]) => {
      const chainRpcUrl = credentials.networks[chainName].url;
      if (!chainRpcUrl) {
        throw new Error(`🛑 Public RPC URL for chain ${chainName} is not defined`);
      }
      const dapiServerAddress = operationsRepository.chains[chainName].contracts.DapiServer;
      if (!dapiServerAddress) {
        throw new Error(`🛑 DapiServer contract address for chain ${chainName} is not defined`);
      }
      const provider = new ethers.providers.JsonRpcProvider(chainRpcUrl);
      const dapiServer = getDapiServerContract(dapiServerAddress, provider);

      return Object.values(policiesByType || {}).flatMap((policies) =>
        Object.values(policies)
          .filter((policy) => Date.now() / 1000 < policy.endDate)
          .map(async ({ dapiName, dataFeedId, readerAddress }) => ({
            chainName,
            dataFeed: dapiName ?? dataFeedId,
            readerAddress,
            readerCanReadDataFeed: await dapiServer.readerCanReadDataFeed(dapiName ?? dataFeedId, readerAddress),
          }))
      );
    }
  );

  const readerCanReadDataFeedResults = await Promise.allSettled(readerCanReadDataFeedPromises);

  readerCanReadDataFeedResults.forEach((result) => {
    if (result.status === 'rejected') {
      console.error(`🛑 ${result.reason}`);
    } else if (!result.value.readerCanReadDataFeed) {
      console.error(
        `🛑 Address ${result.value.readerAddress} cannot read data feed ${
          (result.value as any).dapiName ?? (result.value as any).dataFeedId
        } on chain ${result.value.chainName}`
      );
    }
  });

  if (
    readerCanReadDataFeedResults.some((result) => result.status === 'rejected' || !result.value.readerCanReadDataFeed)
  ) {
    throw new Error('Some errors occurred while checking policy readers or they are not allowed to read data feeds');
  }
};

if (require.main === module) runAndHandleErrors(main);

export { main as checkPolicyReaders };
