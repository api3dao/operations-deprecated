import { SuperRefinement, z } from 'zod';
import { deriveEndpointId } from '@api3/airnode-admin';
import { ethers } from 'ethers';
import { Apis, Beacons, BeaconSets, Chains, Dapis, Market, Oises, Policies, Templates } from '../types';

export const validateTemplatesEndpointIdReferences: SuperRefinement<{
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

export const validateBeaconSetIds = (beaconSets: BeaconSets, ctx: z.RefinementCtx): void => {
  Object.entries(beaconSets).forEach(([beaconSetName, beaconSet]) => {
    const derivedBeaconSetId = ethers.utils.keccak256(
      ethers.utils.defaultAbiCoder.encode(['bytes32[]'], [beaconSet.beaconIds])
    );
    if (beaconSet.beaconSetId !== derivedBeaconSetId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Invalid beaconSetId: ${beaconSet.beaconSetId}`,
        path: [beaconSetName],
      });
    }
  });
};

export const validateApisBeaconsChainReferences: SuperRefinement<{
  apis: Apis;
  chains: Chains;
}> = ({ apis, chains }, ctx) => {
  Object.entries(apis).forEach(([apiName, api]) => {
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

export const validateBeaconIdAgainstBeaconMetadataReferences: SuperRefinement<{
  apis: Apis;
  market: Market;
}> = ({ apis, market }, ctx) => {
  Object.values(apis).forEach((api) => {
    Object.values(api.beacons).forEach(({ beaconId, name }) => {
      if (!Object.keys(market.beaconMetadata).includes(beaconId)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `beaconId ${beaconId} with name '${name}' is not present in market/beaconMetadata`,
          path: ['market', 'beaconMetadata', beaconId],
        });
      }
    });
  });
};

export const validateDapisChainReferences: SuperRefinement<{
  dapis: Dapis;
  chains: Chains;
}> = ({ dapis, chains }, ctx) => {
  Object.keys(dapis).forEach((chainName) => {
    if (!Object.keys(chains).includes(chainName)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Referenced chain ${chainName} is not defined in /data/chains`,
        path: ['dapis'],
      });
    }
  });
};

// TODO
// Validate that referenced pricingCoverage is found
// Validate that referenced logos are found in commonLogos and retrievable

/**
 * Checks /market/dapiMetadata against /dapis to ensure that we have a reference
 *
 * @param market
 * @param dapis
 * @param ctx
 */
export const validateDapiMetadataReferences: SuperRefinement<{
  chains: Chains;
  market: Market;
  dapis: Dapis;
}> = ({ market, dapis }, ctx) => {
  const flatDapis = Object.entries(
    Object.fromEntries(
      Object.values(dapis)
        .map((dapis) => Object.entries(dapis))
        .flat()
    )
  ).flat(0);

  const missingDapis = Object.fromEntries(
    flatDapis
      .filter((fd) => !market.dapiMetadata[fd[0]])
      .map((dapi) => [
        dapi[0],
        {
          pricingCoverage: {
            polygon: 'polygon',
            'polygon-testnet': 'test-pricing-set-free',
            rsk: 'rsk',
            avalanche: 'avalanche',
            'avalanche-testnet': 'test-pricing-set-free',
            bsc: 'bsc',
          },
        },
      ])
  );

  const missingDapisArray = Object.entries(missingDapis);
  missingDapisArray.forEach((missingDapi) => {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `dAPI ${missingDapi[0]} from /dapis has no metadata in dapiMetadata`,
      path: ['dapis'],
    });
  });

  if (missingDapisArray.length === 0) {
    return;
  }

  console.log(
    [
      `Some beacons are missing from /market/dapiMetadata.`,
      `You can find a boilerplate for the missing dapis below.`,
      `Add the following to /market/dapiMetadata and customise:`,
    ].join('\n')
  );
  console.log(JSON.stringify(missingDapis, null, 2));
};

