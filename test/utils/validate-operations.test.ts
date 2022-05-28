import { join } from 'path';
import { operationsRepositorySchema, replaceInterpolatedVariables } from '../../src/utils/validation';
import { readOperationsRepository } from '../../src/utils/read-operations';

it('validates the mock data repository', () => {
  const mockOpsRepo = readOperationsRepository(join(__dirname, '..', 'fixtures', 'data'));
  const result = operationsRepositorySchema.safeParse(replaceInterpolatedVariables(mockOpsRepo));

  if (!result.success) {
    console.trace(result);
  }

  expect(result.success).toEqual(true);
});
