import { join } from 'path';
import { mkdirSync, rmdirSync } from 'fs';
import { ethers } from 'ethers';
import prompts from 'prompts';
import { deriveWalletPathFromSponsorAddress } from '@api3/airnode-node/dist/src/evm';
import { readOperationsRepository } from '../src/utils/read-operations';
import { PROTOCOL_ID_PSP } from '../src/utils/evm';
import { writeOperationsRepository } from '../src/utils/write-operations';
import { generateTopupWallets } from '../src/utils/generate-topup-wallets';
import { OperationsRepository } from '../src/validation/types';

describe('generate-topup-wallets', () => {
  const tempTestPath = join(__dirname, '../temporary_test_folder');
  const mockOpsRepo: OperationsRepository = readOperationsRepository(join(__dirname, 'fixtures', 'data'));

  // Start with a clean directory
  beforeEach(() => {
    rmdirSync(tempTestPath, { recursive: true });
    mkdirSync(tempTestPath);
    writeOperationsRepository(mockOpsRepo, tempTestPath);
  });

  // End with a clean directory
  afterEach(() => {
    rmdirSync(tempTestPath, { recursive: true });
  });

  it('generates the top up wallets', async () => {
    let mockOpsRepo = readOperationsRepository(tempTestPath);

    // Empty coingecko btc_usd 0.1 percent deviation top up wallets array
    const updatedOpsData: OperationsRepository = {
      ...mockOpsRepo,
      apis: {
        ...mockOpsRepo.apis,
        ['api3']: {
          ...mockOpsRepo.apis['api3'],
          beacons: {
            ...mockOpsRepo.apis.api3.beacons,
            ['coingecko btc_usd 0.1 percent deviation']: {
              ...mockOpsRepo.apis.api3.beacons['coingecko btc_usd 0.1 percent deviation'],
              chains: {
                ...mockOpsRepo.apis.api3.beacons['coingecko btc_usd 0.1 percent deviation'].chains,
                ['ropsten']: {
                  ...mockOpsRepo.apis.api3.beacons['coingecko btc_usd 0.1 percent deviation'].chains.ropsten,
                  topUpWallets: [],
                },
              },
            },
          },
        },
      },
    };
    writeOperationsRepository(updatedOpsData, tempTestPath);

    mockOpsRepo = readOperationsRepository(tempTestPath);
    expect(
      mockOpsRepo.apis.api3.beacons['coingecko btc_usd 0.1 percent deviation'].chains.ropsten.topUpWallets.length
    ).toEqual(0);

    // Run the script
    prompts.inject(['api3']);
    await generateTopupWallets(tempTestPath);

    // Verify coingecko btc_usd 0.1 percent deviation top up wallet array contains a wallet
    mockOpsRepo = readOperationsRepository(tempTestPath);
    const airnodeHdNode = ethers.utils.HDNode.fromExtendedKey(mockOpsRepo.apis.api3.apiMetadata.xpub);
    const providerTopUpWallet = airnodeHdNode.derivePath(
      deriveWalletPathFromSponsorAddress(
        mockOpsRepo.apis.api3.beacons['coingecko btc_usd 0.1 percent deviation'].chains.ropsten.sponsor,
        PROTOCOL_ID_PSP
      )
    ).address;
    const topUpWallets =
      mockOpsRepo.apis.api3.beacons['coingecko btc_usd 0.1 percent deviation'].chains.ropsten.topUpWallets;
    expect(topUpWallets.length).toEqual(1);
    expect(topUpWallets[topUpWallets.length - 1].address).toEqual(providerTopUpWallet);
  });
});
