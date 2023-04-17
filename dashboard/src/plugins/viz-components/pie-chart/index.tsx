import { VizComponent } from '~/types/plugin';
import { VersionBasedMigrator } from '~/plugins/plugin-data-migrator';
import { VizPieChart } from './viz-pie-chart';
import { VizPieChartEditor } from './viz-pie-chart-editor';
import { DEFAULT_CONFIG, IPieChartConf } from './type';
import { cloneDeep } from 'lodash';

class VizPieChartMigrator extends VersionBasedMigrator {
  readonly VERSION = 1;

  configVersions(): void {
    this.version(1, (data: $TSFixMe) => {
      return {
        version: 1,
        config: data,
      };
    });
  }
}

export const PieChartVizComponent: VizComponent = {
  displayName: 'Pie Chart',
  displayGroup: 'ECharts-based charts',
  migrator: new VizPieChartMigrator(),
  name: 'pie',
  viewRender: VizPieChart,
  configRender: VizPieChartEditor,
  createConfig() {
    return {
      version: 1,
      config: cloneDeep(DEFAULT_CONFIG) as IPieChartConf,
    };
  },
};
