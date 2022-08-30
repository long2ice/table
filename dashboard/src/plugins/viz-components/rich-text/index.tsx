import { defaults } from 'lodash';
import { VizComponent } from '../../../types/plugin';
import { VersionBasedMigrator } from '../../plugin-data-migrator';
import { DEFAULT_CONFIG, IRichTextConf } from './type';
import { VizRichText } from './viz-rich-text';
import { VizRichTextPanel } from './viz-rich-text-panel';

class VizRichTextMigrator extends VersionBasedMigrator {
  readonly VERSION = 1;

  fixMalformedConfig(config: any): any {
    return defaults({}, config, DEFAULT_CONFIG);
  }

  configVersions(): void {
    this.version(1, (data: any) => {
      return {
        version: 1,
        config: this.fixMalformedConfig(data),
      };
    });
  }
}

export const RichTextVizComponent: VizComponent = {
  displayName: 'RichText',
  migrator: new VizRichTextMigrator(),
  name: 'richText',
  viewRender: VizRichText,
  configRender: VizRichTextPanel,
  createConfig: (): IRichTextConf => DEFAULT_CONFIG,
};