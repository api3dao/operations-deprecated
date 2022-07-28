import { NonceManager } from '@ethersproject/experimental';
import { ContractTransaction, ethers } from 'ethers';
import { Policy } from './types';
import { runAndHandleErrors } from './utils/cli';
import { getDapiNameHash, getDapiServerContract } from './utils/evm';
import { loadCredentials } from './utils/filesystem';
import { readAndValidateOperationsRepository } from './utils/read-operations';

const printTransactionEvents = (tx: ethers.ContractReceipt, chainId: number) => {
  tx.events
    ?.filter((e) => e.event === 'ExtendedWhitelistExpiration')
    .forEach((e) => {
      const dataFeed = (e.args || [])['serviceId'];
      const readerAddress = (e.args || [])['user'];
      const expirationTimestamp = (e.args || [])['expiration'];
      console.log(
        `🎉 Address ${readerAddress} can now read data feed ${dataFeed} on chain ${chainId} up until ${new Date(
          expirationTimestamp.toNumber() * 1000
        ).toISOString()}. Tx hash: ${tx.transactionHash}`
      );
    });
};

const main = async (operationRepositoryTarget?: string) => {
  const credentials = loadCredentials();
  const operationsRepository = await readAndValidateOperationsRepository(operationRepositoryTarget);

  const enablePoliciesPromises: Promise<ContractTransaction>[] = [];
  for (const [chainName, policiesByType] of Object.entries(operationsRepository.policies || {})) {
    const chainRpcUrl = credentials.networks[chainName].url;
    if (!chainRpcUrl) {
      throw new Error(`🛑 Public RPC URL for chain ${chainName} is not defined`);
    }
    const chainMnemonic = credentials.networks[chainName].accounts.mnemonic;
    if (!chainMnemonic || !ethers.utils.isValidMnemonic(chainMnemonic)) {
      throw new Error(`🛑 Mnemonic for chain ${chainName} is not defined or invalid`);
    }
    const dapiServerAddress = operationsRepository.chains[chainName].contracts.DapiServer;
    if (!dapiServerAddress) {
      throw new Error(`🛑 DapiServer contract address for chain ${chainName} is not defined`);
    }
    const provider = new ethers.providers.JsonRpcProvider(chainRpcUrl);
    const nonceManager = new NonceManager(ethers.Wallet.fromMnemonic(chainMnemonic).connect(provider));
    const dapiServer = getDapiServerContract(dapiServerAddress, provider).connect(nonceManager);

    const policiesToProcess = [];
    for (const policyGroup of Object.values(policiesByType || {})) {
      // For each chain/policyType we only process policies that
      // have an endDate in the future and have not been whitelisted
      for (const policy of Object.values(policyGroup)) {
        const { dapiName, dataFeedId, readerAddress, endDate } = policy as Policy;
        if (
          Math.floor(Date.now() / 1000) < endDate &&
          !(await dapiServer.readerCanReadDataFeed(dapiName ? getDapiNameHash(dapiName) : dataFeedId, readerAddress))
        ) {
          policiesToProcess.push(policy);
        }
      }
    }

    const calldatas = policiesToProcess.map(({ readerAddress, endDate, dataFeedId, dapiName }) =>
      dapiServer.interface.encodeFunctionData('extendWhitelistExpiration', [
        dapiName ? getDapiNameHash(dapiName) : dataFeedId,
        readerAddress,
        endDate,
      ])
    );
    // TODO define gas strategy in the credentials file
    // Unfortunately we need this script in place immediately, so this is a hack for now.
    // Polygon is seemingly the only network that requires this.
    if (chainName.includes('polygon')) {
      enablePoliciesPromises.push(dapiServer.multicall(calldatas, { gasPrice: await provider.getGasPrice() }));
    } else {
      enablePoliciesPromises.push(dapiServer.multicall(calldatas));
    }
  }

  const allowedReaderResults = await Promise.allSettled(enablePoliciesPromises);

  for (const result of allowedReaderResults) {
    if (result.status === 'rejected') {
      console.error(`🛑 ${result.reason}`);
    } else {
      const pendingTx = result.value as ContractTransaction;
      const tx = await pendingTx.wait();
      printTransactionEvents(tx, pendingTx.chainId);
    }
  }
};

if (require.main === module) runAndHandleErrors(main);

export { main as enablePolicyReaders };
