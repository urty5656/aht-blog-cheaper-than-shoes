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
import { CommonError, error, fromFirebaseError } from '../Common/error';
import { PostModel } from './model';

type DocSnapshot = firebase.firestore.DocumentSnapshot;

// requester
const fetchWith = (slug: string): TaskEither<CommonError, DocSnapshot> =>
  tryCatch(
    () =>
      db
        .collection(Collections.Posts)
        .doc(slug)
        .get(),
    fromFirebaseError,
  );

const retrieve = (doc: DocSnapshot): Option<PostModel> =>
  fromNullable(doc.data() as PostModel);

// filters
const filterFound = (doc: DocSnapshot): TaskEither<CommonError, DocSnapshot> =>
  doc.exists ? left(error('already-exists')) : right(doc);

const filterNotFound = (
  doc: DocSnapshot,
): TaskEither<CommonError, DocSnapshot> =>
  !doc.exists ? left(error('not-found')) : right(doc);

// writer
const writePostWith = (data: PostModel, create?: boolean) => (
  doc: DocSnapshot,
): TaskEither<CommonError, void> =>
  tryCatch(() => doc.ref[create ? 'set' : 'update'](data), fromFirebaseError);

/**
 * Returns TaskEither which writes a new blog post.
 */
export const addBlogPost = (data: PostModel): TaskEither<CommonError, void> =>
  pipe(
    fetchWith(data.slug),
    chain(filterFound),
    chain(writePostWith(data, true)),
  );

/**
 * Returns a TaskEither which updates a existing post, identified by the data's slug.
 * @param data
 */
export const updateBlogPost = (
  data: PostModel,
): TaskEither<CommonError, void> =>
  pipe(
    fetchWith(data.slug),
    chain(filterNotFound),
    chain(writePostWith(data)),
  );

/**
 * Returns a TaskEither containing the requested post.
 * @param slug
 */
export const getPostDetailOf = (
  slug: string,
): TaskEither<CommonError, Option<PostModel>> =>
  pipe(
    fetchWith(slug),
    map(doc => retrieve(doc)),
  );
