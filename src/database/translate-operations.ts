// This script loads operations into the database.
// It is not intended to be used long-term; it's just a way of bootstrapping the database.

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
    })) ?? { id: '-1' }
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
 *  market
 *    - [x] beaconMetadata
 *    - [x] beaconsetmetadata
 *    - [x] commonlogos
 *    - [x] dapiMetadata
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
          id,
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
        data: templates.map(({ name, templateId, endpointId, parameters, decodedParameters }) => ({
          name,
          templateId,
          endpointId,
          parameters,
          decodedParameters,
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
                  airSeekerConfig: airseekerConfig,
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
              Object.entries(provider.deployments).flatMap(([key, value]) =>
                Promise.all(
                  Object.entries(value.airnode).flatMap(([appType, nextLevelDown]) =>
                    Promise.all(
                      Object.entries(nextLevelDown)
                        .filter(([_cloudType, airnodeNested]) => airnodeNested?.ois)
                        .flatMap(async ([cloudType, airnodeNestedSource]) => {
                          const airnodeNested = airnodeNestedSource as Config;

                          await Promise.all(
                            airnodeNested.ois.map(async (ois) => {
                              const result = await prisma.oIS.create({
                                data: {
                                  provider: { connect: { name: createdProvider.name } },
                                  title: ois.title,
                                  version: ois.version,
                                  ois: airnodeNested.ois,
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
                            cloudType: cloudType.toUpperCase() as CloudType,
                            providerName: createdProvider.name,
                            config: airnodeNested,
                          };
                        })
                    )
                  )
                )
              )
            )
          )
            .flat(10)
            .map((airnode) =>
              prisma.deployment.create({
                data: { ...airnode, chainApiReference: undefined },
              })
            );
        })
      );
    })
  );

  await Promise.all(
    Object.values(operations.beaconSets).map(async (beaconset) => {
      const chainConfigs = await Promise.all(
        Object.entries(beaconset.chains).map(async ([chainName, chain]) =>
          prisma.chainConfiguration.create({
            data: {
              chain: {
                connect: await getId(chainName),
              },
              active: chain.active,
              sponsor: chain.sponsor,
              topUpWallet: {
                create: chain.topUpWallets.map((wallet) => ({
                  address: wallet.address!,
                  walletType: getDbWalletType(wallet.walletType),
                })),
              },
              airSeekerConfig: chain.airseekerConfig,
            },
            select: { id: true },
          })
        )
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
    Object.entries(operations.dapis).map(([chainName, dapi]) =>
      Promise.all(
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
      )
    )
  );

  await prisma.logo.createMany({
    data: Object.entries(operations.market.commonLogos).map(([name, url]) => ({
      name,
      url,
    })),
  });

  await Promise.all(
    Object.entries(operations.market.pricingCoverage).map(([chainName, coverage]) =>
      prisma.coverage.create({
        data: {
          id: chainName,
          coverageOptions: coverage,
        },
      })
    )
  );

  await Promise.all(
    Object.entries(operations.market.beaconSetMetadata).map(async ([dataFeedId, beaconSetMeta]) =>
      prisma.dataFeedMetadata.create({
        data: {
          id: dataFeedId,
          decimalPlaces: beaconSetMeta.decimalPlaces ?? 2,
          prefix: beaconSetMeta.prefix,
          postfix: beaconSetMeta.postfix,
          logos: {
            create: beaconSetMeta.logos!.map((logo) => ({ logoName: logo })),
          },
          coverage: {
            connect: Object.keys(beaconSetMeta.pricingCoverage).map((coverage) => ({ id: coverage })),
          },
          category: beaconSetMeta.category,
        },
      })
    )
  );

  const beaconMetadataEntries = Object.entries(operations.market.beaconMetadata);

  for (const [id, beaconMetadata] of beaconMetadataEntries) {
    await prisma.dataFeedMetadata.create({
      data: {
        id,
        decimalPlaces: beaconMetadata.decimalPlaces ?? 2,
        prefix: beaconMetadata.prefix,
        postfix: beaconMetadata.postfix,
        logos: {
          create: beaconMetadata.logos!.map((logo) => ({ logoName: logo })),
        },
        coverage: {
          connect: Object.keys(beaconMetadata.pricingCoverage).map((coverage) => ({ id: coverage })),
        },
        category: beaconMetadata.category,
      },
    });
  }

  await Promise.all(
    Object.entries(operations.market.dapiMetadata).map(([id, dapiMetadata]) =>
      prisma.dApiMetadata.create({
        data: {
          id,
          coverage: {
            connect: Object.keys(dapiMetadata.pricingCoverage).map((coverage) => ({ id: coverage })),
          },
        },
      })
    )
  );
};
main().catch(console.trace);
