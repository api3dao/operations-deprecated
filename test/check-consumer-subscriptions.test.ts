import { join } from 'path';
import * as evm from '../src/utils/evm';
import { checkAllowedReaders } from '../src/check-allowed-readers';

describe('check-whitelist', () => {
  it('succeeds to check that all consumer payments have been whitelisted to read value on DapiServer contract', async () => {
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
      .mockResolvedValueOnce(true)
      .mockRejectedValueOnce(() => new Error('Unexpected error'))
      .mockResolvedValueOnce(true);
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
      '🛑 Some consumer subscriptions have not been allowed to read data feeds'
    );

    expect(dapiServerSpy).toHaveBeenCalledTimes(1);
    expect(readerCanReadDataFeedSpy).toHaveBeenCalledTimes(3);
  });
});
