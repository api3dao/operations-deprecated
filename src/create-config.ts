import { ethers } from 'ethers';
import { Choice, PromptObject } from 'prompts';
import { encode } from '@api3/airnode-abi';
import { AirnodeRrpAddresses, RequesterAuthorizerWithAirnodeAddresses } from '@api3/airnode-protocol';
import { deriveEndpointId } from '@api3/airnode-admin';
import { ChainConfig, NodeSettings, Triggers, Trigger, ApiCredentials, Config } from '@api3/airnode-node';
import {
  AirkeeperConfig,
  AirkeeperChainConfig,
  Triggers as AirkeeperTriggers,
  Subscriptions,
  Templates as AirkeeperTemplates,
  Endpoints as AirkeeperEndpoints,
} from '@api3/airkeeper/dist/src/validator';
import { OperationsRepository } from './types';
import { promptQuestions, readOperationsRepository, writeOperationsRepository } from './utils/filesystem';
import { runAndHandleErrors } from './utils/cli';
import { chainNameToChainId, DapiServerInterface } from './utils/evm';

const questions = (choices: Choice[]): PromptObject[] => {
  return [
    {
      type: 'autocomplete',
      name: 'apiName',
      message: 'What is the name of the API Integration?',
      choices: choices,
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
  ];
};

const main = async () => {
  const operationsRepository = readOperationsRepository();
  const apiChoices = Object.keys(operationsRepository.apis).map((api) => ({ title: api, value: api })) as Choice[];
  const response = await promptQuestions(questions(apiChoices));
  const apiData = operationsRepository.apis[response.apiName];
  const secrets = [];

  //// Build Config.json  ////

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
      txType: 'eip1559' as const,
      priorityFee: {
        value: 3.12,
        unit: 'gwei' as const,
      },
      baseFeeMultiplier: 2,
    };
    const providers = {
      provider1: {
        url: `\${${chainName}_PROVIDER_URL}`.toUpperCase(),
      },
    };

    // push the provider url to the secrets
    secrets.push(`${chainName}_PROVIDER_URL=`.toUpperCase());

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
    };
  });

  const nodeSettings: NodeSettings = {
    nodeVersion: '0.5.0',
    cloudProvider: {
      type: 'aws',
      region: 'us-east-1',
      disableConcurrencyReservations: true,
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
      enabled: true,
      apiKey: '${HTTP_GATEWAY_API_KEY}',
      maxConcurrency: 20,
    },
    httpSignedDataGateway: {
      enabled: true,
      apiKey: '${HTTP_SIGNED_DATA_GATEWAY_API_KEY}',
      maxConcurrency: 20,
    },
    logFormat: 'plain',
    logLevel: 'INFO',
    stage: 'dev',
    skipValidation: true,
  };

  // Push the NodeSetting secrets to the secrets array
  secrets.push(`AIRNODE_WALLET_MNEMONIC=`);
  response.airnodeHeartbeat && secrets.push(`HEARTBEAT_API_KEY=`);
  response.airnodeHeartbeat && secrets.push(`HEARTBEAT_ID=`);
  response.airnodeHeartbeat && secrets.push(`HEARTBEAT_URL=`);
  secrets.push(`HTTP_GATEWAY_API_KEY=`);
  secrets.push(`HTTP_SIGNED_DATA_GATEWAY_API_KEY=`);

  //generate the triggers from the OISes
  const oisTriggers: Trigger[] = await Promise.all(
    Object.keys(apiData.ois).flatMap((oisFilename) => {
      const ois = apiData.ois[oisFilename];
      return ois.endpoints.map(async (endpoint) => ({
        endpointId: await deriveEndpointId(ois.title, endpoint.name),
        endpointName: endpoint.name,
        oisTitle: ois.title,
      }));
    })
  );

  const triggers: Triggers = {
    rrp: oisTriggers,
    http: oisTriggers,
    httpSignedData: oisTriggers,
  };

  const apiCredentials: ApiCredentials[] = Object.keys(apiData.ois).flatMap((oisFilename) => {
    const ois = apiData.ois[oisFilename];
    return Object.keys(ois.apiSpecifications.components.securitySchemes).map((security) => {
      // push the security scheme to the secrets
      secrets.push(`SS_${security.toUpperCase()}=`.replace(/ /g, '_'));
      return {
        oisTitle: ois.title,
        securitySchemeName: security,
        securitySchemeValue: `\${SS_${security.toUpperCase()}}`.replace(/ /g, '_'),
      };
    });
  });

  const Config: Config = {
    chains,
    nodeSettings,
    triggers,
    ois: Object.values(apiData.ois),
    apiCredentials,
  };

  //// Build Airkeeper.json ////

  const airkeeperChains: AirkeeperChainConfig[] = apiChains.map((chainName) => {
    const chainId = chainNameToChainId[chainName];
    //TODO: Add RrpBeaconServer and DapiServer contracts based on chain
    const RrpBeaconServer = '';
    const DapiServer = '';

    return {
      id: `${chainId}`,
      contracts: {
        RrpBeaconServer,
        DapiServer,
      },
    };
  });

  const airkeeperSubscriptions: Subscriptions = Object.keys(apiData.beacons)
    .flatMap((beacon) => {
      const DapiServerInteface = DapiServerInterface();
      const parameters = '0x';
      const airnodeAddress = apiData.beacons[beacon].airnodeAddress;
      const templateId = apiData.beacons[beacon].templateId;

      const threshold = ethers.BigNumber.from(100000000)
        .mul(apiData.beacons[beacon].updateConditionPercentage * 100)
        .div(10000);
      const beaconUpdateSubscriptionConditionParameters = ethers.utils.defaultAbiCoder.encode(['uint256'], [threshold]);
      const encodedBeaconUpdateSubscriptionConditions = encode([
        {
          type: 'bytes32',
          name: '_conditionFunctionId',
          value: ethers.utils.defaultAbiCoder.encode(
            ['bytes4'],
            [DapiServerInteface.getSighash('conditionPspBeaconUpdate')]
          ),
        },
        { type: 'bytes', name: '_conditionParameters', value: beaconUpdateSubscriptionConditionParameters },
      ]);

      return apiData.beacons[beacon].chains.map((chain) => {
        const chainId = chainNameToChainId[chain.name] || 1;
        //TODO: Add DapiServer contracts based on chain
        const DapiServerAddress = ethers.constants.AddressZero;
        const sponsor = chain.sponsor;
        const beaconUpdateSubscriptionId = ethers.utils.keccak256(
          ethers.utils.defaultAbiCoder.encode(
            ['uint256', 'address', 'bytes32', 'bytes', 'bytes', 'address', 'address', 'address', 'bytes4'],
            [
              chainId,
              airnodeAddress,
              templateId,
              parameters,
              encodedBeaconUpdateSubscriptionConditions,
              airnodeAddress,
              sponsor,
              DapiServerAddress, // Should this be the sponsorWallet.address instead?
              DapiServerInteface.getSighash('fulfillPspBeaconUpdate'),
            ]
          )
        );
        return {
          [beaconUpdateSubscriptionId]: {
            chainId: `${chainId}`,
            parameters,
            airnodeAddress,
            templateId,
            conditions: encodedBeaconUpdateSubscriptionConditions,
            relayer: airnodeAddress,
            sponsor,
            requester: DapiServerAddress,
            fulfillFunctionId: DapiServerInteface.getSighash('fulfillPspBeaconUpdate'),
          },
        };
      });
    })
    .reduce((subscriptionsObject, subscription) => ({ ...subscriptionsObject, ...subscription }), {});

  const airkeeperTriggers: AirkeeperTriggers = {
    rrpBeaconServerKeeperJobs: [],
    protoPsp: Object.keys(airkeeperSubscriptions),
  };

  const airkeeperTemplates: AirkeeperTemplates = Object.keys(apiData.templates).reduce(
    (templateObj, template) => ({
      ...templateObj,
      [apiData.templates[template].templateId]: {
        endpointId: apiData.templates[template].endpointId,
        templateParameters: apiData.templates[template].parameters,
      },
    }),
    {}
  );

  const airkeeperEndpointArray = await Promise.all(
    Object.keys(apiData.ois).flatMap((oisFilename) => {
      const ois = apiData.ois[oisFilename];
      return ois.endpoints.map(async (endpoint) => ({
        [await deriveEndpointId(ois.title, endpoint.name)]: { endpointName: endpoint.name, oisTitle: ois.title },
      }));
    })
  );

  const AirkeeperEndpoints: AirkeeperEndpoints = airkeeperEndpointArray.reduce(
    (endpointsObject, endpoint) => ({ ...endpointsObject, ...endpoint }),
    {}
  );

  const AirkeeperConfig: AirkeeperConfig = {
    airnodeAddress: apiData.apiMetadata.airnode,
    airnodeXpub: apiData.apiMetadata.xpub,
    chains: airkeeperChains,
    triggers: airkeeperTriggers,
    subscriptions: airkeeperSubscriptions,
    templates: airkeeperTemplates,
    endpoints: AirkeeperEndpoints,
  };

  // Get the current date
  const date = new Date().toISOString().split('T')[0];

  const updatedOpsData: OperationsRepository = {
    ...operationsRepository,
    apis: {
      ...operationsRepository.apis,
      [response.apiName]: {
        ...operationsRepository.apis[response.apiName],
        deployments: {
          ...operationsRepository.apis[response.apiName].deployments,
          [date]: {
            config: Config,
            airkeeper: AirkeeperConfig,
            secrets: {
              filename: '.env',
              content: secrets.join('\n'),
            },
          },
        },
      },
    },
  };

  writeOperationsRepository(updatedOpsData);
};

runAndHandleErrors(main);
