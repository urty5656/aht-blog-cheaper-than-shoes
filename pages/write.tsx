import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import Editor from '../components/Editor';
import { authStoreCtx } from '../stores/auth';
import { NextFunctionComponent } from 'next';
import { instanceF } from '../lib/firebase/firestore';

const render = (flag: boolean, content: JSX.Element): JSX.Element => {
  return flag ? content : <h1>Loading...</h1>;
};

const Write: NextFunctionComponent = () => {
  const authStore = useContext(authStoreCtx);

  return (
    <main>
      {render(
        process.browser && authStore.initialized,
        <form action="#" autoComplete="off">
          <input placeholder="제목" />
          <Editor />
          <button type="submit">등록</button>
        </form>,
      )}
    </main>
  );
};
Write.getInitialProps = async () => {
  instanceF.fork(console.log, console.log);
};

export default observer(Write);
