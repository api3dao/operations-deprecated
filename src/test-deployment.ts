import { existsSync } from 'fs';
import { join } from 'path';
import axios, { AxiosRequestConfig } from 'axios';
import { PromptObject } from 'prompts';
import { OperationsRepository } from './types';
import { cliPrint, runAndHandleErrors } from './utils/cli';
import { promptQuestions } from './utils/prompts';
import { readOperationsRepository } from './utils/read-operations';

const questions = (operationsRepository: OperationsRepository): PromptObject[] => {
  return [
    {
      type: 'autocomplete',
      name: 'name',
      message: 'Which API Integration do you want to test?',
      choices: Object.keys(operationsRepository.apis).map((api) => ({ title: api, value: api })),
    },
    {
      type: 'autocomplete',
      name: 'deployment',
      message: (prev) =>
        `Which deployment of ${prev} do you want to test? (make sure a receipt.json exists in the deployments directory)`,
      choices: (prev) =>
        Object.keys(operationsRepository.apis[prev].deployments).map((deployment) => ({
          title: deployment,
          value: deployment,
        })),
    },
    {
      type: 'multiselect',
      name: 'cloudProviders',
      message: 'Which cloud Providers do you want to check?',
      choices: [
        { title: 'AWS', value: 'aws', selected: true },
        { title: 'GCP', value: 'gcp', selected: true },
      ],
    },
    {
      type: (prev, values) => (values.cloudProviders.includes('aws') ? 'text' : null),
      name: 'awsSignedDataApiKey',
      message: 'Enter your AWS Signed Data API Key',
    },
    {
      type: (prev, values) => (values.cloudProviders.includes('gcp') ? 'text' : null),
      name: 'gcpSignedDataApiKey',
      message: 'Enter your GCP Signed Data API Key',
    },
  ];
};

const urlJoin = (baseUrl: string, endpointId: string) => {
  if (baseUrl.endsWith('/')) {
    return `${baseUrl}${endpointId}`;
  } else {
    return `${baseUrl}/${endpointId}`;
  }
};

const main = async () => {
  const operationsRepository = await readOperationsRepository();
  const response = await promptQuestions(questions(operationsRepository));

  if (response.cloudProviders.length === 0) return cliPrint.error(`🛑 - Please specify a cloud provider`);

  const apiData = operationsRepository.apis[response.name];
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

  for (const cloudProvider of response.cloudProviders) {
    console.log(`⏳ - Testing Airnode on ${cloudProvider}...`);

    const deploymentDirectory = join(baseDeploymentDirectory, cloudProvider);

    const receiptPath = join(deploymentDirectory, 'receipt.json');
    if (!existsSync(receiptPath)) return cliPrint.error(`🛑 Airnode reciept does not exist for ${cloudProvider}`);

    const receipt = require(receiptPath);

    for (const template of Object.values(apiData.templates)) {
      console.log(
        `⏳ - Testing Airnode... ${urlJoin(receipt.api.httpSignedDataGatewayUrl, template.endpointId)} with template ${
          template.name
        }`
      );
      const request = {
        url: urlJoin(receipt.api.httpSignedDataGatewayUrl, template.endpointId),
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': cloudProvider === 'aws' ? response.awsSignedDataApiKey : response.gcpSignedDataApiKey,
        },
        data: {
          encodedParameters: template.parameters,
        },
        timeout: 30000, // Wait for 30s for cases like lambda cold start
      } as AxiosRequestConfig;
      const apiResponse = await axios(request);

      if (apiResponse.status !== 200) return cliPrint.error(`🛑 - Airnode failed with status ${apiResponse.status}`);

      if (apiResponse.data.data.timestamp < Date.now() / 1000 - 300)
        return cliPrint.error(`🛑 - Airnode response is older than 5 minutes`);

      console.log(`✅ - template ${template.name} test passed with data ${JSON.stringify(apiResponse.data)}`);
    }
  }

  console.log(
    ['✅ - Airnode deployment tested for the following cloud providers:', ...response.cloudProviders].join('\n')
  );
};

runAndHandleErrors(main);
