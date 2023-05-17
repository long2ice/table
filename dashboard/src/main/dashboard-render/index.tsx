import { Box } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { useCreation, useRequest } from 'ahooks';
import _ from 'lodash';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useInteractionOperationHacks } from '~/interactions/temp-hack';
import { createPluginContext, PluginContext } from '~/plugins';
import { ServiceLocatorProvider } from '~/service-locator/use-service-locator';
import { DashboardViewRender } from '~/view';
import { configureAPIClient } from '../../api-caller/request';
import { LayoutStateContext } from '../../contexts/layout-state-context';
import { ModelContextProvider } from '../../contexts/model-context';
import { createDashboardModel } from '../../model';
import { ContextInfoType } from '../../model/context';
import { DashboardContentDBType, IDashboard } from '../../types/dashboard';
import { useTopLevelServices } from '../use-top-level-services';
import { listDataSources } from '~/api-caller';
import { FullScreenPanelContext } from '~/contexts';
import './index.css';
import { registerThemes } from '~/styles/register-themes';
import { ContentModelContextProvider } from '~/contexts/content-model-context';

registerThemes();

interface IReadOnlyDashboard {
  context: ContextInfoType;
  dashboard: IDashboard;
  content: DashboardContentDBType;
  className?: string;
  config: IDashboardConfig;
  fullScreenPanelID: string;
  setFullScreenPanelID: (v: string) => void;
}

export const ReadOnlyDashboard = observer(
  ({
    context,
    dashboard,
    content,
    className = 'dashboard',
    config,
    fullScreenPanelID,
    setFullScreenPanelID,
  }: IReadOnlyDashboard) => {
    configureAPIClient(config);

    const { data: datasources = [] } = useRequest(listDataSources);

    const model = React.useMemo(
      () => createDashboardModel(dashboard, content, datasources, context),
      [dashboard, content],
    );
    useInteractionOperationHacks(model.content, false);

    React.useEffect(() => {
      model.context.replace(context);
    }, [context]);

    React.useEffect(() => {
      model.datasources.replace(datasources);
    }, [datasources]);

    const pluginContext = useCreation(createPluginContext, []);
    const configureServices = useTopLevelServices(pluginContext);
    return (
      <ModalsProvider>
        <ModelContextProvider value={model}>
          <ContentModelContextProvider value={model.content}>
            <FullScreenPanelContext.Provider
              value={{
                fullScreenPanelID,
                setFullScreenPanelID,
              }}
            >
              <LayoutStateContext.Provider
                value={{
                  layoutFrozen: true,
                  freezeLayout: _.noop,
                  inEditMode: false,
                }}
              >
                <Box className={`${className} dashboard-root`}>
                  <PluginContext.Provider value={pluginContext}>
                    <ServiceLocatorProvider configure={configureServices}>
                      {model.content.views.visibleViews.map((view) => (
                        <DashboardViewRender key={view.id} view={view} />
                      ))}
                    </ServiceLocatorProvider>
                  </PluginContext.Provider>
                </Box>
              </LayoutStateContext.Provider>
            </FullScreenPanelContext.Provider>
          </ContentModelContextProvider>
        </ModelContextProvider>
      </ModalsProvider>
    );
  },
);
