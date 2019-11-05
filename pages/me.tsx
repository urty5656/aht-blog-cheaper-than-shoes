import Placeholder from '@/components/index/Placeholder';
import Layout from '@/components/layouts/DefaultLayout';
import { PageFC } from '@/components/SortApp';
import styles from '@/styles/pages/index.scss';
import React from 'react';

const Index: PageFC = () => {
  return (
    <Layout>
      <main className={styles.container}>
        <Placeholder />
      </main>
    </Layout>
  );
};

export default Index;
