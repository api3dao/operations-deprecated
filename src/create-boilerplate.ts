import { PromptObject } from 'prompts';
import {
  readApiData,
  promptQuestions,
  sanitiseFilename,
  readOperationsRepository,
  writeOperationsRepository,
} from './utils/filesystem';
import { runAndHandleErrors } from './utils/cli';
import { emptyObject } from './utils/normalization';

const questions: PromptObject[] = [
  {
    type: 'text',
    name: 'name',
    message: [
      "What is the API Provider's name?",
      'Note that the name should include stylistic capitalisation, eg. CoinGecko or CoinMarkCap',
    ].join('\n'),
    initial: 'CoinGecko',
  },
  {
    type: 'text',
    name: 'description',
    message: 'Please enter a description of the API integration',
    initial: 'CoinGecko is a cryptocurrency ranking web site',
  },
  {
    type: 'text',
    name: 'contact',
    message: 'Please enter a contact email for the API integration',
  },
];

const main = async () => {
  const { name, contact, description } = await promptQuestions(questions);
  const apiDataTemplate = readApiData();

  // Create the boilerplate apiMetadata
  const apiMetadata = emptyObject(apiDataTemplate.apiMetadata, ['active'], []);
  const apiMetadataBoilerplate = {
    ...apiMetadata,
    name,
    contact,
    description,
  };

  // Create the boilerplate ois
  const oises = emptyObject(
    apiDataTemplate.ois,
    ['oisFormat', 'version'],
    ['paths', 'fixedOperationParameters', 'reservedParameters', 'parameters']
  );
  const oisBoilerPlate = { [sanitiseFilename(`${name}-1.0.0.json`)]: oises[Object.keys(oises)[0]] };

  // Create the boilerplate template
  const templates = emptyObject(
    apiDataTemplate.templates,
    ['name', 'templateId', 'endpointId', 'parameters', 'decodedParameters'],
    ['decodedParameters']
  );
  const templateBoilerPlate = {
    [sanitiseFilename(`${name}-template01.json`)]: templates[Object.keys(templates)[0]],
  };

  // Create the boilerplate beacon
  const beacons = emptyObject(
    apiDataTemplate.beacons,
    ['updateConditionPercentage', 'active', 'walletType', 'deviationFactorThreshold', 'ttlMinutes'],
    ['decodedParameters']
  );
  const beaconBoilerPlate = { [sanitiseFilename(`${name}-beacon01.json`)]: beacons[Object.keys(beacons)[0]] };

  const apiDataBoilerplate = {
    apiMetadata: apiMetadataBoilerplate,
    beacons: beaconBoilerPlate,
    templates: templateBoilerPlate,
    deployments: {},
    ois: oisBoilerPlate,
  };

  const opsData = readOperationsRepository();
  const updatedOpsData = { ...opsData, apis: { ...opsData.apis, [sanitiseFilename(name)]: apiDataBoilerplate } };
  writeOperationsRepository(updatedOpsData);
};

runAndHandleErrors(main);
