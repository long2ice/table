import { ChartTheme } from '~/styles/register-themes';
import { getNumberOrDynamicValue } from '../number-or-dynamic-value';
import { VisualMap } from './types';

function getDefaultVisualMap(color: string[]): VisualMap {
  return {
    type: 'continuous',
    id: 'continuous-example',
    min: {
      type: 'static',
      value: 0,
    },
    max: {
      type: 'static',
      value: 100,
    },
    orient: 'horizontal',
    left: 'center',
    top: 'top',
    text: ['', ''],
    calculable: true,
    itemWidth: 15,
    itemHeight: 140,
    show: true,
    inRange: {
      color,
    },
    skipRange: {
      lt_min: '',
      min: '',
      max: '',
      gt_max: '',
    },
  };
}

export function getDefaultDepthVisualMap() {
  return getDefaultVisualMap(Object.values(ChartTheme.graphics.depth));
}

export function getVisualMapPalettes() {
  return {
    compared: Object.values(ChartTheme.graphics.compared),
    level: Object.values(ChartTheme.graphics.level),
    depth: Object.values(ChartTheme.graphics.depth),
    yellow_blue: ['#8f531d', '#ffd347', '#e3efe3', '#eefaee', '#4ecbbf', '#003f94'],
    blue: ['#f9fcff', '#48b3e9', '#003f94'],
    darkgreen_pink: ['#0c525a', '#f21f99'],
    spectrum: ['#ff0000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff', '#ff0000'],
  };
}

export function getVisualMap(visualMap: VisualMap, variableValueMap: Record<string, string | number>) {
  const { min, max, text } = visualMap;
  const minValue = getNumberOrDynamicValue(min, variableValueMap);
  const maxValue = getNumberOrDynamicValue(max, variableValueMap);
  if (visualMap.type === 'continuous') {
    const { skipRange, ...rest } = visualMap;
    return {
      ...rest,
      min: minValue,
      max: maxValue,
      text: [...text],
    };
  }
  return {
    ...visualMap,
    min: minValue,
    max: maxValue,
    text: [...text],
  };
}

const getSkipRangeColorRet = (color: string) => ({ followVisualMap: !color, color });

export function getSkipRangeColor(value: number, min: number, max: number, visualMap: VisualMap) {
  if (visualMap.type !== 'continuous') {
    return getSkipRangeColorRet('');
  }
  const { skipRange } = visualMap;
  if (value === min) {
    return getSkipRangeColorRet(skipRange.min);
  }
  if (value === max) {
    return getSkipRangeColorRet(skipRange.max);
  }
  if (value < min) {
    return getSkipRangeColorRet(skipRange.lt_min);
  }
  if (value > max) {
    return getSkipRangeColorRet(skipRange.gt_max);
  }
  return getSkipRangeColorRet('');
}
