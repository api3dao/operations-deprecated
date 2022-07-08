import { SuperRefinement, z } from 'zod';
import { deriveEndpointId } from '@api3/airnode-admin';
import { ethers } from 'ethers';
import { Apis, Beacons, Chains, Dapis, Explorer, Oises, Policies, Templates } from '../types';

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

export const validateBeaconSetIds = (beaconSets: Record<string, string[]>, ctx: z.RefinementCtx): void => {
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
  explorer: Explorer;
}> = ({ apis, explorer }, ctx) => {
  Object.values(apis).forEach((api) => {
    Object.values(api.beacons).forEach(({ beaconId, name }) => {
      if (!Object.keys(explorer.beaconMetadata).includes(beaconId)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `beaconId ${beaconId} with name '${name}' is not present in explorer/beaconMetadata`,
          path: ['explorer', 'beaconMetadata', beaconId],
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
 * Checks /explorer/dapiMetadata against /dapis to ensure that we have a reference
 *
 * @param explorer
 * @param dapis
 * @param ctx
 */
export const validateDapiMetadataReferences: SuperRefinement<{
  chains: Chains;
  explorer: Explorer;
  dapis: Dapis;
}> = ({ explorer, dapis }, ctx) => {
  const flatDapis = Object.entries(
    Object.fromEntries(
      Object.values(dapis)
        .map((dapis) => Object.entries(dapis))
        .flat()
    )
  ).flat(0);

  const missingDapis = Object.fromEntries(
    flatDapis
      .filter((fd) => !explorer.dapiMetadata[fd[0]])
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
      `Some beacons are missing from /explorer/dapiMetadata.`,
      `You can find a boilerplate for the missing dapis below.`,
      `Add the following to /explorer/dapiMetadata and customise:`,
    ].join('\n')
  );
  console.log(JSON.stringify(missingDapis, null, 2));
};

export const validateBeaconMetadataReferences: SuperRefinement<{
  apis: Apis;
  chains: Chains;
  explorer: Explorer;
}> = ({ apis, explorer }, ctx) => {
  Object.entries(explorer.beaconMetadata).forEach(([beaconId, beaconMetadata]) => {
    // Check if /data/apis/<apiName>/beacons contains a file with the beaconId

    const beacon = Object.values(apis)
      .flatMap((api) => Object.values(api.beacons))
      .find((beacon) => beacon.beaconId === beaconId);
    if (!beacon) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Referenced beacon ${beaconId} is not defined in /data/apis/<apiName>/beacons`,
        path: ['explorer', 'beaconMetadata'],
      });

      return;
    }

    // Find any missing chains - where the chain is specified in pricingCoverage but not in the beacon itself
    const missingChains = Object.keys(beacon.chains).filter(
      (chain) => !Object.keys(beaconMetadata.pricingCoverage).includes(chain)
    );
    missingChains.forEach((chain) => {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Referenced pricing coverage chain ${chain} is not defined in the target beacon`,
        path: ['explorer', 'beaconMetadata', beaconId, 'pricingCoverage', chain],
      });
    });
  });

  // Check if the beaconId has an associated reference in beaconMetadata

  const beaconMetadataEntries = Object.entries(explorer.beaconMetadata);
  const flatBeacons = Object.values(apis)
    .flatMap((api) => Object.values(api.beacons))
    .map((beacon) => [beacon.beaconId, beacon]);
  const flatBeaconsObject = Object.fromEntries(flatBeacons);

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

  Object.entries(missingBeaconEntries).forEach((missingDapi) => {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Beacon ${missingDapi[0]} ("${
        flatBeaconsObject[missingDapi[0]]
      }") from /apis/*/beacons has no metadata in beaconMetadata`,
      path: ['dapis'],
    });
  });

  if (Object.entries(missingBeaconHelperDefaults).length === 0) {
    return;
  }

  console.log(
    [
      `Some beacons are missing from /explorer/beaconMetadata.`,
      `You can find a boilerplate for the missing metadata below.`,
      `Add the following to /explorer/beaconMetadata and customise:`,
    ].join('\n')
  );
  console.log(JSON.stringify(missingBeaconHelperDefaults, null, 2));
};

export const validateBeaconSetsReferences: SuperRefinement<{
  apis: Apis;
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
