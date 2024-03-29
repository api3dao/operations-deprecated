// Tests should never modify the fixtures - do not assume that `writeOperationsRepository` will work as you expect.
import { join } from 'path';
import { existsSync, mkdirSync, rmdirSync } from 'fs';
import { ethers } from 'ethers';
import { writeOperationsRepository } from '../../src/utils/write-operations';
import { readOperationsRepository } from '../../src/utils/read-operations';
import { OperationsRepository } from '../../src/types';

const tempTestPath = join(__dirname, '../temporary_test_folder');
const mockOpsRepo: OperationsRepository = readOperationsRepository(join(__dirname, '..', 'fixtures', 'data'));

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
    it('writes changes to beacons', () => {
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

    it('writes changes to ois', () => {
      const coingeckoTestOis = {
        ...mockOpsRepo.apis.api3.ois['coingecko basic request-1.0.0'],
        title: 'coingecko Test Ois',
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

    it('writes changes to deployments', () => {
      const mockDeploymentDate = '220417-2000';

      const coingeckoTestDeployment = {
        ...mockOpsRepo.apis.api3.deployments[mockDeploymentDate],
        airkeeper: {
          aws: {
            ...mockOpsRepo.apis.api3.deployments['220417-2000'].airkeeper?.aws,
            airkeeper: {
              ...mockOpsRepo.apis.api3.deployments['220417-2000'].airkeeper?.aws?.airkeeper,
              airnodeAddress: '0x0000000000000000000000000000000000000000',
              airnodeXpub: '',
            },
            config: {
              ...mockOpsRepo.apis.api3.deployments['220417-2000'].airkeeper?.aws?.config,
              triggers: {
                rrp: [],
                http: [],
                httpSignedData: [],
              },
            },
            secrets: {
              ...mockOpsRepo.apis.api3.deployments['220417-2000'].airkeeper?.aws?.secrets,
              filename: 'secrets.env',
              content: 'THIS IS EMPTY',
            },
          },
        },
        airnode: {
          aws: {
            ...mockOpsRepo.apis.api3.deployments['220417-2000'].airnode.aws!,
            config: {
              ...mockOpsRepo.apis.api3.deployments['220417-2000'].airnode.aws!.config,
              triggers: {
                rrp: [],
                http: [],
                httpSignedData: [],
              },
            },
            secrets: {
              ...mockOpsRepo.apis.api3.deployments['220417-2000'].airnode.aws!.secrets,
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

    it('writes changes to templates', () => {
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

    it('writes changes to metadata', () => {
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

  describe('beaconSets', () => {
    it('writes changes to beaconSets', () => {
      const coingeckoTestBeaconSet = {
        ...mockOpsRepo.beaconSets['btc_usd'],
        name: 'coingecko test beacon set',
        description: 'test beacon set',
      };

      const updatedOpsRepo = {
        ...mockOpsRepo,
        beaconSets: {
          ...mockOpsRepo.beaconSets,
          ['coingeckoTestBeaconSet']: coingeckoTestBeaconSet,
        },
      };

      writeOperationsRepository(updatedOpsRepo, tempTestPath);

      expect(existsSync(join(tempTestPath, 'beaconSets', 'coingeckoTestBeaconSet.json'))).toBe(true);

      const writtenOpsRepo = readOperationsRepository(tempTestPath);
      expect(writtenOpsRepo).toEqual(updatedOpsRepo);
    });
  });

  describe('chains', () => {
    it('writes changes to chains', () => {
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
    it('writes changes to airseeker', () => {
      const airseekerDeploymentDate = '220305-2000';

      const coingeckoTestAirseeker = {
        ...mockOpsRepo.api3?.airseeker[airseekerDeploymentDate].airseeker,
        airseekerWalletMnemonic: '',
        chains: {},
      };

      const updatedOpsRepo = {
        ...mockOpsRepo,
        api3: {
          ...mockOpsRepo.api3,
          airseeker: {
            ...mockOpsRepo.api3?.airseeker,
            [airseekerDeploymentDate]: {
              ...mockOpsRepo.api3?.airseeker[airseekerDeploymentDate],
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
    it('writes changes to dapis', () => {
      const coingeckoTestChain = {
        ...mockOpsRepo.chains.ropsten,
        name: 'testChain',
        id: '9999',
      };

      const coingeckoTestDapi = {
        ...mockOpsRepo.dapis.polygon,
        beaconId: 'test',
      };

      const updatedOpsRepo = {
        ...mockOpsRepo,
        chains: {
          ...mockOpsRepo.chains,
          ['testchain']: coingeckoTestChain,
        },
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

  describe('market', () => {
    it('writes changes to beaconMetadata', () => {
      // Add new test beacon first
      const coingeckoTestBeaconId = ethers.utils.hexlify(ethers.utils.randomBytes(32));
      const coingeckoTestBeacon = {
        ...mockOpsRepo.apis.api3.beacons['coingecko btc_usd 0.1 percent deviation'],
        beaconId: coingeckoTestBeaconId,
        name: 'coingecko test beacon',
        description: 'test beacon',
      };

      // Then add the beaconId reference to beaconMetadata
      const testPricingCoverage = { 'test-pricing-set': [{ subscriptionFee: 1000, coverage: 15000 }] };
      const coingeckoTestBeaconMetaData = {
        ...mockOpsRepo.market.beaconMetadata,
        [coingeckoTestBeaconId]: {
          category: 'test',
          pricingCoverage: { ropsten: 'test-pricing-set' },
        },
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
        market: {
          ...mockOpsRepo.market,
          beaconMetadata: coingeckoTestBeaconMetaData,
          pricingCoverage: {
            ...mockOpsRepo.market.pricingCoverage,
            ...testPricingCoverage,
          },
        },
      };

      writeOperationsRepository(updatedOpsRepo, tempTestPath);

      expect(existsSync(join(tempTestPath, 'market', 'beaconMetadata.json'))).toBe(true);

      const writtenOpsRepo = readOperationsRepository(tempTestPath);
      expect(writtenOpsRepo).toEqual(updatedOpsRepo);
    });

    it('writes changes to beaconSetMetadata', () => {
      // Add new test beacon first
      const coingeckoTestBeaconId = ethers.utils.hexlify(ethers.utils.randomBytes(32));
      const coingeckoTestBeacon = {
        ...mockOpsRepo.apis.api3.beacons['coingecko btc_usd 0.1 percent deviation'],
        beaconId: coingeckoTestBeaconId,
        name: 'coingecko test beacon',
        description: 'test beacon',
      };
      // Then add the beaconId reference to beaconMetadata
      const testPricingCoverage = { 'test-pricing-set': [{ subscriptionFee: 1000, coverage: 15000 }] };
      const coingeckoTestBeaconMetadata = {
        ...mockOpsRepo.market.beaconMetadata,
        [coingeckoTestBeaconId]: {
          category: 'test',
          pricingCoverage: { ropsten: 'test-pricing-set' },
        },
      };
      // Lastly add the new beaconSetId to beaconSetMetadata
      const coingeckoTestBeaconSetId = ethers.utils.keccak256(
        ethers.utils.defaultAbiCoder.encode(['bytes32[]'], [Array(3).fill(coingeckoTestBeaconId)])
      );
      const coingeckoTestBeaconSet = {
        ...mockOpsRepo.beaconSets['btc_usd'],
        beaconSetId: coingeckoTestBeaconSetId,
        name: 'coingecko test beacon',
        description: 'test beacon',
        beaconIds: Array(3).fill(coingeckoTestBeaconId),
      };

      const coingeckoTestBeaconSetMetadata = {
        ...mockOpsRepo.market.beaconSetMetadata,
        [coingeckoTestBeaconSetId]: {
          category: 'test',
          pricingCoverage: { ropsten: 'test-pricing-set' },
        },
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
        beaconSets: {
          ...mockOpsRepo.beaconSets,
          ['coingeckoTestBeaconSet']: coingeckoTestBeaconSet,
        },
        market: {
          ...mockOpsRepo.market,
          beaconMetadata: coingeckoTestBeaconMetadata,
          beaconSetMetadata: coingeckoTestBeaconSetMetadata,
          pricingCoverage: {
            ...mockOpsRepo.market.pricingCoverage,
            ...testPricingCoverage,
          },
        },
      };

      // @ts-ignore
      writeOperationsRepository(updatedOpsRepo, tempTestPath);

      expect(existsSync(join(tempTestPath, 'market', 'beaconSetMetadata.json'))).toBe(true);

      const writtenOpsRepo = readOperationsRepository(tempTestPath);
      expect(writtenOpsRepo).toEqual(updatedOpsRepo);
    });

    it('writes changes to pricingCoverage', () => {
      const coingeckoTestPricingCoverage = {
        ...mockOpsRepo.market.pricingCoverage,
        pricingCoverage: [],
      };

      const updatedOpsRepo = {
        ...mockOpsRepo,
        market: {
          ...mockOpsRepo.market,
          pricingCoverage: coingeckoTestPricingCoverage,
        },
      };

      writeOperationsRepository(updatedOpsRepo, tempTestPath);

      expect(existsSync(join(tempTestPath, 'market', 'pricingCoverage.json'))).toBe(true);

      const writtenOpsRepo = readOperationsRepository(tempTestPath);
      expect(writtenOpsRepo).toEqual(updatedOpsRepo);
    });
  });
});
