import { join } from 'path';
import prompts from 'prompts';
import { OperationsRepository } from '../src/types';
import { readOperationsRepository } from '../src/utils/read-operations';
import { generateGatewayKey } from '../src/generate-gateway-key';
import { writeOperationsRepository } from '../src/utils/write-operations';

describe('generate-gateway-key', () => {
  let originalMockOpsRepo: OperationsRepository;

  beforeAll(() => {
    originalMockOpsRepo = readOperationsRepository(join(__dirname, 'fixtures', 'data'));
  });

  it('generates the api key and appends them to the secrets', async () => {
    prompts.inject(['api3', '2022-04-17']);
    await generateGatewayKey(join(__dirname, 'fixtures', 'data'));

    const newMockOpsRepo = readOperationsRepository(join(__dirname, 'fixtures', 'data'));

    const oldSecrets = originalMockOpsRepo.apis.api3.deployments['2022-04-17'].airnode.secrets.content
      .trim()
      .split('\n')
      .filter((secret) => secret.includes('HTTP_GATEWAY_KEY') || secret.includes('HTTP_SIGNED_DATA_GATEWAY_KEY'));

    const newSecrets = newMockOpsRepo.apis.api3.deployments['2022-04-17'].airnode.secrets.content
      .trim()
      .split('\n')
      .filter((secret) => secret.includes('HTTP_GATEWAY_KEY') || secret.includes('HTTP_SIGNED_DATA_GATEWAY_KEY'));

    expect(newSecrets).not.toEqual(oldSecrets);

    // revert the changes
    writeOperationsRepository(originalMockOpsRepo, join(__dirname, 'fixtures', 'data'));
  });
});
