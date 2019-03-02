import { observer } from 'mobx-react-lite';
import { NextFunctionComponent } from 'next';
import React, { useContext } from 'react';
import { authStoreCtx } from '../stores/auth';

const Index: NextFunctionComponent = () => {
  const authStore = useContext(authStoreCtx);

  return (
    <main>
      <h1>Hi!</h1>
      {authStore.user && <p>{authStore.user.email}</p>}
    </main>
  );
};

export default observer(Index);
