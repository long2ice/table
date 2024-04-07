import { Stack } from '@mantine/core';
import _, { defaultsDeep } from 'lodash';
import { useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { DataFieldSelector } from '~/components/panel/settings/common/data-field-selector';
import { useStorageData } from '~/components/plugins/hooks';
import { VizConfigProps } from '~/types/plugin';
import { ChartConfigBanner } from '../../editor-components';
import { DEFAULT_CONFIG, IPieChartConf } from './type';

export function VizPieChartEditor({ context }: VizConfigProps) {
  const { value: confValue, set: setConf } = useStorageData<IPieChartConf>(context.instanceData, 'config');
  const conf: IPieChartConf = useMemo(() => defaultsDeep({}, confValue, DEFAULT_CONFIG), [confValue]);
  const defaultValues: IPieChartConf = useMemo(() => _.clone(conf), [conf]);

  const { control, handleSubmit, watch, getValues, reset } = useForm<IPieChartConf>({ defaultValues });
  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  const values = getValues();
  const changed = useMemo(() => {
    return !_.isEqual(values, conf);
  }, [values, conf]);

  watch(['label_field', 'value_field', 'color_field']);

  return (
    <Stack spacing="xs">
      <form onSubmit={handleSubmit(setConf)}>
        <ChartConfigBanner canSubmit={changed} />
        <Stack mt="md" spacing="xs" p="md" mb="sm" sx={{ border: '1px solid #eee', borderRadius: '5px' }}>
          <Controller
            control={control}
            name="label_field"
            render={({ field }) => <DataFieldSelector label="Label Key" required {...field} />}
          />
          <Controller
            control={control}
            name="value_field"
            render={({ field }) => <DataFieldSelector label="Value Key" required {...field} />}
          />
          <Controller
            control={control}
            name="color_field"
            render={({ field }) => <DataFieldSelector label="Color Key" clearable {...field} />}
          />
        </Stack>
      </form>
    </Stack>
  );
}
