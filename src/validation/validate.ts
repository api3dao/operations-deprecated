import { validate } from './validation';
import { readOperationsRepository } from '../utils/read-operations';
import { runAndHandleErrors } from '../utils/cli';

const main = async () => {
  const rawOpsData = readOperationsRepository();

  const [success, result] = await validate(rawOpsData);
  if (!success) {
    console.log(`Validation failed. Issues found: ${result.length}`);
    console.log(result.join('\n'));
    process.exit(1);
  }

  console.log('Validation was successful.');
};

runAndHandleErrors(main);
