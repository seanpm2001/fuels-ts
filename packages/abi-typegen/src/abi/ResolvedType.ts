/**
 * This file is a copy of the one in abi-coder and will be deleted once the packages merge.
 */
import type { ResolvedComponent } from './ResolvableType';

export class ResolvedType {
  constructor(
    public type: string,
    public typeId: string | number,
    public components: ResolvedComponent[] | undefined,
    public typeParamsArgsMap: Array<[number, ResolvedType]> | undefined
  ) {}
}
