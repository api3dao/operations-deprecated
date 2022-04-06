import { existsSync, mkdirSync, renameSync, rmdirSync, rmSync, writeFileSync } from 'fs';
import { join } from 'path';
import { PromptObject } from 'prompts';
import { OperationsRepository } from './types';
import { runAndHandleErrors, runShellCommand } from './utils/cli';
import { promptQuestions } from './utils/prompts';
import { readJsonFile, readOperationsRepository } from './utils/read-operations';
import { writeOperationsRepository } from './utils/write-operations';

const questions = (operationsRepository: OperationsRepository): PromptObject[] => {
  return [
    {
      type: 'autocomplete',
      name: 'name',
      message: 'Which API Integration is the receipt for?',
      choices: Object.keys(operationsRepository.apis).map((api) => ({ title: api, value: api })),
    },
    {
      type: 'confirm',
      name: 'reciept',
      message: 'Have you placed the "receipt.json" in the "/import" folder?',
      initial: true,
    },
  ];
};

const main = async () => {
  const importPath = join(__dirname, '..', 'import');
  if (!existsSync(importPath)) mkdirSync(importPath, { recursive: true });

  const operationsRepository = readOperationsRepository();
  const response = await promptQuestions(questions(operationsRepository));
  if (!response.reciept)
    return console.log('Please place the "receipt.json" in the "/import" folder and rerun the command.');

  const receipt = readJsonFile(join(importPath, 'receipt.json'));

  const updatedOpsData = {
    ...operationsRepository,
    apis: {
      ...operationsRepository.apis,
      [response.name]: {
        ...operationsRepository.apis[response.name],
        apiMetadata: {
          ...operationsRepository.apis[response.name].apiMetadata,
          airnode: receipt.airnodeWallet.airnodeAddress,
          xpub: receipt.airnodeWallet.airnodeXpub,
        },
      },
    },
  };

  console.log(`🔑 HTTP Gateway API Url: ${receipt.api.httpGatewayUrl}  (Please keep a note)`);
  console.log(`🔑 HTTP Signed Data Gateway API Url: ${receipt.api.httpSignedDataGatewayUrl}  (Please keep a note)`);
  console.log(`Succesfully imported receipt for ${response.name}`);

  writeOperationsRepository(updatedOpsData);
  rmSync(importPath, { recursive: true });
};

runAndHandleErrors(main);
