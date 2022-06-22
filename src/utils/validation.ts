import { z } from 'zod';
import { ois } from '@api3/airnode-validator';
import { OperationsRepository } from '../types';

const { oisSchema } = ois;

/**
 * Common EVM Data Schema
 */
export const evmAddressSchema = z.string().regex(/^0x[a-fA-F0-9]{40}$/);
export const evmBeaconIdSchema = z.string().regex(/^0x[a-fA-F0-9]{64}$/);
export const evmTemplateIdSchema = z.string().regex(/^0x[a-fA-F0-9]{64}$/);
export const evmEndpointIdSchema = z.string().regex(/^0x[a-fA-F0-9]{64}$/);
export const evmXpubSchema = z.string().regex(/^xpub[a-zA-Z0-9]{107}$/);

/**
 * Wallet types
 *
 * The type of wallet specified.
 *
 * If a wallet type contains "Sponsor" it means the target wallet must be derived using the Airnode Sponsor-wallet
 * algorithm: https://docs.api3.org/airnode/latest/concepts/sponsor.html#derive-a-sponsor-wallet
 *
 * If a wallet type does not contain "Sponsor" it is the derived target wallet.
 */
export const walletTypeSchema = z.enum(['Provider', 'API3', 'Provider-Sponsor', 'API3-Sponsor']);

/**
 * Wallet Top-up Schema
 *
 * A wallet to be monitored for topping up. These wallets are used by Airkeeper and potentially Airseeker to fulfil
 * on-chain value update requests against a DapiServer contract instance.
 */
export const topUpWalletSchema = z
  .object({
    walletType: walletTypeSchema,
    address: evmAddressSchema.optional(),
  })
  .strict();

/**
 * Extended Chain Description Schema
 *
 * A description of a parent beacon's on-chain presence and associated resources.
 *
 * @active: Whether the beacon is currently actively being updated
 * @sponsor: The `sponsor` address (https://docs.api3.org/airnode/latest/concepts/sponsor.html#sponsoraddress)
 * @updateConditionPercentage: The API provider's Airkeeper update condition percentage
 * @displayDisabled: Should the beacon be displayed in UI applications (TODO this should be moved to explorerMetatda)
 * @airseekerConfig: API3's Airkseeker update configuration, including:
 * @airseekerConfig.deviationThreshold: API3's Airseeker update threshold
 * @airseekerConfig.heartbeatInterval: The interval at which a forced update will be made regardless of deviation
 * @airseekerConfig.updateInterval: How often API3's Airseeker checks the deviation
 */
export const extendedChainDescriptionSchema = z
  .object({
    active: z.boolean(),
    sponsor: z.string(),
    topUpWallets: z.array(topUpWalletSchema),
    updateConditionPercentage: z.number().optional(),
    displayDisabled: z.boolean().optional(),
    airseekerConfig: z
      .object({
        deviationThreshold: z.number(),
        heartbeatInterval: z.number(),
        updateInterval: z.number(),
      })
      .optional(),
  })
  .strict();

/**
 * Beacon Schema
 *
 * @name: A name for a beacon, formatted for UI display.
 * @description: A description for a beacon, formatted for UI display.
 */
export const beaconSchema = z
  .object({
    name: z.string(),
    description: z.string(),
    beaconId: evmBeaconIdSchema,
    airnodeAddress: evmAddressSchema,
    templateId: evmTemplateIdSchema,
    chains: z.record(extendedChainDescriptionSchema),
  })
  .strict();

export const beaconsSchema = z.record(beaconSchema);

/**
 * Secrets Schema
 *
 * Secrets are expected to not be stored in the operations repository, only templates lacking actual sensitive content.
 * Secrets files are handled as an object containing a filename and their string content - essentially pass-through.
 */
export const secretsSchema = z.object({ filename: z.string(), content: z.string() });

/**
 * Airnode AWS Deployment Schema
 *
 * Describes an Airnode deployment to AWS
 */
export const airnodeDeploymentAWSSchema = z.object({
  config: z.any(), // TODO commented until we decide on versioning: airnodeConfigSchema,
  secrets: secretsSchema.optional(),
  aws: secretsSchema.optional(),
});

/**
 * Airnode GCP Deployment Schema
 *
 * Describes an Airnode deployment to GCP
 */
export const airnodeDeploymentGCPSchema = z.object({
  config: z.any(), // TODO commented until we decide on versioning: airnodeConfigSchema,
  secrets: secretsSchema.optional(),
  gcp: z.any().optional(),
});

/**
 * Airnode Deployment Schema
 *
 * Describes an optional set of Airnode deployments
 */
export const airnodeDeploymentSchema = z.object({
  aws: airnodeDeploymentAWSSchema.optional(),
  gcp: airnodeDeploymentGCPSchema.optional(),
});

