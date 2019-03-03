import { setBlockType, toggleMark, wrapIn } from 'prosemirror-commands';
import { redo, undo } from 'prosemirror-history';
import { Schema, Node } from 'prosemirror-model';
import { schema } from 'prosemirror-schema-basic';
import { MenuItemSpec } from './MenuItem';

export const menuCommands: MenuItemSpec[] = [
  {
    label: 'undo',
    command: undo,
    icon: '/static/round-undo-24px.svg',
  },
  {
    label: 'redo',
    command: redo,
    icon: '/static/round-redo-24px.svg',
  },
  {
    label: 'bold',
    command: toggleMark<Schema>(schema.marks.strong),
    icon: '/static/round-format_bold-24px.svg',
  },
  {
    label: 'quote',
    command: wrapIn<Schema>(schema.nodes.blockquote),
    icon: '/static/round-format_quote-24px.svg',
  },
  {
    label: 'code',
    command: toggleMark<Schema>(schema.marks.code),
    icon: '/static/round-code-24px.svg',
  },
  {
    label: (selectedNode: Nullable<Node>) => {
      if (!selectedNode) {
        return 'Style';
      }
      if (selectedNode.type.name === 'paragraph') {
        return 'Paragraph';
      }
      if (selectedNode.type.name === 'heading') {
        return `Heading ${selectedNode.attrs.level}`;
      }
      if (selectedNode.type.name === 'code_block') {
        return 'Code block';
      }
      return 'Style';
    },
    dropdown: true,
    items: [
      {
        label: 'Paragraph',
        command: setBlockType<Schema>(schema.nodes.paragraph),
      },
      ...Array(3)
        .fill(0)
        .map((_, index) => ({
          label: `Heading ${index + 1}`,
          command: setBlockType<Schema>(schema.nodes.heading, {
            level: index + 1,
          }),
        })),
      {
        label: 'Code block',
        command: setBlockType<Schema>(schema.nodes.code_block),
      },
    ],
  },
];
