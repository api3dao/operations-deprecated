import { existsSync } from 'fs';
import { join } from 'path';
import { PromptObject } from 'prompts';
import { OperationsRepository } from './types';
import { cliPrint, runAndHandleErrors, runShellCommand } from './utils/cli';
import { promptQuestions } from './utils/prompts';
import { readOperationsRepository } from './utils/read-operations';

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
        Object.keys(operationsRepository.apis[prev].deployments)
          .map((deployment) => ({
            title: deployment,
            value: deployment,
          }))
          .reverse(),
    },
    {
      type: 'multiselect',
      name: 'cloudProviders',
      message: 'Which cloud Providers do you want to deploy to?',
      choices: [
        { title: 'AWS', value: 'aws', selected: true },
        { title: 'GCP', value: 'gcp', selected: true },
      ],
    },
  ];
};

const main = async () => {
  const nodeVersion = require('@api3/airnode-node/package.json').version;
  const operationsRepository = await readOperationsRepository();
  const response = await promptQuestions(questions(operationsRepository));

  const baseDeploymentDirectory = join(
    __dirname,
    '..',
    'data',
    'apis',
    response.name,
    'deployments',
    response.deployment,
    'airnode'
  );

  if (response.cloudProviders.includes('aws')) {
    console.log(`⏳ - Deploying Airnode to AWS...`);

    const deploymentDirectoryAWS = join(baseDeploymentDirectory, 'aws');
    const awsSecretsFilePath = join(deploymentDirectoryAWS, 'aws.env');
    const receiptPath = join(deploymentDirectoryAWS, 'receipt.json');

    const airnodeDeployCommand = [
      `docker run -it --rm`,
      `-e USER_ID=$(id -u) -e GROUP_ID=$(id -g)`,
      `--env-file ${awsSecretsFilePath}`,
      `-v ${deploymentDirectoryAWS}:/app/config`,
      `-v ${deploymentDirectoryAWS}:/app/output`,
      `api3/airnode-deployer:${nodeVersion} deploy`,
    ].join(' ');

    const deployment = runShellCommand(airnodeDeployCommand);

    if (deployment.status !== 0 || !existsSync(receiptPath))
      return cliPrint.error('🛑 Airnode deployment to AWS failed.');
  }

  if (response.cloudProviders.includes('gcp')) {
    console.log(`⏳ - Deploying Airnode to GCP...`);

    const deploymentDirectoryGCP = join(baseDeploymentDirectory, 'gcp');
    const receiptPathGCP = join(deploymentDirectoryGCP, 'receipt.json');

    const airnodeDeployCommandGCP = [
      `docker run -it --rm`,
      `-e USER_ID=$(id -u) -e GROUP_ID=$(id -g)`,
      `-v ${deploymentDirectoryGCP}/gcp.json:/app/gcp.json`,
      `-v ${deploymentDirectoryGCP}:/app/config`,
      `-v ${deploymentDirectoryGCP}:/app/output`,
      `api3/airnode-deployer:${nodeVersion} deploy`,
    ].join(' ');

    const deployment = runShellCommand(airnodeDeployCommandGCP);

    if (deployment.status !== 0 || !existsSync(receiptPathGCP))
      return cliPrint.error('🛑 Airnode deployment to GCP failed.');
  }

  console.log(
    [
      `🎉 - Airnode deployment succeeded!`,
      `⏩ - Please forward the "receipt.json" in the deployments folder to the API3 team.`,
      `The "receipt.json" contains sensitive information and should not be shared or made public.`,
    ],
    join('\n')
  );
};

runAndHandleErrors(main);
