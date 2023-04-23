import { ActionIcon, Sx, Table } from '@mantine/core';
import { useRequest } from 'ahooks';
import { observer } from 'mobx-react-lite';
import { AccountAPI } from '../../../../../api-caller/account';
import { AccountOrAPIKeyOptionType } from '../../../../../api-caller/dashboard-permission.types';
import { AccountTypeIcon } from '../../../../../components/account-type-icon';
import { PermissionModelInstance } from '../model';
import { AccessPermissionSelector } from './access-permission-selector';
import { AccountOrAPIKeySelector } from './account-or-apikey-selector';
import { IconX } from '@tabler/icons';

const TableSx: Sx = {
  tableLayout: 'fixed',
  width: '100%',
  'tr.fallback-row': {
    fontSize: '14px',
    height: '45px',
    td: {
      paddingLeft: '20px',
    },
    'td:nth-of-type(2)': {
      fontWeight: 'bold',
    },
  },
};

const OpenUsageRow = () => (
  <tr className="fallback-row">
    <td />
    <td>Everyone</td>
    <td>Use</td>
    <td />
  </tr>
);
const OpenEditingRow = () => (
  <tr className="fallback-row">
    <td />
    <td>Everyone</td>
    <td>Edit</td>
    <td />
  </tr>
);
const OpenRemovalRow = () => (
  <tr className="fallback-row">
    <td />
    <td>Everyone</td>
    <td>Remove</td>
    <td />
  </tr>
);

interface IAccessRules {
  model: PermissionModelInstance;
}

export const AccessRulesTable = observer(({ model }: IAccessRules) => {
  const data = model.access;

  const { data: options, loading } = useRequest(
    async (): Promise<AccountOrAPIKeyOptionType[]> => {
      const accountResp = await AccountAPI.list();
      const accounts = accountResp.data.map((d) => ({ label: d.name, value: d.id, type: 'ACCOUNT' } as const));
      return accounts;
    },
    { refreshDeps: [] },
  );

  return (
    <Table highlightOnHover sx={TableSx}>
      <thead>
        <tr>
          <th style={{ width: '50px' }} />
          <th style={{ width: '55%' }}>Account / API Key</th>
          <th style={{ width: 'calc(45% - 100px)' }}>Permission</th>
          <th style={{ width: '50px' }} />
        </tr>
      </thead>
      <tbody>
        {[...data].map((d, i) => (
          <tr key={d.id}>
            <td>
              <AccountTypeIcon type={d.type} />
            </td>
            <td>
              <AccountOrAPIKeySelector value={d.id} onChange={d.setID} options={options} optionsLoading={loading} />
            </td>
            <td>
              <AccessPermissionSelector value={d.permission} onChange={d.setPermission} />
            </td>
            <td>
              <ActionIcon variant="subtle" color="red" onClick={() => model.removeAccess(i)}>
                <IconX size={14} />
              </ActionIcon>
            </td>
          </tr>
        ))}
        {!model.usageRestricted && <OpenUsageRow />}
        {!model.editingRestricted && <OpenEditingRow />}
        {!model.removalRestricted && <OpenRemovalRow />}
      </tbody>
    </Table>
  );
});
