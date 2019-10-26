import { getOrElse, none, Option, some } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';

export interface CommonError {
  /** HTTP status code. Use `null` for connection error. */
  code: firebase.firestore.FirestoreErrorCode;
  data?: any;
}

export const error = (
  code: firebase.firestore.FirestoreErrorCode,
  data?: any,
): CommonError => ({
  code,
  data,
});

const firebaseErrorToCommonError = (
  maybeFirebaseError: any,
): Option<CommonError> => {
  if (maybeFirebaseError == null || typeof maybeFirebaseError !== 'object') {
    return none;
  }

  if (
    maybeFirebaseError &&
    maybeFirebaseError.code &&
    maybeFirebaseError.message &&
    maybeFirebaseError.name
  ) {
    return some(
      maybeFirebaseError(maybeFirebaseError.code, {
        message: maybeFirebaseError.message,
        name: maybeFirebaseError.name,
      }),
    );
  }

  return none;
};

export const fromFirebaseError = (maybeFirebaseError: any): CommonError => {
  return pipe(
    maybeFirebaseError,
    firebaseErrorToCommonError,
    getOrElse(() => maybeFirebaseError('unknown')),
  );
};
