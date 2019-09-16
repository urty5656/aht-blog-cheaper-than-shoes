import {
  baseKeymap,
  chainCommands,
  exitCode,
  toggleMark,
} from 'prosemirror-commands';
import { history, redo, undo } from 'prosemirror-history';
import { keymap } from 'prosemirror-keymap';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { menu } from './menu';
import { schema } from './schema';

export const attach = (target: Node, initialState?: object): EditorView => {
  const config = {
    schema,
    plugins: [
      history(),
      keymap({
        'Mod-z': undo,
        'Mod-y': redo,
        'Mod-b': toggleMark(schema.marks.strong),
        'Mod-o': toggleMark(schema.marks.code),
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
      }),
      keymap(baseKeymap),
      menu(),
    ],
  };

  const state = initialState
    ? EditorState.fromJSON(config, initialState)
    : EditorState.create(config);

  return new EditorView(target, { state });
};
