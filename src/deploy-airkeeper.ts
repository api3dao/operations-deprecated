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
  ];
};

const main = async () => {
  const airkeeperVersion = require('@api3/airkeeper/package.json').version;
  const operationsRepository = readOperationsRepository();
  const response = await promptQuestions(questions(operationsRepository));

  const deploymentDirectory = join(__dirname, '..', 'data', 'apis', response.name, 'deployments', response.deployment);
  const awsSecretsFilePath = join(deploymentDirectory, 'aws.env');

  const config = operationsRepository.apis[response.name].deployments[response.deployment].config;
  const stage = config.nodeSettings.stage;
  const cloudProvider = config.nodeSettings.cloudProvider.type;
  if (cloudProvider === 'local') return cliPrint.error('🛑 Cloud provider is local. Please deploy to AWS/GCP.');

  const region = config.nodeSettings.cloudProvider.region;
  if (!region) return cliPrint.error('🛑 Cloud provider region is not set.');

  const airkeeperDeployCommand = [
    `docker run -it --rm`,
    `--env-file ${awsSecretsFilePath}`,
    `-v ${deploymentDirectory}:/app/config`,
    `api3/airkeeper:${airkeeperVersion} deploy --stage ${stage} --region ${region}}`,
  ].join(' ');

  console.log(`⏳ - Deploying Airkeeper`);

  const deployment = runShellCommand(airkeeperDeployCommand);

  if (deployment.status !== 0) return cliPrint.error('🛑 Airkeeper deployment failed.');

  console.log(
    [
      `🗽 - Airkeeper has been deployed`,
      `⏩ - if you also deployed Airnode, please forward the "receipt.json" to the API3 team.`,
      `The "receipt.json" contains sensitive information and should not be shared or made public.`,
    ],
    join('\n')
  );
};

runAndHandleErrors(main);
