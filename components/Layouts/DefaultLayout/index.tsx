import React from 'react';
import Loader from '../../common/Loader';
import styles from './styles.scss';

const DefaultLayout: React.FC = ({ children }) => {
  return (
    <>
      <div className={styles.layout}>{children}</div>
      <Loader />
    </>
  );
};

export default DefaultLayout;
