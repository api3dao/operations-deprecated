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

  //// Build Config.json  ////

  // Get all the chains the API will be deployed on
  const apiChains = [
    ...new Set(
      Object.keys(apiData.beacons).flatMap((beacon) => apiData.beacons[beacon].chains.map((chain) => chain.name))
    ),
  ];

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
      provider1: {
        url: `\${${chainName}_PROVIDER_URL}`.toUpperCase(),
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

  const nodeSettings = {
    nodeVersion: require('@api3/airnode-node/package.json').version,
    cloudProvider: {
      type: 'aws' as const,
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
    rrp: oisTriggers,
    http: oisTriggers,
    httpSignedData: oisTriggers,
  };

  const apiCredentials = Object.values(apiData.ois).flatMap((ois) =>
    Object.keys(ois.apiSpecifications.components.securitySchemes).map((security) => ({
      oisTitle: ois.title,
      securitySchemeName: security,
      securitySchemeValue: `\${SS_${security.toUpperCase()}}`.replace(/ /g, '_'),
    }))
  );

  const config = {
    chains,
    nodeSettings,
    triggers,
    ois: Object.values(apiData.ois),
    apiCredentials,
  };

  //// Build Secrets.env ////

  const oisSecrets = Object.values(apiData.ois).flatMap((ois) =>
    Object.keys(ois.apiSpecifications.components.securitySchemes).map((security) =>
      `SS_${security.toUpperCase()}=`.replace(/ /g, '_')
    )
  );

  const secretsArray = [
    `AIRNODE_WALLET_MNEMONIC=`,
    `HTTP_GATEWAY_API_KEY=`,
    `HTTP_SIGNED_DATA_GATEWAY_API_KEY=`,
    ...(response.airnodeHeartbeat ? [`HEARTBEAT_API_KEY=`, `HEARTBEAT_ID=`, `HEARTBEAT_URL=`] : []),
    ...oisSecrets,
    ...apiChains.map((chainName) => `${chainName}_PROVIDER_URL=`.toUpperCase()),
  ];

  const secrets = {
    filename: '.env',
    content: secretsArray.join('\n'),
  };

  //// Build Airkeeper.json ////

  const airkeeperChains = apiChains.map((chainName) => {
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

  const airkeeperSubscriptions = Object.values(apiData.beacons)
    .flatMap((beacon) => {
      const DapiServerInteface = DapiServerInterface();
      const parameters = '0x';
      const airnodeAddress = beacon.airnodeAddress;
      const templateId = beacon.templateId;

      const threshold = ethers.BigNumber.from(100000000)
        .mul(beacon.updateConditionPercentage * 100)
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

      return beacon.chains.map((chain) => {
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
      });
    })
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
            config,
            airkeeper,
            secrets,
          },
        },
      },
    },
  };

  writeOperationsRepository(updatedOpsData);
};

runAndHandleErrors(main);
