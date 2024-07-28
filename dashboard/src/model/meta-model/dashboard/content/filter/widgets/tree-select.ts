import { Text, TextProps } from '@mantine/core';
import { reaction } from 'mobx';
import { addDisposer, cast, Instance, types } from 'mobx-state-tree';
import React from 'react';
import { queryDataToTree } from '~/components/filter/filter-tree-select/render/query-data-to-tree';
import { ITreeDataQueryOption, ITreeDataRenderItem } from '~/components/filter/filter-tree-select/types';
import { FilterBaseSelectConfigMeta } from './select-base';

function addLabelToData(data: ITreeDataQueryOption[]) {
  return data.map((d) => {
    const { label, description, ...rest } = d;
    const ret: ITreeDataRenderItem = {
      ...rest,
      filterBasis: `${label}___${description ?? ''}`,
      description,
      label,
    };
    if (description) {
      ret.label = React.createElement('div', {}, [
        React.createElement<TextProps>(Text, { key: 0, title: d.label } as TextProps, d.label),
        React.createElement<TextProps>(
          Text,
          { key: 1, className: 'rc-tree-select-tree-title-desc', color: 'dimmed', title: d.description } as TextProps,
          d.description,
        ),
      ]);
    }
    return ret;
  });
}

export const FilterTreeSelectConfigMeta = types
  .compose(
    'FilterTreeSelectConfigMeta',
    types.model({
      _name: types.literal('tree-select'),
      min_width: types.optional(types.string, ''),
      default_value: types.optional(types.array(types.string), []),
      treeCheckStrictly: types.optional(types.boolean, false),
    }),
    FilterBaseSelectConfigMeta,
  )
  .views((self) => ({
    get json() {
      const {
        _name,
        default_value,
        required,
        min_width,
        static_options,
        options_query_id,
        default_selection_count,
        treeCheckStrictly,
      } = self;
      return {
        _name,
        required: !!required,
        min_width,
        default_value,
        static_options,
        options_query_id,
        treeCheckStrictly,
        default_selection_count,
      };
    },
    get plainData() {
      const { data } = self.contentModel.getDataStuffByID(self.options_query_id);
      return data;
    },
    get treeData() {
      const data = this.plainData;
      const dataWithCustomLabel = addLabelToData(data);
      return queryDataToTree(dataWithCustomLabel);
    },
    get errorMessage() {
      const { error } = self.contentModel.getDataStuffByID(self.options_query_id);
      return error;
    },
    get treeDataLoading() {
      const { state } = self.contentModel.getDataStuffByID(self.options_query_id);
      return state === 'loading';
    },
    get defaultSelection() {
      const defaultValue = self.filter.formattedDefaultValue;
      if (Array.isArray(defaultValue) && defaultValue.length > 0) {
        return defaultValue;
      }

      const { default_selection_count } = self;
      if (!default_selection_count) {
        return [];
      }
      const treeData = this.treeData;
      return treeData.slice(0, default_selection_count).map((o) => o.value);
    },
    valueObjects(value: string[]) {
      const set = new Set(value);
      return this.plainData.filter((d: any) => set.has(d.value));
    },
    initialSelection(value: string[] | null) {
      if (!value) {
        return this.valueObjects(this.defaultSelection);
      }
      return this.valueObjects(value);
    },
    truthy(value: any) {
      return Array.isArray(value) && value.length > 0;
    },
  }))
  .actions((self) => ({
    setDefaultValue(default_value: string[]) {
      self.default_value = cast(default_value);
    },
    setMinWidth(v: string) {
      self.min_width = v;
    },
    setTreeCheckStrictly(v: boolean) {
      self.treeCheckStrictly = v;
    },
    applyDefaultSelection() {
      const currentSelection = self.filter.value;
      const options = new Set(self.plainData.map((o: any) => o.value));
      const validValues = (currentSelection ?? []).filter((v: any) => options.has(v));
      if (validValues.length > 0) {
        self.filter.setValue(validValues);
      } else {
        self.filter.setValue(self.defaultSelection);
      }
    },
    afterCreate() {
      addDisposer(
        self,
        reaction(() => JSON.stringify(self.defaultSelection), this.applyDefaultSelection, {
          fireImmediately: true,
          delay: 0,
        }),
      );
    },
  }));

export type FilterTreeSelectConfigInstance = Instance<typeof FilterTreeSelectConfigMeta>;

export const createFilterTreeSelectConfig = () =>
  FilterTreeSelectConfigMeta.create({
    _name: 'tree-select',
    default_value: [],
    static_options: [],
    options_query_id: '',
    default_selection_count: 0,
  });
