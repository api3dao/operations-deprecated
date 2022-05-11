import { join } from 'path';
import { ethers } from 'ethers';
import prompts from 'prompts';
import { encode } from '@api3/airnode-abi';
import { OperationsRepository } from '../src/types';
import { readOperationsRepository } from '../src/utils/read-operations';
import { generateTemplateIds } from '../src/generate-templateIds';
import { writeOperationsRepository } from '../src/utils/write-operations';

describe('generate-templateIds', () => {
  let unsanitizedMockOpsData: OperationsRepository;
  let originalMockOpsData: OperationsRepository;

  beforeAll(() => {
    originalMockOpsData = readOperationsRepository(join(__dirname, 'fixtures', 'data'));
    unsanitizedMockOpsData = {
      ...originalMockOpsData,
      apis: {
        ...originalMockOpsData.apis,
        api3: {
          ...originalMockOpsData.apis.api3,
          templates: {
            ...originalMockOpsData.apis.api3.templates,
            ['coingecko btc_usd']: {
              ...originalMockOpsData.apis.api3.templates['coingecko btc_usd'],
              templateId: ethers.constants.HashZero,
              parameters: ethers.constants.HashZero,
            },
          },
        },
      },
    };
  });

  it('generates the templateIds and parameters', async () => {
    expect(unsanitizedMockOpsData.apis.api3.templates['coingecko btc_usd'].templateId).toBe(ethers.constants.HashZero);

    prompts.inject(['api3']);
    await generateTemplateIds(join(__dirname, 'fixtures', 'data'));

    const newMockOpsRepo = readOperationsRepository(join(__dirname, 'fixtures', 'data'));

    const derviedEncodedParameters = encode(
      unsanitizedMockOpsData.apis.api3.templates['coingecko btc_usd'].decodedParameters
    );
    const templateId = ethers.utils.solidityKeccak256(
      ['bytes32', 'bytes'],
      [unsanitizedMockOpsData.apis.api3.templates['coingecko btc_usd'].endpointId, derviedEncodedParameters]
    );

    expect(newMockOpsRepo.apis.api3.templates['coingecko btc_usd'].templateId).toEqual(templateId);

    // revert the changes
    writeOperationsRepository(originalMockOpsData, join(__dirname, 'fixtures', 'data'));
  });
});
