-- Custom constraints
CREATE DOMAIN EVM_ADDRESS AS VARCHAR(42) CHECK(
VALUE ~* '^0x[a-fA-F\d]{40}$'
);
CREATE DOMAIN EVM_BEACON_ID AS VARCHAR(66) CHECK(
VALUE ~* '^0x[a-fA-F\d]{64}$'
);
CREATE DOMAIN EVM_XPUB AS VARCHAR(109) CHECK(
VALUE ~* '^0x[a-fA-F\d]{107}$'
);

-- CreateEnum
CREATE TYPE "WalletType" AS ENUM ('Provider', 'ProviderSponsor', 'API3', 'API3Sponsor');

-- CreateTable
CREATE TABLE "Provider" (
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "description" TEXT NOT NULL,
    "homepage" TEXT NOT NULL,
    "airnodeAddress" EVM_ADDRESS NOT NULL,
    "xpub" EVM_XPUB NOT NULL,
    "logoPath" TEXT NOT NULL,
    "maxSubscriptionPeriod" INTEGER NOT NULL,

    CONSTRAINT "Provider_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Beacon" (
    "beaconId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,

    CONSTRAINT "Beacon_pkey" PRIMARY KEY ("beaconId")
);

-- CreateTable
CREATE TABLE "Chain" (
    "name" TEXT NOT NULL,

    CONSTRAINT "Chain_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "TopUpWallet" (
    "id" UUID NOT NULL,
    "address" EVM_ADDRESS NOT NULL,
    "walletType" "WalletType" NOT NULL,

    CONSTRAINT "TopUpWallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Template" (
    "templateId" EVM_BEACON_ID NOT NULL,
    "name" TEXT NOT NULL,
    "endpointId" EVM_BEACON_ID NOT NULL,
    "parameters" TEXT NOT NULL,

    CONSTRAINT "Template_pkey" PRIMARY KEY ("templateId")
);

-- CreateTable
CREATE TABLE "BeaconChains" (
    "id" UUID NOT NULL,
    "beaconId" EVM_BEACON_ID NOT NULL,
    "chainName" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "sponsor" TEXT NOT NULL,
    "topUpWalletId" UUID NOT NULL,
    "airSeekerConfig" JSONB NOT NULL,

    CONSTRAINT "BeaconChains_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OIS" (
    "id" UUID NOT NULL,
    "ois" JSONB NOT NULL,

    CONSTRAINT "OIS_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Beacon_name_key" ON "Beacon"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Template_name_key" ON "Template"("name");

-- AddForeignKey
ALTER TABLE "BeaconChains" ADD CONSTRAINT "BeaconChains_beaconId_fkey" FOREIGN KEY ("beaconId") REFERENCES "Beacon"("beaconId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BeaconChains" ADD CONSTRAINT "BeaconChains_chainName_fkey" FOREIGN KEY ("chainName") REFERENCES "Chain"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BeaconChains" ADD CONSTRAINT "BeaconChains_topUpWalletId_fkey" FOREIGN KEY ("topUpWalletId") REFERENCES "TopUpWallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
