import { observer } from 'mobx-react-lite';
import { NextFC } from 'next';
import React from 'react';
import Placeholder from '../components/index/Placeholder';
import Layout from '../components/layouts/DefaultLayout';

const Index: NextFC = () => {
  return (
    <Layout>
      <main>
        <Placeholder />
      </main>
    </Layout>
  );
};

export default observer(Index);
