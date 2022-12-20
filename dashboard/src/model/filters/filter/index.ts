import { Instance, SnapshotOut, types } from 'mobx-state-tree';
import { createFilterConfig_Checkbox, FilterConfigModel_Checkbox } from './checkbox';
import { DashboardFilterType } from './common';
import { createFilterConfig_DateRange, FilterConfigModel_DateRange } from './date-range';
import { createFilterConfig_MultiSelect, FilterConfigModel_MultiSelect } from './multi-select';
import { createFilterConfig_TreeSelect, FilterConfigModel_TreeSelect } from './tree-select';
import { createFilterConfig_Select, FilterConfigModel_Select } from './select';
import { createFilterConfig_TextInput, FilterConfigModel_TextInput } from './text-input';

export const FilterModel = types
  .model('FilterModel', {
    id: types.identifier,
    key: types.string,
    label: types.string,
    order: types.number,
    visibleInViewsIDs: types.array(types.string),
    auto_submit: types.optional(types.boolean, false),
    type: types.enumeration('DashboardFilterType', [
      DashboardFilterType.Select,
      DashboardFilterType.MultiSelect,
      DashboardFilterType.TreeSelect,
      DashboardFilterType.TextInput,
      DashboardFilterType.Checkbox,
      DashboardFilterType.DateRange,
    ]),
    config: types.union(
      FilterConfigModel_Select,
      FilterConfigModel_MultiSelect,
      FilterConfigModel_TreeSelect,
      FilterConfigModel_TextInput,
      FilterConfigModel_Checkbox,
      FilterConfigModel_DateRange,
    ),
  })
  .views((self) => ({
    get plainDefaultValue() {
      const v = self.config.default_value;
      if (Array.isArray(v)) {
        return [...v];
      }
      return v;
    },
  }))
  .actions((self) => ({
    setKey(key: string) {
      self.key = key;
    },
    setLabel(label: string) {
      self.label = label;
    },
    setOrder(order: number) {
      self.order = order;
    },
    setType(type: DashboardFilterType) {
      switch (type) {
        case DashboardFilterType.Select:
          self.config = createFilterConfig_Select();
          break;
        case DashboardFilterType.MultiSelect:
          self.config = createFilterConfig_MultiSelect();
          break;
        case DashboardFilterType.TreeSelect:
          self.config = createFilterConfig_TreeSelect();
          break;
        case DashboardFilterType.TextInput:
          self.config = createFilterConfig_TextInput();
          break;
        case DashboardFilterType.Checkbox:
          self.config = createFilterConfig_Checkbox();
          break;
        case DashboardFilterType.DateRange:
          self.config = createFilterConfig_DateRange();
          break;
      }
      self.type = type;
    },
    setVisibleInViewsIDs(ids: string[]) {
      self.visibleInViewsIDs.length = 0;
      self.visibleInViewsIDs.push(...ids);
    },
    setAutoSubmit(v: boolean) {
      self.auto_submit = v;
    },
  }));

export type FilterModelInstance = Instance<typeof FilterModel>;
export type FilterModelSnapshotOut = SnapshotOut<FilterModelInstance>;
