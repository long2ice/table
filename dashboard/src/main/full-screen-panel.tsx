import { Button, Group, Stack } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { ArrowLeft } from 'tabler-icons-react';
import { Panel } from '../panel';
import { IDashboardPanel } from '../types';

export const FullScreenPanel = observer(function _FullScreenPanel({
  panel,
  exitFullScreen,
}: {
  panel: IDashboardPanel;
  exitFullScreen: () => void;
}) {
  return (
    <Stack px="10px" pb="5px" sx={{ flexGrow: 1, justifyContent: 'flex-start' }}>
      <Group mx="-5px" sx={{ flexGrow: 0 }}>
        <Button variant="default" size="sm" onClick={exitFullScreen} leftIcon={<ArrowLeft size={20} />}>
          Exit fullscreen
        </Button>
      </Group>
      <Group mx="-5px" grow sx={{ flexGrow: 1, flexShrink: 0 }}>
        <Panel {...panel} />
      </Group>
    </Stack>
  );
});