import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import React, { useContext } from 'react';
import { authStoreCtx } from '../../../stores/auth';
import styles from './styles.scss';

const Header: React.FC = () => {
  const authStore = useContext(authStoreCtx);

  const renderWriteButton = () => {
    return authStore.IsAdmin ? (
      <Link href="/write">
        <a>Write a post</a>
      </Link>
    ) : null;
  };

  const renderSignInButton = () => {
    return authStore.user ? (
      <button onClick={authStore.signOut}>SignOut</button>
    ) : (
      <button onClick={authStore.signIn}>SignIn</button>
    );
  };

  return (
    <header className={styles.container}>
      <Link href="/">
        <a>Home</a>
      </Link>{' '}
      <Link href="/posts">
        <a>Posts</a>
      </Link>{' '}
      {renderWriteButton()} {renderSignInButton()}
    </header>
  );
};

export default observer(Header);
