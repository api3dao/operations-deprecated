import { existsSync } from 'fs';
import { join } from 'path';
import axios from 'axios';
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
      type: (prev) => (prev.includes('aws') ? 'text' : null),
      name: 'awsSignedDataApiKey',
      message: 'Enter your AWS Signed Data API Key',
    },
    {
      type: (prev) => (prev.includes('gcp') ? 'text' : null),
      name: 'gcpSignedDataApiKey',
      message: 'Enter your GCP Signed Data API Key',
    },
  ];
};

const main = async () => {
  const operationsRepository = readOperationsRepository();
  const response = await promptQuestions(questions(operationsRepository));
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

  /// AWS Test ///

  if (response.cloudProviders.includes('aws')) {
    console.log(`⏳ - Testing AWS Airnode...`);

    const deploymentDirectoryAWS = join(baseDeploymentDirectory, 'aws');
    const receiptPathAWS = join(deploymentDirectoryAWS, 'receipt.json');

    if (!existsSync(receiptPathAWS)) return cliPrint.error('🛑 Airnode reciept does not exist for AWS');

    const receipt = require(receiptPathAWS);

    const testRequests = Object.values(apiData.templates).map((template) => ({
      url: `${receipt.api.httpSignedDataGatewayUrl}` + `/${template.endpointId}`,
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': response.awsSignedDataApiKey,
      },
      data: {
        encodedParameters: template.parameters,
      },
      templateName: template.name,
    }));

    const testFullfillments = await Promise.allSettled(
      testRequests.map((request) => {
        console.log(`⏳ - Testing AWS Airnode... ${request.url} with template ${request.templateName}`);
        return axios(request);
      })
    );

    const successfulFulfillments = testFullfillments.filter(
      (result) => result.status === 'fulfilled' && result.value.status === 200
    );

    successfulFulfillments.forEach((fulfillment) => {
      if (fulfillment.status === 'fulfilled') {
        console.log(
          `✅ - Successfully tested endpoint ${fulfillment.value.config.url} with response ${JSON.stringify(
            fulfillment.value.data
          )}`
        );
      }
    });

    if (successfulFulfillments.length !== testFullfillments.length) return cliPrint.error('🛑 AWS Airnode test failed');

    console.log(`✅ - AWS Airnode test complete`);
  }

  /// GCP Test ///

  if (response.cloudProviders.includes('gcp')) {
    console.log(`⏳ - Testing GCP Airnode...`);

    const deploymentDirectoryGCP = join(baseDeploymentDirectory, 'gcp');
    const receiptPathGCP = join(deploymentDirectoryGCP, 'receipt.json');

    if (!existsSync(receiptPathGCP)) return cliPrint.error('🛑 Airnode reciept does not exist for GCP');

    const receipt = require(receiptPathGCP);

    const testRequests = Object.values(apiData.templates).map((template) => ({
      url: `${receipt.api.httpSignedDataGatewayUrl}` + `/${template.endpointId}`,
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': response.gcpSignedDataApiKey,
      },
      data: {
        encodedParameters: template.parameters,
      },
      templateName: template.name,
    }));

    const testFullfillments = await Promise.allSettled(
      testRequests.map((request) => {
        console.log(`⏳ - Testing GCP Airnode... ${request.url} with template ${request.templateName}`);
        return axios(request);
      })
    );

    const successfulFulfillments = testFullfillments.filter(
      (result) => result.status === 'fulfilled' && result.value.status === 200
    );

    successfulFulfillments.forEach((fulfillment) => {
      if (fulfillment.status === 'fulfilled') {
        console.log(
          `✅ - Successfully tested endpoint ${fulfillment.value.config.url} with response ${JSON.stringify(
            fulfillment.value.data
          )}`
        );
      }
    });

    if (successfulFulfillments.length !== testFullfillments.length) return cliPrint.error('🛑 GCP Airnode test failed');

    console.log(`✅ - GCP Airnode test complete`);
  }

  console.log(
    ['✅ - Airnode deployment successfully tested for the following cloud providers:', ...response.cloudProviders],
    join('\n')
  );
};

runAndHandleErrors(main);
