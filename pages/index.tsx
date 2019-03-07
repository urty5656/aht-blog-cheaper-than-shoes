import { observer } from 'mobx-react-lite';
import { NextFunctionComponent } from 'next';
import React from 'react';
import Placeholder from '../components/Index/Placeholder';
import styles from '../styles/pages/index.css';

const Index: NextFunctionComponent = () => {
  return (
    <main className={styles.container}>
      <Placeholder />
    </main>
  );
};

export default observer(Index);
