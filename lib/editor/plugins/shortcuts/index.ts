import { chainCommands, exitCode, toggleMark } from 'prosemirror-commands';
import { redo, undo } from 'prosemirror-history';
import { keymap } from 'prosemirror-keymap';

import { schema } from '../../schema';
import { addLink } from './addLink';

export const shortcuts = keymap({
  'Mod-z': undo,
  'Mod-y': redo,
  'Mod-b': toggleMark(schema.marks.strong),
  'Mod-o': toggleMark(schema.marks.code),
  'Mod-l': addLink,
  'Shift-Enter': chainCommands(exitCode, (state, dispatch) => {
    if (!dispatch) {
      return true;
    }
    dispatch(
      state.tr
        .replaceSelectionWith(schema.nodes.hard_break.create())
        .scrollIntoView(),
    );
    return true;
  }),
});
