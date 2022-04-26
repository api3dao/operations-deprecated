import { readOperationsRepository } from './utils/read-operations';
import { writeOperationsRepository } from './utils/write-operations';

const main = () => {
  const opsData = readOperationsRepository();
  const metaBeacons = Object.values(opsData.apis['api3'].beacons).map((beacon) => {
    return [beacon.beaconId, {
      category: 'Cryptocurrency',
      pricingCoverage: 'test-pricing-set-one',
    }];
  });

  // @ts-ignore
  opsData.explorer.pricingCoverage = metaBeacons;
  writeOperationsRepository(opsData);
};

main();