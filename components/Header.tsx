import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import React, { useContext } from 'react';
import { authStoreCtx } from '../stores/auth';

const Header: React.FunctionComponent = () => {
  const authStore = useContext(authStoreCtx);

  const renderSignInButton = () => {
    return authStore.user
      ? <button onClick={authStore.signOut}>SignOut</button>
      : <button onClick={authStore.signIn}>SignIn</button>
  }

  return (
    <header>
      <Link href="/"><a>Home</a></Link> | <Link href="/write"><a>Write a post</a></Link> | {renderSignInButton()}
    </header>
  )
};

export default observer(Header);
