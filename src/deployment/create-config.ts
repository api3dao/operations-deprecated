import { ethers } from 'ethers';
import { Choice, PromptObject } from 'prompts';
import { encode } from '@api3/airnode-abi';
import { AirnodeRrpAddresses } from '@api3/airnode-protocol';
import { deriveEndpointId } from '@api3/airnode-admin';
import { OperationsRepository } from '../validation/types';
import { promptQuestions } from '../utils/prompts';
import { readOperationsRepository } from '../utils/read-operations';
import { writeOperationsRepository } from '../utils/write-operations';
import { runAndHandleErrors } from '../utils/cli';
import { getDapiServerInterface } from '../utils/evm';
import { sanitiseFilename } from '../utils/filesystem';
import { getFormattedUtcTimestamp } from '../utils/date';

const questions = (choices: Choice[]): PromptObject[] => {
  return [
    {
      type: 'autocomplete',
      name: 'apiName',
      message: 'What is the name of the API Integration?',
      choices: choices,
    },
    {
      type: 'multiselect',
      name: 'configuration',
      message: 'What configuration do you want to create?',
      choices: [
        { title: 'Airnode', value: 'airnode', selected: true },
        { title: 'Airkeeper', value: 'airkeeper' },
      ],
    },
    {
      type: (prev, values) => (values.configuration.includes('airnode') ? 'multiselect' : null),
      name: 'cloudProviders',
      message: 'Which cloud providers do you want to deploy Airnode to?',
      choices: [
        { title: 'AWS', value: 'aws', selected: true },
        { title: 'GCP', value: 'gcp', selected: true },
      ],
    },
    {
      type: (prev, values) => (values.configuration.includes('airnode') ? 'confirm' : null),
      name: 'airnodeHeartbeat',
      message: 'Do you want to enable the Airnode Heartbeat?',
      initial: false,
    },
  ];
};

const buildNodeSettings = (
  apiName: string,
  cloudProviderType: string,
  cloudProviderRegion: string,
  airnodeHeartbeat: boolean,
  timestamp: string
) => {
  const secretAppend = sanitiseFilename(apiName).toUpperCase() + `_${cloudProviderType.toUpperCase()}`;

  return {
    nodeVersion: require('@api3/airnode-node/package.json').version,
    cloudProvider: {
      type: cloudProviderType,
      region: cloudProviderRegion,
      disableConcurrencyReservations: false,
      ...(cloudProviderType === 'gcp' && {
        projectId: '${GCP_PROJECT_ID}',
      }),
    },
    airnodeWalletMnemonic: '${AIRNODE_WALLET_MNEMONIC}',
    heartbeat: {
      enabled: airnodeHeartbeat,
      ...(airnodeHeartbeat && {
        apiKey: `\${HEARTBEAT_KEY_${secretAppend}}`,
        id: `\${HEARTBEAT_ID_${secretAppend}}`,
        url: `\${HEARTBEAT_URL_${secretAppend}}`,
      }),
    },
    httpGateway: {
      enabled: false,
    },
    httpSignedDataGateway: {
      enabled: true,
      apiKey: `\${HTTP_SIGNED_DATA_GATEWAY_KEY_${secretAppend}}`,
      maxConcurrency: 200,
    },
    logFormat: 'plain' as const,
    logLevel: 'INFO' as const,
    stage: `prod-${timestamp}`,
  };
};

const buildSecretsArray = (
  apiName: string,
  cloudProviderType: string,
  oisSecrets: string[],
  airnodeHeartbeat: boolean,
  timestamp: string
) => {
  const sanitisedApiName = sanitiseFilename(apiName);
  const secretAppend = `${sanitisedApiName.toUpperCase()}_${cloudProviderType.toUpperCase()}`;

  return [
    `AIRNODE_WALLET_MNEMONIC=`,
    `HTTP_SIGNED_DATA_GATEWAY_KEY_${secretAppend}=`,
    ...(airnodeHeartbeat
      ? [
          `HEARTBEAT_KEY_${secretAppend}=`,
          `HEARTBEAT_ID_${secretAppend}=${timestamp}-${cloudProviderType}-${sanitisedApiName}`,
          `HEARTBEAT_URL_${secretAppend}=https://heartbeats.api3data.link/heartbeats`,
        ]
      : []),
    ...oisSecrets,
    ...(cloudProviderType === 'gcp' ? [`GCP_PROJECT_ID=`] : []),
  ];
};

