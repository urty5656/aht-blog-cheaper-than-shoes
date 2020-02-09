import React, { memo, useState } from 'react';

import Button, { MenuItemButtonSpec } from '../Button';
import menuItemStyles from '../styles.module.scss';
import styles from './styles.module.scss';

import { MenuItemBaseSpec, MenuItemProps, renderButton } from '..';

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

  const on: React.MouseEventHandler = e => {
    e.preventDefault();
    setOpened(true);
  };

  const off: React.MouseEventHandler = () => {
    setOpened(false);
  };

  return (
    <div className={menuItemStyles.container} onMouseDown={on} onMouseUp={off}>
      {renderButton(spec, selectedNode)}
      {opened && (
        <div className={styles.menu}>
          {spec.items.map((item, index) => (
            <Button
              key={index}
              spec={item}
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
