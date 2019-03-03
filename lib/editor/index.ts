import {
  baseKeymap,
  chainCommands,
  exitCode,
  toggleMark,
} from 'prosemirror-commands';
import { history, redo, undo } from 'prosemirror-history';
import { keymap } from 'prosemirror-keymap';
import { schema } from 'prosemirror-schema-basic';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { menu } from './menu';

export const attach = (target: Node): EditorView => {
  const state = EditorState.create({
    schema,
    plugins: [
      history(),
      keymap({
        'Mod-z': undo,
        'Mod-y': redo,
        'Mod-b': toggleMark(schema.marks.strong),
        'Mod-o': toggleMark(schema.marks.code),
        'Mod-enter': chainCommands(exitCode, (state, dispatch) => {
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
      }),
      keymap(baseKeymap),
      menu(),
    ],
  });
  return new EditorView(target, { state });
};
