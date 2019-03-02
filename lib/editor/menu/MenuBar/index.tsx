import React from 'react';
import styles from './styles.css';

const MenuBar: React.FunctionComponent = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default MenuBar;
