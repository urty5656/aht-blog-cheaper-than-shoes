import React, { useState, useEffect } from 'react';
import { NextFunctionComponent } from 'next';
import Link from "next/link";
import { auth } from '../services/firebase';

type UserSetter = React.Dispatch<React.SetStateAction<firebase.User | null>>;

const handleSignInWith = (setUser: UserSetter) => () => {
  auth.signIn().fork(console.error, () => {
    setUser(auth.instance.currentUser);
  });
}

const handleSignOutWith = (setUser: UserSetter) => () => {
  auth.signOut().fork(console.error, () => {
    setUser(null)
  });
}

const Index: NextFunctionComponent = () => {
  const [initialized, setInitialized] = useState(false);
  const [currentUser, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    auth.instance.onAuthStateChanged((user) => {
      !initialized && setInitialized(true);
      setUser(user);
    })
  }, [])

  const renderSignInButton = () => {
    if (!initialized) {
      return <p>Loading...</p>
    }
    return currentUser
      ? <button onClick={handleSignOutWith(setUser)}>SignOut</button>
      : <button onClick={handleSignInWith(setUser)}>SignIn</button>
  }

  return (
    <main>
      {renderSignInButton()}
      <Link href="/about"><a>Go About</a></Link>
    </main>
  );
};

export default Index;
