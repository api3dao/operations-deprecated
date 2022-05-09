import { ethers } from 'ethers';
import { Choice, PromptObject } from 'prompts';
import { encode } from '@api3/airnode-abi';
import { AirnodeRrpAddresses, RequesterAuthorizerWithAirnodeAddresses } from '@api3/airnode-protocol';
import { deriveEndpointId } from '@api3/airnode-admin';
import { OperationsRepository } from './types';
import { promptQuestions } from './utils/prompts';
import { readOperationsRepository } from './utils/read-operations';
import { writeOperationsRepository } from './utils/write-operations';
import { runAndHandleErrors } from './utils/cli';
import { chainNameToChainId, DapiServerInterface } from './utils/evm';
import { sanitiseFilename } from './utils/filesystem';

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
      message: 'Do you want to include the Airnode Authorizer?',
      initial: false,
    },
    {
      type: 'confirm',
      name: 'airnodeHeartbeat',
      message: 'Do you want to enable the Airnode Heartbeat?',
      initial: false,
    },
  ];
};

const main = async () => {
  const operationsRepository = readOperationsRepository();
  const apiChoices = Object.keys(operationsRepository.apis).map((api) => ({ title: api, value: api })) as Choice[];
  const response = await promptQuestions(questions(apiChoices));
  const apiData = operationsRepository.apis[response.apiName];

  //// Build config.json  ////

  const cloudProviderType = 'aws' as const;
  const cloudProviderRegion = 'us-east-1';

  // Get all the chains the API will be deployed on
  const apiChains = [...new Set(Object.values(apiData.beacons).flatMap((beacon) => Object.keys(beacon.chains)))];

  const chains = apiChains.map((chainName) => {
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

  const secretAppend = sanitiseFilename(apiData.apiMetadata.name).toUpperCase() + `_${cloudProviderType.toUpperCase()}`;

  const nodeSettings = {
    nodeVersion: require('@api3/airnode-node/package.json').version,
    cloudProvider: {
      type: cloudProviderType,
      region: cloudProviderRegion,
      disableConcurrencyReservations: false,
    },
    airnodeWalletMnemonic: '${AIRNODE_WALLET_MNEMONIC}',
    heartbeat: {
      enabled: response.airnodeHeartbeat,
      ...(response.airnodeHeartbeat && {
        apiKey: `\${HEARTBEAT_KEY_${secretAppend}}`,
        id: `\${HEARTBEAT_ID_${secretAppend}}`,
        url: `\${HEARTBEAT_URL_${secretAppend}}`,
      }),
    },
    httpGateway: {
      enabled: true,
      apiKey: `\${HTTP_GATEWAY_KEY_${secretAppend}}`,
      maxConcurrency: 200,
    },
    httpSignedDataGateway: {
      enabled: true,
      apiKey: `\${HTTP_SIGNED_DATA_GATEWAY_KEY_${secretAppend}}`,
      maxConcurrency: 200,
    },
    logFormat: 'plain' as const,
    logLevel: 'INFO' as const,
    stage: 'dev',
    skipValidation: true,
  };

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
    http: oisTriggers,
    httpSignedData: oisTriggers,
  };

  const apiCredentials = Object.values(apiData.ois).flatMap((ois) =>
    Object.keys(ois.apiSpecifications.components.securitySchemes).map((security) => ({
      oisTitle: ois.title,
      securitySchemeName: security,
      securitySchemeValue: `\${SS_${sanitiseFilename(security).toUpperCase()}}`.replace(/ /g, '_').replace(/\-/g, '_'),
    }))
  );

  const config = {
    chains,
    nodeSettings,
    triggers,
    ois: Object.values(apiData.ois),
    apiCredentials,
  };

  //// Build secrets.env ////

  const oisSecrets = Object.values(apiData.ois).flatMap((ois) =>
    Object.keys(ois.apiSpecifications.components.securitySchemes).map((security) =>
      `SS_${sanitiseFilename(security).toUpperCase()}=`.replace(/ /g, '_').replace(/\-/g, '_')
    )
  );

  const secretsArray = [
    `AIRNODE_WALLET_MNEMONIC=`,
    `HTTP_GATEWAY_KEY_${secretAppend}=`,
    `HTTP_SIGNED_DATA_GATEWAY_KEY_${secretAppend}=`,
    ...(response.airnodeHeartbeat
      ? [`HEARTBEAT_KEY_${secretAppend}=`, `HEARTBEAT_ID_${secretAppend}=`, `HEARTBEAT_URL_${secretAppend}=`]
      : []),
    ...oisSecrets,
    ...apiChains.map((chainName) => `${sanitiseFilename(chainName).replace(/\-/g, '_')}_PROVIDER_URL=`.toUpperCase()),
  ];

  const secrets = {
    filename: '.env',
    content: secretsArray.join('\n'),
  };

  //// Build aws.env ////

  const awsSecretsArray = [`AWS_ACCESS_KEY_ID=`, `AWS_SECRET_ACCESS_KEY=`, `AWS_SESSION_TOKEN=`];

  const aws = {
    filename: '.env',
    content: awsSecretsArray.join('\n'),
  };

  //// Build airkeeper.json ////

  const airkeeperChains = apiChains.map((chainName) => {
    const chainId = chainNameToChainId[chainName];
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
      Object.entries(beacon.chains).map(([chainName, chain]) => {
        const chainId = chainNameToChainId[chainName] || 1;
        const DapiServerInteface = DapiServerInterface();
        const parameters = '0x';
        const airnodeAddress = beacon.airnodeAddress;
        const templateId = beacon.templateId;

        const threshold = ethers.BigNumber.from(100000000)
          .mul(chain.updateConditionPercentage * 100)
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
              [DapiServerInteface.getSighash('conditionPspBeaconUpdate')]
            ),
          },
          { type: 'bytes', name: '_conditionParameters', value: beaconUpdateSubscriptionConditionParameters },
        ]);
        const DapiServerAddress = operationsRepository.chains[chainName].contracts.DapiServer;
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
              DapiServerAddress,
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
        templateParameters: template.parameters,
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
    templates: airkeeperTemplates,
    endpoints: AirkeeperEndpoints,
  };

  // Get the current date
  const date = new Date().toISOString().split('T')[0];

  //// Create the deployment directory ////
  const updatedOpsData: OperationsRepository = {
    ...operationsRepository,
    apis: {
      ...operationsRepository.apis,
      [response.apiName]: {
        ...operationsRepository.apis[response.apiName],
        deployments: {
          ...operationsRepository.apis[response.apiName].deployments,
          [date]: {
            ...operationsRepository.apis[response.apiName].deployments[date],
            airnode: {
              config: {
                ...config,
                chains: [],
              },
              secrets,
              aws,
            },
            airkeeper: {
              airkeeper,
              config,
              secrets,
              aws,
            },
          },
        },
      },
    },
  };

  writeOperationsRepository(updatedOpsData);
};

runAndHandleErrors(main);
