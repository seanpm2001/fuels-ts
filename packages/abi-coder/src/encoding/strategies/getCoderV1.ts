import { ErrorCode, FuelError } from '@fuel-ts/errors';

import type { ResolvedType } from '../../ResolvedType';
import type { EncodingOptions } from '../../types/EncodingOptions';
import type { GetCoderFn } from '../../types/GetCoder';
import {
  B256_CODER_TYPE,
  B512_CODER_TYPE,
  BOOL_CODER_TYPE,
  BYTES_CODER_TYPE,
  ENCODING_V1,
  optionRegEx,
  RAW_PTR_CODER_TYPE,
  RAW_SLICE_CODER_TYPE,
  STD_STRING_CODER_TYPE,
  STR_SLICE_CODER_TYPE,
  U16_CODER_TYPE,
  U256_CODER_TYPE,
  U32_CODER_TYPE,
  U64_CODER_TYPE,
  U8_CODER_TYPE,
  isVector,
  stringRegEx,
  tupleRegEx,
  isArray,
  getArrayLength,
} from '../../utils/constants';
import type { Coder } from '../coders/AbstractCoder';
import { ArrayCoder } from '../coders/ArrayCoder';
import { B256Coder } from '../coders/B256Coder';
import { B512Coder } from '../coders/B512Coder';
import { BigNumberCoder } from '../coders/BigNumberCoder';
import { BooleanCoder } from '../coders/BooleanCoder';
import { ByteCoder } from '../coders/ByteCoder';
import { EnumCoder } from '../coders/EnumCoder';
import { NumberCoder } from '../coders/NumberCoder';
import { OptionCoder } from '../coders/OptionCoder';
import { RawSliceCoder } from '../coders/RawSliceCoder';
import { StdStringCoder } from '../coders/StdStringCoder';
import { StrSliceCoder } from '../coders/StrSliceCoder';
import { StringCoder } from '../coders/StringCoder';
import { StructCoder } from '../coders/StructCoder';
import { TupleCoder } from '../coders/TupleCoder';
import { VecCoder } from '../coders/VecCoder';

import { getCoders } from './getCoders';

/**
 * Retrieves coders that adhere to the v0 spec.
 *
 * @param resolvedAbiType - the resolved type to return a coder for.
 * @param options - options to be utilized during the encoding process.
 * @returns the coder for a given type.
 */
export const getCoder: GetCoderFn = (
  resolvedAbiType: ResolvedType,
  _options?: EncodingOptions
): Coder => {
  switch (resolvedAbiType.type) {
    case U8_CODER_TYPE:
    case U16_CODER_TYPE:
    case U32_CODER_TYPE:
      return new NumberCoder(resolvedAbiType.type);
    case U64_CODER_TYPE:
    case RAW_PTR_CODER_TYPE:
      return new BigNumberCoder('u64');
    case U256_CODER_TYPE:
      return new BigNumberCoder('u256');
    case RAW_SLICE_CODER_TYPE:
      return new RawSliceCoder();
    case BOOL_CODER_TYPE:
      return new BooleanCoder();
    case B256_CODER_TYPE:
      return new B256Coder();
    case B512_CODER_TYPE:
      return new B512Coder();
    case BYTES_CODER_TYPE:
      return new ByteCoder();
    case STD_STRING_CODER_TYPE:
      return new StdStringCoder();
    case STR_SLICE_CODER_TYPE:
      return new StrSliceCoder();
    default:
      break;
  }

  const stringMatch = stringRegEx.exec(resolvedAbiType.type)?.groups;
  if (stringMatch) {
    const length = parseInt(stringMatch.length, 10);

    return new StringCoder(length);
  }

  // ABI types underneath MUST have components by definition

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const components = resolvedAbiType.components!;

  if (isArray(resolvedAbiType.type)) {
    const length = getArrayLength(resolvedAbiType.type);
    const arg = components[0];
    if (!arg) {
      throw new FuelError(
        ErrorCode.INVALID_COMPONENT,
        `The provided Array type is missing an item of 'component'.`
      );
    }

    const arrayElementCoder = getCoder(arg.type);
    return new ArrayCoder(arrayElementCoder as Coder, length);
  }

  if (isVector(resolvedAbiType.type)) {
    const arg = resolvedAbiType.components?.[0].type as ResolvedType;

    const itemCoder = getCoder(arg, { encoding: ENCODING_V1 });
    return new VecCoder(itemCoder as Coder);
  }

  if (resolvedAbiType.type.startsWith('struct ')) {
    const coders = getCoders(components, { getCoder });
    return new StructCoder(resolvedAbiType.type, coders);
  }

  if (resolvedAbiType.type.startsWith('enum ')) {
    const coders = getCoders(components, { getCoder });

    if (optionRegEx.test(resolvedAbiType.type)) {
      return new OptionCoder(resolvedAbiType.type, coders);
    }
    return new EnumCoder(resolvedAbiType.type, coders);
  }

  if (tupleRegEx.test(resolvedAbiType.type)) {
    const coders = (components ?? []).map((component) =>
      getCoder(component.type, { encoding: ENCODING_V1 })
    );
    return new TupleCoder(coders as Coder[]);
  }

  throw new FuelError(
    ErrorCode.CODER_NOT_FOUND,
    `Coder not found: ${JSON.stringify(resolvedAbiType)}.`
  );
};
