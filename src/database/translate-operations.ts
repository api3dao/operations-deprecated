import { PrismaClient, CloudType, ApplicationType, WalletType } from '@prisma/client';
import { readOperationsRepository } from '../utils/read-operations';
import * as operationsImport from '../types';

const prisma = new PrismaClient();

export const getId = async (key: string) => {
  const result = (await prisma.chainInfrastructure.findFirst({
    where: { name: key },
    select: { id: true },
  })) ?? { id: 0 };
  console.log('Query for', key, result);
  return result;
};

/*
 * TODO vs Done
 *  [x] apis
 *   - [x] beacons
 *   - [x] deployments
 *   - [x] ois
 *   - [x] templates
 *  [x] beaconsets
 *  [x] chains
 *  [x] dapis
 *  explorer
 *    - [x] beaconMetadata
 *    - [x] beaconsetmetadata
 *    - [x] commonlogos
 *    - [!] dapiMetadata - requires reworking
 *    - [x] pricingCoverage
 *   ~policies~ deferring for now as probably not required
 *
 */

const main = async () => {
  const getDbWalletType = (walletType: operationsImport.WalletType) => {
    switch (walletType) {
      case 'Provider-Sponsor':
        return WalletType.ProviderSponsor;
      case 'API3-Sponsor':
        return WalletType.API3Sponsor;
      case 'API3':
        return WalletType.API3;
      case 'Provider':
        return WalletType.Provider;
    }
  };

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

  // Prisma doesn't support createMany with nested createMany, so...
  await Promise.all(
    Object.values(operations.apis).map(async (provider) => {
      const { name, airnode, description, homepage, logoPath, orderLogoPath, xpub, maxSubscriptionPeriod, active } =
        provider.apiMetadata;

      const createdProvider = await prisma.provider.create({
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
        select: { name: true },
      });

      const templates = Object.values(provider.templates);
      await prisma.template.createMany({
        data: templates.map(({ name, templateId, endpointId, parameters }) => ({
          name,
          templateId,
          endpointId,
          parameters,
        })),
      });

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

                    return prisma.topUpWallet.create({
                      data: { address: address!, walletType: getDbWalletType(walletType) },
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

          await prisma.oIS.createMany({
            data: Object.entries(provider.ois).map(([name, ois]) => {
              return {
                name,
                ois: JSON.stringify(ois),
                version: ois.version,
                providerName: createdProvider.name,
              };
            }),
          });

          (
            await Promise.all(
              Object.entries(provider.deployments).flatMap(async ([key, value]) => {
                return await Promise.all(
                  Object.entries(value.airnode).flatMap(async ([appType, next]) => {
                    return await Promise.all(
                      Object.entries(next).flatMap(async ([cloudType, airnodeNested]) => {
                        const deployedAt = new Date(
                          parseInt(`20${key.substring(0, 2)}`),
                          parseInt(key.substring(2, 4)) - 1,
                          parseInt(key.substring(4, 6)),
                          parseInt(key.substring(7, 9)),
                          parseInt(key.substring(9, 11))
                        );

                        return {
                          applicationType: appType === 'airnode' ? ApplicationType.Airnode : ApplicationType.Airseeker,
                          airnodeVersion: airnodeNested.airnodeVersion,
                          deployedAt,
                          cloudType: cloudType.toLowerCase() === 'GCP' ? CloudType.GCP : CloudType.AWS,
                          providerName: createdProvider.name,
                          config: JSON.stringify(airnodeNested.config),
                          oisId: (
                            await prisma.oIS.create({
                              data: airnodeNested.config.ois,
                              select: { id: true },
                            })
                          ).id,
                        };
                      })
                    );
                  })
                );
              })
            )
          )
            .flat(10)
            .map(async (airnode) => {
              const insertable = { ...airnode, chainApiReference: undefined };

              await prisma.deployment.create({
                data: insertable,
              });
            });
        })
      );
    })
  );

  await Promise.all(
    Object.values(operations.beaconSets).map(async (beaconset) => {
      const chainConfigs = await Promise.all(
        Object.entries(beaconset.chains).map(async ([chainName, chain]) => {
          return prisma.chainConfiguration.create({
            data: {
              chain: {
                connect: (await prisma.chainInfrastructure.findFirst({
                  where: { name: chainName },
                  select: { name: true },
                }))!,
              },
              active: chain.active,
              sponsor: chain.sponsor,
              topUpWallet: {
                create: chain.topUpWallets.map((wallet) => ({
                  address: wallet.address!,
                  walletType: getDbWalletType(wallet.walletType),
                })),
              },
              airSeekerConfig: JSON.stringify(chain.airseekerConfig),
            },
            select: { id: true },
          });
        })
      );

      await prisma.beaconSet.create({
        data: {
          dataFeedId: beaconset.beaconSetId,
          name: beaconset.name,
          description: beaconset.description,
          beaconIds: { connect: beaconset.beaconIds.map((beaconsetId) => ({ beaconId: beaconsetId })) },
          activeChains: { connect: chainConfigs },
        },
      });
    })
  );

  await Promise.all(
    Object.entries(operations.dapis).map(async ([chainName, dapi]) => {
      await prisma.dApi.create({
        data: {
          dataFeedId: { connect: { dataFeedId: dapi.dataFeedId } },
          name: dapi.name,
          chain: {
            connect: (await prisma.chainInfrastructure.findFirst({
              where: { name: chainName },
              select: { id: true },
            }))!,
          },
        },
      });
    })
  );

  await prisma.logo.createMany({
    data: Object.entries(operations.explorer.commonLogos).map(([name, url]) => ({
      name,
      url,
    })),
  });

  await Promise.all(
    Object.entries(operations.explorer.pricingCoverage).map(async ([chainName, coverage]) => {
      await prisma.coverage.create({
        data: {
          chainName,
          coverageOptions: JSON.stringify(coverage),
        },
      });
    })
  );

  await Promise.all(
    Object.entries(operations.explorer.beaconSetMetadata).map(async ([dataFeedId, beaconSetMeta]) => {
      await prisma.beaconMetadata.create({
        data: {
          beaconId: dataFeedId,
          decimalPlaces: beaconSetMeta.decimalPlaces ?? 2,
          prefix: beaconSetMeta.prefix,
          postfix: beaconSetMeta.postfix,
          logos: {
            connect: beaconSetMeta.logos!.map((logo) => ({ name: logo })),
          },
          coverage: {
            connect: await Promise.all(
              Object.values(beaconSetMeta.pricingCoverage).map(async (pc) => {
                return (await prisma.coverage.findUnique({ where: { chainName: pc }, select: { chainName: true } }))!;
              })
            ),
          },
          category: {
            connectOrCreate: { where: { name: beaconSetMeta.category }, create: { name: beaconSetMeta.category } },
          },
        },
      });
    })
  );

  await Promise.all(
    Object.entries(operations.explorer.beaconMetadata).map(async ([beaconId, beaconMetadata]) => {
      await prisma.beaconMetadata.create({
        data: {
          beaconId,
          decimalPlaces: beaconMetadata.decimalPlaces ?? 2,
          prefix: beaconMetadata.prefix,
          postfix: beaconMetadata.postfix,
          logos: {
            connect: beaconMetadata.logos!.map((logo) => ({ name: logo })),
          },
          coverage: {
            connect: await Promise.all(
              Object.values(beaconMetadata.pricingCoverage).map(async (pc) => {
                return (await prisma.coverage.findUnique({ where: { chainName: pc }, select: { chainName: true } }))!;
              })
            ),
          },
          category: {
            connectOrCreate: { where: { name: beaconMetadata.category }, create: { name: beaconMetadata.category } },
          },
        },
      });
    })
  );
};

main().catch(console.trace);
