import { reaction, toJS } from 'mobx';
import { addDisposer, cast, getParent, getRoot, Instance, types } from 'mobx-state-tree';
import { FilterBaseSelectConfigMeta } from './select-base';
import { shallowToJS } from '~/utils';

export const FilterMultiSelectConfigMeta = types
  .compose(
    'FilterMultiSelectConfigMeta',
    types.model({
      _name: types.literal('multi-select'),
      min_width: types.optional(types.string, ''),
      default_value: types.optional(types.array(types.string), []),
    }),
    FilterBaseSelectConfigMeta,
  )
  .views((self) => ({
    get json() {
      const { _name, default_value, required, min_width, static_options, options_query_id, default_selection_count } =
        self;
      return shallowToJS({
        _name,
        required: !!required,
        min_width,
        default_value,
        static_options,
        options_query_id,
        default_selection_count,
      });
    },
    get defaultSelection() {
      const defaultValue = self.filter.formattedDefaultValue;
      if (Array.isArray(defaultValue) && defaultValue.length > 0) {
        return defaultValue;
      }
      if (!self.usingQuery) {
        return defaultValue;
      }

      return self.options.slice(0, self.default_selection_count).map((o: any) => o.value);
    },
    initialSelection(value: string[] | null) {
      if (!value) {
        return this.defaultSelection;
      }
      return value;
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
    setDefaultSelection() {
      if (self.optionsLoading) {
        return;
      }
      // @ts-expect-error getRoot type
      const filters = getRoot(self).content.filters;
      // @ts-expect-error Property 'key' does not exist on type 'IStateTreeNode<IAnyStateTreeNode>
      const key = getParent(self).key;
      const options = new Set(self.options.map((o: any) => o.value));
      const values = filters.values[key] ?? [];
      const validValues = values.filter((v: any) => options.has(v));
      if (validValues.length > 0) {
        filters.setValueByKey(key, validValues);
      } else {
        filters.setValueByKey(key, self.defaultSelection);
      }
    },
  }))
  .actions((self) => ({
    afterCreate() {
      addDisposer(
        self,
        reaction(() => toJS(self.defaultSelection), self.setDefaultSelection, {
          fireImmediately: false,
          delay: 0,
        }),
      );
    },
  }));

export type FilterMultiSelectConfigInstance = Instance<typeof FilterMultiSelectConfigMeta>;

export const createFilterMultiSelectConfig = () =>
  FilterMultiSelectConfigMeta.create({
    _name: 'multi-select',
    default_value: [],
    static_options: [],
    options_query_id: '',
    default_selection_count: 0,
  });
