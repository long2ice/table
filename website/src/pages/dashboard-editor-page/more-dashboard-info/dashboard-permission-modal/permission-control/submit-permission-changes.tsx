import { Button } from '@mantine/core';
import { showNotification, updateNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons';
import { useBoolean } from 'ahooks';
import { observer } from 'mobx-react-lite';
import { DashboardPermissionAPI } from '../../../../../api-caller/dashboard-permission';
import { PermissionModelInstance } from '../model';

interface ISubmitPermissionChanges {
  model: PermissionModelInstance;
  postSubmit: () => void;
}

export const SubmitPermissionChanges = observer(({ model, postSubmit }: ISubmitPermissionChanges) => {
  const [loading, { setTrue, setFalse }] = useBoolean(false);
  const submit = async () => {
    if (!model.isOwner) {
      return;
    }

    setTrue();
    showNotification({
      id: 'submit',
      title: 'Pending',
      message: 'Submitting permission changes...',
      loading: true,
    });
    const { id, access } = model.json;
    try {
      await DashboardPermissionAPI.update({ id, access });
      updateNotification({
        id: 'submit',
        title: 'Successful',
        message: 'Permission has changed',
        color: 'green',
      });
      model.load();
      postSubmit();
    } catch (err) {
      updateNotification({
        id: 'submit',
        title: 'Failed',
        // @ts-expect-error unkown error
        message: err.message,
        color: 'red',
      });
    } finally {
      setFalse();
    }
  };
  return (
    <Button
      size="xs"
      variant="filled"
      color="green"
      leftIcon={<IconCheck size={14} />}
      onClick={submit}
      disabled={loading}
    >
      Confirm
    </Button>
  );
});