// Tests should never modify the fixtures - do not assume that `writeOperationsRepository` will work as you expect.
import { join } from 'path';
import { mkdirSync, rmdirSync } from 'fs';
import prompts from 'prompts';
import * as createConfigModule from '../src/deployment/create-config';
import * as dateModule from '../src/utils/date';
import { readOperationsRepository } from '../src/utils/read-operations';
import { writeOperationsRepository } from '../src/utils/write-operations';
import { OperationsRepository } from '../src/validation/types';
import { getFormattedUtcTimestamp } from '../src/utils/date';

describe('create-config', () => {
  const tempTestPath = join(__dirname, '../temporary_test_folder');
  const mockOpsRepo: OperationsRepository = readOperationsRepository(join(__dirname, 'fixtures', 'data'));

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
    jest.spyOn(dateModule, 'getFormattedUtcTimestamp').mockReturnValue('220616-1954');

    const timestamp = getFormattedUtcTimestamp();

    prompts.inject(['api3', ['aws', 'gcp'], false]);
    await createConfigModule.createConfig(tempTestPath);

    const newMockOpsRepo = readOperationsRepository(tempTestPath);
    expect(newMockOpsRepo.apis.api3.deployments[timestamp].airnode.aws).toEqual(
      mockOpsRepo.apis.api3.deployments['220417-2000'].airnode.aws
    );

    expect(newMockOpsRepo.apis.api3.deployments[timestamp].airnode.gcp).toEqual(
      mockOpsRepo.apis.api3.deployments['220417-2000'].airnode.gcp
    );

    expect(newMockOpsRepo.apis.api3.deployments[timestamp].airkeeper).toEqual(
      mockOpsRepo.apis.api3.deployments['220417-2000'].airkeeper
    );
  });
});
