import { Schema } from 'prosemirror-model';
import { EditorState, Transaction } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import React, { memo } from 'react';
import { MenuItemBaseSpec, MenuItemProps, renderButton } from '..';
import menuItemStyles from '../styles.css';

export type Command = (
  state: EditorState<Schema>,
  dispatch?: (tr: Transaction<Schema>) => void,
  view?: EditorView<Schema>,
) => boolean;

export interface MenuItemButtonSpec extends MenuItemBaseSpec {
  command: Command;
  dropdown?: never;
  items?: never;
}

interface ButtonProps extends MenuItemProps {
  spec: MenuItemButtonSpec;
  afterCommand?: (e: React.MouseEvent) => void;
}

const Button: React.FC<ButtonProps> = ({
  spec,
  view,
  selectedNode,
  afterCommand,
}) => {
  const runCommand = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    spec.command(view.state, view.dispatch, view);
    afterCommand && afterCommand(e);
  };

  return (
    <div
      className={menuItemStyles.container}
      onMouseDown={e => e.preventDefault()}
      onMouseUp={runCommand}
    >
      {renderButton(spec, selectedNode)}
    </div>
  );
};

export default memo(Button);
