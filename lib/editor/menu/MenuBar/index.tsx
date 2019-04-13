import React from 'react';
import styles from './styles.scss';

const MenuBar: React.FC = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default MenuBar;
