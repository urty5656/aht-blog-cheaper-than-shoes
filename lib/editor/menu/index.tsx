import { redo, undo } from 'prosemirror-history';
import { Plugin } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import React from 'react';
import ReactDOM from 'react-dom';
import MenuBar from './MenuBar';
import MenuItem from './MenuItem';

export const menu = () => {
  return new Plugin({
    view(editorView) {
      return new MenuView(editorView);
    }
  })
}

class MenuView {
  private el: HTMLDivElement;

  constructor(private editorView: EditorView) {
    this.el = document.createElement('div');

    const parent = this.editorView.dom.parentElement;
    if (!parent) {
      return;
    }

    parent.prepend(this.el);
    ReactDOM.render((
      <MenuBar>
        <MenuItem spec={{ label: 'Undo', command: undo }} view={this.editorView} />
        <MenuItem spec={{ label: 'Redo', command: redo }} view={this.editorView} />
      </MenuBar>
    ), this.el)
  }

  update() {
    console.log(this.editorView.state);
  }
}