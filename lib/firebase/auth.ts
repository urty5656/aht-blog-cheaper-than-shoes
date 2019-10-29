import firebase from 'firebase/app';

import { auth } from './firebase';

export interface SignInError {
  code: number;
  message: string;
  email: string;
  credential: firebase.auth.AuthCredential;
}

const provider = new firebase.auth.GoogleAuthProvider();

export const signIn = (): Promise<firebase.auth.UserCredential> =>
  auth.signInWithPopup(provider);
export const signOut = (): Promise<void> => auth.signOut();

export { auth };
