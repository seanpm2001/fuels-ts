/* eslint-disable @typescript-eslint/no-unused-vars */
import { FUEL_NETWORK_URL, Provider, WalletUnlocked, sleep } from 'fuels';

async function fetchSomeExternalCredentials() {
  return Promise.resolve('credential');
}

function decorateResponseWithCustomLogic(response: Response) {
  return response;
}

/**
 * @group node
 * @group browser
 */
describe('Provider', () => {
  it('base examples', async () => {
    // #region provider-definition
    // #import { Provider, FUEL_NETWORK_URL, WalletUnlocked };

    // Create the provider
    const provider = await Provider.create(FUEL_NETWORK_URL);

    // Querying the blockchain
    const { consensusParameters } = provider.getChain();

    // Create a new wallet
    const wallet = WalletUnlocked.generate({ provider });
    
    // Get the balances of the wallet (this will be empty until we have assets)
    const balances = await wallet.getBalances();
    // []
    // #endregion provider-definition

    expect(provider).toBeDefined();
    expect(provider).toBeInstanceOf(Provider);
    expect(consensusParameters).toBeDefined();
    expect(consensusParameters).toBeInstanceOf(Object);
  });

  test('options: requestMiddleware', async () => {
    // #region options-requestMiddleware
    // synchronous request middleware
    await Provider.create(FUEL_NETWORK_URL, {
      requestMiddleware: (request: RequestInit) => {
        request.credentials = 'omit';

        return request;
      },
    });

    // asynchronous request middleware
    await Provider.create(FUEL_NETWORK_URL, {
      requestMiddleware: async (request: RequestInit) => {
        const credentials = await fetchSomeExternalCredentials();
        request.headers ??= {};
        (request.headers as Record<string, string>).auth = credentials;

        return request;
      },
    });
    // #endregion options-requestMiddleware
  });

  it('options: timeout', async () => {
    // #region options-timeout
    await Provider.create(FUEL_NETWORK_URL, {
      timeout: 30000, // will abort if request takes 30 seconds to complete
    });
    // #endregion options-timeout
  });

  it('options: retryOptions', async () => {
    // #region options-retryOptions
    await Provider.create(FUEL_NETWORK_URL, {
      retryOptions: {
        maxRetries: 5,
        baseDelay: 100,
        backoff: 'linear',
      },
    });
    // #endregion options-retryOptions
  });

  it('options: fetch', async () => {
    // #region options-fetch
    await Provider.create(FUEL_NETWORK_URL, {
      fetch: async (url: string, requestInit: RequestInit | undefined) => {
        // do something
        await sleep(100);

        // native fetch
        const response = await fetch(url, requestInit);

        const updatedResponse = decorateResponseWithCustomLogic(response);

        return updatedResponse;
      },
    });
    // #endregion options-fetch
  });

  it('using operations', async () => {
    // #region operations
    const provider = await Provider.create(FUEL_NETWORK_URL);

    const chain = await provider.operations.getChain();
    const nodeInfo = await provider.operations.getNodeInfo();
    // #endregion operations

    expect(chain).toBeDefined();
    expect(nodeInfo).toBeDefined();
  });
});
