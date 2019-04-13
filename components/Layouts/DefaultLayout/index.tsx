import React from 'react';
import styles from './styles.scss';

const DefaultLayout: React.FC = ({ children }) => {
  return <div className={styles.layout}>{children}</div>;
};

export default DefaultLayout;
