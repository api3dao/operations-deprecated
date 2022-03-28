import { readOperationsRepository, writeOperationsRepository } from './utils/filesystem';
import { runAndHandleErrors } from './utils/cli';
import { normalize } from './utils/normalization';
import { validate } from './utils/validation';
import { deepEquals } from './utils/general';
import { replacer } from './utils/marshaling';

const main = async () => {
  const rawOpsData = readOperationsRepository();
  const conformedOpsData = normalize(rawOpsData);

  const [success, logs] = validate(conformedOpsData);
  if (!success) {
    console.log('Validation failed:');
    console.log(JSON.stringify(logs, replacer, 2));
    return;
  }

  console.log('Validation was successful.');

  if (!deepEquals(rawOpsData, conformedOpsData)) {
    console.log('Repository data changed - writing to disk...');
    writeOperationsRepository(conformedOpsData);
  }
};

runAndHandleErrors(main);
