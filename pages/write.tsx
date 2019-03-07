import { observer } from 'mobx-react-lite';
import { NextFunctionComponent } from 'next';
import React, { useContext } from 'react';
import Layout from '../components/Layouts/DefaultLayout';
import Form from '../components/Write/Form';
import SubmitModal from '../components/Write/SubmitModal';
import { authStoreCtx } from '../stores/auth';

const render = (flag: boolean, content: JSX.Element): JSX.Element => {
  return flag ? content : <h1>Loading...</h1>;
};

const Write: NextFunctionComponent = () => {
  const authStore = useContext(authStoreCtx);

  return (
    <Layout>
      <main>{render(process.browser && authStore.initialized, <Form />)}</main>
      <SubmitModal />
    </Layout>
  );
};

export default observer(Write);
