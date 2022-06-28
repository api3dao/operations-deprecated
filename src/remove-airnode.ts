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
        Object.keys(operationsRepository.apis[prev].deployments).map((deployment) => ({
          title: deployment,
          value: deployment,
        })),
    },
    {
      type: 'multiselect',
      name: 'cloudProviders',
      message: 'Which cloud Providers do you want to remove?',
      choices: [
        { title: 'AWS', value: 'aws', selected: true },
        { title: 'GCP', value: 'gcp', selected: true },
      ],
    },
  ];
};

const main = async () => {
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

  /// AWS Removal ///

  if (response.cloudProviders.includes('aws')) {
    console.log(`⏳ - Removing Airnode from AWS...`);

    const deploymentDirectoryAWS = join(baseDeploymentDirectory, 'aws');
    const awsSecretsFilePath = join(deploymentDirectoryAWS, 'aws.env');
    const receiptPathAWS = join(deploymentDirectoryAWS, 'receipt.json');

    if (!existsSync(receiptPathAWS)) return cliPrint.error('🛑 Airnode reciept does not exist for AWS');

    const nodeVersionAWS = require(receiptPathAWS).deployment.nodeVersion;

    const airnodeRemoveCommandAWS = [
      `docker run -it --rm`,
      `-e USER_ID=$(id -u) -e GROUP_ID=$(id -g)`,
      `--env-file ${awsSecretsFilePath}`,
      `-v ${deploymentDirectoryAWS}:/app/output`,
      `api3/airnode-deployer:${nodeVersionAWS} remove -r output/receipt.json`,
    ].join(' ');

    const deployment = runShellCommand(airnodeRemoveCommandAWS);

    if (deployment.status !== 0) return cliPrint.error('🛑 Airnode removal from AWS failed.');
  }

  /// GCP Removal ///

  if (response.cloudProviders.includes('gcp')) {
    console.log(`⏳ - Removing Airnode from GCP...`);

    const deploymentDirectoryGCP = join(baseDeploymentDirectory, 'gcp');
    const receiptPathGCP = join(deploymentDirectoryGCP, 'receipt.json');

    if (!existsSync(receiptPathGCP)) return cliPrint.error('🛑 Airnode reciept does not exist for GCP');

    const nodeVersionGCP = require(receiptPathGCP).deployment.nodeVersion;

    const airnodeRemoveCommandGCP = [
      `docker run -it --rm`,
      `-e USER_ID=$(id -u) -e GROUP_ID=$(id -g)`,
      `-v ${deploymentDirectoryGCP}/gcp.json:/app/gcp.json`,
      `-v ${deploymentDirectoryGCP}:/app/output`,
      `api3/airnode-deployer:${nodeVersionGCP} remove -r output/receipt.json`,
    ].join(' ');

    const deployment = runShellCommand(airnodeRemoveCommandGCP);

    if (deployment.status !== 0) return cliPrint.error('🛑 Airnode removal of GCP failed.');
  }

  console.log(
    ['✅ - Airnode successfully removed from the following cloud providers:', ...response.cloudProviders].join('\n')
  );
};

runAndHandleErrors(main);
