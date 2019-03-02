import { setBlockType, toggleMark, wrapIn } from 'prosemirror-commands';
import { redo, undo } from 'prosemirror-history';
import { Schema } from 'prosemirror-model';
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
  ...Array(4)
    .fill(0)
    .map((_, index) => ({
      label: `Heading ${index + 1}`,
      command: setBlockType<Schema>(schema.nodes.heading, { level: index + 1 }),
    })),
  {
    label: 'paragraph',
    command: setBlockType<Schema>(schema.nodes.paragraph),
  },
];
