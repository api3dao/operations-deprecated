import { PrismaClient, CloudType, ApplicationType, WalletType } from '@prisma/client';
import { Config } from '@api3/airnode-validator/dist/cjs/src/config';
import { readOperationsRepository } from '../utils/read-operations';
import * as operationsImport from '../types';

const prisma = new PrismaClient();

export const getId = async (key: string) => {
  return (
    (await prisma.chainInfrastructure.findFirst({
      where: { name: key },
      select: { id: true },
    })) ?? { id: 0 }
  );
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
            create: Object.entries(contracts).map(([name, address]) => ({ name, address })),
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
              id: beaconId,
              providerName: provider.apiMetadata.name,
              chains: { connect: createdChainConfig },
            },
          });

          (
            await Promise.all(
              Object.entries(provider.deployments).flatMap(async ([key, value]) => {
                return await Promise.all(
                  Object.entries(value.airnode).flatMap(async ([appType, next]) => {
                    return await Promise.all(
                      Object.entries(next)
                        .filter(([_cloudType, airnodeNested]) => airnodeNested?.ois)
                        .flatMap(async ([cloudType, airnodeNestedSource]) => {
                          const airnodeNested = airnodeNestedSource as Config;

                          const oisIds = await Promise.all(
                            airnodeNested.ois.map(async (ois) => {
                              const result = await prisma.oIS.create({
                                data: {
                                  provider: { connect: { name: createdProvider.name } },
                                  title: ois.title,
                                  version: ois.version,
                                  ois: JSON.stringify(airnodeNested.ois),
                                },
                                select: { id: true },
                              });
                              return { id: result.id };
                            })
                          );

                          const deployedAt = new Date(
                            parseInt(`20${key.substring(0, 2)}`),
                            parseInt(key.substring(2, 4)) - 1,
                            parseInt(key.substring(4, 6)),
                            parseInt(key.substring(7, 9)),
                            parseInt(key.substring(9, 11))
                          );

                          return {
                            applicationType:
                              appType === 'airnode' ? ApplicationType.Airnode : ApplicationType.Airseeker,
                            appVersion: airnodeNested.nodeSettings.nodeVersion,
                            deployedAt,
                            cloudType: cloudType.toLowerCase() === 'GCP' ? CloudType.GCP : CloudType.AWS,
                            providerName: createdProvider.name,
                            config: JSON.stringify(airnodeNested),
                            deploymentSet: {
                              create: oisIds.map((oisId) => {
                                return { oISId: oisId.id };
                              }),
                            },
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

              return await prisma.deployment.create({
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
          id: beaconset.beaconSetId,
          name: beaconset.name,
          description: beaconset.description,
          beaconIds: { connect: beaconset.beaconIds.map((id) => ({ id })) },
          activeChains: { connect: chainConfigs },
        },
      });
    })
  );

  await Promise.all(
    Object.entries(operations.dapis).map(async ([chainName, dapi]) => {
      await Promise.all(
        Object.entries(dapi).map(async ([name, dataFeedId]) => {
          const beaconExists = await prisma.beacon.findFirst({
            where: { id: dataFeedId },
            select: { id: true },
          });
          const beaconSetExists = await prisma.beaconSet.findFirst({
            where: { id: dataFeedId },
            select: { id: true },
          });

          return await prisma.dApi.create({
            data: {
              beacon: beaconExists ? { connect: { id: dataFeedId } } : undefined,
              beaconSet: beaconSetExists ? { connect: { id: dataFeedId } } : undefined,
              name: name,
              chain: {
                connect: { name: chainName },
              },
            },
          });
        })
      );
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
          id: chainName,
          coverageOptions: JSON.stringify(coverage),
        },
      });
    })
  );

  await Promise.all(
    Object.entries(operations.explorer.beaconSetMetadata).map(async ([dataFeedId, beaconSetMeta]) => {
      await prisma.dataFeedMetadata.create({
        data: {
          id: dataFeedId,
          decimalPlaces: beaconSetMeta.decimalPlaces ?? 2,
          prefix: beaconSetMeta.prefix,
          postfix: beaconSetMeta.postfix,
          logoSet: {
            create: { logos: { connect: beaconSetMeta.logos!.map((logo) => ({ name: logo })) } },
          },
          coverage: {
            connect: Object.keys(beaconSetMeta.pricingCoverage).map((coverage) => ({ id: coverage })),
          },
          category: beaconSetMeta.category,
        },
      });
    })
  );

  await Promise.all(
    Object.entries(operations.explorer.beaconMetadata).map(async ([id, beaconMetadata]) => {
      try {
        await prisma.dataFeedMetadata.create({
          data: {
            id,
            decimalPlaces: beaconMetadata.decimalPlaces ?? 2,
            prefix: beaconMetadata.prefix,
            postfix: beaconMetadata.postfix,
            logoSet: {
              create: { logos: { connect: beaconMetadata.logos!.map((logo) => ({ name: logo })) } },
            },
            coverage: {
              connect: Object.keys(beaconMetadata.pricingCoverage).map((coverage) => ({ id: coverage })),
            },
            category: beaconMetadata.category,
          },
        });
      } catch (e) {
        console.error(e);
        console.error((e as Error).stack);
        console.log(Object.keys(beaconMetadata.pricingCoverage).map((coverage) => ({ chainName: coverage })));
      }
    })
  );
};
main().catch(console.trace);
