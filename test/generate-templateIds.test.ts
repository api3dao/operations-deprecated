import { join } from 'path';
import { ethers } from 'ethers';
import prompts from 'prompts';
import { encode } from '@api3/airnode-abi';
import { readOperationsRepository } from '../src/utils/read-operations';
import { generateTemplateIds } from '../src/generate-templateIds';
import { OperationsRepository } from '../src/types';

describe('generate-templateIds', () => {
  let mockOpsRepo: OperationsRepository;

  beforeAll(async () => {
    mockOpsRepo = await readOperationsRepository(join(__dirname, 'fixtures', 'data'));
  });

  it('generates the templateIds and parameters', async () => {
    const unsanitizedMockOpsData = {
      ...mockOpsRepo,
      apis: {
        ...mockOpsRepo.apis,
        api3: {
          ...mockOpsRepo.apis.api3,
          templates: {
            ...mockOpsRepo.apis.api3.templates,
            ['coingecko btc_usd']: {
              ...mockOpsRepo.apis.api3.templates['coingecko btc_usd'],
              templateId: ethers.constants.HashZero,
              parameters: ethers.constants.HashZero,
            },
          },
        },
      },
    };

    expect(unsanitizedMockOpsData.apis.api3.templates['coingecko btc_usd'].templateId).toBe(ethers.constants.HashZero);

    prompts.inject(['api3']);
    await generateTemplateIds(join(__dirname, 'fixtures', 'data'));

    const newMockOpsRepo = await readOperationsRepository(join(__dirname, 'fixtures', 'data'));

    const derviedEncodedParameters = encode(
      unsanitizedMockOpsData.apis.api3.templates['coingecko btc_usd'].decodedParameters
    );
    const templateId = ethers.utils.solidityKeccak256(
      ['bytes32', 'bytes'],
      [unsanitizedMockOpsData.apis.api3.templates['coingecko btc_usd'].endpointId, derviedEncodedParameters]
    );

    expect(newMockOpsRepo.apis.api3.templates['coingecko btc_usd'].templateId).toEqual(templateId);
  });
});
