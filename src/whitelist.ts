import { NonceManager } from '@ethersproject/experimental';
import { ContractTransaction, ethers } from 'ethers';
import groupBy from 'lodash/groupBy';
import { Choice, PromptObject } from 'prompts';
import { runAndHandleErrors } from './utils/cli';
import { getDapiServerContract } from './utils/evm';
import { loadCredentials } from './utils/filesystem';
import { promptQuestions } from './utils/prompts';
import { readOperationsRepository } from './utils/read-operations';

const questions = (choices: Choice[]): PromptObject[] => {
  return [
    {
      type: 'autocompleteMultiselect',
      name: 'selectedSubscriptions',
      message: 'Please select subscriptions for which to whitelist an address to read from DapiServer contract?',
      choices: choices,
    },
  ];
};

const main = async (operationRepositoryTarget?: string) => {
  const credentials = loadCredentials();
  const operationsRepository = readOperationsRepository(operationRepositoryTarget);

  const subscriptionChoices = Object.entries(operationsRepository.subscriptions || {}).flatMap(
    ([chainName, subscriptions]) => {
      const dapiSubscriptions = Object.entries(subscriptions.dapis || {}).map(([name, subscription]) => ({
        title: `${chainName} - ${name}`,
        value: { chainName, subscription },
      }));
      const dataFeedSubscriptions = Object.entries(subscriptions.dataFeeds || {}).map(([name, subscription]) => ({
        title: `${chainName} - ${name}`,
        value: { chainName, subscription },
      }));

      return [...dapiSubscriptions, ...dataFeedSubscriptions];
    }
  );

  const response = await promptQuestions(questions(subscriptionChoices));

  let nonceManagerCache: { [chainName: string]: NonceManager } = {};

  const whitelistPromises = Object.entries(groupBy(response.selectedSubscriptions, 'chainName')).flatMap(
    ([chainName, subscriptions]) => {
      const chainRpcUrl = credentials.networks[chainName].url;
      if (!chainRpcUrl) {
        throw new Error(`🛑 Public RPC URL for chain ${chainName} is not defined`);
      }
      const chainMnemonic = credentials.networks[chainName].accounts.mnemonic;
      if (!chainMnemonic || !ethers.utils.isValidMnemonic(chainMnemonic)) {
        throw new Error(`🛑 Mnemonic for chain ${chainName} is not defined or invalid`);
      }
      const provider = new ethers.providers.JsonRpcProvider(chainRpcUrl);
      if (!nonceManagerCache[chainName]) {
        nonceManagerCache = {
          ...nonceManagerCache,
          [chainName]: new NonceManager(ethers.Wallet.fromMnemonic(chainMnemonic)).connect(provider),
        };
      }
      const dapiServerAddress = operationsRepository.chains[chainName].contracts.DapiServer;
      if (!dapiServerAddress) {
        throw new Error(`🛑 DapiServer contract address for chain ${chainName} is not defined`);
      }
      const dapiServer = getDapiServerContract(dapiServerAddress, provider).connect(nonceManagerCache[chainName]);

      return subscriptions.map(({ subscription: { dapiName, dataFeedId, whitelistAddress, endDate } }) =>
        dapiServer.extendWhitelistExpiration(dapiName ?? dataFeedId, whitelistAddress, endDate)
      );
    }
  );

  const whitelistResults = await Promise.allSettled(whitelistPromises);

  for (const result of whitelistResults) {
    if (result.status === 'rejected') {
      console.error(`🛑 ${result.reason}`);
    } else {
      const pendingTx = result.value as ContractTransaction;
      const tx: ethers.ContractReceipt = await pendingTx.wait();
      const event = tx.events?.filter((e) => e.event === 'ExtendedWhitelistExpiration')[0];
      const dataFeed = (event?.args || [])['serviceId'];
      const whitelistAddress = (event?.args || [])['user'];
      const expirationTimestamp = (event?.args || [])['expiration'];
      console.log(
        `🎉 Address ${whitelistAddress} can now read data feed ${dataFeed} on chain ${
          pendingTx.chainId
        } up until ${new Date(expirationTimestamp.toNumber() * 1000).toISOString()}. Tx hash: ${tx.transactionHash}`
      );
    }
  }
};

if (require.main === module) runAndHandleErrors(main);

export { main as whitelist };