const main = async (operationRepositoryTarget?: string) => {
  const operationsRepository = readOperationsRepository(operationRepositoryTarget);
  const apiChoices = Object.keys(operationsRepository.apis).map((api) => ({ title: api, value: api })) as Choice[];
  const response = await promptQuestions(questions(apiChoices));
  const apiData = operationsRepository.apis[response.apiName];

  //// Build config.json  ////

  const timestamp = getFormattedUtcTimestamp();

  const cloudProviderTypeAWS = 'aws' as const;
  const cloudProviderRegionAWS = 'us-east-1';

  const cloudProviderTypeGCP = 'gcp' as const;
  const cloudProviderRegionGCP = 'europe-west1';

  // Get all the chains the API will be deployed on
  const apiChains = [...new Set(Object.values(apiData.beacons).flatMap((beacon) => Object.keys(beacon.chains)))];

  const chains = apiChains.map((chainName) => {
    const chainId = parseInt(operationsRepository.chains[chainName].id);
    //TODO: Add RequesterAuthorizerWithManager
    const authorizers = [] as string[];
    const contracts = { AirnodeRrp: AirnodeRrpAddresses[chainId] || '' };
    const options = {
      txType: 'eip1559' as const,
      priorityFee: {
        value: 3.12,
        unit: 'gwei' as const,
      },
      baseFeeMultiplier: 2,
      fulfillmentGasLimit: 500000,
    };
    const providers = {
      [`provider_${sanitiseFilename(chainName).replace(/\-/g, '_')}`]: {
        url: `\${${sanitiseFilename(chainName).replace(/\-/g, '_')}_PROVIDER_URL}`.toUpperCase(),
      },
    };

    return {
      authorizers,
      contracts,
      id: `${chainId}`,
      providers,
      type: 'evm' as const,
      options,
      maxConcurrency: 100,
      blockHistoryLimit: 300,
      minConfirmations: 0,
    };
  });

  const nodeSettingsAWS = buildNodeSettings(
    apiData.apiMetadata.name,
    cloudProviderTypeAWS,
    cloudProviderRegionAWS,
    response.airnodeHeartbeat,
    timestamp
  );

  const nodeSettingsGCP = buildNodeSettings(
    apiData.apiMetadata.name,
    cloudProviderTypeGCP,
    cloudProviderRegionGCP,
    response.airnodeHeartbeat,
    timestamp
  );

  //generate the triggers from the OISes
  const oisTriggers = await Promise.all(
    Object.values(apiData.ois).flatMap((ois) =>
      ois.endpoints.map(async (endpoint) => ({
        endpointId: await deriveEndpointId(ois.title, endpoint.name),
        endpointName: endpoint.name,
        oisTitle: ois.title,
      }))
    )
  );

  const triggers = {
    rrp: [],
    http: [],
    httpSignedData: oisTriggers,
  };

  const apiCredentials = Object.values(apiData.ois).flatMap((ois) =>
    Object.keys(ois.apiSpecifications.components.securitySchemes).map((security) => ({
      oisTitle: ois.title,
      securitySchemeName: security,
      securitySchemeValue: `\${SS_${sanitiseFilename(security).toUpperCase()}}`.replace(/ /g, '_').replace(/\-/g, '_'),
    }))
  );

  const configAWS = {
    chains,
    nodeSettings: nodeSettingsAWS,
    triggers,
    ois: Object.values(apiData.ois),
    apiCredentials,
    templates: [],
  };

  const configGCP = {
    chains,
    nodeSettings: nodeSettingsGCP,
    triggers,
    ois: Object.values(apiData.ois),
    apiCredentials,
    templates: [],
  };

  //// Build secrets.env for airnode and airkeeper ////

  const oisSecrets = Object.values(apiData.ois).flatMap((ois) =>
    Object.keys(ois.apiSpecifications.components.securitySchemes).map((security) =>
      `SS_${sanitiseFilename(security).toUpperCase()}=`.replace(/ /g, '_').replace(/\-/g, '_')
    )
  );

  const airnodeSecretsAWSArray = buildSecretsArray(
    apiData.apiMetadata.name,
    cloudProviderTypeAWS,
    oisSecrets,
    response.airnodeHeartbeat,
    timestamp
  );

  const airnodeSecretsGCPArray = buildSecretsArray(
    apiData.apiMetadata.name,
    cloudProviderTypeGCP,
    oisSecrets,
    response.airnodeHeartbeat,
    timestamp
  );

  const airnodeSecretsAWS = {
    filename: '.env',
    content: airnodeSecretsAWSArray.join('\n'),
  };

  const airnodeSecretsGCP = {
    filename: '.env',
    content: airnodeSecretsGCPArray.join('\n'),
  };

  const airkeeperSecretsArray = [
    ...airnodeSecretsAWSArray,
    ...apiChains.map((chainName) => `${sanitiseFilename(chainName).replace(/\-/g, '_')}_PROVIDER_URL=`.toUpperCase()),
  ];

  const airkeeperSecrets = {
    filename: '.env',
    content: airkeeperSecretsArray.join('\n'),
  };

  //// Build aws.env ////

  const awsSecretsArray = [`AWS_ACCESS_KEY_ID=`, `AWS_SECRET_ACCESS_KEY=`, `AWS_SESSION_TOKEN=`];

  const aws = {
    filename: '.env',
    content: awsSecretsArray.join('\n'),
  };

  //// Build airkeeper.json ////

  const airkeeperChains = apiChains.map((chainName) => {
    const chainId = parseInt(operationsRepository.chains[chainName].id);
    //TODO: Add RrpBeaconServer and DapiServer contracts based on chain
    const RrpBeaconServer = '';
    const DapiServer = operationsRepository.chains[chainName].contracts.DapiServer;

    return {
      id: `${chainId}`,
      contracts: {
        RrpBeaconServer,
        DapiServer,
      },
    };
  });

  const airkeeperSubscriptions = Object.values(apiData.beacons)
    .flatMap((beacon) =>
      Object.entries(beacon.chains)
        .filter(([, chain]) => 'updateConditionPercentage' in chain)
        .map(([chainName, chain]) => {
          const chainId = parseInt(operationsRepository.chains[chainName].id);
          const dapiServerInteface = getDapiServerInterface();
          const parameters = '0x';
          const airnodeAddress = beacon.airnodeAddress;
          const templateId = beacon.templateId;

          const threshold = ethers.BigNumber.from(100000000)
            .mul(chain.updateConditionPercentage! * 100)
            .div(10000);
          const beaconUpdateSubscriptionConditionParameters = ethers.utils.defaultAbiCoder.encode(
            ['uint256'],
            [threshold]
          );
          const encodedBeaconUpdateSubscriptionConditions = encode([
            {
              type: 'bytes32',
              name: '_conditionFunctionId',
              value: ethers.utils.defaultAbiCoder.encode(
                ['bytes4'],
                [dapiServerInteface.getSighash('conditionPspBeaconUpdate')]
              ),
            },
            { type: 'bytes', name: '_conditionParameters', value: beaconUpdateSubscriptionConditionParameters },
          ]);
          const dapiServerAddress = operationsRepository.chains[chainName].contracts.DapiServer;
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
                dapiServerAddress,
                dapiServerInteface.getSighash('fulfillPspBeaconUpdate'),
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
              requester: dapiServerAddress,
              fulfillFunctionId: dapiServerInteface.getSighash('fulfillPspBeaconUpdate'),
            },
          };
        })
    )
    .reduce((subscriptionsObject, subscription) => ({ ...subscriptionsObject, ...subscription }), {});

  const airkeeperTriggers = {
    rrpBeaconServerKeeperJobs: [],
    protoPsp: Object.keys(airkeeperSubscriptions),
  };

  const airkeeperTemplates = Object.values(apiData.templates).reduce(
    (templateObj, template) => ({
      ...templateObj,
      [template.templateId]: {
        endpointId: template.endpointId,
        encodedParameters: template.parameters,
      },
    }),
    {}
  );

  const airkeeperEndpointArray = await Promise.all(
    Object.values(apiData.ois).flatMap((ois) => {
      return ois.endpoints.map(async (endpoint) => ({
        [await deriveEndpointId(ois.title, endpoint.name)]: { endpointName: endpoint.name, oisTitle: ois.title },
      }));
    })
  );

  const AirkeeperEndpoints = airkeeperEndpointArray.reduce(
    (endpointsObject, endpoint) => ({ ...endpointsObject, ...endpoint }),
    {}
  );

  const airkeeper = {
    airnodeAddress: apiData.apiMetadata.airnode,
    airnodeXpub: apiData.apiMetadata.xpub,
    chains: airkeeperChains,
    triggers: airkeeperTriggers,
    subscriptions: airkeeperSubscriptions,
    templatesV1: airkeeperTemplates,
    endpoints: AirkeeperEndpoints,
  };

  //// Create the deployment directory ////
  const updatedOpsData: OperationsRepository = {
    ...operationsRepository,
    apis: {
      ...operationsRepository.apis,
      [response.apiName]: {
        ...operationsRepository.apis[response.apiName],
        deployments: {
          ...operationsRepository.apis[response.apiName].deployments,
          [timestamp]: {
            ...(response.configuration.includes('airnode') && {
              airnode: {
                ...(response.cloudProviders.includes('aws') && {
                  aws: {
                    config: {
                      ...configAWS,
                      chains: [],
                    },
                    secrets: airnodeSecretsAWS,
                    aws,
                  },
                }),
                ...(response.cloudProviders.includes('gcp') && {
                  gcp: {
                    config: {
                      ...configGCP,
                      chains: [],
                    },
                    secrets: airnodeSecretsGCP,
                    gcp: {},
                  },
                }),
              },
            }),
            ...(response.configuration.includes('airkeeper') && {
              airkeeper: {
                aws: {
                  airkeeper,
                  config: configAWS,
                  secrets: airkeeperSecrets,
                  aws,
                },
              },
            }),
          },
        },
      },
    },
  };

  writeOperationsRepository(updatedOpsData, operationRepositoryTarget);
};

if (require.main === module) runAndHandleErrors(main);

export { main as createConfig };
