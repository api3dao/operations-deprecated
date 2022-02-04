import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import prompts, { PromptObject } from 'prompts';

export const readJsonFile = (filePath: string) => JSON.parse(readFileSync(filePath).toString('utf8'));

export const readJsonDirectoryAsArray = (directoryPath: string): Partial<FilePayload[]> =>
  readdirSync(directoryPath).map((filename) => ({
    ...readJsonFile(join(directoryPath, filename)),
    filename,
  }));

interface FilePayload {
  readonly filename: string;
}

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
