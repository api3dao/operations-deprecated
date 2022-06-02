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
    {
      type: 'text',
      name: 'mnemonic',
      message: [
        'Please enter a mnemonic phrase for the DapiServer contract mananger account',
        'or an account with the whitelist extender role set',
      ].join('\n'),
      initial: 'test test test test test test test test test test test junk',
      validate: (value) => {
        if (!ethers.utils.isValidMnemonic(value)) return 'Please enter a valid mnemonic phrase';
        return true;
      },
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

  const nonceManager = new NonceManager(ethers.Wallet.fromMnemonic(response.mnemonic));

  const whitelistPromises = Object.entries(groupBy(response.selectedSubscriptions, 'chainName')).flatMap(
    ([chainName, subscriptions]) => {
      if (!credentials.networks[chainName].url) {
        throw new Error(`🛑 Public RPC URL for chain ${chainName} is not defined`);
      }
      const provider = new ethers.providers.JsonRpcProvider(credentials.networks[chainName].url);
      const dapiServerAddress = operationsRepository.chains[chainName].contracts.DapiServer;
      if (!dapiServerAddress) {
        throw new Error(`🛑 DapiServer contract address for chain ${chainName} is not defined`);
      }
      const dapiServer = getDapiServerContract(dapiServerAddress, provider).connect(nonceManager.connect(provider));

      return subscriptions.map(({ subscription: { dapiName, dataFeedId, whitelistAddress, endDate } }) => {
        const tx = dapiServer.extendWhitelistExpiration(dapiName ?? dataFeedId, whitelistAddress, endDate);
        nonceManager.incrementTransactionCount();

        return tx;
      });
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
      const address = (event?.args || [])[2];
      console.log(
        `🎉 Successfully whitelisted address ${address} on chain ${pendingTx.chainId} : ${tx.transactionHash}`
      );
    }
  }
};

if (require.main === module) runAndHandleErrors(main);

export { main as whitelist };
