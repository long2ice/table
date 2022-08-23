import { Button, Group } from '@mantine/core';
import _ from 'lodash';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useModelContext } from '../contexts/model-context';
import { Filter } from './filter';
import './index.css';

interface IFilters {}

export const Filters = observer(function _Filters({}: IFilters) {
  const model = useModelContext();

  const { control, handleSubmit } = useForm({ defaultValues: model.filters.values });

  if (model.filters.empty) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit(model.filters.setValues)} className="dashboard-filters-wrapper">
      <Group
        className="dashboard-filters"
        position="apart"
        p="md"
        noWrap
        sx={{ boxShadow: '0px 0px 10px 0px rgba(0,0,0,.2)' }}
      >
        <Group align="flex-start">
          {model.filters.inOrder.map((filter) => (
            <Controller
              key={filter.id}
              name={filter.key}
              control={control}
              render={({ field }) => <Filter filter={filter} {...field} />}
            />
          ))}
        </Group>
        <Group sx={{ alignSelf: 'flex-end' }}>
          <Button color="blue" size="sm" type="submit">
            Submit
          </Button>
        </Group>
      </Group>
    </form>
  );
});
