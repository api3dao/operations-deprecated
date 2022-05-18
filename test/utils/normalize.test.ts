import { join } from 'path';
import { ethers } from 'ethers';
import { encode } from '@api3/airnode-abi';
import { OperationsRepository } from '../../src/types';
import { readOperationsRepository } from '../../src/utils/read-operations';
import { normalize } from '../../src/utils/normalization';

describe('normalize', () => {
  let unsanitizedMockData: OperationsRepository;

  beforeAll(() => {
    // Modify the ops data
    const originalMockData = readOperationsRepository(join(__dirname, '..', 'fixtures', 'data'));
    unsanitizedMockData = {
      ...originalMockData,
      apis: {
        ...originalMockData.apis,
        api3: {
          ...originalMockData.apis.api3,
          beacons: {
            ...originalMockData.apis.api3.beacons,
            ['coingecko btc_usd 0.1 percent deviation']: {
              ...originalMockData.apis.api3.beacons['coingecko btc_usd 0.1 percent deviation'],
              beaconId: ethers.constants.HashZero,
            },
          },
          templates: {
            ...originalMockData.apis.api3.templates,
            ['coingecko btc_usd']: {
              ...originalMockData.apis.api3.templates['coingecko btc_usd'],
              name: 'test',
              templateId: ethers.constants.HashZero,
              parameters: ethers.constants.HashZero,
            },
          },
          ois: {
            ...originalMockData.apis.api3.ois,
            ['coingecko basic request-1.0.0']: {
              ...originalMockData.apis.api3.ois['coingecko basic request-1.0.0'],
              title: 'test',
              version: '0.0.1',
            },
          },
          deployments: {
            ...originalMockData.apis.api3.deployments,
            ['2022-04-17']: {
              ...originalMockData.apis.api3.deployments['2022-04-17'],
              airnode: {
                ...originalMockData.apis.api3.deployments['2022-04-17'].airnode,
                secrets: {
                  ...originalMockData.apis.api3.deployments['2022-04-17'].airnode.secrets,
                  content: 'TEST=',
                },
              },
              airkeeper: {
                ...originalMockData.apis.api3.deployments['2022-04-17'].airkeeper,
                secrets: {
                  ...originalMockData.apis.api3.deployments['2022-04-17'].airkeeper.secrets,
                  content: 'TEST=',
                },
              },
            },
          },
        },
      },
      explorer: {
        ...originalMockData.explorer,
        beaconSets: {
          [ethers.constants.HashZero]: [ethers.constants.HashZero],
        },
      },
    };
  });

  describe('apis', () => {
    it('dervies the beaconId and sets it', async () => {
      expect(unsanitizedMockData.apis.api3.beacons['coingecko btc_usd 0.1 percent deviation'].beaconId).toBe(
        ethers.constants.HashZero
      );

      const normalizedData = await normalize(unsanitizedMockData);
      const derivedBeconId = ethers.utils.keccak256(
        ethers.utils.solidityPack(
          ['address', 'bytes32'],
          [
            unsanitizedMockData.apis.api3.beacons['coingecko btc_usd 0.1 percent deviation'].airnodeAddress,
            unsanitizedMockData.apis.api3.beacons['coingecko btc_usd 0.1 percent deviation'].templateId,
          ]
        )
      );

      expect(normalizedData.apis.api3.beacons['coingecko btc_usd 0.1 percent deviation'].beaconId).toEqual(
        derivedBeconId
      );
    });

    it('derives the templateId and encodedParamters', async () => {
      expect(unsanitizedMockData.apis.api3.templates['coingecko btc_usd'].templateId).toBe(ethers.constants.HashZero);

      const normalizedData = await normalize(unsanitizedMockData);

      const derviedEncodedParameters = encode(
        unsanitizedMockData.apis.api3.templates['coingecko btc_usd'].decodedParameters
      );
      const templateId = ethers.utils.solidityKeccak256(
        ['bytes32', 'bytes'],
        [unsanitizedMockData.apis.api3.templates['coingecko btc_usd'].endpointId, derviedEncodedParameters]
      );

      expect(normalizedData.apis.api3.templates['test'].templateId).toEqual(templateId);
    });

    it('sanitises the OIS filename', async () => {
      const normalizedData = await normalize(unsanitizedMockData);

      expect(normalizedData.apis.api3.ois['coingecko basic request-1.0.0']).toBeUndefined();
      expect(normalizedData.apis.api3.ois['test-0.0.1']).toBe(
        unsanitizedMockData.apis.api3.ois['coingecko basic request-1.0.0']
      );
    });

    it('sanitises the deployment secrets', async () => {
      const normalizedData = await normalize(unsanitizedMockData);
      expect(normalizedData.apis.api3.deployments['2022-04-17'].airnode.secrets.content).toEqual('TEST=""\n');
      expect(normalizedData.apis.api3.deployments['2022-04-17'].airkeeper.secrets.content).toEqual('TEST=""\n');
    });
  });

  describe('explorer', () => {
    it('dervies the beaconSetId', async () => {
      const normalizedData = await normalize(unsanitizedMockData);

      const derivedBeaconSetId = ethers.utils.keccak256(
        ethers.utils.defaultAbiCoder.encode(['bytes32[]'], [[ethers.constants.HashZero]])
      );

      expect(normalizedData.explorer.beaconSets[ethers.constants.HashZero]).toBeUndefined();

      expect(normalizedData.explorer.beaconSets[derivedBeaconSetId]).toEqual([
        unsanitizedMockData.apis.api3.beacons['coingecko btc_usd 0.1 percent deviation'].beaconId,
      ]);
    });
  });
});
