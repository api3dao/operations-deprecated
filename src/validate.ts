import { readOperationsRepository, writeOperationsRepository } from './utils';
import { runAndHandleErrors } from './cli';
import { OperationsRepository } from './types';
import { conformOperationsRepository } from './conform-operations-repository';

export const validateOperationsRepository = (payload: OperationsRepository) => {};

const main = async () => {
  const rawOpsData = readOperationsRepository();
  const conformedOpsData = conformOperationsRepository(rawOpsData);

  validateOperationsRepository(conformedOpsData);

  if (JSON.stringify(rawOpsData) !== JSON.stringify(conformedOpsData)) {
    console.log('Repository data changed - writing to disk...');
    writeOperationsRepository(conformedOpsData);
  }
};

runAndHandleErrors(main);
