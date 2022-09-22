import { PrismaClient } from '@prisma/client';
import { readOperationsRepository } from '../utils/read-operations';

const main = async () => {
  // eslint-disable-next-line functional/immutable-data
  process.env.DATABASE_URL = `postgresql://postgres:password@localhost:5432/postgres?schema=public`;
  const operations = readOperationsRepository();
  const prisma = new PrismaClient();

  console.log(`Importing ChainInfrastructure...`);
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
  });

  console.log(`Importing API Provider Metadata...`);
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
  });

  console.log(`Importing Templates...`);
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
  });

  // Object.entries(operations.chains).forEach(([key, value]) => {
  //
  // });
};

main().catch(console.trace);
