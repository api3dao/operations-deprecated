import { readOperationsRepository, writeOperationsRepository } from './utils/filesystem';
import { runAndHandleErrors } from './utils/cli';
import { normalize } from './utils/normalization';
import { deepEquals } from './utils/general';

const main = async () => {
  const rawOpsData = readOperationsRepository();
  const conformedOpsData = normalize(rawOpsData);

  if (!deepEquals(rawOpsData, conformedOpsData)) {
    console.log('Repository data changed - writing to disk...');
    writeOperationsRepository(conformedOpsData);
  }
};

runAndHandleErrors(main);
