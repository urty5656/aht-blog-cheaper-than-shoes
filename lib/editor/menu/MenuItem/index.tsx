import { Node } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import React from 'react';
import Button, { MenuItemButtonSpec } from './Button';
import Dropdown, { MenuItemDropdownSpec } from './Dropdown';
import styles from './styles.css';

export interface MenuItemBaseSpec {
  label: string | ((selectedNode: Nullable<Node>) => string);
  icon?: string;
}

export type MenuItemSpec = MenuItemButtonSpec | MenuItemDropdownSpec;

export const renderButton = (
  spec: MenuItemBaseSpec,
  selectedNode: Nullable<Node>,
) => {
  const label =
    typeof spec.label === 'function' ? spec.label(selectedNode) : spec.label;

  return spec.icon ? (
    <img className={styles.button} src={spec.icon} alt={label} />
  ) : (
    <span className={styles.button}>{label}</span>
  );
};

export interface MenuItemProps {
  spec: MenuItemSpec;
  view: EditorView;
  selectedNode: Nullable<Node>;
}

const MenuItem: React.FC<MenuItemProps> = ({ spec, view, selectedNode }) => {
  return spec.dropdown ? (
    <Dropdown spec={spec} view={view} selectedNode={selectedNode} />
  ) : (
    <Button spec={spec} view={view} selectedNode={selectedNode} />
  );
};

export default MenuItem;
