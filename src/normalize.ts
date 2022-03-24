import { readOperationsRepository, writeOperationsRepository } from './utils/filesystem';
import { runAndHandleErrors } from './utils/cli';
import { normalize } from './utils/normalization';

const main = async () => {
  const rawOpsData = readOperationsRepository();
  const conformedOpsData = normalize(rawOpsData);

  // TODO determine if rewrite required
  if (JSON.stringify(rawOpsData) !== JSON.stringify(conformedOpsData)) {
    console.log('Repository data changed - writing to disk...');
    writeOperationsRepository(conformedOpsData);
  }
};

runAndHandleErrors(main);
