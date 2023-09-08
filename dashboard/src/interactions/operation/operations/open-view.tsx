import { Select } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { useStorageData } from '~/components/plugins';
import { useEditContentModelContext } from '~/contexts';
import { IDashboardOperation, IDashboardOperationSchema, IOperationConfigProps } from '~/types/plugin';

export interface IOpenViewOperationConfig {
  viewID: string;
}

const OpenViewOperationSettings = observer((props: IOperationConfigProps) => {
  const model = useEditContentModelContext();
  const { value, set } = useStorageData<IOpenViewOperationConfig>(props.operation.operationData, 'config');
  console.log({ value, viewID: value?.viewID });

  const viewID = value?.viewID || '';
  const setViewID = (viewID: string) => void set({ viewID });
  return (
    <Select
      defaultValue={viewID}
      value={viewID}
      onChange={setViewID}
      label="View"
      data={model.views.options}
      withinPortal
      zIndex={340}
      maxDropdownHeight={500}
    />
  );
});

async function run(payload: Record<string, unknown>, operation: IDashboardOperation) {
  const config = await operation.operationData.getItem<IOpenViewOperationConfig>('config');
  const viewID = config.viewID;
  window.dispatchEvent(new CustomEvent('open-view', { detail: { viewID } }));
}

export const OpenView: IDashboardOperationSchema = {
  displayName: 'Open View',
  id: 'builtin:op:open_view',
  configRender: OpenViewOperationSettings,
  run,
};
