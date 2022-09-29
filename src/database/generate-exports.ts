/* This is largely a demonstration script.
   I've implemented some functionality from the existing export-ops-json-payloads.ts script to demonstrate reading
   from the database. Portions of this script can inform our eventual API.
   "Functional" flows haven't been strictly followed ;)

   - "email! ain't no-one got time for that!"
*/
import fs from 'fs';
import { join } from 'path';
import { PrismaClient } from '@prisma/client';
import { OIS } from '@api3/airnode-validator/dist/cjs/src/ois';
import { airSeekerConfigSchema } from '../validation/validation';
import { writeJsonFile } from '../utils/write-operations';
import { Apis, OperationsRepository, Template } from '../types';

const prisma = new PrismaClient();

// a database-based implementation of https://github.com/api3dao/operations/blob/6aac1424349414b6348f92a910f8dc50fe7808df/src/utils/export-ops-json-payloads.ts
const main = async () => {
  // eslint-disable-next-line functional/immutable-data
  process.env.DATABASE_URL = `postgresql://postgres:password@localhost:5432/postgres?schema=public`;

  // Generate documentation payload
  const beacons = await Promise.all(
    (
      await prisma.beacon.findMany({ include: { provider: true } })
    ).map(async (beacon) => ({
      ...beacon,
      chainConfiguration: await prisma.chainConfiguration.findMany({ where: { beaconId: beacon.id } }),
    }))
  );

  // chains: Record<string, {logoPath?: string | undefined, orderLogoPath?: string | undefined, nativeToken?: string | undefined, blockTime?: number | undefined, testnet?: boolean | undefined, explorerUrl?: string | undefined, ... 4 more ..., contracts: {}}>
  //   src/validation/validation.ts
  const formattedBeacons = beacons.map((beacon) => {
    return {
      beaconId: beacon.id,
      name: beacon.name,
      description: beacon.description,
      templateUrl: `https://github.com/api3dao/operations/blob/main/data/apis/${beacon.provider.name}/templates/${beacon.templateId}.json`,
      chains: Object.fromEntries(
        beacon.chainConfiguration.map((chain) => {
          console.log(chain);
          return [
            chain.chainInfrastructureName,
            {
              airseekerDeviationThreshold: airSeekerConfigSchema.parse(chain.airSeekerConfig).deviationThreshold,
            },
          ];
        })
      ),
    };
  });

  const basePath = join(__dirname, '../../json-exports');
  fs.rmdirSync(basePath, { recursive: true });
  fs.mkdirSync(basePath);

  // This seems to no longer be in use, but this is a great example anyway
  const documentation = {
    beacons: formattedBeacons,
    chains: Object.fromEntries(
      (await prisma.chainInfrastructure.findMany({ include: { contracts: true } })).map((chain) => {
        return [
          chain.name,
          {
            name: chain.name,
            fullName: chain.fullName,
            id: chain.id,
            decimalPlaces: chain.decimalPlaces,
            contracts: chain.contracts.map((contract) => [contract.name, contract.address]),
            nativeToken: chain.nativeToken,
            blockTime: chain.blockTime,
            logoPath: chain.logoPath,
            explorerUrl: chain.explorerUrl,
            testnet: chain.testnet,
          },
        ];
      })
    ),
  };

  writeJsonFile(join(basePath, 'documentation.json'), documentation);

  const templates = Object.fromEntries(
    (await prisma.template.findMany({})).map((template) => [template.templateId, template])
  );
  console.log(templates);

  const templatesBasePath = join(basePath, 'templates');
  fs.mkdirSync(templatesBasePath);

  Object.values(templates).forEach((template) =>
    writeJsonFile(join(templatesBasePath, `${template.templateId}.json`), template)
  );

  // I define the types here up front to help me know if stuff doesn't comply
  const dapis: Record<string, Record<string, string>> = {};
  (await prisma.dApi.findMany()).forEach((dapiRecord) => {
    if (!dapis[dapiRecord.chainInfrastructureName]) {
      // eslint-disable-next-line functional/immutable-data
      dapis[dapiRecord.chainInfrastructureName] = {};
    }

    // eslint-disable-next-line functional/immutable-data
    dapis[dapiRecord.chainInfrastructureName][dapiRecord.name] = dapiRecord.beaconId ?? dapiRecord.beaconSetId ?? '';
  });

  const apis: Apis = {};
  const providers = await prisma.provider.findMany({ include: { beacon: true } });

  for (const provider of providers) {
    const beacons = Object.fromEntries(
      await Promise.all(
        provider.beacon.map(async (beacon) => {
          return [
            beacon.name,
            {
              name: beacon.name,
              description: beacon.description,
              beaconId: beacon.id,
              airnodeAddress: provider.airnodeAddress,
              templateId: beacon.templateId,
              chains: Object.fromEntries(
                (
                  await prisma.chainConfiguration.findMany({
                    include: { topUpWallet: true },
                    where: { beaconId: beacon.id },
                  })
                ).map((chainConfig) => {
                  return [
                    chainConfig.chainInfrastructureName,
                    {
                      active: chainConfig.active,
                      sponsor: chainConfig.sponsor,
                      airseekerConfig: chainConfig.airSeekerConfig,
                      topUpWallets: chainConfig.topUpWallet.map((wallet) => {
                        return {
                          address: wallet.address,
                          walletType: wallet.walletType.replace('-', ''),
                        };
                      }),
                    },
                  ];
                })
              ),
            },
          ];
        })
      )
    );

    const templates = Object.fromEntries(
      (
        await Promise.all(
          provider.beacon.map((beacon) => prisma.template.findFirst({ where: { templateId: beacon.templateId } }))
        )
      )
        .filter((template) => template)
        .map((template) => {
          return [template?.name ?? '', { ...(template as unknown as Template), updatedAt: undefined }];
        })
    );

    const ois = Object.fromEntries(
      (await prisma.oIS.findMany({ where: { providerName: provider.name } })).map((ois) => {
        return [`${ois.title}-${ois.version}`, ois.ois as OIS];
      })
    );

    // eslint-disable-next-line functional/immutable-data
    apis[provider.name] = {
      deployments: {},
      apiMetadata: {
        name: provider.name,
        active: provider.active,
        description: provider.description,
        homepage: provider.homepage,
        airnode: provider.airnodeAddress,
        xpub: provider.xpub,
        logoPath: provider.logoPath,
        maxSubscriptionPeriod: provider.maxSubscriptionPeriod,
      },
      beacons,
      templates,
      ois,
    };
  }

  // The database client returns null rather than undefined, so it needs to be conformed.
  const chains = Object.fromEntries(
    (await prisma.chainInfrastructure.findMany({ include: { contracts: true } })).map((chain) => {
      return [
        chain.name,
        {
          ...chain,
          contracts: {
            DapiServer: chain.contracts.find((contract) => contract.name === 'DapiServer')?.address ?? '',
          },
          id: chain.id.toString(),
          orderLogoPath: chain.orderLogoPath ?? undefined,
          blockTime: chain.blockTime ?? undefined,
          updatedAt: undefined,
        },
      ];
    })
  );

  const operations: Omit<OperationsRepository, 'market' | 'api3' | 'policies' | 'beaconSets'> = {
    dapis,
    apis,
    chains,
  };

  Object.entries(operations).map(([key, value]) => {
    writeJsonFile(join(basePath, `${key}.json`), value);
  });

  console.log(JSON.stringify(operations, null, 2));
};

main().catch(console.trace);
