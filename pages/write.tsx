import { observer } from 'mobx-react-lite';
import { NextFC } from 'next';
import dynamic from 'next/dynamic';
import React, { useContext } from 'react';
import Layout from '../components/layouts/DefaultLayout';
import EditorForm from '../components/write/EditorForm';
import SubmitModal from '../components/write/SubmitModal';
import { authStoreCtx } from '../stores/auth';
import { useGlobalStore } from '../stores/global';

const UnauthorizedWarning = dynamic(
  () => import('../components/common/UnauthorizedWarning'),
  {
    ssr: false,
  },
);

const render = (flag: boolean, content: JSX.Element): JSX.Element => {
  return flag ? content : <h1>Loading...</h1>;
};

const Write: NextFC = () => {
  useGlobalStore();

  const authStore = useContext(authStoreCtx);

  return (
    <Layout>
      <main>
        {render(process.browser && authStore.initialized, <EditorForm />)}
      </main>
      {<UnauthorizedWarning />}
      <SubmitModal />
    </Layout>
  );
};

export default observer(Write);
