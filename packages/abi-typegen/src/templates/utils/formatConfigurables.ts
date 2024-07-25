import type { AbiConfigurable } from '../../abi/configurable/AbiConfigurable';

export function formatConfigurables(params: { configurables: AbiConfigurable[] }) {
  const { configurables } = params;

  const formattedConfigurables = configurables.map((c) => {
    const {
      name,
      type: {
        attributes: { inputLabel },
        typeDeclarations,
      },
    } = c;

    return {
      configurableName: name,
      configurableType: `${inputLabel}${typeDeclarations.input}`,
    };
  });

  return { formattedConfigurables };
}
