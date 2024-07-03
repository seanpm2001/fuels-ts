import type { Account, Contract, Provider, TransferParams } from 'fuels';
import { Wallet } from 'fuels';
import { ASSET_A, ASSET_B } from 'fuels/test-utils';

import { DocSnippetProjectsEnum } from '../../../test/fixtures/forc-projects';
import { createAndDeployContractFromProject, getTestWallet } from '../../utils';

/**
 * @group node
 */
describe(__filename, () => {
  let contract: Contract;
  let provider: Provider;
  let wallet: Account;
  let baseAssetId: string;

  beforeAll(async () => {
    contract = await createAndDeployContractFromProject(DocSnippetProjectsEnum.ECHO_VALUES);
    provider = contract.provider;
    baseAssetId = provider.getBaseAssetId();
    wallet = await getTestWallet([
      [500_000, baseAssetId],
      [500_000, ASSET_A],
      [500_000, ASSET_B],
    ]);

    contract.account = wallet;
  });

  it('should successfully execute addTransfer for one recipient', async () => {
    // #region add-transfer-1
    const recipient = Wallet.generate({ provider });

    await contract.functions
      .echo_u64(100)
      .addTransfer({
        destination: recipient.address,
        amount: 100,
        assetId: baseAssetId,
      })
      .call();
    // #endregion add-transfer-1

    const recipientBalance = await recipient.getBalance(baseAssetId);

    expect(recipientBalance.toNumber()).toBe(100);
  });

  it('should successfully execute multiple addTransfer for multiple recipients', async () => {
    // #region add-transfer-2
    const recipient1 = Wallet.generate({ provider });
    const recipient2 = Wallet.generate({ provider });

    const transferParams: TransferParams[] = [
      { destination: recipient1.address, amount: 100, assetId: baseAssetId },
      { destination: recipient1.address, amount: 400, assetId: ASSET_A },
      { destination: recipient2.address, amount: 300, assetId: ASSET_B },
    ];

    await contract.functions.echo_u64(100).addBatchTransfer(transferParams).call();
    // #endregion add-transfer-2

    const recipient1BalanceBaseAsset = await recipient1.getBalance(baseAssetId);
    const recipient1BalanceAssetA = await recipient1.getBalance(ASSET_A);

    const recipient2BalanceAssetB = await recipient2.getBalance(ASSET_B);

    expect(recipient1BalanceBaseAsset.toNumber()).toBe(100);
    expect(recipient1BalanceAssetA.toNumber()).toBe(400);
    expect(recipient2BalanceAssetB.toNumber()).toBe(300);
  });
});
