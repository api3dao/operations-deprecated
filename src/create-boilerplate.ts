import { readApiData, writeApiData, promptQuestions } from './utils/filesystem';
import { runAndHandleErrors } from './utils/cli';
import { PromptObject } from 'prompts';
import { emptyObject } from './utils/normalization';
import { Api, ApiMetadata, Beacons, Oises, Templates } from './types';

const questions: PromptObject[] = [
  {
    type: 'text',
    name: 'apiName',
    message: 'What is the name of the API Integration?',
  },
  {
    type: 'text',
    name: 'apiDescription',
    message: 'Description of the API Integration',
  },
  {
    type: 'text',
    name: 'apiContact',
    message: 'Contact email for the API Integration',
  },
];

const main = async () => {
  const response = await promptQuestions(questions);
  const apiDataTemplate = readApiData();

  // Create the boilderplate apiMetadata
  const apiMetadata = emptyObject(apiDataTemplate.apiMetadata, ['active'], []) as ApiMetadata;
  apiMetadata.name = response.apiName;
  apiMetadata.contact = response.apiContact;
  apiMetadata.description = response.apiDescription;

  // Create the boilderplate ois
  const oises = emptyObject(
    apiDataTemplate.ois,
    ['oisFormat', 'version'],
    ['paths', 'fixedOperationParameters', 'reservedParameters', 'parameters']
  ) as Oises;
  const oisBoilerPlate = { [response.apiName + '-' + '1.0.0.json']: oises[Object.keys(oises)[0]] } as Oises;

  // Create the boilerplate template
  const templates = emptyObject(apiDataTemplate.templates, [], ['decodedParameters']) as Templates;
  const templateBoilerPlate = {
    [response.apiName + '-' + 'tempate01.json']: templates[Object.keys(templates)[0]],
  } as Templates;

  // Create the boilerplate beacon
  const beacons = emptyObject(
    apiDataTemplate.beacons,
    ['updateConditionPercentage', 'active', 'walletType', 'deviationFactorThreshold', 'ttlMinutes'],
    ['decodedParameters']
  ) as Beacons;
  const beaconBoilerPlate = { [response.apiName + '-' + 'beacon01.json']: beacons[Object.keys(beacons)[0]] } as Beacons;

  const ApiDataBoilerplate = {
    apiMetadata: apiMetadata,
    beacons: beaconBoilerPlate,
    templates: templateBoilerPlate,
    deployments: {},
    ois: oisBoilerPlate,
  } as Api;

  writeApiData(ApiDataBoilerplate, response.apiName);
};

runAndHandleErrors(main);
