import { action, autorun, observable } from 'mobx';
import { Node, Schema } from 'prosemirror-model';
import { findParentNode } from 'prosemirror-utils';
import { EditorView } from 'prosemirror-view';
import { always } from 'ramda';
import React from 'react';
import ReactDOM from 'react-dom';
import { menuCommands } from '../menuCommands';
import MenuBar from './MenuBar';
import MenuItem from './MenuItem';

export class MenuView {
  @observable
  selectedNode: Nullable<Node> = null;

  private el = document.createElement('div');
  private parent: HTMLElement;

  constructor(private editorView: EditorView<Schema>) {
    this.parent = this.editorView.dom.parentElement!;
    if (!this.parent) {
      return;
    }

    this.parent.prepend(this.el);

    autorun(() => {
      ReactDOM.render(
        // tslint:disable-next-line
        <MenuBar>
          {menuCommands.map((spec, index) => (
            <MenuItem
              key={index}
              spec={spec}
              view={this.editorView}
              selectedNode={this.selectedNode}
            />
          ))}
        </MenuBar>,
        this.el,
      );
    });
  }

  @action
  update() {
    const parent = findParentNode(always(true))(
      this.editorView.state.selection,
    );
    if (parent) {
      this.selectedNode = parent.node;
    }
    // [todo] move out to a new plugin
    this.parent.dispatchEvent(new CustomEvent('update'));
  }
}