/**
 * Airkeeper AWS Deployment Schema
 *
 * Describes an Airkeeper deployment to AWS
 */
export const airkeeperDeploymentAWSSchema = z.object({
  config: z.any().optional(), // TODO commented until we decide on versioning: airnodeConfigSchema,
  airkeeper: z.any().optional(),
  secrets: secretsSchema.optional(),
});

/**
 * Airkeeper Deployment Schema
 *
 * Describes an Airkeeper deployment
 */
export const airkeeperDeploymentSchema = z.object({
  aws: airkeeperDeploymentAWSSchema.optional(),
});

/**
 * Deployment Set Schema
 *
 * Describes an Airnode and Airkeeper deployment.
 * Deployment of Airkeeper is optional.
 */
export const deploymentSetSchema = z.object({
  airnode: airnodeDeploymentSchema,
  airkeeper: airkeeperDeploymentSchema.optional(),
});

/**
 * Deployment Schema
 *
 * Deployment sets are keyed by the date in the format 'YYYY-MM-DD'
 */
export const deploymentsSchema = z.record(deploymentSetSchema);

/**
 * An Airnode Template
 *
 * Please see documentation here: https://docs.api3.org/airnode/latest/grp-developers/using-templates.html#part-1-build-a-template
 */
export const templateDecodedParametersSchema = z.object({
  name: z.string(),
  type: z.string(),
  value: z.string(),
});

/**
 * Template Schema
 *
 * @name: A UI-suitable formatted name
 * @templateId: Referenced by beacons and used to generate configuration files for Airnode, Airkeeper and Airseeker
 * @endpointId: References an OIS-based endpoint: https://docs.api3.org/airnode/latest/concepts/endpoint.html#endpointid
 * @parameters: Encoded parameters - derived from `decodedParameters` and used in consuming applications
 * @decodedParameters: Used as an input into the generation of `parameters`. See https://docs.api3.org/airnode/latest/reference/deployment-files/config-json.html#triggers
 */
export const templateSchema = z
  .object({
    name: z.string(),
    templateId: evmTemplateIdSchema,
    endpointId: evmEndpointIdSchema,
    parameters: z.string(),
    decodedParameters: z.array(templateDecodedParametersSchema),
  })
  .strict();

/**
 * Templates Schema
 *
 * Templates are keyed by their `templateId`
 */
export const templatesSchema = z.record(templateSchema);

/**
 * OISes Schema
 *
 * OISes are keyed by a composite of their `title` and `version`.
 * For more information, visit: https://docs.api3.org/ois
 */
export const oisesSchema = z.record(oisSchema);

/**
 * API Provider Metatdata Schema
 *
 * The API provider metadata provides information about an API provider.
 *
 * @name: A UI-suitably formatted name for the provider
 * @active: Whether any of the provider's beacons are active
 * @description: A UI-suitably formatted description of the API provider
 * @homepage: The API provider's homepage
 * @airnode: The API Provider's Airnode address, see: https://docs.api3.org/airnode/latest/reference/packages/admin-cli.html#derive-airnode-address
 * @xpub: The extended public key of the API Provider's Airnode, see: https://docs.api3.org/airnode/latest/reference/packages/admin-cli.html#derive-airnode-xpub
 * @logoPath: The API Provider's web-accessible logo as a URL
 * @orderLogoPath: An alternative logo for the API Provider for light backgrounds
 * @maxSubscriptionPeriod: The maximum period that a requester contract may be allowed to read from the API provider's beacons in months
 */
export const apiMetadataSchema = z
  .object({
    name: z.string(),
    active: z.boolean(),
    description: z.string(),
    homepage: z.string(),
    airnode: evmAddressSchema,
    xpub: evmXpubSchema,
    logoPath: z.string(),
    orderLogoPath: z.string().optional(),
    maxSubscriptionPeriod: z.number(),
  })
  .strict();

/**
 * API Schema
 *
 * Data describing an API provider's on-chain services.
 */
export const apiSchema = z
  .object({
    apiMetadata: apiMetadataSchema,
    beacons: beaconsSchema,
    templates: templatesSchema,
    deployments: deploymentsSchema,
    ois: oisesSchema,
  })
  .strict();

/**
 * Chains Metadata Schema
 *
 * Data describing chains served by operations services
 *
 * @name: The name of the chain as used by `ethers`, eg. 'polygon-mumbai'
 * @fullName: The UI-suitable name of the chain, eg. "Polygon Mumbai Testnet"
 * @decimalPlaces: The number of decimal places to display for the native token (useful for chains with high native token
 *                 values. Defaults to 2 if unspecified.
 * @id: The chainId number of the chain
 * @contracts: Contract addresses deployed on the target chain, keyed by their name
 * @nativeToken: The symbol of the native token of the target chain, eg. "BTC"
 * @logoPath: A URL pointing to the logo for the chain
 * @orderLogoPath: A URL pointing to an alternative logo for the chain, useful for light backgrounds
 * @testnet: Whether the target chain is a testnet
 * @explorerUrl: A base URL pointing to an explorer for the target chain
 */
