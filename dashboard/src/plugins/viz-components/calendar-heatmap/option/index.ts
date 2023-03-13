import _ from 'lodash';
import { defaultsDeep } from 'lodash';
import { AnyObject } from '~/types';
import { ITemplateVariable } from '~/utils/template';
import { ICalendarHeatmapConf } from '../type';
import { getValueFormatters } from './formatters';
import { getSeries } from './series';
import { getTooltip } from './tooltip';
import { getVisualMap } from './visual-map';

const defaultOption = {
  tooltip: {
    confine: true,
  },
  grid: {
    containLabel: true,
  },
};

const getYear = (key: string) => (d: AnyObject) => d[key].split('-')[0];

export function getOption(conf: ICalendarHeatmapConf, data: $TSFixMe[], variables: ITemplateVariable[]) {
  const valueFormatters = getValueFormatters(conf);
  const dataByYear = _.groupBy(data, getYear(conf.calendar.data_key));
  const years = Object.keys(dataByYear);
  const customOptions = {
    calendar: {
      top: 120,
      left: 30,
      right: 30,
      cellSize: ['auto', 13],
      range: years[0],
      itemStyle: {
        borderColor: 'white',
      },
      splitLine: {
        show: true,
      },
      dayLabel: {
        firstDay: 1,
      },
      yearLabel: { show: false },
    },
    series: getSeries(conf, data),
    tooltip: getTooltip(conf, data, valueFormatters),
    visualMap: getVisualMap(conf),
  };
  return defaultsDeep({}, customOptions, defaultOption);
}
