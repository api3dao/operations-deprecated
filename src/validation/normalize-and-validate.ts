import { readOperationsRepository } from '../utils/read-operations';
import { writeOperationsRepository } from '../utils/write-operations';
import { runAndHandleErrors } from '../utils/cli';
import { normalize } from './normalization';
import { validate } from './validation';

const main = async () => {
  const rawOpsData = readOperationsRepository();
  const conformedOpsData = normalize(rawOpsData);

  const [success, result] = await validate(conformedOpsData);
  if (!success) {
    console.log(`Validation failed. Issues found: ${result.length}`);
    console.log(result.join('\n'));
    process.exit(1);
  }

  console.log('Validation was successful, writing changes...');
  writeOperationsRepository(conformedOpsData);
  console.log('Operations data successfully written.');
};

runAndHandleErrors(main);
