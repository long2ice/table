import { RichTextEditor } from '@mantine/rte';
import { noop } from 'lodash';
import { VizViewProps } from '../../../types/plugin';
import { useStorageData } from '../../hooks';
import { useSyncEditorContent } from './hooks';
import { IRichTextConf } from './type';

export function VizRichText({ context }: VizViewProps) {
  const { value: conf } = useStorageData<IRichTextConf>(context.instanceData, 'config');
  const content = conf?.content;
  const editorRef = useSyncEditorContent(content);

  if (conf?.content) {
    return <RichTextEditor ref={editorRef} readOnly value={conf.content} onChange={noop} sx={{ border: 'none' }} />;
  }
  return null;
}