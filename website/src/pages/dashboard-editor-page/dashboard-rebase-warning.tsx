import { Divider, Notification, Text } from '@mantine/core';
import { useBoolean, useRequest } from 'ahooks';
import dayjs from 'dayjs';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { DashboardAPI } from '../../api-caller/dashboard';
import { useDashboardStore } from '../../frames/app/models/dashboard-store-context';
import { IDashboard } from '@devtable/dashboard';
import { RebaseDashboardConfigModal, RebaseDashboardConfigProvider } from './rebase-editor';

export interface DashboardRebaseWarningProps {
  localConfig: IDashboard;
  baseConfig: IDashboard;
}

export const DashboardRebaseWarning = observer((props: DashboardRebaseWarningProps) => {
  const { store } = useDashboardStore();
  const [show, { setFalse, set }] = useBoolean(false);

  const { data: latest, loading } = useRequest(async () => DashboardAPI.details(store.currentID), {
    refreshDeps: [store.currentID],
    pollingInterval: 6000,
  });

  useEffect(() => {
    if (loading || !store.currentDetail || store.detailsLoading) {
      return;
    }
    if (!latest?.update_time || !store.currentDetail.update_time) {
      return;
    }

    try {
      const next = new Date(latest.update_time).getTime();
      const current = new Date(store.currentDetail.update_time).getTime();
      const needsRebasing = next > current;
      set(needsRebasing);
    } catch (error) {
      console.error(error);
    }
  }, [latest, loading, store.currentDetail, store.detailsLoading]);

  if (!latest?.update_time) {
    return null;
  }

  if (!show) {
    return null;
  }

  const latestUpdatedAt = dayjs(latest.update_time).format('YYYY-MM-DD HH:mm:ss (UTC)');
  return (
    <Notification
      color="red"
      title={<Text size={16}>Version Alert</Text>}
      onClose={setFalse}
      sx={{ position: 'fixed', top: 10, right: 10, zIndex: 1000 }}
    >
      <Text mt={10} color="dark">
        A newer version of this dashboard has been submitted
      </Text>
      <Text color="red" fw="bold">
        Please refresh the page before making any changes
      </Text>
      <RebaseDashboardConfigProvider
        remote={latest?.content as IDashboard}
        base={props.baseConfig}
        local={props.localConfig}
      >
        <RebaseDashboardConfigModal />
      </RebaseDashboardConfigProvider>
      <Divider my={10} variant="dotted" />
      <Text size={12} ta="right">
        Latest version: {latestUpdatedAt}
      </Text>
    </Notification>
  );
});
