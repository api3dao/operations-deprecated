import { ethers } from 'ethers';
import { encode } from '@api3/airnode-abi';
import { Choice, PromptObject } from 'prompts';
import { OperationsRepository } from './types';
import { promptQuestions } from './utils/prompts';
import { readOperationsRepository } from './utils/read-operations';
import { writeOperationsRepository } from './utils/write-operations';
import { runAndHandleErrors } from './utils/cli';
import { sanitiseFilename } from './utils/filesystem';

const questions = (choices: Choice[]): PromptObject[] => {
  return [
    {
      type: 'autocomplete',
      name: 'apiName',
      message: 'What is the name of the API Integration?',
      choices: choices,
    },
  ];
};

const main = async (operationRepositoryTarget?: string) => {
  const operationsRepository = readOperationsRepository(operationRepositoryTarget);
  const apiChoices = Object.keys(operationsRepository.apis).map((api) => ({ title: api, value: api })) as Choice[];
  const response = await promptQuestions(questions(apiChoices));
  const apiData = operationsRepository.apis[response.apiName];

  const templates = Object.fromEntries(
    Object.entries(apiData.templates).map(([_key, value]) => {
      const parameters = encode(value.decodedParameters);
      const templateId = ethers.utils.solidityKeccak256(['bytes32', 'bytes'], [value.endpointId, parameters]);

      return [
        sanitiseFilename(value.name),
        {
          ...value,
          templateId,
          parameters,
        },
      ];
    })
  );

  //// Create the deployment directory ////
  const updatedOpsData: OperationsRepository = {
    ...operationsRepository,
    apis: {
      ...operationsRepository.apis,
      [response.apiName]: {
        ...operationsRepository.apis[response.apiName],
        templates,
      },
    },
  };

  writeOperationsRepository(updatedOpsData, operationRepositoryTarget);
};

if (require.main === module) runAndHandleErrors(main);

export { main as generateTemplateIds };
