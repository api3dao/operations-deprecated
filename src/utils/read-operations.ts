import { readdirSync, readFileSync, statSync } from 'fs';
import { basename, extname, join } from 'path';
import { Api, OperationsRepository } from '../types';

export const readJsonFile = (filePath: string) => JSON.parse(readFileSync(filePath).toString('utf8'));

export const readJsonDirectoryAsArray = (directoryPath: string): Partial<FilePayload[]> =>
  readdirSync(directoryPath).map((filename) => ({
    ...readJsonFile(join(directoryPath, filename)),
    filename,
  }));

interface FilePayload {
  readonly filename: string;
}

export const readOperationsRepository = (target = join(__dirname, '..', '..', 'data')) => {
  const rawOperations = readFileOrDirectoryRecursively(target) as OperationsRepository;

  const apis = Object.fromEntries(
    Object.entries(rawOperations.apis).map(([apiName, apiValue]) => {
      const { beacons, deployments, ois, templates, apiMetadata } = apiValue;

      const outputApiValue = {
        beacons: beacons ?? {},
        deployments: deployments ?? {},
        ois: ois ?? {},
        templates: templates ?? {},
        apiMetadata,
      };

      return [apiName, outputApiValue];
    })
  ) as unknown as Record<string, Api>;

  return {
    ...rawOperations,
    apis,
  } as OperationsRepository;
};

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
