import { Instance, types } from 'mobx-state-tree';
import { IDataSource } from '~/api-caller/types';

import { GlobalSQLSnippetDBType } from '~/api-caller';
import {
  ContextMeta,
  ContextRecordType,
  DataSourcesMetaModel,
  GlobalSQLSnippetsMeta,
  TabInfo,
  createContextMeta,
} from '~/model';
import { DashboardContentDBType, IDashboard } from '~/types';
import { ContentRenderModel, createContentRenderModel } from './content';

export const DashboardRenderModel = types.model({
  id: types.identifier,
  name: types.string,
  group: types.string,
  content: ContentRenderModel,
  content_id: types.string,
  datasources: DataSourcesMetaModel,
  globalSQLSnippets: GlobalSQLSnippetsMeta,
  context: ContextMeta,
});

export function createDashboardRenderModel(
  { id, name, group, content_id }: IDashboard,
  content: DashboardContentDBType,
  datasources: IDataSource[],
  globalSQLSnippets: GlobalSQLSnippetDBType[],
  context: ContextRecordType,
  filterValues: Record<string, any>,
  activeTab: TabInfo | null,
) {
  return DashboardRenderModel.create({
    id,
    name,
    group,
    content_id,
    content: createContentRenderModel(content, context, filterValues, activeTab),
    datasources: {
      list: datasources,
    },
    globalSQLSnippets: {
      list: globalSQLSnippets,
    },
    context: createContextMeta(context),
  });
}

export type DashboardRenderModelInstance = Instance<typeof DashboardRenderModel>;
