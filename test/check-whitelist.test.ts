import { join } from 'path';
import * as evm from '../src/utils/evm';
import { checkWhitelist } from '../src/check-whitelist';

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

    await checkWhitelist(join(__dirname, 'fixtures', 'data'));

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

    await expect(checkWhitelist(join(__dirname, 'fixtures', 'data'))).rejects.toThrow('Unexpected error');

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

    await expect(checkWhitelist(join(__dirname, 'fixtures', 'data'))).rejects.toThrow(
      '🛑 Some consumers are not whitelisted to read data feeds'
    );

    expect(dapiServerSpy).toHaveBeenCalledTimes(1);
    expect(readerCanReadDataFeedSpy).toHaveBeenCalledTimes(3);
  });
});