/**
 * Check for the presence of referenced common logos
 * @param market
 * @param ctx
 */
export const validateCommonLogosReferences: SuperRefinement<{
  market: Market;
}> = ({ market }, ctx) => {
  const { commonLogos, beaconMetadata } = market;
  Object.entries(beaconMetadata).forEach(([key, value]) => {
    value.logos?.forEach((logo) => {
      if (!commonLogos[logo]) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Referenced logo ${logo} in ${key} from beaconMetadata is not defined in commonLogos`,
          path: ['market', 'beaconMetadata'],
        });
      }
    });
  });
};

export const validateBeaconMetadataReferences: SuperRefinement<{
  apis: Apis;
  chains: Chains;
  market: Market;
}> = ({ apis, market }, ctx) => {
  Object.entries(market.beaconMetadata).forEach(([beaconId, beaconMetadata]) => {
    // Check if /data/apis/<apiName>/beacons contains a file with the beaconId

    const beacon = Object.values(apis)
      .flatMap((api) => Object.values(api.beacons))
      .find((beacon) => beacon.beaconId === beaconId);
    if (!beacon) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Referenced beacon ${beaconId} is not defined in /data/apis/<apiName>/beacons`,
        path: ['market', 'beaconMetadata'],
      });

      return;
    }

    // Find any missing chains - where the chain is specified in pricingCoverage but not in the beacon itself
    const missingChains = Object.keys(beaconMetadata.pricingCoverage).filter(
      (chain) => !Object.keys(beacon.chains).includes(chain)
    );
    missingChains.forEach((chain) => {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Referenced pricing coverage chain ${chain} is not defined in the target beacon`,
        path: ['market', 'beaconMetadata', beaconId, 'pricingCoverage', chain],
      });
    });
  });

  // Check if the beaconId has an associated reference in beaconMetadata

  const beaconMetadataEntries = Object.entries(market.beaconMetadata);
  const flatBeacons = Object.values(apis)
    .flatMap((api) => Object.values(api.beacons))
    .map((beacon) => [beacon.beaconId, beacon]);

  const missingBeaconEntries = Object.fromEntries(
    flatBeacons.filter((beacon) => !beaconMetadataEntries.find((beaconMetdata) => beaconMetdata[0] === beacon[0]))
  );

  const missingBeaconHelperDefaults = Object.fromEntries(
    Object.entries(missingBeaconEntries).map((beacon) => [
      beacon[0],
      {
        pricingCoverage: {
          polygon: 'polygon',
          'polygon-testnet': 'test-pricing-set-free',
          rsk: 'rsk',
          avalanche: 'avalanche',
          'avalanche-testnet': 'test-pricing-set-free',
          bsc: 'bsc',
        },
        decimalPlaces: 4,
        prefix: '$',
      },
    ])
  );

  Object.entries(missingBeaconEntries).forEach((missingBeacon) => {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Beacon ${missingBeacon[0]} from /apis/*/beacons has no metadata in beaconMetadata`,
      path: ['apis'],
    });
  });

  if (Object.entries(missingBeaconHelperDefaults).length === 0) {
    return;
  }

  console.log(
    [
      `Some beacons are missing from /market/beaconMetadata.`,
      `You can find a boilerplate for the missing metadata below.`,
      `Add the following to /market/beaconMetadata and customise:`,
    ].join('\n')
  );
  console.log(JSON.stringify(missingBeaconHelperDefaults, null, 2));
};

