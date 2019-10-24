import { db } from '@/lib/firebase/firebase';
import { fromNullable, Option } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import {
  chain,
  left,
  map,
  right,
  TaskEither,
  tryCatch,
} from 'fp-ts/lib/TaskEither';
import { Collections } from '../Collections';
import { PostModel } from './model';

type DocSnapshot = firebase.firestore.DocumentSnapshot;

// requester
const fetchWith = (slug: string) =>
  tryCatch(
    () =>
      db
        .collection(Collections.Posts)
        .doc(slug)
        .get(),
    error => error,
  );

const retrieve = <T>(doc: DocSnapshot): Option<T> =>
  fromNullable<T>(doc.data() as T);

// filters
const filterFound = (doc: DocSnapshot): TaskEither<unknown, DocSnapshot> =>
  doc.exists ? left('Doc already exists') : right(doc);

const filterNotFound = (doc: DocSnapshot): TaskEither<unknown, DocSnapshot> =>
  !doc.exists ? left('Doc does not exist') : right(doc);

// writer
const writePostWith = (data: PostModel, create?: boolean) => (
  doc: DocSnapshot,
): TaskEither<unknown, void> =>
  tryCatch(() => doc.ref[create ? 'set' : 'update'](data), error => error);

export const addBlogPost = (data: PostModel): TaskEither<unknown, void> =>
  pipe(
    fetchWith(data.slug),
    chain(filterFound),
    chain(writePostWith(data, true)),
  );

/**
 * Updates a blog post. Throws when the data's slug does not exists.
 * @param data
 */
export const updateBlogPost = (data: PostModel): TaskEither<unknown, void> =>
  pipe(
    fetchWith(data.slug),
    chain(filterNotFound),
    chain(writePostWith(data)),
  );

/**
 * Retrieves a blog post by a given slug. Throws when no such doc exists.
 * @param slug
 */
export const getPostDetailOf = (
  slug: string,
): TaskEither<unknown, Option<PostModel>> =>
  pipe(
    fetchWith(slug),
    map(doc => retrieve<PostModel>(doc)),
  );
