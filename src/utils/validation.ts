import { ethers } from 'ethers';
import { SuperRefinement, z } from 'zod';
// TODO Commented until we decide on versioning for config schema
import { oisSchema /*, configSchema as airnodeConfigSchema*/ } from '@api3/airnode-validator';
import { deriveEndpointId } from '@api3/airnode-admin';
// import { configSchema as airkeeperConfigSchema } from './airkeeper-validation';
// import { configSchema as airseekerConfigSchema } from './airseeker-validation';
import { Api, Beacons, ChainsMetadata, Explorer, Oises, OperationsRepository, Policies, Templates } from '../types';

export const evmAddressSchema = z.string().regex(/^0x[a-fA-F0-9]{40}$/);
export const evmBeaconIdSchema = z.string().regex(/^0x[a-fA-F0-9]{64}$/);
export const evmTemplateIdSchema = z.string().regex(/^0x[a-fA-F0-9]{64}$/);
export const evmEndpointIdSchema = z.string().regex(/^0x[a-fA-F0-9]{64}$/);
export const evmXpubSchema = z.string().regex(/^xpub[a-zA-Z0-9]{107}$/);

export const walletTypeSchema = z.enum(['Provider', 'API3', 'Provider-Sponsor', 'API3-Sponsor']);

export const topUpWalletSchema = z
  .object({
    walletType: walletTypeSchema,
    address: evmAddressSchema.optional(),
  })
  .strict();

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

export const secretsSchema = z.object({ filename: z.string(), content: z.string() });

export const airnodeDeploymentAWSSchema = z.object({
  config: z.any(), // TODO commented until we decide on versioning: airnodeConfigSchema,
  secrets: secretsSchema,
  aws: secretsSchema.optional(),
});

export const airnodeDeploymentGCPSchema = z.object({
  config: z.any(), // TODO commented until we decide on versioning: airnodeConfigSchema,
  secrets: secretsSchema,
  gcp: z.any().optional(),
});

export const airnodeDeploymentSchema = z.object({
  aws: airnodeDeploymentAWSSchema.optional(),
  gcp: airnodeDeploymentGCPSchema.optional(),
});

export const airkeeperDeploymentAWSSchema = z.object({
  config: z.any(), // TODO commented until we decide on versioning: airnodeConfigSchema,
  airkeeper: z.any(),
  secrets: secretsSchema,
  aws: secretsSchema.optional(),
});

export const airkeeperDeploymentSchema = z.object({
  aws: airkeeperDeploymentAWSSchema,
});

export const deploymentSetSchema = z.object({
  airnode: airnodeDeploymentSchema,
  airkeeper: airkeeperDeploymentSchema,
});

export const deploymentsSchema = z.record(deploymentSetSchema);

export const templateDecodedParametersSchema = z.object({
  name: z.string(),
  type: z.string(),
  value: z.string(),
});

export const templateSchema = z
  .object({
    name: z.string(),
    templateId: evmTemplateIdSchema,
    endpointId: evmEndpointIdSchema,
    parameters: z.string(),
    decodedParameters: z.array(templateDecodedParametersSchema),
  })
  .strict();

export const templatesSchema = z.record(templateSchema);

export const oisesSchema = z.record(oisSchema);

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

const validateBeaconsTemplateIdReferences: SuperRefinement<{
  beacons: Beacons;
  templates: Templates;
}> = ({ beacons, templates }, ctx) => {
  Object.entries(beacons).forEach(([beaconName, beacon]) => {
    if (!Object.values(templates).some((template) => template.templateId === beacon.templateId)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Referenced template ${beacon.templateId} is not defined in /templates`,
        path: ['beacons', beaconName],
      });
    }
  });
};

const validateTemplatesEndpointIdReferences: SuperRefinement<{
  templates: Templates;
  ois: Oises;
}> = async ({ templates, ois: oises }, ctx) => {
  const endpointIdPromises = Object.values(oises).flatMap((ois) =>
    ois.endpoints.map((endpoint) => deriveEndpointId(ois.title, endpoint.name))
  );
  const endpointIds = new Set(await Promise.all(endpointIdPromises));
  Object.entries(templates).forEach(([templateName, template]) => {
    if (!endpointIds.has(template.endpointId)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Referenced endpointId ${template.endpointId} is not defined in /ois`,
        path: ['templates', templateName],
      });
    }
  });
};

export const apiSchema = z
  .object({
    apiMetadata: apiMetadataSchema,
    beacons: beaconsSchema,
    templates: templatesSchema,
    deployments: deploymentsSchema,
    ois: oisesSchema,
  })
  .strict()
  .superRefine(validateBeaconsTemplateIdReferences)
  .superRefine(validateTemplatesEndpointIdReferences);

export const chainsMetadataContractsSchema = z.object({
  AirnodeRrp: z.string().optional(),
  RrpBeaconServer: z.string().optional(),
  DapiServer: z.string(),
});

export const chainsMetadataSchema = z
  .object({
    name: z.string(),
    fullName: z.string(),
    decimalPlaces: z.number(),
    id: z.string(),
    contracts: chainsMetadataContractsSchema,
    nativeToken: z.string().optional(),
    blockTime: z.number().optional(),
    logoPath: z.string().optional(),
    orderLogoPath: z.string().optional(),
    testnet: z.boolean().optional(),
    explorerUrl: z.string().optional(),
  })
  .strict();

// Deployment date -> [airkeeper.json, secrets.env]
const airseekerDeploymentSetSchema = z
  .object({
    airseeker: z.any(), //TODO commented until we decide on versioning: airseekerConfigSchema,
    secrets: secretsSchema,
  })
  .strict();

