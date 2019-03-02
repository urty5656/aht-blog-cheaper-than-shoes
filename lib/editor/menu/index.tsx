import { Plugin } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import React from 'react';
import ReactDOM from 'react-dom';
import MenuBar from './MenuBar';
import { MenuItem } from './MenuItem';
import { menuCommands } from './menuCommands';

export const menu = () => {
  return new Plugin({
    view(editorView) {
      return new MenuView(editorView);
    },
  });
};

class MenuView {
  private el = document.createElement('div');

  constructor(private editorView: EditorView) {
    const parent = this.editorView.dom.parentElement;
    if (!parent) {
      return;
    }

    parent.prepend(this.el);
    ReactDOM.render(
      <MenuBar>
        {menuCommands.map(spec => (
          <MenuItem key={spec.label} spec={spec} view={this.editorView} />
        ))}
      </MenuBar>,
      this.el,
    );
  }

  update() {
    console.log(this.editorView.state);
  }
}
