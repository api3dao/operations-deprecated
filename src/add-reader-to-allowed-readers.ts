import { NonceManager } from '@ethersproject/experimental';
import { ContractTransaction, ethers } from 'ethers';
import groupBy from 'lodash/groupBy';
import { z } from 'zod';
import { runAndHandleErrors } from './utils/cli';
import { getDapiServerContract } from './utils/evm';
import { loadCredentials } from './utils/filesystem';
import { readOperationsRepository } from './utils/read-operations';
import { basePaymentSchema } from './utils/validation';

const main = async (operationRepositoryTarget?: string) => {
  const credentials = loadCredentials();
  const operationsRepository = readOperationsRepository(operationRepositoryTarget);

  const subscriptionsToAdd = Object.values(operationsRepository.subscriptions || {})
    .flatMap((subscriptions) => {
      const dapiSubscriptions = Object.entries(subscriptions.dapis || {});
      const dataFeedSubscriptions = Object.entries(subscriptions.dataFeeds || {});

      return [...dapiSubscriptions, ...dataFeedSubscriptions];
    })
    // Filter for subscriptions that are currently valid or will be valid
    .filter((subscription) => Date.now() < subscription[1].endDate)
    .map((subscription) => ({ chainName: subscription[0], ...subscription[1] }));

  let nonceManagerCache: { [chainName: string]: NonceManager } = {};

  const allowedReaderPromises = Object.entries(groupBy(subscriptionsToAdd, 'chainName')).flatMap(
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

      return subscriptions.map((subscription) => {
        const typedSubscription = subscription as z.infer<typeof basePaymentSchema> & {
          dataFeedId?: string;
          dapiName?: string;
        };
        const { subscriberAddress, endDate, dataFeedId, dapiName } = typedSubscription;

        return dapiServer.extendWhitelistExpiration(dataFeedId ?? dapiName, subscriberAddress, endDate);
      });
    }
  );

  const allowedReaderResults = await Promise.allSettled(allowedReaderPromises);

  for (const result of allowedReaderResults) {
    if (result.status === 'rejected') {
      console.error(`🛑 ${result.reason}`);
    } else {
      const pendingTx = result.value as ContractTransaction;
      const tx = await pendingTx.wait();
      const event = tx.events?.filter((e) => e.event === 'ExtendedWhitelistExpiration')[0];
      const dataFeed = (event?.args || [])['serviceId'];
      const subscriptionAddress = (event?.args || [])['user'];
      const expirationTimestamp = (event?.args || [])['expiration'];
      console.log(
        `🎉 Address ${subscriptionAddress} can now read data feed ${dataFeed} on chain ${
          pendingTx.chainId
        } up until ${new Date(expirationTimestamp.toNumber() * 1000).toISOString()}. Tx hash: ${tx.transactionHash}`
      );
    }
  }
};

if (require.main === module) runAndHandleErrors(main);

export { main as addReaderToAllowedReaders };

// TODO
// I don't believe this will work in practice; in time the list of consumer subscriptions will be come very big and it won't
// be tenable for API3 staff to manually select entries.
//
// Ideally the script should check for subscriptions that are valid (based on their start and end times) and then
// for all of those check them against the contract to see if they're already registered, if not, register all of them.
// There won't be a scenario where we selectively register consumer subscriptions.
