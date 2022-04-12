import { existsSync } from 'fs';
import { join } from 'path';
import { PromptObject } from 'prompts';
import { OperationsRepository } from './types';
import { cliPrint, runAndHandleErrors, runShellCommand } from './utils/cli';
import { promptQuestions } from './utils/prompts';
import { readJsonFile, readOperationsRepository } from './utils/read-operations';
import { writeJsonFile } from './utils/write-operations';

const questions = (operationsRepository: OperationsRepository): PromptObject[] => {
  return [
    {
      type: 'autocomplete',
      name: 'name',
      message: 'Which API Integration do you want to deploy?',
      choices: Object.keys(operationsRepository.apis).map((api) => ({ title: api, value: api })),
    },
    {
      type: 'autocomplete',
      name: 'deployment',
      message: (prev) => `Which deployment of ${prev} do you want to deploy?`,
      choices: (prev) =>
        Object.keys(operationsRepository.apis[prev].deployments).map((deployment) => ({
          title: deployment,
          value: deployment,
        })),
    },
  ];
};

const main = async () => {
  const nodeVersion = require('@api3/airnode-node/package.json').version;
  const operationsRepository = readOperationsRepository();
  const response = await promptQuestions(questions(operationsRepository));

  const deploymentDirectory = join(__dirname, '..', 'data', 'apis', response.name, 'deployments', response.deployment);
  const awsSecretsFilePath = join(deploymentDirectory, 'aws.env');
  const receiptPath = join(deploymentDirectory, 'receipt.json');

  const airnodeDeployCommand = [
    `docker run -it --rm`,
    `-e USER_ID=$(id -u) -e GROUP_ID=$(id -g)`,
    `--env-file ${awsSecretsFilePath}`,
    `-v ${deploymentDirectory}:/app/config`,
    `-v ${deploymentDirectory}:/app/output`,
    `api3/airnode-deployer:${nodeVersion} deploy`,
  ].join(' ');

  console.log(`⏳ - Deploying Airnode...`);

  const deployment = runShellCommand(airnodeDeployCommand);

  if (deployment.status !== 0 || !existsSync(receiptPath)) return cliPrint.error('🛑 Airnode deployment failed.');

  const gateway = operationsRepository.apis[response.name].deployments[response.deployment].secrets.content
    .trim()
    .split('\n')
    .map((secret) => ({ title: secret.split('=')[0], value: secret.split('=')[1] }))
    .filter((secret) => secret.title === 'HTTP_GATEWAY_API_KEY' || secret.title === 'HTTP_SIGNED_DATA_GATEWAY_API_KEY')
    .reduce((acc, secret) => ({ ...acc, [secret.title]: secret.value }), {
      HTTP_GATEWAY_API_KEY: '',
      HTTP_SIGNED_DATA_GATEWAY_API_KEY: '',
    });

  const receipt = readJsonFile(receiptPath);
  const updatedReceipt = {
    ...receipt,
    api: {
      ...receipt.api,
      httpGatewayApiKey: gateway.HTTP_GATEWAY_API_KEY,
      httpSignedDataGatewayApiKey: gateway.HTTP_SIGNED_DATA_GATEWAY_API_KEY,
    },
  };
  writeJsonFile(receiptPath, updatedReceipt);

  console.log(
    [
      `☁ - Airnode has been deployed`,
      `⏩ - Please forward the "receipt.json" in the deployments folder to the API3 team.`,
      `The "receipt.json" contains sensitive information and should not be shared or made public.`,
    ],
    join('\n')
  );
};

runAndHandleErrors(main);
