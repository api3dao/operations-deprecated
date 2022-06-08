import { join } from 'path';
import { existsSync, mkdirSync, rmdirSync } from 'fs';
import { writeOperationsRepository } from '../../src/utils/write-operations';
import { readOperationsRepository } from '../../src/utils/read-operations';

const tempTestPath = join(__dirname, '../temporary_test_folder');
const mockOpsRepo = readOperationsRepository(join(__dirname, '..', 'fixtures', 'data'));

it('checks if read/write cycle reproduces first read', () => {
  writeOperationsRepository(mockOpsRepo, tempTestPath);
  const tempWrittenRepoData = readOperationsRepository(tempTestPath);

  expect(tempWrittenRepoData).toEqual(mockOpsRepo);
});

describe('writeOperationsRepository', () => {
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

  describe('apis', () => {
    it('writes changes to beacons', async () => {
      const coingeckoTestBeacon = {
        ...mockOpsRepo.apis.api3.beacons['coingecko btc_usd 0.1 percent deviation'],
        name: 'coingecko test beacon',
        description: 'test beacon',
      };

      const updatedOpsRepo = {
        ...mockOpsRepo,
        apis: {
          ...mockOpsRepo.apis,
          ['api3']: {
            ...mockOpsRepo.apis['api3'],
            beacons: {
              ...mockOpsRepo.apis['api3'].beacons,
              ['coingeckoTestBeacon']: coingeckoTestBeacon,
            },
          },
        },
      };

      writeOperationsRepository(updatedOpsRepo, tempTestPath);

      expect(existsSync(join(tempTestPath, 'apis', 'api3', 'beacons', 'coingeckoTestBeacon.json'))).toBe(true);

      const writtenOpsRepo = readOperationsRepository(tempTestPath);
      expect(writtenOpsRepo).toEqual(updatedOpsRepo);
    });

    it('writes changes to ois', async () => {
      const coingeckoTestOis = {
        ...mockOpsRepo.apis.api3.ois['coingecko basic request-1.0.0'],
        title: 'coingecko Test Ois',
        apiSpecification: {},
        endpoints: [],
      };

      const updatedOpsRepo = {
        ...mockOpsRepo,
        apis: {
          ...mockOpsRepo.apis,
          ['api3']: {
            ...mockOpsRepo.apis['api3'],
            ois: {
              ...mockOpsRepo.apis['api3'].ois,
              ['coingeckoTestOis']: coingeckoTestOis,
            },
          },
        },
      };

      writeOperationsRepository(updatedOpsRepo, tempTestPath);
      expect(existsSync(join(tempTestPath, 'apis', 'api3', 'ois', 'coingeckoTestOis.json'))).toBe(true);

      const writtenOpsRepo = readOperationsRepository(tempTestPath);
      expect(writtenOpsRepo).toEqual(updatedOpsRepo);
    });

    it('writes changes to deployments', async () => {
      const mockDeploymentDate = '2022-04-17';

      const coingeckoTestDeployment = {
        ...mockOpsRepo.apis.api3.deployments[mockDeploymentDate],
        airkeeper: {
          aws: {
            ...mockOpsRepo.apis.api3.deployments['2022-04-17'].airkeeper.aws,
            airkeeper: {
              ...mockOpsRepo.apis.api3.deployments['2022-04-17'].airkeeper.aws.airkeeper,
              airnodeAddress: '0x0000000000000000000000000000000000000000',
              airnodeXpub: '',
            },
            config: {
              ...mockOpsRepo.apis.api3.deployments['2022-04-17'].airkeeper.aws.config,
              triggers: {
                rrp: [],
                http: [],
                httpSignedData: [],
              },
            },
            secrets: {
              ...mockOpsRepo.apis.api3.deployments['2022-04-17'].airkeeper.aws.secrets,
              filename: 'secrets.env',
              content: 'THIS IS EMPTY',
            },
          },
        },
        airnode: {
          aws: {
            ...mockOpsRepo.apis.api3.deployments['2022-04-17'].airnode.aws,
            config: {
              ...mockOpsRepo.apis.api3.deployments['2022-04-17'].airnode.aws.config,
              triggers: {
                rrp: [],
                http: [],
                httpSignedData: [],
              },
            },
            secrets: {
              ...mockOpsRepo.apis.api3.deployments['2022-04-17'].airnode.aws.secrets,
              filename: 'secrets.env',
              content: 'THIS IS EMPTY',
            },
          },
        },
      };

      const updatedOpsRepo = {
        ...mockOpsRepo,
        apis: {
          ...mockOpsRepo.apis,
          ['api3']: {
            ...mockOpsRepo.apis['api3'],
            deployments: {
              ...mockOpsRepo.apis['api3'].deployments,
              ['2022-05-01']: coingeckoTestDeployment,
            },
          },
        },
      };

      writeOperationsRepository(updatedOpsRepo, tempTestPath);

      expect(
        existsSync(
          join(
            join(__dirname, '../temporary_test_folder'),
            'apis',
            'api3',
            'deployments',
            mockDeploymentDate,
            'airkeeper',
            'aws',
            'airkeeper.json'
          )
        )
      ).toBe(true);

      expect(
        existsSync(
          join(
            join(__dirname, '../temporary_test_folder'),
            'apis',
            'api3',
            'deployments',
            mockDeploymentDate,
            'airkeeper',
            'aws',
            'config.json'
          )
        )
      ).toBe(true);

      expect(
        existsSync(
          join(
            join(__dirname, '../temporary_test_folder'),
            'apis',
            'api3',
            'deployments',
            mockDeploymentDate,
            'airkeeper',
            'aws',
            'secrets.env'
          )
        )
      ).toBe(true);

      expect(
        existsSync(
          join(
            join(__dirname, '../temporary_test_folder'),
            'apis',
            'api3',
            'deployments',
            mockDeploymentDate,
            'airnode',
            'aws',
            'config.json'
          )
        )
      ).toBe(true);

      expect(
        existsSync(
          join(
            join(__dirname, '../temporary_test_folder'),
            'apis',
            'api3',
            'deployments',
            mockDeploymentDate,
            'airnode',
            'aws',
            'secrets.env'
          )
        )
      ).toBe(true);

      const writtenOpsRepo = readOperationsRepository(tempTestPath);
      expect(writtenOpsRepo).toEqual(updatedOpsRepo);
    });

    it('writes changes to templates', async () => {
      const coingeckoTestTemplate = {
        ...mockOpsRepo.apis.api3.templates['coingecko btc_usd'],
        name: 'coingeckoTestTemplate',
      };

      const updatedOpsRepo = {
        ...mockOpsRepo,
        apis: {
          ...mockOpsRepo.apis,
          ['api3']: {
            ...mockOpsRepo.apis['api3'],
            templates: {
              ...mockOpsRepo.apis['api3'].templates,
              ['coingeckoTestTemplate']: coingeckoTestTemplate,
            },
          },
        },
      };

      writeOperationsRepository(updatedOpsRepo, tempTestPath);

      expect(existsSync(join(tempTestPath, 'apis', 'api3', 'templates', 'coingeckoTestTemplate.json'))).toBe(true);

      const writtenOpsRepo = readOperationsRepository(tempTestPath);
      expect(writtenOpsRepo).toEqual(updatedOpsRepo);
    });

    it('writes changes to metadata', async () => {
      const coingeckoTestMetadata = {
        ...mockOpsRepo.apis.api3.apiMetadata,
        name: 'coingeckoTestMetadata',
      };

      const updatedOpsRepo = {
        ...mockOpsRepo,
        apis: {
          ...mockOpsRepo.apis,
          ['api3']: {
            ...mockOpsRepo.apis['api3'],
            apiMetadata: coingeckoTestMetadata,
          },
        },
      };

      writeOperationsRepository(updatedOpsRepo, tempTestPath);

      expect(existsSync(join(tempTestPath, 'apis', 'api3', 'apiMetadata.json'))).toBe(true);

      const writtenOpsRepo = readOperationsRepository(tempTestPath);
      expect(writtenOpsRepo).toEqual(updatedOpsRepo);
    });
  });

  describe('chains', () => {
    it('writes changes to chains', async () => {
      const coingeckoTestChain = {
        ...mockOpsRepo.chains.ropsten,
        name: 'testChain',
        id: '9999',
      };

      const updatedOpsRepo = {
        ...mockOpsRepo,
        chains: {
          ...mockOpsRepo.chains,
          ['testchain']: coingeckoTestChain,
        },
      };

      writeOperationsRepository(updatedOpsRepo, tempTestPath);

      expect(existsSync(join(tempTestPath, 'chains', 'testchain.json'))).toBe(true);

      const writtenOpsRepo = readOperationsRepository(tempTestPath);
      expect(writtenOpsRepo).toEqual(updatedOpsRepo);
    });
  });

  describe('api3', () => {
    it('writes changes to airseeker', async () => {
      const airseekerDeploymentDate = '2022-03-05';

      const coingeckoTestAirseeker = {
        ...mockOpsRepo.api3!.airseeker[airseekerDeploymentDate].airseeker,
        airseekerWalletMnemonic: '',
        chains: {},
      };

      const updatedOpsRepo = {
        ...mockOpsRepo,
        api3: {
          ...mockOpsRepo.api3,
          airseeker: {
            ...mockOpsRepo.api3!.airseeker,
            [airseekerDeploymentDate]: {
              ...mockOpsRepo.api3!.airseeker[airseekerDeploymentDate],
              airseeker: coingeckoTestAirseeker,
              secrets: {
                filename: 'secrets.env',
                content: 'test',
              },
            },
          },
        },
      };

      writeOperationsRepository(updatedOpsRepo, tempTestPath);

      expect(existsSync(join(tempTestPath, 'api3', 'airseeker', airseekerDeploymentDate, 'airseeker.json'))).toBe(true);

      expect(existsSync(join(tempTestPath, 'api3', 'airseeker', airseekerDeploymentDate, 'secrets.env'))).toBe(true);

      const writtenOpsRepo = readOperationsRepository(tempTestPath);
      expect(writtenOpsRepo).toEqual(updatedOpsRepo);
    });
  });

  describe('dapis', () => {
    it('writes changes to dapis', async () => {
      const coingeckoTestDapi = {
        ...mockOpsRepo.dapis.polygon,
        beaconId: 'test',
      };

      const updatedOpsRepo = {
        ...mockOpsRepo,
        dapis: {
          ...mockOpsRepo.dapis,
          ['testchain']: coingeckoTestDapi,
        },
      };

      writeOperationsRepository(updatedOpsRepo, tempTestPath);

      expect(existsSync(join(tempTestPath, 'dapis', 'testchain.json'))).toBe(true);

      const writtenOpsRepo = readOperationsRepository(tempTestPath);
      expect(writtenOpsRepo).toEqual(updatedOpsRepo);
    });
  });

  describe('subscriptions', () => {
    it('writes changes to subscriptions', async () => {
      const mockSubscriptions = {
        ropsten: {
          dapis: {
            '0x33ced632274973f86303f003416dfcb0d0a59aefe7a0f3fef5c42bb890383847-0xa55026ee522feb3c80cfccdd880865aeb9475a4a7675c036db89e4f6bc7c5a11':
              {
                paymentTxHash: '0xa55026ee522feb3c80cfccdd880865aeb9475a4a7675c036db89e4f6bc7c5a11',
                dapiName: 'USDC/AAVE',
                claimaintAddress: '0x1a2633190693307d47145098fFd1d4669D3aE9eF',
                beneficiaryAddress: '0x25B246C3bA7B7353e286859FaE8913600b96B710',
                subscriberAddress: '0x25B246C3bA7B7353e286859FaE8913600b96B710',
                coverageAmount: '10001',
                startDate: 1653048764,
                endDate: 1653038764,
                ipfsPolicyHash: 'ZmTtDqWzp179ujTXU7pd2PodLNjpdpQQCXhkiQYi6wZvKd',
                ipfsServicePolicyHash: 'ZmRBQB6YaDyidP37UdDnjFY6vQuiBrcqdyoW1CuDgwxkD6',
              },
          },
          dataFeeds: {
            '0x33ced632274973f86303f003416dfcb0d0a59aefe7a0f3fef5c42bb890383847-0xa55026ee522feb3c80cfccdd880865aeb9475a4a7675c036db89e4f6bc7c5a12':
              {
                paymentTxHash: '0xa55026ee522feb3c80cfccdd880865aeb9475a4a7675c036db89e4f6bc7c5a12',
                dataFeedId: '0x33ced632274973f86303f003416dfcb0d0a59aefe7a0f3fef5c42bb890383847',
                claimaintAddress: '0x1a2633190693307d47145098fFd1d4669D3aE9eF',
                beneficiaryAddress: '0x25B246C3bA7B7353e286859FaE8913600b96B710',
                subscriberAddress: '0x25B246C3bA7B7353e286859FaE8913600b96B710',
                coverageAmount: '10001',
                startDate: 1653048764,
                endDate: 1653038764,
                ipfsPolicyHash: 'ZmTtDqWzp179ujTXU7pd2PodLNjpdpQQCXhkiQYi6wZvKd',
                ipfsServicePolicyHash: 'ZmRBQB6YaDyidP37UdDnjFY6vQuiBrcqdyoW1CuDgwxkD6',
              },
          },
        },
      };

      const updatedOpsRepo = {
        ...mockOpsRepo,
        subscriptions: mockSubscriptions,
      };

      writeOperationsRepository(updatedOpsRepo, tempTestPath);

      expect(
        existsSync(
          join(
            tempTestPath,
            'subscriptions',
            'ropsten',
            'dataFeeds',
            '0x33ced632274973f86303f003416dfcb0d0a59aefe7a0f3fef5c42bb890383847-0xa55026ee522feb3c80cfccdd880865aeb9475a4a7675c036db89e4f6bc7c5a12.json'
          )
        )
      ).toBe(true);

      const writtenOpsRepo = readOperationsRepository(tempTestPath);
      expect(writtenOpsRepo).toEqual(updatedOpsRepo);
    });
  });

  describe('explorer', () => {
    it('writes changes to beaconMetadata', async () => {
      const coingeckoTestBeaconMetaData = {
        ...mockOpsRepo.explorer.beaconMetadata,
        testbeacon: {
          category: 'test',
          pricingCoverage: 'test',
        },
      };

      const updatedOpsRepo = {
        ...mockOpsRepo,
        explorer: {
          ...mockOpsRepo.explorer,
          beaconMetadata: coingeckoTestBeaconMetaData,
        },
      };

      writeOperationsRepository(updatedOpsRepo, tempTestPath);

      expect(existsSync(join(tempTestPath, 'explorer', 'beaconMetadata.json'))).toBe(true);

      const writtenOpsRepo = readOperationsRepository(tempTestPath);
      expect(writtenOpsRepo).toEqual(updatedOpsRepo);
    });

    it('writes changes to beaconSets', async () => {
      const coingeckoTestBeaconSets = {
        ...mockOpsRepo.explorer.beaconSets,
        testbeacon: [],
      };

      const updatedOpsRepo = {
        ...mockOpsRepo,
        explorer: {
          ...mockOpsRepo.explorer,
          beaconSets: coingeckoTestBeaconSets,
        },
      };

      writeOperationsRepository(updatedOpsRepo, tempTestPath);

      expect(existsSync(join(tempTestPath, 'explorer', 'beaconSets.json'))).toBe(true);

      const writtenOpsRepo = readOperationsRepository(tempTestPath);
      expect(writtenOpsRepo).toEqual(updatedOpsRepo);
    });

    it('writes changes to pricingCoverage', async () => {
      const coingeckoTestPricingCoverage = {
        ...mockOpsRepo.explorer.pricingCoverage,
        pricingCoverage: [],
      };

      const updatedOpsRepo = {
        ...mockOpsRepo,
        explorer: {
          ...mockOpsRepo.explorer,
          pricingCoverage: coingeckoTestPricingCoverage,
        },
      };

      writeOperationsRepository(updatedOpsRepo, tempTestPath);

      expect(existsSync(join(tempTestPath, 'explorer', 'pricingCoverage.json'))).toBe(true);

      const writtenOpsRepo = readOperationsRepository(tempTestPath);
      expect(writtenOpsRepo).toEqual(updatedOpsRepo);
    });
  });
});
