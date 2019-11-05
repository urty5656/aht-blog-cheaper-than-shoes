import { constTrue } from 'fp-ts/lib/function';
import { action, autorun, observable } from 'mobx';
import { Node, Schema } from 'prosemirror-model';
import { findParentNode } from 'prosemirror-utils';
import { EditorView } from 'prosemirror-view';
import React from 'react';
import ReactDOM from 'react-dom';

import MenuBar from './MenuBar';
import { menuCommands } from './menuCommands';
import MenuItem from './MenuItem';

export class MenuView {
  @observable
  selectedNode: Nullable<Node> = null;

  private el = document.createElement('div');
  private parent: HTMLElement;

  constructor(private editorView: EditorView<Schema>) {
    if (!this.editorView.dom.parentElement) {
      throw new Error(`Can't find Editor DOM`);
    }

    this.parent = this.editorView.dom.parentElement;
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
  update(): void {
    const parent = findParentNode(constTrue)(this.editorView.state.selection);
    if (parent) {
      this.selectedNode = parent.node;
    }
    // [todo] move out to a new plugin
    this.parent.dispatchEvent(new CustomEvent('update'));
  }
}
