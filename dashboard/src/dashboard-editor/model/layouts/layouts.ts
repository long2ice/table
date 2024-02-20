import _ from 'lodash';
import { Instance, cast } from 'mobx-state-tree';
import { Layout } from 'react-grid-layout';
import { v4 as uuidV4 } from 'uuid';
import { LayoutSetInfo, LayoutSetMetaSnapshotIn, LayoutsRenderModel } from '~/model';

export const LayoutsModel = LayoutsRenderModel.actions((self) => ({
  addALayoutSet(id: string, name: string, breakpoint: number) {
    const target = self.basisLayoutSet;
    const newSet = target.json;
    newSet.id = id;
    newSet.name = name;
    newSet.breakpoint = breakpoint;
    newSet.list = newSet.list.map((l) => ({
      ...l,
      id: uuidV4(),
    }));
    self.list.push(newSet);
  },
  updateLayoutSetsInfo(infos: LayoutSetInfo[]) {
    const idmap = _.keyBy(self.list, 'id');
    infos.forEach((info) => {
      const layoutset = idmap[info.id];
      if (layoutset) {
        layoutset.setName(info.name);
        layoutset.setBreakpoint(info.breakpoint);
        delete idmap[info.id];
        return;
      }

      this.addALayoutSet(info.id, info.name, info.breakpoint);
    });

    const idsToRemove = new Set(Object.keys(idmap));
    const willRemove = idsToRemove.size > 0;
    idsToRemove.forEach((id) => {
      const i = self.list.findIndex((s) => s.id === id);
      self.list.splice(i, 1);
    });
    if (willRemove) {
      self.setCurrentBreakpoint('basis');
    }
  },
  updateCurrentLayoutItems(allLayouts: Record<string, Layout[]>) {
    const items = allLayouts[self.currentBreakpoint];
    console.log(self.currentBreakpoint);
    self.currentLayoutSet.updateLayouts(items);
  },
  append(item: LayoutSetMetaSnapshotIn) {
    self.list.push(item);
  },
  appendMultiple(items: LayoutSetMetaSnapshotIn[]) {
    if (items.length === 0) {
      return;
    }

    self.list.push(...items);
  },
  remove(index: number) {
    self.list.splice(index, 1);
  },
  removeByID(id: string) {
    const index = self.list.findIndex((o) => o.id === id);
    if (index === -1) {
      return;
    }
    self.list.splice(index, 1);
  },
  removeByIDs(ids: string[]) {
    ids.forEach((id) => {
      this.removeByID(id);
    });
  },
}));

export type LayoutsModelInstance = Instance<typeof LayoutsModel>;
