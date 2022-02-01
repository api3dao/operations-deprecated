import * as path from 'path';
import * as fs from 'fs';
import * as ethers from 'ethers';

function deriveSponsorWalletAddress(xpub: string, protocolId: number, sponsorAddress: string) {
  const hdNodeFromXpub = ethers.utils.HDNode.fromExtendedKey(xpub);
  const sponsorAddressBN = ethers.BigNumber.from(sponsorAddress);
  const paths = [];
  for (let i = 0; i < 6; i++) {
    const shiftedSponsorAddressBN = sponsorAddressBN.shr(31 * i);
    paths.push(shiftedSponsorAddressBN.mask(31).toString());
  }
  const sponsorWalletHdNode = hdNodeFromXpub.derivePath(`${protocolId}/${paths.join('/')}`);
  return sponsorWalletHdNode.address;
}

function main() {
  const api3Metadata = JSON.parse(fs.readFileSync(path.join('data', 'api3Metadata.json'), 'utf8'));
  const apiPath = path.join('data', 'apis');
  const apiNames = fs.readdirSync(apiPath);
  const wallets = apiNames
    .map((apiName) => {
      const apiMetadata = JSON.parse(fs.readFileSync(path.join(apiPath, apiName, 'apiMetadata.json'), 'utf8'));
      const beaconNames = fs.readdirSync(path.join(apiPath, apiName, 'beacons'));
      const beacons = beaconNames.map((beaconName) => {
        const beaconData = JSON.parse(fs.readFileSync(path.join(apiPath, apiName, 'beacons', beaconName), 'utf8'));
        return { ...beaconData, name: path.parse(beaconName).name };
      });
      return beacons
        .map((beacon) => {
          const beaconName = beacon.name;
          return beacon.chains
            .map((beaconChain: any) => {
              const sponsorWallet = {
                beaconName,
                walletType: 'Sponsor wallet',
                // The `protocolId` below will be 1 and not 0 in v0.4
                address: deriveSponsorWalletAddress(apiMetadata.xpub, 0, beaconChain.sponsor),
                thresholdInWei: ethers.utils
                  .parseUnits(
                    beaconChain.sponsorWalletBalanceAlertThreshold.amount.toString(),
                    beaconChain.sponsorWalletBalanceAlertThreshold.units
                  )
                  .toString(),
              };
              const apiProviderAirkeeperSponsorWallet = {
                beaconName,
                walletType: 'API provider-operated Airkeeper sponsor wallet',
                address: deriveSponsorWalletAddress(apiMetadata.xpub, 12345, beaconChain.apiProviderAirkeeperSponsor),
                thresholdInWei: ethers.utils
                  .parseUnits(
                    beaconChain.apiProviderAirkeeperSponsorWalletBalanceAlertThreshold.amount.toString(),
                    beaconChain.apiProviderAirkeeperSponsorWalletBalanceAlertThreshold.units
                  )
                  .toString(),
              };
              const api3AirkeeperSponsorWallet = {
                beaconName,
                walletType: 'API3-operated Airkeeper sponsor wallet',
                address: deriveSponsorWalletAddress(api3Metadata.xpub, 12345, beaconChain.api3AirkeeperSponsor),
                thresholdInWei: ethers.utils
                  .parseUnits(
                    beaconChain.api3AirkeeperSponsorWalletBalanceAlertThreshold.amount.toString(),
                    beaconChain.api3AirkeeperSponsorWalletBalanceAlertThreshold.units
                  )
                  .toString(),
              };
              return [sponsorWallet, apiProviderAirkeeperSponsorWallet, api3AirkeeperSponsorWallet];
            })
            .flat(1);
        })
        .flat(1);
    })
    .flat(1);
  fs.writeFileSync('wallets.json', JSON.stringify(wallets, null, 2));
}

main();
