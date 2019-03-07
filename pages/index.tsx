import { observer } from 'mobx-react-lite';
import { NextFunctionComponent } from 'next';
import React from 'react';
import Placeholder from '../components/Index/Placeholder';
import Layout from '../components/Layouts/DefaultLayout';

const Index: NextFunctionComponent = () => {
  return (
    <Layout>
      <main>
        <Placeholder />
      </main>
    </Layout>
  );
};

export default observer(Index);
