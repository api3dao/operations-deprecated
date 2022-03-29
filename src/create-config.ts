import { Choice, PromptObject } from 'prompts';
import {
  promptQuestions,
  readOperationsRepository,
} from './utils/filesystem';
import { runAndHandleErrors } from './utils/cli';
import { chainNameToChainId } from './utils/evm';
import { ChainConfig, NodeSettings, Triggers, Trigger, ApiCredentials, Config, Provider } from '@api3/airnode-node';
import { AirnodeRrpAddresses, RequesterAuthorizerWithAirnodeAddresses } from '@api3/airnode-protocol';
import { deriveEndpointId } from '@api3/airnode-admin';

const questions = (choices: Choice[]): PromptObject[] => {
  return [
    {
      type: 'autocomplete',
      name: 'apiName',
      message: 'What is the name of the API Integration?',
      choices: choices,
    },
    {
      type: 'select',
      name: 'cloud',
      message: 'Which provider do you want to generate the config for?',
      choices: [
        { title: 'AWS', value: { type: 'aws', region: 'us-east-1' } },
        { title: 'GCP', value: { type: 'gcp', region: 'us-east1' } },
      ],
      initial: 0,
    },
    {
      type: 'confirm',
      name: 'airnodeAuthorizer',
      message: 'Do you want to include the airnode authorizer?',
      initial: false,
    },
    {
      type: 'confirm',
      name: 'airnodeHeartbeat',
      message: 'Do you want to enable the airnode heartbeat?',
      initial: false,
    },
    {
      type: 'confirm',
      name: 'airnodeHttpGateway',
      message: 'Do you want to enable the airnode http gateway?',
      initial: false,
    },
    {
      type: 'confirm',
      name: 'airnodeHttpSignedDataGateway',
      message: 'Do you want to enable the airnode http signed data gateway?',
      initial: false,
    },
  ];
};

const main = async () => {
  const operationsRepository = readOperationsRepository();
  const apiChoices = Object.keys(operationsRepository.apis).map((api) => ({ title: api, value: api })) as Choice[];
  const response = await promptQuestions(questions(apiChoices));
  const apiData = operationsRepository.apis[response.apiName];

  //// Build Config.json Chains ////

  // Get all the chains the API will be deployed on
  const apiChains = [
    ...new Set(
      Object.keys(apiData.beacons).flatMap((beacon) => apiData.beacons[beacon].chains.map((chain) => chain.name))
    ),
  ];

  const chains: ChainConfig[] = apiChains.map((chainName) => {
    const chainId = chainNameToChainId[chainName];
    //TODO: Add RequesterAuthorizerWithManager
    const authorizers =
      response.airnodeAuthorizer && RequesterAuthorizerWithAirnodeAddresses[chainId]
        ? [RequesterAuthorizerWithAirnodeAddresses[chainId]]
        : [];
    const contracts = { AirnodeRrp: AirnodeRrpAddresses[chainId] || '' };
    const options = {
      txType: 'eip1559',
      priorityFee: {
        value: 3.12,
        unit: 'gwei',
      },
      baseFeeMultiplier: 2,
    };
    const providers = {
      provider1: {
        url: `\${${chainName}_PROVIDER_URL}`,
      } as Provider,
    };

    return {
      authorizers,
      contracts,
      id: `${chainId}`,
      providers,
      type: 'evm',
      options,
      maxConcurrency: 100,
      blockHistoryLimit: 300,
      minConfirmations: 0,
    } as ChainConfig;
  });

  //// Build Config.json NodeSettings ////

  const nodeSettings: NodeSettings = {
    nodeVersion: '0.5.0',
    cloudProvider: {
      type: response.cloud.type,
      region: response.cloud.region,
    },
    airnodeWalletMnemonic: '${AIRNODE_WALLET_MNEMONIC}',
    heartbeat: {
      enabled: response.airnodeHeartbeat,
      ...(response.airnodeHeartbeat && {
        apiKey: '${HEARTBEAT_API_KEY}',
        id: '${HEARTBEAT_ID}',
        url: '${HEARTBEAT_URL}',
      }),
    },
    httpGateway: {
      enabled: response.airnodeHttpGateway,
      ...(response.airnodeHttpGateway && {
        apiKey: '${HTTP_GATEWAY_API_KEY}',
        maxConcurrency: 20,
      }),
    },
    httpSignedDataGateway: {
      enabled: response.airnodeHttpSignedDataGateway,
      ...(response.airnodeHttpSignedDataGateway && {
        apiKey: '${HTTP_SIGNED_DATA_GATEWAY_API_KEY}',
        maxConcurrency: 20,
      }),
    },
    logFormat: 'plain',
    logLevel: 'INFO',
    stage: 'dev',
    skipValidation: true,
  };

  //// Build Config.json Triggers ////

  //generate the triggers from the OISes
  const oisTriggers: Trigger[] = await Promise.all(
    Object.keys(apiData.ois).flatMap((oisFilename) => {
      const ois = apiData.ois[oisFilename];
      return ois.endpoints.map(
        async (endpoint) =>
          ({
            endpointId: await deriveEndpointId(ois.title, endpoint.name),
            endpointName: endpoint.name,
            oisTitle: ois.title,
          } as Trigger)
      );
    })
  );

  const triggers: Triggers = {
    rrp: oisTriggers,
    http: (response.airnodeHttpGateway && oisTriggers) || [],
    httpSignedData: (response.airnodeHttpSignedDataGateway && oisTriggers) || [],
  };

  //// Build Config.json ApiCredentials ////
  const apiCredentials: ApiCredentials[] = Object.keys(apiData.ois).flatMap((oisFilename) => {
    const ois = apiData.ois[oisFilename];
    return Object.keys(ois.apiSpecifications.components.securitySchemes).map(
      (security) =>
        ({
          oisTitle: ois.title,
          securitySchemeName: security,
          securitySchemeValue: `\${SS_${security.toUpperCase()}}`.replace(/ /g, '_'),
        } as ApiCredentials)
    );
  });

  const Config: Config = {
    chains,
    nodeSettings,
    triggers,
    ois: Object.values(apiData.ois),
    apiCredentials,
  };

  // apiData.deployments[new Date().toISOString().split('T')[0]] = {
  //   config: Config,
  //   secrets:{
  //     filename: ".env",
  //     content: ""
  //   }
  // }
};

runAndHandleErrors(main);