const airseekerDeploymentsSchema = z.record(airseekerDeploymentSetSchema);

//TODO: Flesh out the airseeker schema
export const api3Schema = z
  .object({
    airseeker: airseekerDeploymentsSchema,
  })
  .strict();

const validateBeaconSetIds = (beaconSets: Record<string, string[]>, ctx: z.RefinementCtx): void => {
  Object.entries(beaconSets).forEach(([beaconSetId, beaconIds]) => {
    const derivedBeaconSetId = ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode(['bytes32[]'], [beaconIds]));
    if (beaconSetId !== derivedBeaconSetId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Invalid beaconSetId: ${beaconSetId}`,
      });
    }
  });
};

export const beaconSetsSchema = z.record(z.array(z.string())).superRefine(validateBeaconSetIds);

export const explorerSchema = z
  .object({
    beaconMetadata: z.record(
      z.object({
        category: z.string(),
        pricingCoverage: z.string(), //TODO must be present in pricingCoverage
        decimalPlaces: z.number().optional(),
        logoPath: z.string().optional(),
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
    beaconSets: beaconSetsSchema,
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

const validateApisBeaconsChainReferences: SuperRefinement<{
  apis: Record<string, Api>;
  chains: Record<string, ChainsMetadata>;
}> = ({ apis, chains }, ctx) => {
  Object.entries(apis).map(([apiName, api]) => {
    Object.entries(api.beacons).forEach(([beaconName, beacon]) => {
      Object.keys(beacon.chains).forEach((chainName) => {
        if (!Object.keys(chains).includes(chainName)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Referenced chain ${chainName} is not defined in /data/chains`,
            path: ['apis', apiName, 'beacons', beaconName],
          });
        }
      });
    });
  });
};

const validateBeaconMetadataReferences: SuperRefinement<{
  apis: Record<string, Api>;
  explorer: Explorer;
}> = ({ apis, explorer }, ctx) => {
  Object.keys(explorer.beaconMetadata).forEach((beaconId) => {
    // Check if /data/apis/<apiName>/beacons contains a file with the beaconId
    if (
      !Object.values(apis).some((api) =>
        Object.values(api.beacons).some((beacon) => {
          return beacon.beaconId === beaconId;
        })
      )
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Referenced beacon ${beaconId} is not defined in /data/apis/<apiName>/beacons`,
        path: ['explorer', 'beaconMetadata', beaconId],
      });
    }
  });
};

const validateBeaconSetsReferences: SuperRefinement<{
  apis: Record<string, Api>;
  explorer: Explorer;
}> = ({ apis, explorer }, ctx) => {
  Object.entries(explorer.beaconSets).forEach(([beaconSetId, beaconIds]) => {
    beaconIds.forEach((beaconId) => {
      // Check if /data/apis/<apiName>/beacons contains a file with the beaconId
      if (
        !Object.values(apis).some((api) =>
          Object.values(api.beacons).some((beacon) => {
            return beacon.beaconId === beaconId;
          })
        )
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Referenced beacon ${beaconId} is not defined in /data/apis/<apiName>/beacons`,
          path: ['explorer', 'beaconSets', beaconSetId],
        });
      }
    });
  });
};

const validatePoliciesDatafeedReferences: SuperRefinement<{
  apis: Record<string, Api>;
  dapis: Record<string, Record<string, string>>;
  policies?: Record<string, Policies>;
}> = ({ apis, dapis, policies: policiesByChain }, ctx) => {
  Object.entries(policiesByChain || {}).forEach(([chainName, policiesByType]) => {
    Object.entries(policiesByType || {}).forEach(([policyType, policies]) => {
      Object.entries(policies).forEach(([policyId, policy]) => {
        switch (policyType.toLowerCase()) {
          case 'dapis'.toLowerCase():
            // Check if /data/dapis/{chainName} contains the dapiName
            if (
              !Object.keys(dapis).includes(chainName) ||
              !Object.keys(dapis[chainName]).includes(ethers.utils.parseBytes32String(policy.dapiName))
            ) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `Referenced dAPI ${policy.dapiName} (${ethers.utils.parseBytes32String(
                  policy.dapiName
                )}) is not defined in /data/dapis`,
                path: ['policies', chainName, 'dapis', policyId],
              });
            }
            break;
          case 'dataFeeds'.toLowerCase():
            // Check if /data/apis/<apiName>/beacons contains a file with the beaconId
            if (
              !Object.values(apis).some((api) =>
                Object.values(api.beacons).some((beacon) => {
                  return beacon.beaconId === policy.dataFeedId && Object.keys(beacon.chains).includes(chainName);
                })
              )
            ) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `Referenced beacon ${policy.dataFeedId} is not defined in /data/apis/<apiName>/beacons`,
                path: ['policies', chainName, 'dataFeeds', policyId],
              });
            }
            break;
        }
      });
    });
  });
};

export const operationsRepositorySchema = z
  .object({
    apis: z.record(apiSchema),
    chains: z.record(chainsMetadataSchema),
    api3: api3Schema.optional(),
    dapis: z.record(z.record(z.string())),
    explorer: explorerSchema,
    policies: z.record(policiesSchema).optional(),
  })
  .strict()
  .superRefine(validateApisBeaconsChainReferences)
  .superRefine(validateBeaconMetadataReferences)
  .superRefine(validateBeaconSetsReferences)
  .superRefine(validatePoliciesDatafeedReferences);

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

export const validate = async (payload: OperationsRepository) => {
  const result = await operationsRepositorySchema.safeParseAsync(replaceInterpolatedVariables(payload));
  if (!result.success) {
    return [false, result];
  }

  return [true, undefined];
};
