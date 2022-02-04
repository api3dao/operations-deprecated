/*
Targets:
documentation_metadata.json -> beacons -> templateName
apis -> (apiName) -> beacons -> (beacons).json
                              -> templateName too
                  -> templates -> (templates.json)
                  ->

 */

import { readdirSync, readFileSync, renameSync, rmSync, writeFileSync } from 'fs';
import path, { join } from 'path';
import prompts, { PromptObject } from 'prompts';

export const promptQuestions = (questions: PromptObject[]) =>
  prompts(questions, {
    // https://github.com/terkelg/prompts/issues/27#issuecomment-527693302
    onCancel: () => {
      throw new Error('Aborted by the user');
    },
  });

interface FilePayload {
  readonly filename: string;
}

export const readJsonFile = (filePath: string) => JSON.parse(readFileSync(filePath).toString('utf8'));

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

export const readJsonDirectoryAsArray = (directoryPath: string): Partial<FilePayload>[] =>
  readdirSync(directoryPath).map((filename) => ({
    ...readJsonFile(join(directoryPath, filename)),
    filename,
  }));

interface EthValue {
  amount: number;
  units: 'wei' | 'kwei' | 'mwei' | 'gwei' | 'szabo' | 'finney' | 'ether';
}

export interface ChainDescriptor {
  readonly name: string;
  readonly api3AirkeeperSponsor?: string;
  readonly apiProviderAirkeeperSponsor?: string;
  readonly sponsor: string; // aka address used to derive Airnode controlled wallet
  readonly apiProviderAirkeeperDeviationPercentage: number;
  readonly api3AirkeeperDeviationPercentage?: number;
  readonly apiProviderAirkeeperSponsorWalletBalanceAlertThreshold?: EthValue;
  readonly api3AirkeeperSponsorWalletBalanceAlertThreshold?: EthValue;
}

interface BeaconDescriptor {
  readonly templateId: string;
  readonly templateName: string;
  readonly description?: string;
  readonly parameters: string;
  readonly beaconId: string;
  readonly decodedParameters: { type: string; name: string; value: string }[];
  readonly chains: ChainDescriptor[];
  readonly filename?: string;
}

const renameBeacons = async () => {
  const apisBasePath = join(__dirname, '..', 'data', 'apis');

  const questions: PromptObject[] = [
    {
      type: 'select',
      name: 'apiName',
      message: 'Please choose an API whose beacons you wish to rename:',
      choices: readdirSync(apisBasePath).map((apiName) => ({ title: apiName, value: apiName })),
    },
    {
      type: 'select',
      name: 'descriptions',
      message: 'Would you like to also enter descriptions?',
      choices: [
        { title: 'yes', value: true },
        { title: 'no', value: false },
      ],
    },
  ];
  const responses = await promptQuestions(questions);
  const apiName = responses.apiName;
  const askForDescriptions = responses.descriptions;

  const apiBasePath = join(apisBasePath, apiName);

  const beaconsBasePath = join(apiBasePath, 'beacons');
  const originalBeacons = readJsonDirectoryAsArray(beaconsBasePath) as BeaconDescriptor[];

  const templatesBasePath = join(apiBasePath, 'templates');

  for (const templateIdx in originalBeacons) {
    const template = originalBeacons[templateIdx];
    console.log(`Template ${parseInt(templateIdx) + 1} of ${originalBeacons.length}`);
    console.log(
      JSON.stringify(
        {
          ...template,
          parameters: undefined,
          chains: undefined,
          filename: undefined,
        },
        null,
        2
      )
    );

    const file = path.parse(template.filename);
    const newName = (
      await promptQuestions([
        {
          type: 'text',
          name: 'name',
          message: 'Please enter a name for the above template (press enter to accept displayed name):',
          initial: file.name,
        },
      ])
    ).name;

    const description = askForDescriptions
      ? (
          await promptQuestions([
            {
              type: 'text',
              name: 'description',
              message: 'Please enter a description:',
              initial: template.description ?? '',
            },
          ])
        ).description
      : template.description;

    const filename = `${sanitiseFilename(newName)}.${file.ext.substring(1)}`;

    const newTemplate = {
      ...template,
      templateName: newName,
      description,
    };

    writeFileSync(
      join(beaconsBasePath, `${filename}.tmp`),
      JSON.stringify(
        {
          ...newTemplate,
          filename: undefined,
        },
        null,
        2
      )
    );
    rmSync(join(beaconsBasePath, template.filename));
    renameSync(join(beaconsBasePath, `${filename}.tmp`), join(beaconsBasePath, `${filename}`));

    const oldTemplateName = join(templatesBasePath, template.filename);
    const oldTemplateData = readJsonFile(oldTemplateName);

    writeFileSync(
      join(templatesBasePath, `${filename}.tmp`),
      JSON.stringify(
        {
          ...oldTemplateData,
          filename: undefined,
          templateName: newName,
        },
        null,
        2
      )
    );
    rmSync(oldTemplateName);
    renameSync(join(templatesBasePath, `${filename}.tmp`), join(templatesBasePath, `${filename}`));
  }
};

renameBeacons();
