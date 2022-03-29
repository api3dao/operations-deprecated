import { readOperationsRepository, writeOperationsRepository } from './utils/filesystem';
import { runAndHandleErrors } from './utils/cli';
import { normalize } from './utils/normalization';

const main = async () => {
  const rawOpsData = readOperationsRepository();
  const conformedOpsData = normalize(rawOpsData);

  console.log('Validation was successful, writing changes...');
  writeOperationsRepository(conformedOpsData);
  console.log('Operations data successfully written.');
};

runAndHandleErrors(main);
