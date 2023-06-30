import { getLabelOverflowOptionOnAxis } from '~/plugins/common-echarts-fields/axis-label-overflow';
import { getReferenceAreasSeries } from '~/plugins/common-echarts-fields/reference-area/option';
import { AnyObject } from '~/types';
import { ITemplateVariable, templateToString } from '~/utils/template';
import { ICartesianReferenceArea, ICartesianReferenceLine } from '../../cartesian/type';
import { getEchartsSymbolSize } from '../editors/scatter/scatter-size-select/get-echarts-symbol-size';
import { getSeriesColor } from '../editors/scatter/series-color-select/get-series-color';
import { IScatterChartConf } from '../type';
import { extractData, parseDataKey } from '~/utils/data';
import _ from 'lodash';

function getReferenceLines(
  reference_lines: ICartesianReferenceLine[],
  variables: ITemplateVariable[],
  variableValueMap: Record<string, string | number>,
  data: TPanelData,
) {
  return reference_lines.map((r) => {
    const isHorizontal = r.orientation === 'horizontal';
    const keyOfAxis = isHorizontal ? 'yAxis' : 'xAxis';
    const position = isHorizontal ? 'insideEndTop' : 'end';
    return {
      name: r.name,
      type: 'line',
      hide_in_legend: !r.show_in_legend,
      yAxisIndex: r.yAxisIndex,
      data: [],
      lineStyle: r.lineStyle,
      markLine: {
        data: [
          {
            name: r.name,
            [keyOfAxis]: Number(variableValueMap[r.variable_key]),
          },
        ],
        silent: true,
        symbol: ['none', 'none'],
        lineStyle: r.lineStyle,
        label: {
          formatter: function () {
            if (!r.template) {
              return '';
            }
            return templateToString(r.template, variables, data);
          },
          position,
        },
      },
    };
  });
}

function getSeriesItemOrItems(
  { x_axis, scatter }: IScatterChartConf,
  data: TPanelData,
  variableValueMap: Record<string, string | number>,
  labelFormatters: Record<string, $TSFixMe>,
) {
  const x = parseDataKey(x_axis.data_key);
  const y = parseDataKey(scatter.y_data_key);
  return {
    label: {
      show: !!scatter.label_position,
      position: scatter.label_position,
      ...getLabelOverflowOptionOnAxis(scatter.label_overflow.label),
      formatter: ({ value }: { value: AnyObject }) => {
        return value[scatter.name_data_key]; // [x, y, name]
      },
    },
    type: 'scatter',
    name: '',
    xAxisId: 'main-x-axis',
    yAxisIndex: 0,
    datasetIndex: 0,
    itemStyle: {
      color: getSeriesColor(scatter.color, variableValueMap),
    },
    symbolSize: getEchartsSymbolSize(scatter.symbolSize, data, x_axis.data_key, variableValueMap),
    encode: { x: x.columnKey, y: y.columnKey },
  };
}

export function getSeries(
  conf: IScatterChartConf,
  data: TPanelData,
  labelFormatters: Record<string, $TSFixMe>,
  variables: ITemplateVariable[],
  variableValueMap: Record<string, string | number>,
) {
  const ret: Array<AnyObject> = [getSeriesItemOrItems(conf, data, variableValueMap, labelFormatters)];
  return ret.concat(getReferenceLines(conf.reference_lines, variables, variableValueMap, data)).concat(
    getReferenceAreasSeries({
      reference_areas: conf.reference_areas,
      variableValueMap,
    }),
  );
}
