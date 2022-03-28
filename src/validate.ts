import { readOperationsRepository } from './utils/filesystem';
import { runAndHandleErrors } from './utils/cli';
import { validate } from './utils/validation';
import { replacer } from './utils/marshaling';

const main = async () => {
  const rawOpsData = readOperationsRepository();

  const [success, logs] = validate(rawOpsData);
  if (!success) {
    console.log('Validation failed:');
    console.log(JSON.stringify(logs, replacer, 2));
    return;
  }

  console.log('Validation was successful.');
};

runAndHandleErrors(main);
