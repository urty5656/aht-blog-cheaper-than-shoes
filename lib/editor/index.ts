import { baseKeymap } from 'prosemirror-commands';
import { history, redo, undo } from 'prosemirror-history';
import { keymap } from 'prosemirror-keymap';
import { schema } from 'prosemirror-schema-basic';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { menu } from './menu';

export const attach = (target: Node) => {
  const state = EditorState.create({
    schema,
    plugins: [
      history(),
      keymap({
        "Mod-z": undo,
        "Mod-y": redo
      }),
      keymap(baseKeymap),
      menu()
    ]
  });
  new EditorView(target, { state });
}
