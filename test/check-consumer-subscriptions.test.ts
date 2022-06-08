import { join } from 'path';
import * as evm from '../src/utils/evm';
import { checkAllowedReaders } from '../src/check-allowed-readers';

describe('check-allowed-readers', () => {
  it('succeeds in checking allowed consumer subscriptions on the DapiServer contract', async () => {
    const readerCanReadDataFeedSpy = jest.fn();
    const readerCanReadDataFeedMock = readerCanReadDataFeedSpy.mockImplementation(async () => true);
    const dapiServerSpy = jest.spyOn(evm, 'getDapiServerContract');
    dapiServerSpy.mockImplementation(
      (_dapiServerAddress, _provider) =>
        ({
          readerCanReadDataFeed: readerCanReadDataFeedMock,
        } as any)
    );

    await checkAllowedReaders(join(__dirname, 'fixtures', 'data'));

    expect(dapiServerSpy).toHaveBeenCalledTimes(1);
    expect(readerCanReadDataFeedSpy).toHaveBeenCalledTimes(3);
  });

  it('fails if DapiServer contract call reverts', async () => {
    const readerCanReadDataFeedSpy = jest.fn<Promise<boolean>, []>();
    const readerCanReadDataFeedMock = readerCanReadDataFeedSpy
      .mockRejectedValueOnce(() => new Error('Unexpected error'))
      .mockRejectedValueOnce(() => new Error('Unexpected error'))
      .mockRejectedValueOnce(() => new Error('Unexpected error'));
    const dapiServerSpy = jest.spyOn(evm, 'getDapiServerContract');
    dapiServerSpy.mockImplementation(
      (_dapiServerAddress, _provider) =>
        ({
          readerCanReadDataFeed: readerCanReadDataFeedMock,
        } as any)
    );

    await expect(checkAllowedReaders(join(__dirname, 'fixtures', 'data'))).rejects.toThrow('Unexpected error');

    expect(dapiServerSpy).toHaveBeenCalledTimes(1);
    expect(readerCanReadDataFeedSpy).toHaveBeenCalledTimes(3);
  });

  it('fails if DapiServer contract returns false for a consumer payment', async () => {
    const readerCanReadDataFeedSpy = jest.fn();
    const readerCanReadDataFeedMock = readerCanReadDataFeedSpy
      .mockResolvedValueOnce(true)
      .mockResolvedValueOnce(false)
      .mockResolvedValueOnce(true);
    const dapiServerSpy = jest.spyOn(evm, 'getDapiServerContract');
    dapiServerSpy.mockImplementation(
      (_dapiServerAddress, _provider) =>
        ({
          readerCanReadDataFeed: readerCanReadDataFeedMock,
        } as any)
    );

    await expect(checkAllowedReaders(join(__dirname, 'fixtures', 'data'))).rejects.toThrow(
      '🛑 Address 0x25B246C3bA7B7353e286859FaE8913600b96B719 cannot read data feed 0x33ced632274973f86303f003416dfcb0d0a59aefe7a0f3fef5c42bb890383846 on chain ropsten'
    );

    expect(dapiServerSpy).toHaveBeenCalledTimes(1);
    expect(readerCanReadDataFeedSpy).toHaveBeenCalledTimes(3);
  });
});
