import { Schema } from 'prosemirror-model';
import { EditorState, Transaction } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import React, { useState } from 'react';

export type Command = (
  state: EditorState<Schema>,
  dispatch?: (tr: Transaction<Schema>) => void,
  view?: EditorView<Schema>,
) => boolean;

interface MenuItemCommandSpec {
  label: string;
  icon?: string;
  command: Command;
  dropdown?: never;
  items?: never;
}
interface MenuItemDropdownSpec {
  label: string;
  icon?: string;
  command?: never;
  dropdown: true;
  items: MenuItemCommandSpec[];
}

export type MenuItemSpec = MenuItemCommandSpec | MenuItemDropdownSpec;

interface MenuItemProps {
  spec: MenuItemSpec;
  view: EditorView;
}

export const MenuItem: React.FunctionComponent<MenuItemProps> = ({
  spec,
  view,
}) => {
  const runCommand = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    spec.command && spec.command(view.state, view.dispatch, view);
  };

  return (
    <div onMouseDown={runCommand}>
      {spec.icon ? <img src={spec.icon} alt={spec.label} /> : spec.label}
    </div>
  );
};

export const MenuDropdown: React.FunctionComponent<{
  spec: MenuItemDropdownSpec;
  view: EditorView;
}> = ({ spec, view }) => {
  const [opened, setOpened] = useState(false);

  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpened(!opened);
  };

  return (
    <div onMouseDown={toggle}>
      {spec.icon ? <img src={spec.icon} alt={spec.label} /> : spec.label}
      {opened && (
        <div>
          {spec.items.map(spec => (
            <MenuItem spec={spec} view={view} />
          ))}
        </div>
      )}
    </div>
  );
};
