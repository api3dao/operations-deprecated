import { readOperationsRepository, writeOperationsRepository } from './utils/filesystem';
import { runAndHandleErrors } from './utils/cli';
import { normalize } from './utils/normalization';
import { validate } from './utils/validation';

const main = async () => {
  const rawOpsData = readOperationsRepository();
  const conformedOpsData = normalize(rawOpsData);

  const [success, logs] = validate(conformedOpsData);
  if (!success) {
    console.log('Validation failed:');
    console.log(JSON.stringify(logs, null, 2));
    return;
  }

  console.log('Validation was successful, writing changes...');
  writeOperationsRepository(conformedOpsData);
  console.log('Operations data successfully written.');
};

runAndHandleErrors(main);
