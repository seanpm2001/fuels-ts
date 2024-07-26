import { ErrorCode, FuelError } from '@fuel-ts/errors';
import type { BytesLike } from '@fuel-ts/interfaces';
import { arrayify } from '@fuel-ts/utils';

import { AbiCoder } from './AbiCoder';
import type { ResolvedType } from './ResolvedType';
import type { DecodedValue, InputValue } from './encoding/coders/AbstractCoder';
import { StdStringCoder } from './encoding/coders/StdStringCoder';
import { TupleCoder } from './encoding/coders/TupleCoder';
import type { AbiFunction, JsonAbi, StorageAttr } from './types/JsonAbi';
import type { EncodingVersion } from './utils/constants';
import { optionRegEx } from './utils/constants';
import { getFunctionSelector, getFunctionSignature } from './utils/functionSignatureUtils';
import {
  findFunctionByName,
  findNonEmptyInputs,
  findTypeById,
  getEncodingVersion,
} from './utils/json-abi';

export class FunctionFragment<
  TAbi extends JsonAbi = JsonAbi,
  FnName extends TAbi['functions'][number]['name'] = string,
> {
  readonly signature: string;
  readonly selector: string;
  readonly selectorBytes: Uint8Array;
  readonly encoding: EncodingVersion;
  readonly name: string;
  readonly jsonFn: AbiFunction;
  readonly attributes: AbiFunction['attributes'];

  private readonly jsonAbi: TAbi;

  constructor(
    jsonAbi: TAbi,
    private resolvedTypes: ResolvedType[],
    name: FnName
  ) {
    this.jsonAbi = jsonAbi;
    this.jsonFn = findFunctionByName(this.jsonAbi, name);

    this.name = name;
    this.signature = getFunctionSignature(this.jsonFn, resolvedTypes);

    this.selector = getFunctionSelector(this.signature);
    this.selectorBytes = new StdStringCoder().encode(name);
    this.encoding = getEncodingVersion(jsonAbi.encodingVersion);

    this.attributes = this.jsonFn.attributes ?? [];
  }

  encodeArguments(values: InputValue[]): Uint8Array {
    FunctionFragment.verifyArgsAndInputsAlign(values, this.jsonFn.inputs, this.jsonAbi);

    const shallowCopyValues = values.slice();
    const nonEmptyInputs = findNonEmptyInputs(this.jsonAbi, this.jsonFn.inputs);

    if (Array.isArray(values) && nonEmptyInputs.length !== values.length) {
      shallowCopyValues.length = this.jsonFn.inputs.length;
      shallowCopyValues.fill(undefined as unknown as InputValue, values.length);
    }

    const coders = nonEmptyInputs.map((t) =>
      AbiCoder.getCoder(
        this.resolvedTypes.find((rt) => rt.typeId === t.concreteTypeId) as ResolvedType,
        {
          encoding: this.encoding,
        }
      )
    );

    return new TupleCoder(coders).encode(shallowCopyValues);
  }

  private static verifyArgsAndInputsAlign(
    args: InputValue[],
    inputs: AbiFunction['inputs'],
    abi: JsonAbi
  ) {
    if (args.length === inputs.length) {
      return;
    }

    const inputTypes = inputs.map((input) => findTypeById(abi, input.concreteTypeId));

    const optionalInputs = inputTypes.filter(
      (ct) =>
        ct.type === '()' ||
        optionRegEx.test(
          abi.metadataTypes.find((tm) => tm.metadataTypeId === ct.metadataTypeId)?.type || ''
        )
    );
    if (optionalInputs.length === inputTypes.length) {
      return;
    }
    if (inputTypes.length - optionalInputs.length === args.length) {
      return;
    }

    const errorMsg = `Mismatch between provided arguments and expected ABI inputs. Provided ${
      args.length
    } arguments, but expected ${inputs.length - optionalInputs.length} (excluding ${
      optionalInputs.length
    } optional inputs).`;

    throw new FuelError(ErrorCode.ABI_TYPES_AND_VALUES_MISMATCH, errorMsg);
  }

  decodeArguments(data: BytesLike) {
    const bytes = arrayify(data);
    const nonEmptyInputs = findNonEmptyInputs(this.jsonAbi, this.jsonFn.inputs);

    if (nonEmptyInputs.length === 0) {
      // The VM is current return 0x0000000000000000, but we should treat it as undefined / void
      if (bytes.length === 0) {
        return undefined;
      }

      throw new FuelError(
        ErrorCode.DECODE_ERROR,
        `Types/values length mismatch during decode. ${JSON.stringify({
          count: {
            types: this.jsonFn.inputs.length,
            nonEmptyInputs: nonEmptyInputs.length,
            values: bytes.length,
          },
          value: {
            args: this.jsonFn.inputs,
            nonEmptyInputs,
            values: bytes,
          },
        })}`
      );
    }

    const result = nonEmptyInputs.reduce(
      (obj: { decoded: unknown[]; offset: number }, input) => {
        const coder = AbiCoder.getCoder(
          this.resolvedTypes.find((rt) => rt.typeId === input.concreteTypeId) as ResolvedType,
          {
            encoding: this.encoding,
          }
        );
        const [decodedValue, decodedValueByteSize] = coder.decode(bytes, obj.offset);

        return {
          decoded: [...obj.decoded, decodedValue],
          offset: obj.offset + decodedValueByteSize,
        };
      },
      { decoded: [], offset: 0 }
    );

    return result.decoded;
  }

  decodeOutput(data: BytesLike): [DecodedValue | undefined, number] {
    const outputAbiType = findTypeById(this.jsonAbi, this.jsonFn.output);
    if (outputAbiType.type === '()') {
      return [undefined, 0];
    }

    const bytes = arrayify(data);
    const coder = AbiCoder.getCoder(
      this.resolvedTypes.find((rt) => rt.typeId === this.jsonFn.output) as ResolvedType,
      {
        encoding: this.encoding,
      }
    );

    return coder.decode(bytes, 0) as [DecodedValue | undefined, number];
  }

  /**
   * Checks if the function is read-only i.e. it only reads from storage, does not write to it.
   *
   * @returns True if the function is read-only or pure, false otherwise.
   */
  isReadOnly(): boolean {
    const storageAttribute = this.attributes?.find((attr) => attr.name === 'storage') as
      | StorageAttr
      | undefined;
    return !storageAttribute?.arguments.includes('write');
  }
}
