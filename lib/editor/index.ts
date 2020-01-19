import { baseKeymap } from 'prosemirror-commands';
import { history } from 'prosemirror-history';
import { keymap } from 'prosemirror-keymap';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

import { menuPlugin } from './plugins/menu';
import { shortcuts } from './plugins/shortcuts';
import { schema } from './schema';

export const attach = (target: Node, initialState?: object): EditorView => {
  const config = {
    schema,
    plugins: [history(), shortcuts, keymap(baseKeymap), menuPlugin()],
  };

  const state = initialState
    ? EditorState.fromJSON(config, initialState)
    : EditorState.create(config);

  return new EditorView(target, { state });
};
