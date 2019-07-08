import { PageFC } from '@/components/SortApp';
import { observer } from 'mobx-react-lite';
import React from 'react';
import Placeholder from '../components/index/Placeholder';
import Layout from '../components/layouts/DefaultLayout';
import { useGlobalStore } from '../stores/global';
import styles from '../styles/pages/index.scss';

const Index: PageFC = () => {
  useGlobalStore();

  return (
    <Layout>
      <main className={styles.container}>
        <Placeholder />
      </main>
    </Layout>
  );
};

export default observer(Index);
