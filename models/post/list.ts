import { db } from '@/lib/firebase/firebase';
import { pipe } from 'fp-ts/lib/pipeable';
import * as TE from 'fp-ts/lib/TaskEither';
import { Collections } from '../Collections';
import { CommonError, fromFirebaseError } from '../Common/error';
import { PostModel } from './model';

// requester
const fetch: TE.TaskEither<
  CommonError,
  firebase.firestore.QuerySnapshot
> = TE.tryCatch(
  () =>
    db
      .collection(Collections.Post)
      .orderBy('created', 'desc')
      .get(),
  fromFirebaseError,
);

// Note: Not Option<T>
const retrieve = (doc: firebase.firestore.QueryDocumentSnapshot): PostModel =>
  doc.data() as PostModel;

/**
 * Returns a TaskEither with all blog posts, ordered by creation date.
 */
// [todo] Pagination
export const getPostList: TE.TaskEither<
  CommonError,
  readonly PostModel[]
> = pipe(
  fetch,
  TE.map(query => query.docs),
  TE.map(docs => docs.map(doc => retrieve(doc))),
);
