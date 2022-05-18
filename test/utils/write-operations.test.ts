import { join } from 'path';
import { existsSync } from 'fs';
import { writeOperationsRepository } from '../../src/utils/write-operations';
import { readOperationsRepository } from '../../src/utils/read-operations';

describe('writeOperationsRepository', () => {
  describe('apis', () => {
    it('writes changes to beacons', async () => {
      const mockOpsRepo = readOperationsRepository(join(__dirname, '..', 'fixtures', 'data'));

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

      writeOperationsRepository(updatedOpsRepo, join(__dirname, '..', 'fixtures', 'data'));

      expect(
        existsSync(join(__dirname, '..', 'fixtures', 'data', 'apis', 'api3', 'beacons', 'coingeckoTestBeacon.json'))
      ).toBe(true);

      const writtenOpsRepo = readOperationsRepository(join(__dirname, '..', 'fixtures', 'data'));
      expect(writtenOpsRepo).toEqual(updatedOpsRepo);

      //revert the changes
      writeOperationsRepository(mockOpsRepo, join(__dirname, '..', 'fixtures', 'data'));
    });

    it('writes changes to ois', async () => {
      const mockOpsRepo = readOperationsRepository(join(__dirname, '..', 'fixtures', 'data'));

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

      writeOperationsRepository(updatedOpsRepo, join(__dirname, '..', 'fixtures', 'data'));
      expect(
        existsSync(join(__dirname, '..', 'fixtures', 'data', 'apis', 'api3', 'ois', 'coingeckoTestOis.json'))
      ).toBe(true);

      const writtenOpsRepo = readOperationsRepository(join(__dirname, '..', 'fixtures', 'data'));
      expect(writtenOpsRepo).toEqual(updatedOpsRepo);

      //revert the changes
      writeOperationsRepository(mockOpsRepo, join(__dirname, '..', 'fixtures', 'data'));
    });

    it('writes changes to deployments', async () => {
      const mockOpsRepo = readOperationsRepository(join(__dirname, '..', 'fixtures', 'data'));

      const coingeckoTestDeployment = {
        ...mockOpsRepo.apis.api3.deployments['2022-04-17'],
        airkeeper: {
          ...mockOpsRepo.apis.api3.deployments['2022-04-17'].airkeeper,
          airkeeper: {
            ...mockOpsRepo.apis.api3.deployments['2022-04-17'].airkeeper.airkeeper,
            airnodeAddress: '0x0000000000000000000000000000000000000000',
            airnodeXpub: '',
          },
          config: {
            ...mockOpsRepo.apis.api3.deployments['2022-04-17'].airkeeper.config,
            triggers: {
              rrp: [],
              http: [],
              httpSignedData: [],
            },
          },
          secrets: {
            ...mockOpsRepo.apis.api3.deployments['2022-04-17'].airkeeper.secrets,
            filename: 'secrets.env',
            content: 'THIS IS EMPTY',
          },
        },
        airnode: {
          ...mockOpsRepo.apis.api3.deployments['2022-04-17'].airnode,
          config: {
            ...mockOpsRepo.apis.api3.deployments['2022-04-17'].airnode.config,
            triggers: {
              rrp: [],
              http: [],
              httpSignedData: [],
            },
          },
        },
        secrets: {
          ...mockOpsRepo.apis.api3.deployments['2022-04-17'].airnode.secrets,
          filename: 'secrets.env',
          content: 'THIS IS EMPTY',
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

      writeOperationsRepository(updatedOpsRepo, join(__dirname, '..', 'fixtures', 'data'));

      expect(
        existsSync(
          join(
            __dirname,
            '..',
            'fixtures',
            'data',
            'apis',
            'api3',
            'deployments',
            '2022-05-01',
            'airkeeper',
            'airkeeper.json'
          )
        )
      ).toBe(true);

      expect(
        existsSync(
          join(
            __dirname,
            '..',
            'fixtures',
            'data',
            'apis',
            'api3',
            'deployments',
            '2022-05-01',
            'airkeeper',
            'config.json'
          )
        )
      ).toBe(true);

      expect(
        existsSync(
          join(
            __dirname,
            '..',
            'fixtures',
            'data',
            'apis',
            'api3',
            'deployments',
            '2022-05-01',
            'airkeeper',
            'secrets.env'
          )
        )
      ).toBe(true);

      expect(
        existsSync(
          join(
            __dirname,
            '..',
            'fixtures',
            'data',
            'apis',
            'api3',
            'deployments',
            '2022-05-01',
            'airnode',
            'config.json'
          )
        )
      ).toBe(true);

      expect(
        existsSync(
          join(
            __dirname,
            '..',
            'fixtures',
            'data',
            'apis',
            'api3',
            'deployments',
            '2022-05-01',
            'airnode',
            'secrets.env'
          )
        )
      ).toBe(true);

      const writtenOpsRepo = readOperationsRepository(join(__dirname, '..', 'fixtures', 'data'));
      expect(writtenOpsRepo).toEqual(updatedOpsRepo);

      //revert the changes
      writeOperationsRepository(mockOpsRepo, join(__dirname, '..', 'fixtures', 'data'));
    });

    it('writes changes to templates', async () => {
      const mockOpsRepo = readOperationsRepository(join(__dirname, '..', 'fixtures', 'data'));

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

      writeOperationsRepository(updatedOpsRepo, join(__dirname, '..', 'fixtures', 'data'));

      expect(
        existsSync(join(__dirname, '..', 'fixtures', 'data', 'apis', 'api3', 'templates', 'coingeckoTestTemplate.json'))
      ).toBe(true);

      const writtenOpsRepo = readOperationsRepository(join(__dirname, '..', 'fixtures', 'data'));
      expect(writtenOpsRepo).toEqual(updatedOpsRepo);

      //revert the changes
      writeOperationsRepository(mockOpsRepo, join(__dirname, '..', 'fixtures', 'data'));
    });

    it('writes changes to metadata', async () => {
      const mockOpsRepo = readOperationsRepository(join(__dirname, '..', 'fixtures', 'data'));

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

      writeOperationsRepository(updatedOpsRepo, join(__dirname, '..', 'fixtures', 'data'));

      expect(existsSync(join(__dirname, '..', 'fixtures', 'data', 'apis', 'api3', 'apiMetadata.json'))).toBe(true);

      const writtenOpsRepo = readOperationsRepository(join(__dirname, '..', 'fixtures', 'data'));
      expect(writtenOpsRepo).toEqual(updatedOpsRepo);

      //revert the changes
      writeOperationsRepository(mockOpsRepo, join(__dirname, '..', 'fixtures', 'data'));
    });
  });
  describe('chains', () => {
    it('writes changes to chains', async () => {
      const mockOpsRepo = readOperationsRepository(join(__dirname, '..', 'fixtures', 'data'));

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

      writeOperationsRepository(updatedOpsRepo, join(__dirname, '..', 'fixtures', 'data'));

      expect(existsSync(join(__dirname, '..', 'fixtures', 'data', 'chains', 'testchain.json'))).toBe(true);

      const writtenOpsRepo = readOperationsRepository(join(__dirname, '..', 'fixtures', 'data'));
      expect(writtenOpsRepo).toEqual(updatedOpsRepo);

      //revert the changes
      writeOperationsRepository(mockOpsRepo, join(__dirname, '..', 'fixtures', 'data'));
    });
  });

  describe('api3', () => {
    it('writes changes to airseeker', async () => {
      const mockOpsRepo = readOperationsRepository(join(__dirname, '..', 'fixtures', 'data'));

      const coingeckoTestAirseeker = {
        ...mockOpsRepo.api3!.airseeker.coingecko.airseeker,
        airseekerWalletMnemonic: '',
        chains: {},
      };

      const updatedOpsRepo = {
        ...mockOpsRepo,
        api3: {
          ...mockOpsRepo.api3,
          airseeker: {
            ...mockOpsRepo.api3!.airseeker,
            ['coingecko']: {
              ...mockOpsRepo.api3!.airseeker['coingecko'],
              airseeker: coingeckoTestAirseeker,
              secrets: {
                filename: 'secrets.env',
                content: 'test',
              },
            },
          },
        },
      };

      writeOperationsRepository(updatedOpsRepo, join(__dirname, '..', 'fixtures', 'data'));

      expect(
        existsSync(join(__dirname, '..', 'fixtures', 'data', 'api3', 'airseeker', 'coingecko', 'airseeker.json'))
      ).toBe(true);

      expect(
        existsSync(join(__dirname, '..', 'fixtures', 'data', 'api3', 'airseeker', 'coingecko', 'secrets.env'))
      ).toBe(true);

      const writtenOpsRepo = readOperationsRepository(join(__dirname, '..', 'fixtures', 'data'));
      expect(writtenOpsRepo).toEqual(updatedOpsRepo);

      //revert the changes
      writeOperationsRepository(mockOpsRepo, join(__dirname, '..', 'fixtures', 'data'));
    });
  });

  describe('dapis', () => {
    it('writes changes to dapis', async () => {
      const mockOpsRepo = readOperationsRepository(join(__dirname, '..', 'fixtures', 'data'));

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

      writeOperationsRepository(updatedOpsRepo, join(__dirname, '..', 'fixtures', 'data'));

      expect(existsSync(join(__dirname, '..', 'fixtures', 'data', 'dapis', 'testchain.json'))).toBe(true);

      const writtenOpsRepo = readOperationsRepository(join(__dirname, '..', 'fixtures', 'data'));
      expect(writtenOpsRepo).toEqual(updatedOpsRepo);

      //revert the changes
      writeOperationsRepository(mockOpsRepo, join(__dirname, '..', 'fixtures', 'data'));
    });
  });

  describe('explorer', () => {
    it('writes changes to beaconMetadata', async () => {
      const mockOpsRepo = readOperationsRepository(join(__dirname, '..', 'fixtures', 'data'));

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

      writeOperationsRepository(updatedOpsRepo, join(__dirname, '..', 'fixtures', 'data'));

      expect(existsSync(join(__dirname, '..', 'fixtures', 'data', 'explorer', 'beaconMetadata.json'))).toBe(true);

      const writtenOpsRepo = readOperationsRepository(join(__dirname, '..', 'fixtures', 'data'));
      expect(writtenOpsRepo).toEqual(updatedOpsRepo);

      //revert the changes
      writeOperationsRepository(mockOpsRepo, join(__dirname, '..', 'fixtures', 'data'));
    });

    it('writes changes to beaconSets', async () => {
      const mockOpsRepo = readOperationsRepository(join(__dirname, '..', 'fixtures', 'data'));

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

      writeOperationsRepository(updatedOpsRepo, join(__dirname, '..', 'fixtures', 'data'));

      expect(existsSync(join(__dirname, '..', 'fixtures', 'data', 'explorer', 'beaconSets.json'))).toBe(true);

      const writtenOpsRepo = readOperationsRepository(join(__dirname, '..', 'fixtures', 'data'));
      expect(writtenOpsRepo).toEqual(updatedOpsRepo);

      //revert the changes
      writeOperationsRepository(mockOpsRepo, join(__dirname, '..', 'fixtures', 'data'));
    });

    it('writes changes to pricingCoverage', async () => {
      const mockOpsRepo = readOperationsRepository(join(__dirname, '..', 'fixtures', 'data'));

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

      writeOperationsRepository(updatedOpsRepo, join(__dirname, '..', 'fixtures', 'data'));

      expect(existsSync(join(__dirname, '..', 'fixtures', 'data', 'explorer', 'pricingCoverage.json'))).toBe(true);

      const writtenOpsRepo = readOperationsRepository(join(__dirname, '..', 'fixtures', 'data'));
      expect(writtenOpsRepo).toEqual(updatedOpsRepo);

      //revert the changes
      writeOperationsRepository(mockOpsRepo, join(__dirname, '..', 'fixtures', 'data'));
    });
  });
});
