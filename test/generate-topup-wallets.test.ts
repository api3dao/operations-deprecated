import { join } from 'path';
import { ethers } from 'ethers';
import prompts from 'prompts';
import { deriveWalletPathFromSponsorAddress } from '@api3/airnode-node/dist/src/evm';
import { readOperationsRepository } from '../src/utils/read-operations';
import { generateTemplateIds } from '../src/generate-templateIds';
import { PROTOCOL_ID_PSP } from '../src/utils/evm';

describe('generate-topup-wallets', () => {
  it('generates the templateIds and parameters', async () => {
    prompts.inject(['api3']);
    await generateTemplateIds(join(__dirname, 'fixtures', 'data'));

    const newMockOpsRepo = await readOperationsRepository(join(__dirname, 'fixtures', 'data'));

    const airnodeHdNode = ethers.utils.HDNode.fromExtendedKey(newMockOpsRepo.apis.api3.apiMetadata.xpub);
    const providerTopUpWallet = airnodeHdNode.derivePath(
      deriveWalletPathFromSponsorAddress(
        newMockOpsRepo.apis.api3.beacons['coingecko btc_usd 0.1 percent deviation'].chains.ropsten.sponsor,
        PROTOCOL_ID_PSP
      )
    ).address;

    const topUpWallets =
      newMockOpsRepo.apis.api3.beacons['coingecko btc_usd 0.1 percent deviation'].chains.ropsten.topUpWallets;

    expect(topUpWallets.length).toEqual(1);

    expect(topUpWallets[topUpWallets.length - 1].address).toEqual(providerTopUpWallet);
  });
});
