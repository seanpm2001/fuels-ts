import { StdStringType } from './StdStringType';
import { StructType } from './StructType';

/**
 * @group node
 */
describe('StdStringType.ts', () => {
  test('should properly parse type attributes', () => {
    const stdString = new StdStringType({
      components: undefined,
      typeParamsArgsMap: undefined,
      metadataTypeId: undefined,
      type: StdStringType.swayType,
    });

    const suitableForStdString = StdStringType.isSuitableFor({ type: StdStringType.swayType });
    const suitableForStruct = StdStringType.isSuitableFor({ type: StructType.swayType });

    expect(suitableForStdString).toEqual(true);
    expect(suitableForStruct).toEqual(false);

    expect(stdString.attributes.inputLabel).toEqual('StdString');
    expect(stdString.attributes.outputLabel).toEqual('StdString');
    expect(stdString.requiredFuelsMembersImports).toStrictEqual(['StdString']);
  });
});
