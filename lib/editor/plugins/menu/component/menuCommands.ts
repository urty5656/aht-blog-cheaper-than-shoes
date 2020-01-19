import { schema } from '@/lib/editor/schema';

import { setBlockType, toggleMark, wrapIn } from 'prosemirror-commands';
import { redo, undo } from 'prosemirror-history';
import { Schema } from 'prosemirror-model';

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
    label: 'pre',
    command: toggleMark<Schema>(schema.marks.code),
    icon: '/static/round-space_bar-24px.svg',
  },
  {
    label: selectedNode => {
      if (!selectedNode || selectedNode.type.name !== 'syntax') {
        return 'Code Snippet';
      }

      // [todo] ENUM?
      switch (selectedNode.attrs.lang) {
        case 'js':
          return 'JavaScript';
        case 'css':
          return 'CSS';
        case 'html':
          return 'HTML';
      }
      return 'Code Snippets';
    },
    dropdown: true,
    items: [
      {
        label: 'None',
        command: setBlockType<Schema>(schema.nodes.syntax),
      },
      {
        label: 'JavaScript',
        command: setBlockType<Schema>(schema.nodes.syntax, { lang: 'js' }),
      },
      {
        label: 'CSS',
        command: setBlockType<Schema>(schema.nodes.syntax, { lang: 'css' }),
      },
      {
        label: 'HTML',
        command: setBlockType<Schema>(schema.nodes.syntax, { lang: 'html' }),
      },
    ],
  },
  {
    label: selectedNode => {
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
    ],
  },
];
