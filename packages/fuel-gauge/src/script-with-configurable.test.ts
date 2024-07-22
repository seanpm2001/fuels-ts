import { Script } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import { ScriptWithConfigurableAbi } from '../test/typegen';

const defaultValues = {
  FEE: 5,
};

/**
 * @group node
 * @group browser
 */
describe('Script With Configurable', () => {
  it('should returns true when input value matches default configurable constant', async () => {
    using launched = await launchTestNode();

    const {
      wallets: [wallet],
    } = launched;

    const script = new Script(
      ScriptWithConfigurableFactory.bytecode,
      ScriptWithConfigurableAbi.abi,
      wallet
    );

    script.setConfigurableConstants(defaultValues);

    const { waitForResult } = await script.functions.main(defaultValues.FEE).call();
    const { value } = await waitForResult();

    expect(value).toBe(true);
  });

  it('should returns false when input value differs from default configurable constant', async () => {
    using launched = await launchTestNode();

    const {
      wallets: [wallet],
    } = launched;

    const configurableConstants = { FEE: 71 };

    expect(configurableConstants.FEE).not.toEqual(defaultValues.FEE);

    const script = new Script(
      ScriptWithConfigurableFactory.bytecode,
      ScriptWithConfigurableAbi.abi,
      wallet
    );

    script.setConfigurableConstants(defaultValues);

    const { waitForResult } = await script.functions.main(configurableConstants.FEE).call();
    const { value } = await waitForResult();

    expect(value).toBe(false);
  });

  it('should returns true when input value matches manually set configurable constant', async () => {
    using launched = await launchTestNode();

    const {
      wallets: [wallet],
    } = launched;

    const configurableConstants = { FEE: 35 };

    const script = new Script(
      ScriptWithConfigurableFactory.bytecode,
      ScriptWithConfigurableAbi.abi,
      wallet
    );

    script.setConfigurableConstants(configurableConstants);

    const { waitForResult } = await script.functions.main(configurableConstants.FEE).call();
    const { value } = await waitForResult();

    expect(value).toBe(true);
  });

  it('should returns false when input value differs from manually set configurable constant', async () => {
    using launched = await launchTestNode();

    const {
      wallets: [wallet],
    } = launched;

    const configurableConstants = { FEE: 10 };

    const input = { FEE: 15 };

    expect(configurableConstants.FEE).not.toEqual(input.FEE);

    const script = new Script(
      ScriptWithConfigurableFactory.bytecode,
      ScriptWithConfigurableAbi.abi,
      wallet
    );

    script.setConfigurableConstants(configurableConstants);

    const { waitForResult } = await script.functions.main(input.FEE).call();
    const { value } = await waitForResult();

    expect(value).toBe(false);
  });
});
