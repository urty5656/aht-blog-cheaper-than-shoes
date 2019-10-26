import { db } from '@/lib/firebase/firebase';
import { pipe } from 'fp-ts/lib/pipeable';
import { map, TaskEither, tryCatch } from 'fp-ts/lib/TaskEither';
import { Collections } from '../Collections';
import { CommonError, fromFirebaseError } from '../Common/error';
import { PostModel } from './model';

// requester
const fetch: TaskEither<
  CommonError,
  firebase.firestore.QuerySnapshot
> = tryCatch(
  () =>
    db
      .collection(Collections.Posts)
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
export const getPostList: TaskEither<CommonError, readonly PostModel[]> = pipe(
  fetch,
  map(query => query.docs),
  map(docs => docs.map(doc => retrieve(doc))),
);
