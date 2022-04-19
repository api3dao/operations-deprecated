import { randomBytes } from 'crypto';
import { PromptObject } from 'prompts';
import { OperationsRepository } from './types';
import { runAndHandleErrors } from './utils/cli';
import { sanitiseFilename } from './utils/filesystem';
import { promptQuestions } from './utils/prompts';
import { readOperationsRepository } from './utils/read-operations';
import { writeOperationsRepository } from './utils/write-operations';

const questions = (operationsRepository: OperationsRepository): PromptObject[] => {
  return [
    {
      type: 'autocomplete',
      name: 'name',
      message: 'What is the name of the API Integration?',
      choices: Object.keys(operationsRepository.apis).map((api) => ({ title: api, value: api })),
    },
    {
      type: 'autocomplete',
      name: 'deployment',
      message: 'For which deployment do you want to generate the gateway keys for?',
      choices: (prev) =>
        Object.keys(operationsRepository.apis[prev].deployments).map((deployment) => ({
          title: deployment,
          value: deployment,
        })),
    },
  ];
};

const main = async () => {
  const httpGatewayKey = randomBytes(48).toString('hex');
  const signedHttpGatewayKey = randomBytes(48).toString('hex');

  const operationsRepository = readOperationsRepository();
  const response = await promptQuestions(questions(operationsRepository));

  const api = operationsRepository.apis[response.name];
  const secretAppend = sanitiseFilename(api.apiMetadata.name).toUpperCase() + `_AWS`;

  const oldSecrets = operationsRepository.apis[response.name].deployments[response.deployment].secrets.content
    .trim()
    .split('\n')
    .filter((secret) => !secret.includes('HTTP_GATEWAY_KEY') && !secret.includes('HTTP_SIGNED_DATA_GATEWAY_KEY'));

  const newSecrets = {
    filename: '.env',
    content: [
      ...oldSecrets,
      `HTTP_GATEWAY_KEY_${secretAppend}=${httpGatewayKey}`,
      `HTTP_SIGNED_DATA_GATEWAY_KEY_${secretAppend}=${signedHttpGatewayKey}`,
    ].join('\n'),
  };

  const updatedOpsData: OperationsRepository = {
    ...operationsRepository,
    apis: {
      ...operationsRepository.apis,
      [response.name]: {
        ...operationsRepository.apis[response.name],
        deployments: {
          ...operationsRepository.apis[response.name].deployments,
          [response.deployment]: {
            ...operationsRepository.apis[response.name].deployments[response.deployment],
            secrets: newSecrets,
          },
        },
      },
    },
  };

  console.log(`🔑 Generated HTTP Gateway API Key: ${httpGatewayKey}`);
  console.log(`🔑 Generated HTTP Signed Data Gateway API Key: ${signedHttpGatewayKey}`);

  writeOperationsRepository(updatedOpsData);
};

runAndHandleErrors(main);
