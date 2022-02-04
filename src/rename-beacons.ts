import { readdirSync, renameSync, rmSync, writeFileSync } from 'fs';
import path, { join } from 'path';
import { PromptObject } from 'prompts';
import { promptQuestions, readJsonDirectoryAsArray, readJsonFile, sanitiseFilename } from './utils';
import { BeaconDescriptor } from './types';

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

try {
  renameBeacons();
} catch (e) {
  console.trace(e);
}
