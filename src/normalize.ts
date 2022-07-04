import { readOperationsRepository } from './utils/read-operations';
import { writeOperationsRepository } from './utils/write-operations';
import { runAndHandleErrors } from './utils/cli';
import { normalize } from './utils/normalization';

const main = () => {
  const rawOpsData = readOperationsRepository();
  const conformedOpsData = normalize(rawOpsData);

  console.log('Validation was successful, writing changes...');
  writeOperationsRepository(conformedOpsData);
  console.log('Operations data successfully written.');
};

runAndHandleErrors(() => new Promise(main));
