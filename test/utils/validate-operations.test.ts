import { join } from 'path';
import { operationsRepositorySchema, replaceInterpolatedVariables } from '../../src/utils/validation';
import { readOperationsRepository } from '../../src/utils/read-operations';

it('validates the mock data repository', async () => {
  const mockOpsRepo = await readOperationsRepository(join(__dirname, '..', 'fixtures', 'data'));
  const result = await operationsRepositorySchema.safeParseAsync(replaceInterpolatedVariables(mockOpsRepo));

  if (!result.success) {
    console.trace(result);
  }

  expect(result.success).toEqual(true);
});
