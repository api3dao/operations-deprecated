import { join } from 'path';
import { PromptObject } from 'prompts';
import { OperationsRepository } from './types';
import { runAndHandleErrors, runShellCommand } from './utils/cli';
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
  ];
};

const main = async () => {
  const nodeVersion = require('@api3/airnode-node/package.json').version;
  const airkeeperVersion = require('@api3/airkeeper/package.json').version;
  const operationsRepository = readOperationsRepository();
  const response = await promptQuestions(questions(operationsRepository));

  const deploymentDirectory = join(__dirname, '..', 'data', 'apis', response.name, 'deployments', response.deployment);
  const awsSecretsFilePath = join(deploymentDirectory, 'aws.env');

  const airnodeDeployCommand = [
    `docker run -it --rm`,
    `-e USER_ID=$(id -u) -e GROUP_ID=$(id -g)`,
    `--env-file ${awsSecretsFilePath}`,
    `-v ${deploymentDirectory}:/app/config`,
    `-v ${deploymentDirectory}:/app/output`,
    `api3/airnode-deployer:${nodeVersion} deploy`,
  ]
    .filter(Boolean)
    .join(' ');

  console.log(`☁ - Airnode has been deployed, you can find the "receipt.json" within the deployments folder.`);

  runShellCommand(airnodeDeployCommand);

  console.log(`⏳ - Now deploying Airkeeper`);

  const airkeeperDeployCommand = [
    `docker run -it --rm`,
    `--env-file ${awsSecretsFilePath}`,
    `-v ${deploymentDirectory}:/app/config`,
    `api3/airkeeper:${airkeeperVersion} deploy --stage dev --region us-east-1`,
  ]
    .filter(Boolean)
    .join(' ');

  runShellCommand(airkeeperDeployCommand);

  console.log(
    `🗽 - Airkeeper has been deployed, you can find the "receipt.json" within the deployments folder.\n⏩ - Please forward the "receipt.json" to the API3 team.`
  );
};

runAndHandleErrors(main);
