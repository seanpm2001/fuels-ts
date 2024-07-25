import type { Abi } from '../../abi/Abi';
import { renderHbsTemplate } from '../renderHbsTemplate';
import { formatConfigurables } from '../utils/formatConfigurables';
import { formatEnums } from '../utils/formatEnums';
import { formatImports } from '../utils/formatImports';
import { formatStructs } from '../utils/formatStructs';

import dtsTemplate from './dts.hbs';

export function renderDtsTemplate(params: { abi: Abi }) {
  const {
    name: capitalizedName,
    metadataTypes,
    functions,
    commonTypesInUse,
    configurables,
    concreteTypes,
  } = params.abi;

  /*
    First we format all attributes
  */
  const functionsTypedefs = functions.map((f) => f.getDeclaration());

  const functionsFragments = functions.map((f) => f.name);

  const encoders = functions.map((f) => ({
    functionName: f.name,
    input: f.attributes.inputs,
  }));

  const decoders = functions.map((f) => ({
    functionName: f.name,
  }));

  const { enums } = formatEnums({ types: metadataTypes });
  const { structs } = formatStructs({ types: metadataTypes });
  const { imports } = formatImports({
    types: metadataTypes.concat(concreteTypes),
    baseMembers: [
      'Interface',
      'FunctionFragment',
      'DecodedValue',
      'Contract',
      'BytesLike',
      'InvokeFunction',
    ],
  });
  const { formattedConfigurables } = formatConfigurables({ configurables });

  /*
    And finally render template
  */
  const text = renderHbsTemplate({
    template: dtsTemplate,
    data: {
      capitalizedName,
      commonTypesInUse: commonTypesInUse.join(', '),
      functionsTypedefs,
      functionsFragments,
      encoders,
      decoders,
      structs,
      enums,
      imports,
      formattedConfigurables,
    },
  });

  return text;
}
