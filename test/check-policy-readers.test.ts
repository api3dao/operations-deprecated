import { join } from 'path';
import * as evm from '../src/utils/evm';
import { checkPolicyReaders } from '../src/inspect/check-policy-readers';

describe('check-allowed-readers', () => {
  it('succeeds if all reader addresses are allowed to read from DapiServer', async () => {
    const readerCanReadDataFeedSpy = jest.fn();
    const readerCanReadDataFeedMock = readerCanReadDataFeedSpy.mockImplementation(async () => true);
    const dapiServerSpy = jest.spyOn(evm, 'getDapiServerContract');
    dapiServerSpy.mockImplementation(
      (_dapiServerAddress, _provider) =>
        ({
          readerCanReadDataFeed: readerCanReadDataFeedMock,
        } as any)
    );

    await checkPolicyReaders(join(__dirname, 'fixtures', 'data'));

    expect(dapiServerSpy).toHaveBeenCalledTimes(1);
    expect(readerCanReadDataFeedSpy).toHaveBeenCalledTimes(2);
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

    await expect(checkPolicyReaders(join(__dirname, 'fixtures', 'data'))).rejects.toThrow(
      'Some errors occurred while checking policy readers or they are not allowed to read data feeds'
    );

    expect(dapiServerSpy).toHaveBeenCalledTimes(1);
    expect(readerCanReadDataFeedSpy).toHaveBeenCalledTimes(2);
  });

  it('fails if DapiServer contract returns false for a reader', async () => {
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

    await expect(checkPolicyReaders(join(__dirname, 'fixtures', 'data'))).rejects.toThrow(
      'Some errors occurred while checking policy readers or they are not allowed to read data feeds'
    );

    expect(dapiServerSpy).toHaveBeenCalledTimes(1);
    expect(readerCanReadDataFeedSpy).toHaveBeenCalledTimes(2);
  });
});
