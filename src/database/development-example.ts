import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const main = async () => {
  const providers = await prisma.provider.findMany();
  console.log(providers);
};

main().catch(console.trace);
