import { Sx } from '@mantine/core';
import { Link, RichTextEditor, RichTextEditorProps } from '@mantine/tiptap';
import { Color } from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import SubScript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import _ from 'lodash';
import { useEffect, useMemo } from 'react';
import { TDashboardState, VariableAggValueMap } from '~/model';
import { CommonHTMLContentStyle } from '~/styles/common-html-content-style';
import { getEmptyDashboardState } from '~/utils';
import { DynamicColorMark, getDynamicColorStyles } from './dynamic-color-mark';
import { FontSize } from './font-size-extension';
import { ColorMappingMark } from './color-mapping-mark';

interface IReadonlyRichText {
  value: string;
  styles?: RichTextEditorProps['styles'];
  sx?: Sx;
  dashboardState?: TDashboardState;
  variableAggValueMap?: VariableAggValueMap;
}

export const ReadonlyRichText = ({
  value,
  styles = {},
  sx = {},
  dashboardState = getEmptyDashboardState(),
  variableAggValueMap = {},
}: IReadonlyRichText) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      Table.configure({
        resizable: false, // https://github.com/ueberdosis/tiptap/issues/2041
        HTMLAttributes: {
          class: 'rich-text-table-render',
        },
      }),
      TableRow,
      TableHeader,
      TableCell,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder: 'This is placeholder' }),
      TextStyle,
      Color,
      FontSize,
      DynamicColorMark,
      ColorMappingMark,
    ],
    content: value,
    editable: false,
  });

  useEffect(() => {
    editor?.commands.setContent(value);
  }, [value, editor]);

  const doc = useMemo(() => {
    const parser = new DOMParser();
    return parser.parseFromString(value, 'text/html');
  }, [value]);

  const dynamicColorStyles = useMemo(() => {
    return getDynamicColorStyles(doc, dashboardState, variableAggValueMap);
  }, [doc, dashboardState, variableAggValueMap]);

  const finalStyles = useMemo(() => {
    return _.defaultsDeep({}, { content: { ...CommonHTMLContentStyle, ...dynamicColorStyles } }, styles);
  }, [styles, dynamicColorStyles]);

  return (
    <RichTextEditor editor={editor} styles={finalStyles} sx={sx}>
      <RichTextEditor.Content />
    </RichTextEditor>
  );
};
