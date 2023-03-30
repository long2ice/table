import { getLabelOverflowOptionOnAxis } from '~/plugins/common-echarts-fields/axis-label-overflow';
import { getEchartsXAxisLabel } from '../../cartesian/panel/x-axis/x-axis-label-formatter/get-echarts-x-axis-tick-label';
import { IHorizontalBarChartConf } from '../type';

export function getYAxes(conf: IHorizontalBarChartConf, yAxisData: $TSFixMe[]) {
  const allNumbers = yAxisData.every((d) => !Number.isNaN(Number(d)));
  const { overflow, ...axisLabel } = conf.y_axis.axisLabel;
  const overflowOption = getLabelOverflowOptionOnAxis(overflow.on_axis);
  return [
    {
      data: yAxisData,
      name: conf.y_axis.name ?? '',
      // wait for https://github.com/apache/echarts/pull/16825
      nameLocation: 'end',
      nameTextStyle: {
        align: 'center',
        fontWeight: 'bold',
      },
      id: 'main-y-axis',
      axisTick: {
        show: true,
        alignWithLabel: true,
      },
      type: allNumbers ? 'value' : 'category',
      axisLabel: {
        ...axisLabel,
        ...overflowOption,
        formatter: getEchartsXAxisLabel(axisLabel.formatter),
      },
      z: 5,
    },
  ];
}