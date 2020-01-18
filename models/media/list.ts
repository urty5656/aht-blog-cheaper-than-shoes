import { db } from '@/lib/firebase/firebase';
import { Collections } from '@/models/Collections';
import * as O from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import * as TE from 'fp-ts/lib/TaskEither';

import { CommonError, fromFirebaseError } from '../Common/error';

const appendQueryPointer = (last?: firebase.firestore.DocumentSnapshot) => (
  query: firebase.firestore.Query,
) =>
  pipe(
    O.fromNullable(last),
    O.fold(
      () => query,
      () => query.startAfter(last),
    ),
  );

const prepareQuery = (
  limit: number,
  last?: firebase.firestore.DocumentSnapshot,
): firebase.firestore.Query =>
  pipe(
    db
      .collection(Collections.Media)
      .orderBy('created', 'desc')
      .limit(limit),
    appendQueryPointer(last),
  );

const makeFetch = (
  limit: number,
  last?: firebase.firestore.DocumentSnapshot,
): TE.TaskEither<CommonError, firebase.firestore.QuerySnapshot> =>
  TE.tryCatch(() => prepareQuery(limit, last).get(), fromFirebaseError);

const fetch = (
  limit: number,
  last: O.Option<firebase.firestore.DocumentSnapshot>,
): TE.TaskEither<CommonError, firebase.firestore.QuerySnapshot> =>
  pipe(
    last,
    O.fold(
      () => makeFetch(limit),
      lastRef => makeFetch(limit, lastRef),
    ),
  );

export const getMediaList = (
  limit: number,
  last: O.Option<firebase.firestore.DocumentSnapshot>,
): TE.TaskEither<CommonError, firebase.firestore.DocumentSnapshot[]> =>
  pipe(
    fetch(limit, last),
    TE.map(snapshots => (snapshots.empty ? [] : snapshots.docs)),
  );
