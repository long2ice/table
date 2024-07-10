import { PanelRenderModelInstance } from '~/model';
import { aggregateValue } from '../aggregation';
import { formatNumber } from '../number';
import { ITemplateVariable } from './types';

export function getNonStatsDataText(data: $TSFixMe) {
  if (data === null) {
    return 'null';
  }
  if (data === undefined) {
    return 'undefined';
  }
  if (Array.isArray(data)) {
    return `Array(${data.length})`;
  }
  return data.toString();
}

export function getAggregatedValue({ data_field, aggregation }: ITemplateVariable, data: TPanelData) {
  return aggregateValue(data, data_field, aggregation);
}

export function formatAggregatedValue(
  { formatter, aggregation }: ITemplateVariable,
  value: number | string | number[] | null,
) {
  if (typeof value !== 'string' && typeof value !== 'number') {
    return getNonStatsDataText(value);
  }
  if (aggregation.type === 'custom') {
    return value;
  }
  try {
    return formatNumber(value, formatter);
  } catch (e) {
    console.error(e);
    return value;
  }
}

export function transformTemplateToRichText(template: string, panel: PanelRenderModelInstance) {
  const ret = template.replaceAll(/(\$\{([^{\}]+(?=}))\})/g, (...matches) => {
    const code = matches[2];
    const style = panel.variableStyleMap[code];
    if (!style) {
      return `{{${code}}}`;
    }
    const styleStr = Object.entries(style)
      .map(([k, v]) => `${k}:${v}`)
      .join(';');
    return `<span style="${styleStr}">{{${code}}}</span>`;
  });
  return ret;
}
