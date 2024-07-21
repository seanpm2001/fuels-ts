import { safeExec } from '@fuel-ts/errors/test-utils';

import {
  AbiTypegenProjectsEnum,
  getTypegenForcProject,
} from '../../../test/fixtures/forc-projects/index';
import mainTemplate from '../../../test/fixtures/templates/script/main.hbs';
import mainTemplateWithConfigurables from '../../../test/fixtures/templates/script-with-configurable/main.hbs';
import { mockVersions } from '../../../test/utils/mockVersions';
import { Abi } from '../../abi/Abi';
import { ProgramTypeEnum } from '../../types/enums/ProgramTypeEnum';

import { renderMainTemplate } from './main';

/**
 * @group node
 */
describe('main.ts', () => {
  test('should render main template', () => {
    const { restore } = mockVersions();

    const project = getTypegenForcProject(AbiTypegenProjectsEnum.SCRIPT);
    const rawContents = project.abiContents;

    const abi = new Abi({
      filepath: './my-script-abi.json',
      hexlifiedBinContents: '0x000',
      outputDir: 'stdout',
      rawContents,
      programType: ProgramTypeEnum.SCRIPT,
    });

    const rendered = renderMainTemplate({ abi });

    restore();

    expect(rendered).toEqual(mainTemplate);
  });

  test('should render main template with configurables', () => {
    const { restore } = mockVersions();

    const project = getTypegenForcProject(AbiTypegenProjectsEnum.SCRIPT_WITH_CONFIGURABLE);
    const rawContents = project.abiContents;

    const abi = new Abi({
      filepath: './my-script-abi.json',
      hexlifiedBinContents: '0x000',
      outputDir: 'stdout',
      rawContents,
      programType: ProgramTypeEnum.SCRIPT,
    });

    const rendered = renderMainTemplate({ abi });

    restore();

    expect(rendered).toEqual(mainTemplateWithConfigurables);
  });

  test('should throw for invalid Script ABI', async () => {
    const { restore } = mockVersions();

    const project = getTypegenForcProject(AbiTypegenProjectsEnum.SCRIPT);
    const rawContents = project.abiContents;

    // ALERT: friction here (emptying functions array)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    rawContents.functions = [];

    const abi = new Abi({
      filepath: './my-script-abi.json',
      hexlifiedBinContents: '0x000',
      outputDir: 'stdout',
      rawContents,
      programType: ProgramTypeEnum.SCRIPT,
    });

    const { error } = await safeExec(() => {
      renderMainTemplate({ abi });
    });

    restore();

    expect(error?.message).toMatch(/ABI doesn't have a 'main\(\)' method/);
  });
});
