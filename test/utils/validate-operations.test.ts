import { join } from 'path';
import { replaceInterpolatedVariables, validate } from '../../src/validation/validation';
import { readOperationsRepository } from '../../src/utils/read-operations';

it('validates the mock data repository', async () => {
  const mockOpsRepo = readOperationsRepository(join(__dirname, '..', 'fixtures', 'data'));
  const interpolatedMockOpsRepo = replaceInterpolatedVariables(mockOpsRepo);

  const [success, result] = await validate(interpolatedMockOpsRepo);

  expect(success).toEqual(true);
  expect(result).toEqual(interpolatedMockOpsRepo);
});
