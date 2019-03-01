import firebase from 'firebase/app';
import { tryP } from 'fluture';
import { auth as instance } from './firebase';

export interface SignInError {
  code: number;
  message: string;
  email: string;
  credential: firebase.auth.AuthCredential;
}

const provider = new firebase.auth.GoogleAuthProvider()

export const signIn = () =>
  tryP<SignInError, firebase.auth.UserCredential>(() => instance.signInWithPopup(provider));

export const signOut = () => tryP<any, void>(() => instance.signOut());

export { instance };
