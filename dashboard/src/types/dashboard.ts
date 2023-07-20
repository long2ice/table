import { AnyObject } from '~/types/utils';
import { ITemplateVariable } from '~/utils/template';
import { FilterModelSnapshotOut } from '../dashboard-editor/model';
import { QueryModelSnapshotIn } from '../dashboard-editor/model/queries';
import { SQLSnippetModelSnapshotIn } from '../dashboard-editor/model/sql-snippets';

export interface IVizConfig {
  type: string;
  conf: AnyObject;
}

interface IDashboardPanelStyle {
  border: {
    enabled: boolean;
  };
}

export interface IDashboardPanel {
  id: string;
  title: string;
  description: string;
  layout: {
    x: number;
    y: number;
    w: number;
    h: number;
    moved?: boolean;
    static?: boolean;
  };
  queryIDs: string[];
  viz: IVizConfig;
  style: IDashboardPanelStyle;
  variables: ITemplateVariable[];
}

export enum DashboardMode {
  Use = 'use',
  Edit = 'edit',
}

export interface IDashboardDefinition {
  sqlSnippets: SQLSnippetModelSnapshotIn[];
  queries: QueryModelSnapshotIn[];
  mock_context: Record<string, $TSFixMe>;
}

export enum EViewComponentType {
  Division = 'div',
  Modal = 'modal',
  Tabs = 'tabs',
}

export const ViewComponentTypeName = {
  [EViewComponentType.Division]: 'Division',
  [EViewComponentType.Tabs]: 'Tabs',
  [EViewComponentType.Modal]: 'Modal',
};

export const ViewComponentTypeBackground = {
  [EViewComponentType.Division]: 'rgba(255, 0, 0, 0.2)',
  [EViewComponentType.Modal]: 'rgba(0, 0, 0, 0.2)',
  [EViewComponentType.Tabs]: 'rgba(255, 200, 100, 0.4)',
};

export const ViewComponentTypeColor = {
  [EViewComponentType.Division]: '#ff4000',
  [EViewComponentType.Modal]: '#000',
  [EViewComponentType.Tabs]: '#ffad18',
};

export interface IDashboardView {
  id: string;
  name: string;
  type: EViewComponentType;
  config: Record<string, any>;
  panelIDs: string[];
}

export interface IDashboard {
  id: string;
  name: string;
  group: string;
  content_id: string;
}

export interface TDashboardContent {
  definition: IDashboardDefinition;
  views: IDashboardView[];
  panels: IDashboardPanel[];
  filters: FilterModelSnapshotOut[];
  version: string;
}

export type DashboardContentDBType = {
  id: string;
  dashboard_id: string;
  name: string;
  content: TDashboardContent | null;
  create_time: string;
  update_time: string;
};

export const initialDashboardContent: TDashboardContent = {
  definition: {
    sqlSnippets: [],
    queries: [],
    mock_context: {},
  },
  views: [
    {
      id: 'Main',
      name: 'Main',
      type: EViewComponentType.Division,
      config: {},
      panelIDs: [] as string[],
    } as const,
  ],
  panels: [],
  filters: [],
  version: '9.19.0',
};
