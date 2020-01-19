import { TE } from '@/prelude';
import firebase from 'firebase/app';
import { constVoid } from 'fp-ts/lib/function';

import { auth } from './firebase';

const provider = new firebase.auth.GoogleAuthProvider();

export const signIn: TE.TaskEither<
  string,
  firebase.auth.UserCredential
> = TE.tryCatch(
  () => auth.signInWithPopup(provider),
  error => (error as firebase.auth.AuthError).code,
);
export const signOut: TE.TaskEither<void, void> = TE.tryCatch(
  () => auth.signOut(),
  constVoid,
);

export { auth };
