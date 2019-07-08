import React from 'react';
import styles from './styles.scss';

const TriButton: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.red} />
      <div className={styles.green} />
      <div className={styles.blue} />
    </div>
  );
};

export default TriButton;
