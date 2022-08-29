import { join } from 'path';
import { ethers } from 'ethers';
import { encode } from '@api3/airnode-abi';
import { OperationsRepository } from '../../src/validation/types';
import { readOperationsRepository } from '../../src/utils/read-operations';
import { normalize } from '../../src/validation/normalization';

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
            ['220417-2000']: {
              ...originalMockData.apis.api3.deployments['220417-2000'],
              airnode: {
                ...originalMockData.apis.api3.deployments['220417-2000'].airnode,
                aws: {
                  ...originalMockData.apis.api3.deployments['220417-2000'].airnode.aws!,
                  secrets: {
                    filename: '',
                    ...originalMockData.apis.api3.deployments['220417-2000'].airnode.aws!.secrets,
                    content: 'TEST=',
                  },
                },
                gcp: {
                  ...originalMockData.apis.api3.deployments['220417-2000'].airnode.gcp!,
                  gcp: {
                    ...originalMockData.apis.api3.deployments['220417-2000'].airnode.gcp!.gcp,
                    projectId: 'TEST',
                  },
                },
              },

              airkeeper: {
                ...originalMockData.apis.api3.deployments['220417-2000'].airkeeper,
                aws: {
                  ...originalMockData.apis.api3.deployments['220417-2000'].airkeeper?.aws,
                  secrets: {
                    filename: '',
                    ...originalMockData.apis.api3.deployments['220417-2000'].airkeeper?.aws?.secrets,
                    content: 'TEST=',
                  },
                },
              },
            },
          },
        },
      },
      beaconSets: {
        ...originalMockData.beaconSets,
        ['btc_usd']: {
          ...originalMockData.beaconSets['btc_usd'],
          beaconSetId: ethers.constants.HashZero,
        },
      },
      explorer: {
        ...originalMockData.explorer,
      },
    };
  });

  describe('apis', () => {
    it('dervies the beaconId and sets it', () => {
      expect(unsanitizedMockData.apis.api3.beacons['coingecko btc_usd 0.1 percent deviation'].beaconId).toBe(
        ethers.constants.HashZero
      );

      const normalizedData = normalize(unsanitizedMockData);
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

    it('derives the templateId and encodedParamters', () => {
      expect(unsanitizedMockData.apis.api3.templates['coingecko btc_usd'].templateId).toBe(ethers.constants.HashZero);

      const normalizedData = normalize(unsanitizedMockData);

      const derviedEncodedParameters = encode(
        unsanitizedMockData.apis.api3.templates['coingecko btc_usd'].decodedParameters
      );
      const templateId = ethers.utils.solidityKeccak256(
        ['bytes32', 'bytes'],
        [unsanitizedMockData.apis.api3.templates['coingecko btc_usd'].endpointId, derviedEncodedParameters]
      );

      expect(normalizedData.apis.api3.templates['test'].templateId).toEqual(templateId);
    });

    it('sanitises the OIS filename', () => {
      const normalizedData = normalize(unsanitizedMockData);

      expect(normalizedData.apis.api3.ois['coingecko basic request-1.0.0']).toBeUndefined();
      expect(normalizedData.apis.api3.ois['test-0.0.1']).toBe(
        unsanitizedMockData.apis.api3.ois['coingecko basic request-1.0.0']
      );
    });

    it('sanitises the deployment secrets', async () => {
      const normalizedData = await normalize(unsanitizedMockData);
      expect(normalizedData.apis.api3.deployments['220417-2000'].airnode.aws?.secrets?.content).toEqual('TEST=');
      expect(normalizedData.apis.api3.deployments['220417-2000'].airnode.gcp?.gcp).toEqual({ projectId: '' });
      expect(normalizedData.apis.api3.deployments['220417-2000'].airkeeper?.aws?.secrets?.content).toEqual('TEST=');
    });
  });

  describe('beaconSets', () => {
    it('derives the beaconSetId and sets it', () => {
      expect(unsanitizedMockData.beaconSets['btc_usd'].beaconSetId).toBe(ethers.constants.HashZero);

      const normalizedData = normalize(unsanitizedMockData);
      const derivedBeaconSetId = ethers.utils.keccak256(
        ethers.utils.defaultAbiCoder.encode(
          ['bytes32[]'],
          [Array(2).fill(normalizedData.apis.api3.beacons['coingecko btc_usd 0.1 percent deviation'].beaconId)]
        )
      );

      expect(normalizedData.beaconSets['btc_usd'].beaconSetId).toEqual(derivedBeaconSetId);
    });
  });
});
