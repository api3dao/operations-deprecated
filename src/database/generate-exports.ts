import { PrismaClient, CloudType, ApplicationType, WalletType } from '@prisma/client';
import { airSeekerConfigSchema } from '../validation/validation';

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

  console.log(JSON.stringify(formattedBeacons, null, 2));

  // await Promise.all(
  //   beacons
  //     .filter((beacon) => beacon.provider.active)
  //     .map(async (beacon) => {
  //       console.log(beacon);
  //     })
  // );
};

main().catch(console.trace);
