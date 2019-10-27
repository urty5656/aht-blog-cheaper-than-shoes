import { BaseModel } from '@/models/BaseModel';
import { Collections } from '@/models/Collections';
import { CommonError, error, fromFirebaseError } from '@/models/Common/error';
import { getNow } from '@/utils/io/date';
import { assoc } from 'fp-ts-ramda';
import { IO, io } from 'fp-ts/lib/IO';
import { left, right, TaskEither, tryCatch } from 'fp-ts/lib/TaskEither';
import * as HTTPStatusCodes from 'http-status-codes';
import { db } from './firebase';

export const firestoreErrorToHTTP = (
  code: firebase.firestore.FirestoreErrorCode,
): number => {
  switch (code) {
    case 'not-found':
      return HTTPStatusCodes.NOT_FOUND;
    case 'out-of-range':
      return HTTPStatusCodes.BAD_REQUEST;
    case 'unauthenticated':
      return HTTPStatusCodes.UNAUTHORIZED;
    case 'permission-denied':
      return HTTPStatusCodes.FORBIDDEN;
    case 'already-exists':
      return HTTPStatusCodes.CONFLICT;
    case 'resource-exhausted':
      return HTTPStatusCodes.INSUFFICIENT_STORAGE;
    default:
      return HTTPStatusCodes.INTERNAL_SERVER_ERROR;
  }
};

// requester
export const getData = (collection: Collections) => (
  ref: string,
): TaskEither<CommonError, firebase.firestore.DocumentSnapshot> =>
  tryCatch(
    () =>
      db
        .collection(collection)
        .doc(ref)
        .get(),
    fromFirebaseError,
  );

// filters
export const filterFound = (
  doc: firebase.firestore.DocumentSnapshot,
): TaskEither<CommonError, firebase.firestore.DocumentSnapshot> =>
  doc.exists ? left(error('already-exists')) : right(doc);

export const filterNotFound = (
  doc: firebase.firestore.DocumentSnapshot,
): TaskEither<CommonError, firebase.firestore.DocumentSnapshot> =>
  !doc.exists ? left(error('not-found')) : right(doc);

// writers
export const writeData = (data: any, create?: boolean) => (
  doc: firebase.firestore.DocumentSnapshot,
): TaskEither<CommonError, void> =>
  tryCatch(() => doc.ref[create ? 'set' : 'update'](data), fromFirebaseError);

export const deleteData = (
  ref: firebase.firestore.DocumentReference,
): TaskEither<CommonError, void> =>
  tryCatch(() => ref.delete(), fromFirebaseError);

/** Set the post's created/modified time fields to the given timestamp. */
export const setTimeInfo = <T extends BaseModel>(post: T) => (
  now: number,
): IO<T> => () => {
  const postWithModTime = assoc('modified', now, post);
  return postWithModTime.created
    ? postWithModTime
    : assoc('created', now, postWithModTime);
};

/** Associate current time with the post's respective time field. */
export const updateTimeInfo = <T extends BaseModel>(post: T): IO<T> =>
  io.chain(getNow, setTimeInfo(post));
