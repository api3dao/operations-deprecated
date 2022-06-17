import { readOperationsRepository } from './utils/read-operations';
import { runAndHandleErrors } from './utils/cli';
import { validate } from './utils/validation';

const main = async () => {
  const rawOpsData = await readOperationsRepository();

  const [success, logs] = await validate(rawOpsData);
  if (!success) {
    console.log('Validation failed:');
    console.log(JSON.stringify(logs, null, 2));
    process.exit(1);
  }

  console.log('Validation was successful.');
};

runAndHandleErrors(main);
