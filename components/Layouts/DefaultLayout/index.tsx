import React from 'react';
import styles from './styles.css';

const DefaultLayout: React.FunctionComponent = ({ children }) => {
  return <div className={styles.layout}>{children}</div>;
};

export default DefaultLayout;
