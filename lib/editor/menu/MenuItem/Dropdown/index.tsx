import React, { memo, useState } from 'react';
import { MenuItemBaseSpec, MenuItemProps, renderButton } from '..';
import Button, { MenuItemButtonSpec } from '../Button';
import menuItemStyles from '../styles.css';
import styles from './styles.css';

export interface MenuItemDropdownSpec extends MenuItemBaseSpec {
  command?: never;
  dropdown: true;
  items: MenuItemButtonSpec[];
}

interface DropdownProps extends MenuItemProps {
  spec: MenuItemDropdownSpec;
}

const Dropdown: React.FC<DropdownProps> = ({ spec, view, selectedNode }) => {
  const [opened, setOpened] = useState(false);

  const on = (e: React.MouseEvent | MouseEvent) => {
    e.preventDefault();
    setOpened(true);
  };

  const off = () => {
    setOpened(false);
  };

  return (
    <div className={menuItemStyles.container} onMouseDown={on} onMouseUp={off}>
      {renderButton(spec, selectedNode)}
      {opened && (
        <div className={styles.menu}>
          {spec.items.map((spec, index) => (
            <Button
              key={index}
              spec={spec}
              view={view}
              selectedNode={selectedNode}
              afterCommand={off}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(Dropdown);
