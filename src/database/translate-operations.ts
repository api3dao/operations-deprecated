import { PrismaClient } from '@prisma/client';
import { readOperationsRepository } from '../utils/read-operations';

const prisma = new PrismaClient();

export const getId = async (key: string) => {
  const result = (await prisma.chainInfrastructure.findFirst({
    where: { name: key },
    select: { id: true },
  })) ?? { id: 0 };
  console.log('Query for', key, result);
  return result;
};

const main = async () => {
  // eslint-disable-next-line functional/immutable-data
  process.env.DATABASE_URL = `postgresql://postgres:password@localhost:5432/postgres?schema=public`;
  const operations = readOperationsRepository();

  console.log(`Importing ChainInfrastructure...`);
  await Promise.all(
    Object.values(operations.chains).map(async (chain) => {
      const {
        name,
        fullName,
        decimalPlaces,
        id,
        contracts,
        nativeToken,
        blockTime,
        logoPath,
        explorerUrl,
        orderLogoPath,
        testnet,
      } = chain;

      await prisma.chainInfrastructure.create({
        data: {
          name,
          fullName,
          decimalPlaces,
          id: parseInt(id),
          contracts: {
            create: Object.entries(contracts).map(([key, value]) => {
              return { name: key, address: value };
            }),
          },
          nativeToken: nativeToken!,
          blockTime: blockTime!,
          logoPath: logoPath!,
          explorerUrl: explorerUrl!,
          orderLogoPath: orderLogoPath!,
          testnet: !!testnet,
        },
      });
    })
  );

  console.log(`Importing API Provider Metadata...`);
  await Promise.all(
    Object.values(operations.apis).map(async (provider) => {
      const { name, airnode, description, homepage, logoPath, orderLogoPath, xpub, maxSubscriptionPeriod, active } =
        provider.apiMetadata;

      await prisma.provider.create({
        data: {
          name,
          airnodeAddress: airnode,
          description,
          homepage,
          logoPath,
          orderLogoPath,
          xpub,
          maxSubscriptionPeriod,
          active,
        },
      });
    })
  );

  console.log(`Importing Templates...`);
  await Promise.all(
    Object.values(operations.apis).map(async (provider) => {
      const templates = Object.values(provider.templates);

      await prisma.template.createMany({
        data: templates.map(({ name, templateId, endpointId, parameters }) => ({
          name,
          templateId,
          endpointId,
          parameters,
        })),
      });
    })
  );

  // Prisma doesn't support createMany with nested createMany, so...
  await Promise.all(
    Object.values(operations.apis).map(async (provider) => {
      const beacons = Object.values(provider.beacons);

      await Promise.all(
        Object.entries(beacons).map(async ([_key, value]) => {
          const { name, templateId, description, chains, beaconId } = value;

          const createdChainConfig = await Promise.all(
            Object.entries(chains).map(async ([key, chain]) => {
              const { active, sponsor, topUpWallets, airseekerConfig } = chain;

              const topUpWalletResults = await Promise.all(
                topUpWallets
                  .filter((wallet) => wallet.address)
                  .map(async (wallet) => {
                    const { address, walletType } = wallet;

                    const dbWalletType = (() => {
                      switch (walletType) {
                        case 'Provider-Sponsor':
                          return 'ProviderSponsor';
                        case 'API3-Sponsor':
                          return 'API3Sponsor';
                        default:
                          return walletType;
                      }
                    })();

                    return prisma.topUpWallet.create({
                      data: { address: address!, walletType: dbWalletType },
                      select: { id: true },
                    });
                  })
              );

              return prisma.chainConfiguration.create({
                data: {
                  chain: {
                    connect: await getId(key),
                  },
                  active,
                  sponsor,
                  topUpWallet: { connect: topUpWalletResults },
                  airSeekerConfig: JSON.stringify(airseekerConfig),
                },
                select: { id: true },
              });
            })
          );

          await prisma.beacon.create({
            data: {
              name,
              templateId,
              description,
              beaconId,
              providerName: provider.apiMetadata.name,
              chains: { connect: createdChainConfig },
            },
          });
        })
      );
    })
  );
};

main().catch(console.trace);
