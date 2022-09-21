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
    "beaconId" EVM_BEACON_ID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "templateId" EVM_BEACON_ID NOT NULL,
    "providerName" TEXT NOT NULL,

    CONSTRAINT "Beacon_pkey" PRIMARY KEY ("beaconId")
);

-- CreateTable
CREATE TABLE "Chain" (
    "name" TEXT NOT NULL,

    CONSTRAINT "Chain_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "TopUpWallet" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
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
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "beaconId" EVM_BEACON_ID NOT NULL,
    "chainName" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "sponsor" EVM_ADDRESS NOT NULL,
    "topUpWalletId" UUID NOT NULL,
    "airSeekerConfig" JSONB NOT NULL,

    CONSTRAINT "BeaconChains_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OIS" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "ois" JSONB NOT NULL,

    CONSTRAINT "OIS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Deployment" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "chainApiReference" TEXT NOT NULL,
    "airnodeVersion" TEXT NOT NULL,
    "config" JSONB NOT NULL,
    "oisId" UUID NOT NULL,

    CONSTRAINT "Deployment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Beacon_name_key" ON "Beacon"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Template_name_key" ON "Template"("name");

-- AddForeignKey
ALTER TABLE "Beacon" ADD CONSTRAINT "Beacon_providerName_fkey" FOREIGN KEY ("providerName") REFERENCES "Provider"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Beacon" ADD CONSTRAINT "Beacon_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("templateId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BeaconChains" ADD CONSTRAINT "BeaconChains_beaconId_fkey" FOREIGN KEY ("beaconId") REFERENCES "Beacon"("beaconId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BeaconChains" ADD CONSTRAINT "BeaconChains_chainName_fkey" FOREIGN KEY ("chainName") REFERENCES "Chain"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BeaconChains" ADD CONSTRAINT "BeaconChains_topUpWalletId_fkey" FOREIGN KEY ("topUpWalletId") REFERENCES "TopUpWallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deployment" ADD CONSTRAINT "Deployment_oisId_fkey" FOREIGN KEY ("oisId") REFERENCES "OIS"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
