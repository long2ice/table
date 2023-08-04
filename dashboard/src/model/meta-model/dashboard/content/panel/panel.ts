import { cast, types } from 'mobx-state-tree';
import { PanelLayoutMeta } from './layout';
import { PanelStyleMeta } from './style';
import { VariableMeta, VariableMetaInstance, VariableMetaSnapshotIn } from './variable';
import { PanelVizMeta } from './viz';

export const PanelMeta = types
  .model({
    id: types.string,
    title: types.string,
    description: types.string,
    layout: PanelLayoutMeta,
    queryIDs: types.array(types.string),
    viz: PanelVizMeta,
    style: PanelStyleMeta,
    variables: types.optional(types.array(VariableMeta), []),
  })
  .views((self) => ({
    get json() {
      const { id, title, description, queryIDs } = self;
      return {
        id,
        viz: self.viz.json,
        style: self.style.json,
        title,
        layout: self.layout.json,
        queryIDs: [...queryIDs],
        variables: self.variables.map((v) => v.json),
        description,
      };
    },
    get queryIDSet() {
      return new Set(self.queryIDs);
    },
  }))
  .actions((self) => ({
    setID(id: string) {
      self.id = id;
    },
    setTitle(title: string) {
      self.title = title;
    },
    setDescription(description: string) {
      self.description = description;
    },
    addQueryID(queryID: string) {
      if (self.queryIDSet.has(queryID)) {
        return;
      }
      self.queryIDs.push(queryID);
    },
    removeQueryID(queryID: string) {
      if (!self.queryIDSet.has(queryID)) {
        return;
      }
      const s = new Set(self.queryIDSet);
      s.delete(queryID);
      self.queryIDs = cast(Array.from(s));
    },
    setQueryIDs(queryIDs: string[]) {
      self.queryIDs = cast(queryIDs);
    },
    addVariable(variable: VariableMetaSnapshotIn) {
      self.variables.push(variable);
    },
    removeVariable(variable: VariableMetaInstance) {
      self.variables.remove(variable);
    },
  }));