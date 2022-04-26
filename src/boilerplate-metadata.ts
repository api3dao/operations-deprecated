import { readOperationsRepository } from './utils/read-operations';
import { writeOperationsRepository } from './utils/write-operations';

const main = () => {
  const opsData = readOperationsRepository();
  const metaBeacons = Object.fromEntries(
    Object.values(opsData.apis['api3'].beacons).map((beacon) => {
      return [
        beacon.beaconId,
        {
          category: 'Cryptocurrency',
          pricingCoverage: 'test-pricing-set-one',
        },
      ];
    })
  );

  if (!opsData.explorer) {
    // @ts-ignore
    opsData.explorer = { beaconMetadata: {}, pricingCoverage: {} };
  }
  // @ts-ignore
  opsData.explorer.beaconMetadata = metaBeacons;
  writeOperationsRepository(opsData);
};

main();
