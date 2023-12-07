import { TDashboardContent } from '~/types';
import { EViewComponentType } from './view';

export const CURRENT_SCHEMA_VERSION = '10.41.0';

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
  version: CURRENT_SCHEMA_VERSION,
};