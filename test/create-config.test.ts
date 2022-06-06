import { join } from 'path';
import prompts from 'prompts';
import { OperationsRepository } from '../src/types';
import { readOperationsRepository } from '../src/utils/read-operations';
import { createConfig } from '../src/create-config';
import { writeOperationsRepository } from '../src/utils/write-operations';

describe('create-config', () => {
  let originalMockOpsRepo: OperationsRepository;

  beforeAll(() => {
    originalMockOpsRepo = readOperationsRepository(join(__dirname, 'fixtures', 'data'));
  });

  it('builds the airnode and airkeeper configs for AWS and GCP', async () => {
    const date = new Date().toISOString().split('T')[0];

    prompts.inject(['api3', ['aws', 'gcp'], false]);
    await createConfig(join(__dirname, 'fixtures', 'data'));

    const newMockOpsRepo = readOperationsRepository(join(__dirname, 'fixtures', 'data'));
    expect(newMockOpsRepo.apis.api3.deployments[date].airnode.aws).toEqual(
      originalMockOpsRepo.apis.api3.deployments['2022-04-17'].airnode.aws
    );

    expect(newMockOpsRepo.apis.api3.deployments[date].airnode.gcp).toEqual(
      originalMockOpsRepo.apis.api3.deployments['2022-04-17'].airnode.gcp
    );

    expect(newMockOpsRepo.apis.api3.deployments[date].airkeeper).toEqual(
      originalMockOpsRepo.apis.api3.deployments['2022-04-17'].airkeeper
    );

    // revert the changes
    writeOperationsRepository(originalMockOpsRepo, join(__dirname, 'fixtures', 'data'));
  });
});
