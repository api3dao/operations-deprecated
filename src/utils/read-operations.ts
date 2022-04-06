import { readdirSync, readFileSync, statSync } from 'fs';
import { basename, extname, join } from 'path';
import { OperationsRepository } from '../types';

export const readJsonFile = (filePath: string) => JSON.parse(readFileSync(filePath).toString('utf8'));

export const readJsonDirectoryAsArray = (directoryPath: string): Partial<FilePayload[]> =>
  readdirSync(directoryPath).map((filename) => ({
    ...readJsonFile(join(directoryPath, filename)),
    filename,
  }));

interface FilePayload {
  readonly filename: string;
}

export const readOperationsRepository = (target = join(__dirname, '..', '..', 'data')) =>
  readFileOrDirectoryRecursively(target) as OperationsRepository;

export const readApiData = (target = join(__dirname, '..', '..', 'data', 'apis', 'api3')) =>
  readFileOrDirectoryRecursively(target);

export const readFileOrDirectoryRecursively = (target: string): any => {
  const stats = statSync(target);
  if (stats.isFile()) {
    if (target.indexOf('.json') === -1) {
      return { filename: basename(target), content: readFileSync(target).toString('binary') };
    }

    return readJsonFile(target);
  }

  return Object.fromEntries(
    readdirSync(target).map((file) => [
      basename(file, extname(file)),
      readFileOrDirectoryRecursively(join(target, file)),
    ])
  );
};
