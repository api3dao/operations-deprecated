import { readOperationsRepository } from './utils/read-operations';
import { runAndHandleErrors } from './utils/cli';
import { validate } from './utils/validation';

const main = async () => {
  const rawOpsData = readOperationsRepository();

  const [success, logs] = validate(rawOpsData);
  if (!success) {
    console.log('Validation failed:');
    console.log(JSON.stringify(logs, null, 2));
    return;
  }

  console.log('Validation was successful.');
};

runAndHandleErrors(main);
