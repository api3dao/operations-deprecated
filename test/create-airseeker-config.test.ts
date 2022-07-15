// Tests should never modify the fixtures - do not assume that `writeOperationsRepository` will work as you expect.
import { join } from 'path';
import { mkdirSync, rmdirSync } from 'fs';
import * as prompts from 'prompts';
import { readOperationsRepository } from '../src/utils/read-operations';
import { createAirseekerConfig } from '../src/create-airseeker-config';
import { writeOperationsRepository } from '../src/utils/write-operations';
import { OperationsRepository } from '../src/types';
import { getFormattedUtcTimestamp } from '../src/utils/date';

describe('create-airseeker-config', () => {
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

  it('builds the airseeker config for AWS', async () => {
    const timestamp = getFormattedUtcTimestamp();

    prompts.inject([
      timestamp,
      [
        {
          api: {
            apiMetadata: {
              name: 'API3',
              active: true,
              homepage: 'https://api3.org',
              airnode: '0xA3121b14485DAa8c797178Cb21445b0f30e75178',
              xpub: 'xpub661MyMwAqRbcFeZ1CUvUpMs5bBSVLPHiuTqj7dZPertAGtd3xyTW1vrPspz7B34A7sdPahw7psrJjCXmn8KpF92jQssoqmsTk8fZ9PZN8xK',
              logoPath: 'https://api3.org/img/logo.png',
              description: 'API3 delivers efficient and secure first party oracle solutions.',
              maxSubscriptionPeriod: 3,
            },
            templates: {
              'coingecko btc_usd': {
                name: 'CoinGecko BTC/USD',
                templateId: '0x40e1b4429f78b22a82e161c3137d151859a4801ceac0fd6015e3318e26f30f98',
                endpointId: '0xfb87102cdabadf905321521ba0b3cbf74ad09c5d400ac2eccdbef8d6143e78c4',
                parameters:
                  '0x3173000000000000000000000000000000000000000000000000000000000000636f696e49640000000000000000000000000000000000000000000000000000626974636f696e00000000000000000000000000000000000000000000000000',
                decodedParameters: [{ name: 'coinId', type: 'string32', value: 'bitcoin' }],
              },
            },
          },
          beacon: {
            name: 'CoinGecko BTC/USD 0.1 percent deviation',
            description: 'The public CoinGecko BTC/USD price ticker',
            beaconId: '0x975806bee44efbf83451627d34e2449eeb9857619457e0c8eb97d5adfc71ae4e',
            airnodeAddress: '0xA3121b14485DAa8c797178Cb21445b0f30e75178',
            templateId: '0x40e1b4429f78b22a82e161c3137d151859a4801ceac0fd6015e3318e26f30f98',
            chains: {
              ropsten: {
                active: true,
                sponsor: '0x9fEe9F24ab79adacbB51af82fb82CFb9D818c6d9',
                topUpWallets: [{ walletType: 'Provider', address: '0xC26f10e1b37A1E7A7De266FeF0c19533489C3e75' }],
                updateConditionPercentage: 0.1,
                airseekerConfig: { deviationThreshold: 0.2, heartbeatInterval: 86400, updateInterval: 30 },
              },
            },
          },
        },
      ],
    ]);
    await createAirseekerConfig(tempTestPath);

    const newMockOpsRepo = readOperationsRepository(tempTestPath);
    expect(newMockOpsRepo.api3?.airseeker[timestamp].airseeker).toEqual(
      mockOpsRepo.api3?.airseeker['220305-2000'].airseeker
    );
  });
});
