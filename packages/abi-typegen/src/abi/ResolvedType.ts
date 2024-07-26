/**
 * This file is a copy of the one in abi-coder and will be deleted once the packages merge.
 */
export class ResolvedType {
  constructor(
    public type: string,
    public typeId: string | number,
    public components: { name: string; type: ResolvedType }[] | undefined,
    public typeParamsArgsMap: Array<[number, ResolvedType]> | undefined
  ) {}
}