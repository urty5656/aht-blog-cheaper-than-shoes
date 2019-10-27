import {
  getData,
  filterFound,
  filterNotFound,
  writeData,
} from '@/lib/firebase/firestore';
import * as O from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import * as TE from 'fp-ts/lib/TaskEither';
import { Collections } from '../Collections';
import { CommonError } from '../Common/error';
import { PostModel } from './model';

const fetchPost = getData(Collections.Post);

type DocSnapshot = firebase.firestore.DocumentSnapshot;

const retrieve = (doc: DocSnapshot): O.Option<PostModel> =>
  O.fromNullable(doc.data() as PostModel);

/**
 * Returns TaskEither which writes a new blog post.
 */
export const addBlogPost = (
  data: PostModel,
): TE.TaskEither<CommonError, void> =>
  pipe(
    fetchPost(data.slug),
    TE.chain(filterFound),
    TE.chain(writeData(data, true)),
  );

/**
 * Returns a TaskEither which updates a existing post, identified by the data's slug.
 * @param data
 */
export const updateBlogPost = (
  data: PostModel,
): TE.TaskEither<CommonError, void> =>
  pipe(
    fetchPost(data.slug),
    TE.chain(filterNotFound),
    TE.chain(writeData(data)),
  );

/**
 * Returns a TaskEither containing the requested post.
 * @param slug
 */
export const getPostDetailOf = (
  slug: string,
): TE.TaskEither<CommonError, O.Option<PostModel>> =>
  pipe(
    fetchPost(slug),
    TE.map(doc => retrieve(doc)),
  );
