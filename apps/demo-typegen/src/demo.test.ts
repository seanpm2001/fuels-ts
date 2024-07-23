// #region Testing-in-ts-ts
import { toHex, Address, Wallet } from 'fuels';
import { launchTestNode, safeExec } from 'fuels/test-utils';

import storageSlots from '../demo-contract/out/release/demo-contract-storage_slots.json';

import { DemoContract, DemoContractFactory } from './contract-types';
import { DemoPredicate } from './predicate-types';
import type { DemoPredicateInputs } from './predicate-types/DemoPredicate';
import { DemoScript } from './script-types';

/**
 * @group node
 * @group browser
 */
describe('ExampleContract', () => {
  it('with imported storage slots', async () => {
    using launched = await launchTestNode();

    const {
      wallets: [wallet],
    } = launched;

    // #region typegen-demo-contract-storage-slots
    // #context import storageSlots from './contract/out/debug/demo-contract-storage_slots.json';

    const { waitForResult } = await DemoContractFactory.deploy(wallet, {
      storageSlots,
    });

    const { contract } = await waitForResult();
    // #endregion typegen-demo-contract-storage-slots

    expect(contract.id).toBeTruthy();
  });
  it('should return the input', async () => {
    using launched = await launchTestNode();

    const {
      wallets: [wallet],
    } = launched;

    // Deploy
    const factory = new DemoContractFactory(wallet);
    const deploy = await factory.deployContract();
    const { contract } = await deploy.waitForResult();
    const contractId = contract.id;

    // Call
    const { waitForResult } = await contract.functions.return_input(1337).call();
    const { value } = await waitForResult();

    // Assert
    expect(value.toHex()).toEqual(toHex(1337));

    // You can also make a call using the factory
    // #region typegen-demo-contract-factory-connect
    // #context import { DemoContractAbi } from './types';

    const contractInstance = new DemoContract(contractId, wallet);
    const call2 = await contractInstance.functions.return_input(1337).call();
    const { value: v2 } = await call2.waitForResult();
    // #endregion typegen-demo-contract-factory-connect
    expect(v2.toHex()).toBe(toHex(1337));
  });

  it('deployContract method', async () => {
    using launched = await launchTestNode();

    const {
      wallets: [wallet],
    } = launched;

    // #region typegen-demo-contract-factory-deploy
    // #context import { DemoContractAbi } from './types';
    // #context

    // Deploy
    const deploy = await DemoContractFactory.deploy(wallet);
    const { contract } = await deploy.waitForResult();

    // #endregion typegen-demo-contract-factory-deploy

    // Call
    const { waitForResult } = await contract.functions.return_input(1337).call();
    const { value } = await waitForResult();

    // Assert
    expect(value.toHex()).toEqual(toHex(1337));
  });
});
// #endregion Testing-in-ts-ts

it('should throw when simulating via contract factory with wallet with no resources', async () => {
  using launched = await launchTestNode();

  const {
    provider,
    wallets: [fundedWallet],
  } = launched;

  const unfundedWallet = Wallet.generate({ provider });

  const factory = new DemoContractFactory(fundedWallet);
  const { waitForResult } = await factory.deployContract();
  const { contract } = await waitForResult();
  const contractInstance = new DemoContract(contract.id, unfundedWallet);

  const { error } = await safeExec(() => contractInstance.functions.return_input(1337).simulate());

  expect((<Error>error).message).toMatch('not enough coins to fit the target');
});

it('should not throw when dry running via contract factory with wallet with no resources', async () => {
  using launched = await launchTestNode();

  const {
    provider,
    wallets: [fundedWallet],
  } = launched;
  const unfundedWallet = Wallet.generate({ provider });

  const factory = new DemoContractFactory(fundedWallet);
  const { waitForResult } = await factory.deployContract();
  const { contract } = await waitForResult();
  const contractInstance = new DemoContract(contract.id, unfundedWallet);

  await expect(contractInstance.functions.return_input(1337).dryRun()).resolves.not.toThrow();
});

test('Example script', async () => {
  using launched = await launchTestNode();

  const {
    wallets: [wallet],
  } = launched;

  // #region typegen-demo-script
  // #context import { ScriptAbi } from './types';

  const script = new DemoScript(wallet);
  const { waitForResult } = await script.functions.main().call();
  const { value } = await waitForResult();
  // #endregion typegen-demo-script
  expect(value).toStrictEqual(10);
});

test('Example predicate', async () => {
  // #region typegen-demo-predicate
  // #context import type { PredicateAbiInputs } from './types';
  // #context import { PredicateAbi } from './types';

  // In this exchange, we are first transferring some coins to the predicate
  using launched = await launchTestNode();

  const {
    provider,
    wallets: [wallet],
  } = launched;

  const receiver = Wallet.fromAddress(Address.fromRandom(), provider);

  const predicateData: DemoPredicateInputs = [];
  const predicate = new DemoPredicate(provider, predicateData);

  const tx = await wallet.transfer(predicate.address, 200_000, provider.getBaseAssetId());
  const { isStatusSuccess } = await tx.wait();

  // Then we are transferring some coins from the predicate to a random address (receiver)
  const tx2 = await predicate.transfer(receiver.address, 50_000, provider.getBaseAssetId());
  await tx2.wait();

  expect((await receiver.getBalance()).toNumber()).toEqual(50_000);
  expect(isStatusSuccess).toBeTruthy();
  // #endregion typegen-demo-predicate
});
