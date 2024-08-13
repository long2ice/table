import { Tabs } from '@mantine/core';
import { defaults } from 'lodash';
import { useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useTranslation } from 'react-i18next';
import { useStorageData } from '~/components/plugins/hooks';
import { VizConfigProps } from '~/types/plugin';
import { VizConfigBanner } from '../../editor-components';
import { EchartsZoomingField } from '../cartesian/editors/echarts-zooming-field';
import { BarField } from './editors/bar';
import { LineField } from './editors/line';
import { MarkLineField } from './editors/mark-line';
import { ReferenceLinesField } from './editors/reference-lines';
import { XAxisField } from './editors/x-axis';
import { YAxisField } from './editors/y-axis';
import { DEFAULT_CONFIG, IParetoChartConf } from './type';

export function VizParetoChartEditor({ context }: VizConfigProps) {
  const { t } = useTranslation();
  const { value: conf, set: setConf } = useStorageData<IParetoChartConf>(context.instanceData, 'config');
  const { variables } = context;
  const defaultValues = useMemo(() => defaults({}, conf, DEFAULT_CONFIG), [conf]);

  const { control, handleSubmit, watch, formState, reset } = useForm<IParetoChartConf>({ defaultValues });
  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  watch(['x_axis', 'data_key', 'bar', 'line', 'dataZoom']);
  return (
    <form onSubmit={handleSubmit(setConf)}>
      <VizConfigBanner canSubmit={formState.isDirty} />

      <Tabs
        defaultValue="X Axis"
        orientation="vertical"
        styles={{
          tab: {
            paddingLeft: '6px',
            paddingRight: '6px',
          },
          panel: {
            paddingTop: '6px',
            paddingLeft: '12px',
          },
        }}
      >
        <Tabs.List>
          <Tabs.Tab value="X Axis">{t('chart.x_axis.label')}</Tabs.Tab>
          <Tabs.Tab value="Y Axis">{t('chart.y_axis.label')}</Tabs.Tab>
          <Tabs.Tab value="Bar">{t('chart.series.bar.label')}</Tabs.Tab>
          <Tabs.Tab value="Line">{t('chart.series.line.label')}</Tabs.Tab>
          <Tabs.Tab value="80-20 Line">{t('viz.pareto_chart.line_80_20.label')}</Tabs.Tab>
          <Tabs.Tab value="Reference Lines">{t('chart.reference_line.labels')}</Tabs.Tab>
          <Tabs.Tab value="Zooming">{t('chart.zooming.label')}</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="X Axis">
          <XAxisField control={control} watch={watch} />
        </Tabs.Panel>

        <Tabs.Panel value="Y Axis">
          <YAxisField control={control} watch={watch} />
        </Tabs.Panel>

        <Tabs.Panel value="Bar">
          <BarField control={control} watch={watch} />
        </Tabs.Panel>

        <Tabs.Panel value="Line">
          <LineField control={control} watch={watch} />
        </Tabs.Panel>

        <Tabs.Panel value="80-20 Line">
          <MarkLineField control={control} watch={watch} />
        </Tabs.Panel>

        <Tabs.Panel value="Reference Lines">
          <ReferenceLinesField variables={variables} control={control} watch={watch} />
        </Tabs.Panel>

        <Tabs.Panel value="Zooming">
          <Controller name="dataZoom" control={control} render={({ field }) => <EchartsZoomingField {...field} />} />
        </Tabs.Panel>
      </Tabs>
    </form>
  );
}
