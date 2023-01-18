import { Divider, Flex, Group, Stack, TextInput } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { useModelContext } from '~/contexts';
import { EViewComponentType } from '~/types';
import { useCustomModalTitle } from './use-custom-modal-title';
import { CustomModalTitleField } from './modal-title-editor';
import { DEFAULT_CUSTOM_MODAL_TITLE, ICustomModalTitle } from './modal-title-editor/types';

export const ViewModalConfigFields = observer(() => {
  const model = useModelContext();
  const VIE = model.views.VIE;
  if (!VIE || VIE.type !== EViewComponentType.Modal) {
    return null;
  }
  const custom_modal_title = VIE.config.custom_modal_title ?? DEFAULT_CUSTOM_MODAL_TITLE;
  const title = useCustomModalTitle(custom_modal_title, VIE.name);
  return (
    <Stack>
      <Divider mt={8} label="Modal settings" labelPosition="center" />
      <Flex gap={10}>
        <TextInput label="Modal Title" defaultValue={title} disabled readOnly sx={{ flexGrow: 1 }} />
        <CustomModalTitleField
          value={VIE.config.custom_modal_title}
          onChange={(v: ICustomModalTitle) => {
            VIE.updateConfig('custom_modal_title', v);
          }}
        />
      </Flex>
      <Group grow>
        <TextInput
          label="Width"
          value={VIE.config.width}
          onChange={(e) => VIE.updateConfig('width', e.currentTarget.value)}
          placeholder="600px / 50vw"
        />
        <TextInput
          label="Height"
          value={VIE.config.height}
          onChange={(e) => VIE.updateConfig('height', e.currentTarget.value)}
          placeholder="600px / 50vw"
        />
      </Group>
    </Stack>
  );
});
