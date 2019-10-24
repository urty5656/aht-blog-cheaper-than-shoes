import { db } from '@/lib/firebase/firebase';
import { pipe } from 'fp-ts/lib/pipeable';
import { map, TaskEither, tryCatch } from 'fp-ts/lib/TaskEither';
import { Collections } from '../Collections';
import { PostModel } from './model';

// requester
const fetch: TaskEither<unknown, firebase.firestore.QuerySnapshot> = tryCatch(
  () =>
    db
      .collection(Collections.Posts)
      .orderBy('created', 'desc')
      .get(),
  error => error,
);

const retrieve = <T>(doc: firebase.firestore.QueryDocumentSnapshot) =>
  doc.data() as T;

/**
 * Retrieves multiple blog posts.
 */
// [todo] Pagination
export const getPostList: TaskEither<unknown, readonly PostModel[]> = pipe(
  fetch,
  map(query => query.docs),
  map(docs => docs.map(doc => retrieve<PostModel>(doc))),
);
