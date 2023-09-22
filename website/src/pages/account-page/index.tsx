import { AccountList } from '@devtable/settings-form';
import { Anchor, Box, Breadcrumbs, Group } from '@mantine/core';
import { Helmet } from 'react-helmet-async';
import { SettingsFormConfig } from '../../utils/config';

const items = [
  { name: 'Settings', to: '/admin' },
  { name: 'Accounts', to: '/admin/account/list' },
].map((item) => (
  <Anchor href={item.to} key={item.to}>
    {item.name}
  </Anchor>
));

export function AccountsPage() {
  return (
    <Box sx={{ maxWidth: 1200 }}>
      <Helmet>
        <title>Accounts</title>
      </Helmet>
      <Group position="apart" sx={{ width: '100%' }}>
        <Breadcrumbs>{items}</Breadcrumbs>
      </Group>
      <AccountList config={SettingsFormConfig} />
    </Box>
  );
}
