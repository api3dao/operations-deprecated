import { join } from 'path';
import prompts from 'prompts';
import { OperationsRepository } from '../src/types';
import { readOperationsRepository } from '../src/utils/read-operations';
import { createAirseekerConfig } from '../src/create-airseeker-config';
import { writeOperationsRepository } from '../src/utils/write-operations';

describe('create-airseeker-config', () => {
  let originalMockOpsRepo: OperationsRepository;

  beforeEach(() => {
    originalMockOpsRepo = readOperationsRepository(join(__dirname, 'fixtures', 'data'));
  });

  afterEach(() => {
    // revert the changes
    writeOperationsRepository(originalMockOpsRepo, join(__dirname, 'fixtures', 'data'));
  });

  it('builds the airseeker config for AWS', async () => {
    const date = new Date().toISOString().split('T')[0];

    prompts.inject([
      date,
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
    await createAirseekerConfig(join(__dirname, 'fixtures', 'data'));

    const newMockOpsRepo = readOperationsRepository(join(__dirname, 'fixtures', 'data'));
    expect(newMockOpsRepo.api3?.airseeker[date]).toEqual(originalMockOpsRepo.api3?.airseeker['2022-03-05']);
  });
});