import firebase from 'firebase/app';
import { auth } from './firebase';

export interface SignInError {
  code: number;
  message: string;
  email: string;
  credential: firebase.auth.AuthCredential;
}

const provider = new firebase.auth.GoogleAuthProvider();

export const signIn = () => auth.signInWithPopup(provider);
export const signOut = () => auth.signOut();

export { auth };
