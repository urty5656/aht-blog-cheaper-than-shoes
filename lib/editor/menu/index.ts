import { Plugin } from 'prosemirror-state';

import { MenuView } from './component';

export const menu = (): Plugin => {
  return new Plugin({
    view(editorView) {
      return new MenuView(editorView as any);
    },
  });
};