export const validateBeaconSetMetadataReferences: SuperRefinement<{
  beaconSets: BeaconSets;
  market: Market;
}> = ({ beaconSets, market }, ctx) => {
  Object.entries(market.beaconSetMetadata).forEach(([beaconSetId, beaconSetMetadata]) => {
    // Check if /data/beaconSets contains a file with the beaconSetId

    const beaconSet = Object.values(beaconSets).find((beaconSet) => beaconSet.beaconSetId === beaconSetId);
    if (!beaconSet) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Referenced beaconSet ${beaconSetId} is not defined in /data/beaconSets`,
        path: ['market', 'beaconSetMetadata'],
      });

      return;
    }

    // Find any missing chains - where the chain is specified in pricingCoverage but not in the beaconSet itself
    const missingChains = Object.keys(beaconSetMetadata.pricingCoverage).filter(
      (chain) => !Object.keys(beaconSet.chains).includes(chain)
    );
    missingChains.forEach((chain) => {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Referenced pricing coverage chain ${chain} is not defined in the target beaconSet`,
        path: ['market', 'beaconSetMetadata', beaconSetId, 'pricingCoverage', chain],
      });
    });
  });

  // Check if the beaconSetId has an associated reference in beaconSetMetadata

  const beaconSetMetadataEntries = Object.entries(market.beaconSetMetadata);
  const flatBeaconSets = Object.values(beaconSets).map((beaconSet) => [beaconSet.beaconSetId, beaconSet]);

  const missingBeaconSetEntries = Object.fromEntries(
    flatBeaconSets.filter(
      (beaconSet) => !beaconSetMetadataEntries.find((beaconSetMetadata) => beaconSetMetadata[0] === beaconSet[0])
    )
  );

  const missingBeaconSetHelperDefaults = Object.fromEntries(
    Object.entries(missingBeaconSetEntries).map((beaconSet) => [
      beaconSet[0],
      {
        category: 'Cryptocurrency',
        pricingCoverage: {
          avalanche: 'avalanche',
          'avalanche-testnet': 'test-pricing-set-free',
          bsc: 'bsc',
          polygon: 'polygon',
          'polygon-testnet': 'test-pricing-set-free',
          rsk: 'rsk',
        },
        logos: ['ETH', 'USD'],
        decimalPlaces: 2,
        prefix: '$',
      },
    ])
  );

  Object.entries(missingBeaconSetEntries).forEach((missingBeaconSet) => {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `BeaconSet ${missingBeaconSet[0]} from /beaconSets has no metadata in beaconSetMetadata`,
      path: ['beaconSets'],
    });
  });

  if (Object.entries(missingBeaconSetHelperDefaults).length === 0) {
    return;
  }

  console.log(
    [
      `Some beaconSets are missing from /market/beaconSetMetadata.`,
      `You can find a boilerplate for the missing metadata below.`,
      `Add the following to /market/beaconSetMetadata and customise:`,
    ].join('\n')
  );
  console.log(JSON.stringify(missingBeaconSetHelperDefaults, null, 2));
};

export const validatePoliciesDatafeedReferences: SuperRefinement<{
  apis: Apis;
  dapis: Dapis;
  policies?: Record<string, Policies>;
}> = ({ apis, dapis, policies: policiesByChain }, ctx) => {
  Object.entries(policiesByChain || {}).forEach(([chainName, policiesByType]) => {
    Object.entries(policiesByType || {}).forEach(([policyType, policies]) => {
      Object.entries(policies).forEach(([policyId, policy]) => {
        switch (policyType.toLowerCase()) {
          case 'dapis'.toLowerCase():
            // Check if /data/dapis/{chainName} contains the dapiName
            if (!Object.keys(dapis).includes(chainName) || !Object.keys(dapis[chainName]).includes(policy.dapiName)) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `Referenced dAPI ${policy.dapiName} (${policy.dapiName}) is not defined in /data/dapis`,
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

export const validateBeaconsTemplateIdReferences: SuperRefinement<{
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

export const validateBeaconSetsBeaconIdReferences: SuperRefinement<{
  beaconSets: BeaconSets;
  apis: Apis;
}> = ({ beaconSets, apis }, ctx) => {
  Object.entries(beaconSets).forEach(([beaconSetName, beaconSet]) => {
    beaconSet.beaconIds.forEach((beaconId) => {
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
          path: ['beaconSets', beaconSetName],
        });
      }
    });
  });
};
