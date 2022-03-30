import { mkdirSync, readdirSync, readFileSync, renameSync, rmdirSync, statSync, writeFileSync } from 'fs';
import path, { join } from 'path';
import prompts, { PromptObject } from 'prompts';
import { format } from 'prettier';
import { OperationsRepository } from '../types';

export const writeOperationsRepository = (
  payload: OperationsRepository,
  targetBasePath = join(__dirname, '..', '..', 'data')
) => {
  const tmpBasePath = join(__dirname, '..', '..', 'tmpData');

  try {
    rmdirSync(tmpBasePath, { recursive: true });
    mkdirSync(join(tmpBasePath, 'apis'), { recursive: true });
    writeJsonFile(join(tmpBasePath, 'documentation.json'), payload.documentation);

    Object.entries(payload.apis).forEach(([filename, api]) => {
      const apiBasePath = join(tmpBasePath, 'apis', filename);
      const deploymentsBasePath = join(apiBasePath, 'deployments');

      mkdirSync(apiBasePath);
      mkdirSync(join(apiBasePath, 'beacons'));
      mkdirSync(deploymentsBasePath);
      mkdirSync(join(apiBasePath, 'templates'));
      mkdirSync(join(apiBasePath, 'ois'));

      writeJsonFile(join(apiBasePath, 'apiMetadata.json'), api.apiMetadata);

      // TODO abstract this
      Object.entries(api.beacons).forEach(([filename, beacon]) => {
        writeJsonFile(join(apiBasePath, 'beacons', filename), beacon);
      });
      Object.entries(api.templates).forEach(([filename, template]) => {
        writeJsonFile(join(apiBasePath, 'templates', filename), template);
      });
      Object.entries(api.ois).forEach(([filename, ois]) => {
        writeJsonFile(join(apiBasePath, 'ois', filename), ois);
      });

      Object.entries(api.deployments).forEach(([directoryName, deployment]) => {
        const subDeploymentBasePath = join(deploymentsBasePath, directoryName);
        mkdirSync(subDeploymentBasePath);
        Object.entries(deployment).forEach(([filename, configContent]) => {
          writeJsonFile(join(subDeploymentBasePath, filename), configContent);
        });
      });
    });

    rmdirSync(targetBasePath, { recursive: true });
    renameSync(tmpBasePath, targetBasePath);
  } catch (e) {
    console.error('An error occurred while writing the operations repository data structure: ', e);
    console.trace(e);

    rmdirSync(tmpBasePath, { recursive: true });
  }
};

export const readJsonFile = (filePath: string) => JSON.parse(readFileSync(filePath).toString('utf8'));

export const readJsonDirectoryAsArray = (directoryPath: string): Partial<FilePayload[]> =>
  readdirSync(directoryPath).map((filename) => ({
    ...readJsonFile(join(directoryPath, filename)),
    filename,
  }));

interface FilePayload {
  readonly filename: string;
}

const prettierConfig = readJsonFile(join(__dirname, '..', '..', '.prettierrc'));

export const writeJsonFile = (path: string, payload: any) => {
  if (payload.filename && payload.content) {
    const extension = payload.filename.split('.').pop();
    writeFileSync(`${path}.${extension}`, payload.content);
    return;
  }

  const extension = path.indexOf('.json') === -1 ? '.json' : '';

  const prettierJson = format(JSON.stringify(payload), { semi: false, parser: 'json', ...prettierConfig });
  writeFileSync(`${path}${extension}`, prettierJson);
};

export const readOperationsRepository = (target = join(__dirname, '..', '..', 'data')) =>
  readFileOrDirectoryRecursively(target) as OperationsRepository;

export const readApiData = (target = join(__dirname, '..', '..', 'data', 'apis', 'api3')) =>
  readFileOrDirectoryRecursively(target);

export const readFileOrDirectoryRecursively = (target: string) => {
  const stats = statSync(target);
  if (stats.isFile()) {
    if (target.indexOf('.json') === -1) {
      return { filename: path.basename(target), content: readFileSync(target).toString('binary') };
    }

    return readJsonFile(target);
  }

  return Object.fromEntries(
    readdirSync(target).map((file) => [
      path.basename(file, path.extname(file)),
      readFileOrDirectoryRecursively(join(target, file)),
    ])
  );
};

export const promptQuestions = (questions: PromptObject[]) =>
  prompts(questions, {
    // https://github.com/terkelg/prompts/issues/27#issuecomment-527693302
    onCancel: () => {
      throw new Error('Aborted by the user');
    },
  });

export const sanitiseFilename = (filename: string) => {
  const illegalRe = /[\/?<>\\:*|"]/g;
  // eslint-disable-next-line no-control-regex
  const controlRe = /[\x00-\x1f\x80-\x9f]/g;
  const reservedRe = /^\.+$/;
  const windowsReservedRe = /^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\..*)?$/i;

  return filename
    .replace(illegalRe, '_')
    .replace(controlRe, '_')
    .replace(reservedRe, '_')
    .replace(windowsReservedRe, '_')
    .toLocaleLowerCase();
};
