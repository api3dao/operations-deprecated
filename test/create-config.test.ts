// Tests should never modify the fixtures - do not assume that `writeOperationsRepository` will work as you expect.
import { join } from 'path';
import { mkdirSync, rmdirSync } from 'fs';
import prompts from 'prompts';
import { readOperationsRepository } from '../src/utils/read-operations';
import { createConfig } from '../src/create-config';
import { writeOperationsRepository } from '../src/utils/write-operations';

const tempTestPath = join(__dirname, '../temporary_test_folder');
const mockOpsRepo = readOperationsRepository(join(__dirname, 'fixtures', 'data'));

describe('create-config', () => {
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

  it('builds the airnode and airkeeper configs for AWS and GCP', async () => {
    const date = new Date().toISOString().split('T')[0];

    prompts.inject(['api3', ['aws', 'gcp'], false]);
    await createConfig(tempTestPath);

    const newMockOpsRepo = readOperationsRepository(tempTestPath);
    expect(newMockOpsRepo.apis.api3.deployments[date].airnode.aws).toEqual(
      mockOpsRepo.apis.api3.deployments['2022-04-17'].airnode.aws
    );

    expect(newMockOpsRepo.apis.api3.deployments[date].airnode.gcp).toEqual(
      mockOpsRepo.apis.api3.deployments['2022-04-17'].airnode.gcp
    );

    expect(newMockOpsRepo.apis.api3.deployments[date].airkeeper).toEqual(
      mockOpsRepo.apis.api3.deployments['2022-04-17'].airkeeper
    );
  });
});
