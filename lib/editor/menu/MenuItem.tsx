import { Schema } from 'prosemirror-model';
import { EditorState, Transaction } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import React from 'react';

export type Command = <S extends Schema = any>(
  state: EditorState<S>,
  dispatch?: (tr: Transaction<S>) => void,
  view?: EditorView<S>
) => boolean;

export interface MenuItemSpec {
  label: string;
  command: Command;
}

interface MenuItemProps {
  spec: MenuItemSpec;
  view: EditorView;
}

const MenuItem: React.FunctionComponent<MenuItemProps> = ({ spec, view }) => {
  const runCommand = (e: React.MouseEvent) => {
    e.preventDefault();
    spec.command(view.state, view.dispatch, view)
  };

  return (
    <button onClick={runCommand}>{spec.label}</button>
  )
}

export default MenuItem;