export const chainsMetadataSchema = z
  .object({
    name: z.string(),
    fullName: z.string(),
    decimalPlaces: z.number(),
    id: z.string(),
    contracts: z.record(z.string()),
    nativeToken: z.string().optional(),
    blockTime: z.number().optional(),
    logoPath: z.string().optional(),
    orderLogoPath: z.string().optional(),
    testnet: z.boolean().optional(),
    explorerUrl: z.string().optional(),
  })
  .strict();

const airseekerDeploymentSetSchema = z
  .object({
    airseeker: z.any(), //TODO commented until we decide on versioning: airseekerConfigSchema,
    secrets: secretsSchema.optional(),
  })
  .strict();

const airseekerDeploymentsSchema = z.record(airseekerDeploymentSetSchema);

//TODO: Flesh out the airseeker schema
export const api3Schema = z
  .object({
    airseeker: airseekerDeploymentsSchema,
  })
  .strict();

export const beaconSetSchema = z.record(z.array(z.string()));

/**
 * Common Logos are logos used for beacons which can have logos associated with them.
 * For example USD/ETH could consist of a USD logo and an ETH logo.
 * There is significant re-use across token pairs, eg. both "USD/ETH" and "USD/BTC" will have the USD logo in common.
 * We'd therefore like to reference these logos separately.
 */
export const commonLogosSchema = z.record(z.string());

/**
 * The explorerSchema contains data needed to render beacons and services to a UI.
 */
export const explorerSchema = z
  .object({
    beaconMetadata: z.record(
      z.object({
        category: z.string(),
        pricingCoverage: z.string(), //TODO must be present in pricingCoverage
        decimalPlaces: z.number().optional(),
        logos: z.array(z.string()).optional(),
      })
    ),
    pricingCoverage: z.record(
      z.array(
        z.object({
          subscriptionFee: z.number(),
          coverage: z.number(),
        })
      )
    ),
    beaconSets: beaconSetSchema,
    commonLogos: commonLogosSchema,
  })
  .strict();

export const chainDeploymentReferencesSchema = z
  .object({
    chainNames: z.record(z.string()),
    contracts: z.record(z.record(z.string())),
  })
  .strict();

export const basePolicySchema = z
  .object({
    paymentTxHash: z.string(),
    claimaintAddress: evmAddressSchema,
    beneficiaryAddress: evmAddressSchema,
    readerAddress: evmAddressSchema,
    coverageAmount: z.string(),
    startDate: z.number(),
    endDate: z.number(),
    ipfsPolicyHash: z.string(),
    ipfsServicePolicyHash: z.string(),
  })
  .strict();

export const dapiPolicySchema = basePolicySchema
  .extend({
    dapiName: z.string(),
  })
  .strict();

export const dataFeedPolicySchema = basePolicySchema
  .extend({
    dataFeedId: evmBeaconIdSchema,
  })
  .strict();

// Chain -> [dapis dataFeeds]
export const policiesSchema = z
  .object({
    dapis: z.record(dapiPolicySchema).optional(),
    dataFeeds: z.record(dataFeedPolicySchema).optional(),
  })
  .strict();

export const operationsRepositorySchema = z
  .object({
    apis: z.record(apiSchema),
    chains: z.record(chainsMetadataSchema),
    api3: api3Schema.optional(),
    dapis: z.record(z.record(z.string())),
    explorer: explorerSchema,
    policies: z.record(policiesSchema).optional(),
  })
  .strict();

export const replaceInterpolatedVariables = (object: any): any => {
  if (object instanceof Array) {
    return object.map(replaceInterpolatedVariables);
  }

  if (object instanceof Object) {
    return Object.fromEntries(Object.entries(object).map(([key, value]) => [key, replaceInterpolatedVariables(value)]));
  }

  // TODO why is this sometimes null. Edit: because of api3 being included when optional and/or unset
  if (!object) {
    return object;
  }

  const stringObject = object.toString().toLowerCase();
  if (stringObject.includes('${') && stringObject.includes('url')) {
    return 'https://blank.url';
  }

  return object;
};

export const validate = (payload: OperationsRepository) => {
  const result = operationsRepositorySchema.safeParse(replaceInterpolatedVariables(payload));
  if (!result.success) {
    return [false, result];
  }

  return [true, undefined];
};
