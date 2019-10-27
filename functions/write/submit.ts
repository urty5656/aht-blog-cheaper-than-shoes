import { addBlogPost, updateBlogPost } from '@/models/Blog/detail';
import { PostContent, PostModel } from '@/models/Blog/model';
import { CommonError, error } from '@/models/Common/error';
import { PostModelOptionalSlug } from '@/stores/write';
import { getNow } from '@/utils/io/date';
import { assoc } from 'fp-ts-ramda';
import { findFirst } from 'fp-ts/lib/Array';
import * as E from 'fp-ts/lib/Either';
import { IO, io } from 'fp-ts/lib/IO';
import * as O from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import * as TE from 'fp-ts/lib/TaskEither';

/** Verify the post to have slug and contents. */
const verifyRequirements = (post: PostModelOptionalSlug): post is PostModel =>
  Boolean(post.slug && post.content.doc);

const getFirstHeadingText = (post: PostModel): O.Option<string> =>
  pipe(
    O.fromNullable(post.content.doc),
    O.chain(doc =>
      findFirst<PostContent>(
        node =>
          !!(node.type === 'heading' && node.attrs && node.attrs.level === 1),
      )(doc.content),
    ),
    O.chain(node => O.fromNullable(node.content)),
    O.map(contents => contents.map(mark => mark.text).join('')),
  );
/** Set the post's title to the text of its first h1. */
const setTitle = (post: PostModel): E.Either<CommonError, PostModel> =>
  pipe(
    post,
    getFirstHeadingText,
    E.fromOption(() => error('invalid-argument')),
    E.map(title => assoc('title', title, post)),
  );

/** Associate current time with the post's respective time field. */
const setTimeInfo = (post: PostModel) => (now: number): IO<PostModel> => () => {
  if (post.created) {
    return assoc('modified', now, post);
  }
  return assoc('created', now, post);
};

/** Submit function for write store. */
export const submit = (
  post: PostModelOptionalSlug,
  isUpdating: boolean,
): TE.TaskEither<CommonError, void> => {
  const postE = E.fromPredicate(verifyRequirements, () =>
    error('invalid-argument'),
  )(post);

  return pipe(
    postE,
    E.chain(setTitle),
    TE.fromEither,
    TE.chain(post => TE.rightIO(io.chain(getNow, setTimeInfo(post)))),
    TE.chain(isUpdating ? updateBlogPost : addBlogPost),
  );
};
