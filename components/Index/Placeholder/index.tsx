import dynamic from 'next/dynamic';
import React from 'react';
import styles from './styles.css';

const Canvasic = dynamic(() => import('../Canvasic'), {
  ssr: false,
  loading: () => <h1 className={styles.heading}>PLEASE WAIT</h1>,
});

const Placeholder: React.FC = () => {
  return (
    <div className={styles.container}>
      <Canvasic />
      <p className={styles.desc}>IT'S NOT READY YET</p>
    </div>
  );
};

export default Placeholder;
