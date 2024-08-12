import { cloneDeep, get } from 'lodash';
import { VersionBasedMigrator } from '~/components/plugins/plugin-data-migrator';
import { VizComponent } from '~/types/plugin';
import { ITemplateVariable } from '~/utils';
import { ClickEchartSeries } from './triggers/click-echart';
import { DEFAULT_CONFIG, ICartesianChartConf } from './type';
import { VizCartesianChart } from './viz-cartesian-chart';
import { VizCartesianEditor } from './viz-cartesian-editor';
import * as Migrators from './migrators';
import { translation } from './translation';

export class VizCartesianMigrator extends VersionBasedMigrator {
  configVersions(): void {
    this.version(1, (data: $TSFixMe) => {
      return {
        version: 1,
        config: data,
      };
    });
    this.version(2, (data, { panelModel }) => {
      const { config } = data;
      const variables = (config.variables || []) as ITemplateVariable[];
      variables.forEach((v) => {
        if (!panelModel.variables.find((vv) => vv.name === v.name)) {
          panelModel.addVariable(v);
        }
      });
      const statVariables = (get(config, 'stats.variables') || []) as ITemplateVariable[];
      statVariables.forEach((v) => {
        if (!panelModel.variables.find((vv) => vv.name === v.name)) {
          panelModel.addVariable(v);
        }
      });
      return { ...data, version: 2, config: Migrators.updateSchema2(config) };
    });
    this.version(3, (data) => {
      return {
        ...data,
        version: 3,
        config: Migrators.updateToSchema3(data.config),
      };
    });
    this.version(4, (data) => {
      return {
        ...data,
        version: 4,
        config: Migrators.updateToSchema4(data.config),
      };
    });
    this.version(5, (data) => {
      return {
        ...data,
        version: 5,
        config: Migrators.v5(data.config),
      };
    });
    this.version(6, (data) => {
      return {
        ...data,
        version: 6,
        config: Migrators.v6(data.config),
      };
    });
    this.version(7, (data) => {
      return {
        ...data,
        version: 7,
        config: Migrators.v7(data.config),
      };
    });
    this.version(8, (data) => {
      return {
        ...data,
        version: 8,
        config: Migrators.v8(data.config),
      };
    });
    this.version(9, (data) => {
      return {
        ...data,
        version: 9,
        config: Migrators.v9(data.config),
      };
    });
    this.version(10, (data) => {
      return {
        ...data,
        version: 10,
        config: Migrators.v10(data.config),
      };
    });
    this.version(11, (data) => {
      return {
        ...data,
        version: 11,
        config: Migrators.v11(data.config),
      };
    });
    this.version(12, (data) => {
      return {
        ...data,
        version: 12,
        config: Migrators.v12(data.config),
      };
    });
    this.version(13, (data) => {
      return {
        ...data,
        version: 13,
        config: Migrators.v13(data.config),
      };
    });
    this.version(14, (data) => {
      return {
        ...data,
        version: 14,
        config: Migrators.v14(data.config),
      };
    });
    this.version(15, (data) => {
      return {
        ...data,
        version: 15,
        config: Migrators.v15(data.config),
      };
    });
    this.version(16, (data) => {
      return {
        ...data,
        version: 16,
        config: Migrators.v16(data.config),
      };
    });
    this.version(17, (data) => {
      return {
        ...data,
        version: 17,
        config: Migrators.v17(data.config),
      };
    });
    this.version(18, (data, env) => {
      return {
        ...data,
        version: 18,
        config: Migrators.v18(data.config, env),
      };
    });
    this.version(19, (data) => {
      return {
        ...data,
        version: 19,
        config: Migrators.v19(data.config),
      };
    });
    this.version(20, (data, env) => {
      return {
        ...data,
        version: 20,
        config: Migrators.v20(data.config, env.panelModel),
      };
    });
  }
  readonly VERSION = 20;
}

export const CartesianVizComponent: VizComponent = {
  displayName: 'viz.cartesian_chart.viz_name',
  displayGroup: 'chart.groups.echarts_based_charts',
  migrator: new VizCartesianMigrator(),
  name: 'cartesian',
  viewRender: VizCartesianChart,
  configRender: VizCartesianEditor,
  createConfig() {
    return {
      version: 20,
      config: cloneDeep(DEFAULT_CONFIG) as ICartesianChartConf,
    };
  },
  triggers: [ClickEchartSeries],
  translation,
};
