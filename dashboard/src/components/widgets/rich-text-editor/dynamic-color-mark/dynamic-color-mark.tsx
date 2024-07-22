import { Mark, mergeAttributes } from '@tiptap/core';
import '@tiptap/extension-text-style';
import { ensurePrefixOnID, getDynamicColorID, trimDynamicColorFunc } from './utils';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    dynamicColor: {
      setDynamicColor: (fontSize: string) => ReturnType;
      unsetDynamicColor: () => ReturnType;
    };
  }
}

const AttrKey = 'data-value';
export const DynamicColorAttrKey = AttrKey;
export const DynamicColorName = 'dynamicColor';

export const DynamicColorMark = Mark.create({
  name: DynamicColorName,

  addAttributes() {
    return {
      id: {
        default: getDynamicColorID(6),
        parseHTML: (element) => {
          const id = element.getAttribute('id');
          return ensurePrefixOnID(id);
        },
      },
      [AttrKey]: {
        default: null,
        parseHTML: (element) => element.getAttribute(AttrKey),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'dynamic-color',
        getAttrs: (node: string | HTMLElement) => {
          if (typeof node === 'string') {
            console.debug(node);
            return false;
          }

          return [node.getAttribute(AttrKey)];
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['dynamic-color', HTMLAttributes, 0];
  },

  addCommands() {
    return {
      setDynamicColor:
        (v) =>
        ({ commands }) => {
          const value = trimDynamicColorFunc(v);
          return commands.setMark(this.name, {
            [AttrKey]: value,
          });
        },
      unsetDynamicColor:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },
    };
  },
});
