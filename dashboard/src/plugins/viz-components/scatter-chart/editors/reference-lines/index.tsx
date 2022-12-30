import { ActionIcon, Tabs } from '@mantine/core';
import { useMemo } from 'react';
import { Control, useFieldArray, UseFormWatch } from 'react-hook-form';
import { Plus } from 'tabler-icons-react';
import { ITemplateVariable } from '~/utils/template';
import { IScatterChartConf } from '../../type';
import { ReferenceLineField } from './reference-line';

interface IReferenceLinesField {
  control: Control<IScatterChartConf, $TSFixMe>;
  watch: UseFormWatch<IScatterChartConf>;
  variables: ITemplateVariable[];
}

export function ReferenceLinesField({ control, watch, variables }: IReferenceLinesField) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'reference_lines',
  });

  const watchFieldArray = watch('reference_lines');
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index],
    };
  });

  const add = () =>
    append({
      name: '',
      template: '',
      variable_key: '',
      orientation: 'horizontal',
    });

  const variableOptions = useMemo(() => {
    return variables.map((v) => ({
      label: v.name,
      value: v.name,
    }));
  }, [variables]);
  return (
    <Tabs
      defaultValue="0"
      styles={{
        tab: {
          paddingTop: '0px',
          paddingBottom: '0px',
        },
        panel: {
          padding: '0px',
        },
      }}
    >
      <Tabs.List>
        {controlledFields.map((field, index) => (
          <Tabs.Tab key={index} value={index.toString()}>
            {index + 1}
            {/* {field.name.trim() ? field.name : index + 1} */}
          </Tabs.Tab>
        ))}
        <Tabs.Tab onClick={add} value="add">
          <ActionIcon>
            <Plus size={18} color="#228be6" />
          </ActionIcon>
        </Tabs.Tab>
      </Tabs.List>
      {controlledFields.map((field, index) => (
        <Tabs.Panel key={index} value={index.toString()}>
          <ReferenceLineField
            control={control}
            index={index}
            remove={remove}
            watch={watch}
            variableOptions={variableOptions}
          />
        </Tabs.Panel>
      ))}
    </Tabs>
  );
}