import { Select } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useRenderContentModelContext } from '~/contexts';
import { FilterMetaInstance, FilterSelectConfigInstance } from '~/model';
import { FilterSelectItem } from '../select-item';

interface IFilterSelect extends Omit<FilterMetaInstance, 'key' | 'type' | 'config'> {
  config: FilterSelectConfigInstance;
  value: $TSFixMe;
  onChange: (v: string, forceSubmit?: boolean) => void;
}

export const FilterSelect = observer(({ label, config, value, onChange }: IFilterSelect) => {
  const model = useRenderContentModelContext();
  const usingRemoteOptions = !!config.options_query_id;
  const { state, error } = model.getDataStuffByID(config.options_query_id);
  const loading = state === 'loading';

  useEffect(() => {
    const { default_selection_count } = config;
    if (!default_selection_count) {
      return;
    }
    const newValue = config.options[0]?.value ?? '';

    console.log('Selecting the first option by default. New value: ', newValue);
    onChange(newValue, true);
  }, [config.default_selection_count, config.options]); // excluding onChange from deps, since it's always re-created

  return (
    <Select
      label={label}
      data={config.options}
      disabled={usingRemoteOptions ? loading : false}
      value={value}
      onChange={onChange}
      error={!!error}
      placeholder={error}
      maxDropdownHeight={500}
      styles={{
        root: {
          width: config.width ? config.width : '200px',
        },
        input: {
          borderColor: '#e9ecef',
        },
      }}
      sx={{
        '.mantine-Select-item[data-selected] .mantine-Text-root[data-role=description]': {
          color: 'rgba(255,255,255,.7)',
        },
      }}
      itemComponent={FilterSelectItem}
    />
  );
});