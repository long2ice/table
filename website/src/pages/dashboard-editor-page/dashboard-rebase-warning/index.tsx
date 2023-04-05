import { IDashboard } from '@devtable/dashboard';
import { Divider, Group, Notification, Overlay, Text } from '@mantine/core';
import { useBoolean, useRequest } from 'ahooks';
import dayjs from 'dayjs';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { DashboardAPI } from '../../../api-caller/dashboard';
import { useDashboardStore } from '../../../frames/app/models/dashboard-store-context';
import { useSocketContext } from '../../../frames/socket-client-frame/socket-context';
import { RebaseActions } from './rebase-actions';
import { useRebaseModel } from './rebase-editor/rebase-config-context';

type DashboardUpdateMessageType = {
  update_time: string;
  message: 'UPDATED';
  auth_id: string | null;
  auth_type: null | 'APIKEY' | 'ACCOUNT';
};

export const DashboardRebaseWarning = observer(() => {
  const { store } = useDashboardStore();
  const { socket } = useSocketContext();
  const rebaseModel = useRebaseModel();
  const [remoteKey, setRemoteKey] = useState('');

  const id = store.currentID;
  useEffect(() => {
    socket.on(`DASHBOARD:${id}`, ({ update_time }: DashboardUpdateMessageType) => {
      setRemoteKey(update_time);
    });
  }, [socket, id]);

  const [show, { setFalse, set }] = useBoolean(false);

  const { data: latest, loading } = useRequest(async () => DashboardAPI.details(store.currentID), {
    refreshDeps: [store.currentID, remoteKey],
  });

  useEffect(() => {
    rebaseModel.setRemote(latest?.content as IDashboard);
  }, [latest, rebaseModel]);

  const currentUpdateTime = store.currentDetail?.update_time;
  useEffect(() => {
    const current = store.currentDetail?.content as IDashboard;
    if (current) {
      rebaseModel.setLocal(current);
    }
  }, [currentUpdateTime]);

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
      const needsRebasing = next > current && rebaseModel.resolvedRemotes.has(remoteKey) === false;
      set(needsRebasing);
    } catch (error) {
      console.error(error);
    }
  }, [latest, loading, store.currentDetail, store.detailsLoading, remoteKey]);

  if (!latest?.update_time) {
    return null;
  }

  if (!show) {
    return null;
  }

  const latestUpdatedAt = dayjs(latest.update_time).format('YYYY-MM-DD HH:mm:ss (UTC)');
  return (
    <>
      <Overlay zIndex={310} color="black" opacity={0.4} blur={2} />
      <Notification
        color="red"
        title={
          <Group>
            <Text size={16}>Version Alert</Text>
            <Text size={12} color="dimmed">
              Remote version: {latestUpdatedAt}
            </Text>
          </Group>
        }
        onClose={setFalse}
        disallowClose
        sx={{ position: 'fixed', top: 10, right: 15, zIndex: 410 }}
      >
        <Text mt={10} color="dark">
          A newer version of this dashboard has been submitted.
        </Text>
        <Divider mt={20} mb={10} variant="dotted" />
        <Group position="right">
          <RebaseActions rebaseModel={rebaseModel} remoteKey={remoteKey} onFinish={setFalse} />
        </Group>
      </Notification>
    </>
  );
});
