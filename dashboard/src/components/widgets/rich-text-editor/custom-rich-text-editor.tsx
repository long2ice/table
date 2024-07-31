import { ActionIcon, Group, Stack, Sx, Text } from '@mantine/core';
import { Link, RichTextEditor, RichTextEditorProps, useRichTextEditorContext } from '@mantine/tiptap';
import { IconBorderAll, IconDeviceFloppy } from '@tabler/icons-react';
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
import { forwardRef, useEffect, useMemo, useState } from 'react';
import { CommonHTMLContentStyle } from '~/styles/common-html-content-style';
import { ChooseFontSize, FontSize } from './font-size-extension';
import { DynamicColorControl, DynamicColorMark } from './dynamic-color-mark';
import { ColorPickerControl } from './color-picker-control';
import { GradientColorControl, GradientColorMark } from './gradient-color-mark';

const RTEContentStyle: Sx = {
  'dynamic-color': {
    position: 'relative',
  },
  'dynamic-color:after': {
    content: '""',
    position: 'absolute',
    bottom: '-2px',
    left: 0,
    width: '100%',
    height: '1px',
    border: 'double 1px purple',
  },
};

function InsertTableControl() {
  const { editor } = useRichTextEditorContext();
  return (
    <RichTextEditor.Control
      onClick={() => editor?.commands.insertTable({ rows: 3, cols: 3, withHeaderRow: true })}
      aria-label="Insert table"
      title="Insert table"
    >
      <IconBorderAll stroke={1.5} size={16} />
    </RichTextEditor.Control>
  );
}

interface ICustomRichTextEditor {
  value: string;
  onChange: (v: string) => void;
  styles?: RichTextEditorProps['styles'];
  label: string;
  autoSubmit?: boolean;
  onSubmit?: () => void;
}

export const CustomRichTextEditor = forwardRef(
  ({ value, onChange, styles = {}, label, autoSubmit, onSubmit }: ICustomRichTextEditor, ref: any) => {
    const [content, setContent] = useState(value);
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
        GradientColorMark,
      ],
      content,
      onUpdate: ({ editor }) => {
        const newContent = editor.getHTML();
        setContent(newContent);
      },
    });

    useEffect(() => {
      setContent((content) => {
        if (value === content) {
          return content;
        }
        editor?.commands.setContent(value);
        return value;
      });
    }, [value]);

    const submit = () => {
      onChange(content);
      onSubmit?.();
    };
    const changed = value !== content;

    useEffect(() => {
      if (!autoSubmit) {
        return;
      }
      submit();
    }, [autoSubmit, changed]);

    const finalStyles = useMemo(() => {
      return _.defaultsDeep({}, { content: { ...CommonHTMLContentStyle, ...RTEContentStyle } }, styles);
    }, [styles]);

    if (!editor) {
      return null;
    }

    return (
      <Stack spacing={4} sx={{ flexGrow: 1, position: 'relative' }}>
        <Group align="center">
          <Text size={14} fw={500}>
            {label}
          </Text>
          {!autoSubmit && (
            <ActionIcon color="green" disabled={!changed} onClick={submit}>
              <IconDeviceFloppy size={18} />
            </ActionIcon>
          )}
        </Group>
        <RichTextEditor editor={editor} styles={finalStyles}>
          <RichTextEditor.Toolbar sticky stickyOffset={0}>
            <RichTextEditor.ControlsGroup>
              <ColorPickerControl editor={editor} />
              <GradientColorControl editor={editor} />
              <DynamicColorControl editor={editor} />
            </RichTextEditor.ControlsGroup>
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Bold />
              <RichTextEditor.Italic />
              <RichTextEditor.Underline />
              {/* https://github.com/merico-dev/table/issues/1088 */}
              {/* <RichTextEditor.Strikethrough /> */}
              <RichTextEditor.ClearFormatting />
              <RichTextEditor.Highlight />
              <RichTextEditor.Code />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.H1 />
              <RichTextEditor.H2 />
              <RichTextEditor.H3 />
              <RichTextEditor.H4 />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Blockquote />
              <RichTextEditor.Hr />
              <RichTextEditor.BulletList />
              <RichTextEditor.OrderedList />
              <RichTextEditor.Subscript />
              <RichTextEditor.Superscript />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Link />
              <RichTextEditor.Unlink />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.AlignLeft />
              <RichTextEditor.AlignCenter />
              <RichTextEditor.AlignJustify />
              <RichTextEditor.AlignRight />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <InsertTableControl />
            </RichTextEditor.ControlsGroup>

            <ChooseFontSize editor={editor} />
          </RichTextEditor.Toolbar>
          <RichTextEditor.Content />
        </RichTextEditor>
      </Stack>
    );
  },
);
