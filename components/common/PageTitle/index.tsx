import React from 'react';
import styles from './styles.scss';

const PageTitle: React.FC<{ children: React.ReactText }> = ({ children }) => (
  <h1 className={styles.pageTitle}>{children}</h1>
);

export default PageTitle;
