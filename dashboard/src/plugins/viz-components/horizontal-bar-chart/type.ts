import { defaultNumbroFormat, TNumbroFormat } from '~/panel/settings/common/numbro-format-selector';
import { DEFAULT_AXIS_LABEL_OVERFLOW, IAxisLabelOverflow } from '~/plugins/common-echarts-fields/axis-label-overflow';
import { IEchartsTooltipMetric } from '~/plugins/common-echarts-fields/tooltip-metric';
import { AggregationType, DefaultAggregation } from '~/utils/aggregation';
import {
  DEFAULT_X_AXIS_LABEL_FORMATTER,
  IXAxisLabelFormatter,
} from '../cartesian/panel/x-axis/x-axis-label-formatter/types';

export interface IHorizontalBarChartReferenceLine {
  id: string;
  name: string;
  template: string;
  lineStyle: {
    type: 'solid' | 'dashed' | 'dotted';
    width: number;
    color: string;
  };
  xAxisIndex: string;
  orientation: 'horizontal' | 'vertical';
  variable_key: string;
  show_in_legend: boolean;
}

export interface IHorizontalBarChartSeriesItem {
  id: string;
  type: 'bar';
  name: string;
  stack: string;
  color?: string;
  barGap?: string;
  data_key: string;
  barWidth: string;
  xAxisIndex: string;
  barMinWidth: string;
  barMaxWidth: string;
  group_by_key: string;
  hide_in_chart: boolean;
  hide_in_legend: boolean;
  label_position?: string;
  aggregation_on_value?: AggregationType;
}

export interface IHorizontalBarChartXAxis {
  id: string;
  min: string;
  max: string;
  name: string;
  data_key: string;
  position: 'top' | 'bottom';
  label_formatter: TNumbroFormat;
}

export interface IHorizontalBarChartConf {
  x_axes: IHorizontalBarChartXAxis[];
  y_axis: {
    name: string;
    data_key: string;
    axisLabel: {
      overflow: IAxisLabelOverflow;
      formatter: IXAxisLabelFormatter;
    };
    nameAlignment: 'left' | 'center' | 'right';
  };
  series: IHorizontalBarChartSeriesItem[];
  tooltip: {
    metrics: IEchartsTooltipMetric[];
  };
  reference_lines: IHorizontalBarChartReferenceLine[];
}

export const DEFAULT_CONFIG: IHorizontalBarChartConf = {
  x_axes: [
    {
      id: 'initial-x',
      min: '',
      max: '',
      name: 'X Axis',
      data_key: '',
      position: 'bottom',
      label_formatter: defaultNumbroFormat,
    },
  ],
  y_axis: {
    name: 'Y Axis',
    data_key: '',
    axisLabel: {
      formatter: { ...DEFAULT_X_AXIS_LABEL_FORMATTER },
      overflow: DEFAULT_AXIS_LABEL_OVERFLOW,
    },
    nameAlignment: 'center',
  },
  series: [],
  tooltip: {
    metrics: [],
  },
  reference_lines: [],
};

export function getNewXAxis(): IHorizontalBarChartXAxis {
  const id = new Date().getTime().toString();
  return {
    id,
    min: '',
    max: '',
    name: id,
    data_key: '',
    position: 'bottom',
    label_formatter: defaultNumbroFormat,
  };
}

export function getNewSeriesItem(): IHorizontalBarChartSeriesItem {
  const id = new Date().getTime().toString();
  return {
    id,
    type: 'bar',
    name: id,
    stack: '',
    color: '',
    barGap: '',
    data_key: '',
    barWidth: '',
    barMinWidth: '1',
    barMaxWidth: '10',
    group_by_key: '',
    hide_in_chart: false,
    hide_in_legend: false,
    label_position: 'right',
    aggregation_on_value: DefaultAggregation,
    xAxisIndex: '0',
  };
}

export function getNewReferenceLine(): IHorizontalBarChartReferenceLine {
  const id = new Date().getTime().toString();
  return {
    id,
    name: id,
    template: '',
    variable_key: '',
    orientation: 'horizontal',
    lineStyle: {
      type: 'dashed',
      width: 1,
      color: '#868E96',
    },
    show_in_legend: false,
    xAxisIndex: '0',
  };
}
