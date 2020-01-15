import { E, O, TE, pipe } from '@@prelude';
import { updateTimeInfo } from '@/lib/firebase/firestore';
import { CommonError, error } from '@/models/Common/error';
import { addBlogPost, updateBlogPost } from '@/models/post/detail';
import { PostContent, PostModel } from '@/models/post/model';
import { PostModelOptionalSlug } from '@/stores/write';
import { assoc } from 'fp-ts-ramda';
import { findFirst } from 'fp-ts/lib/Array';

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
    E.fromOption(() => error('invalid-argument', { cause: 'no-title' })),
    E.map(title => assoc('title', title, post)),
  );

/** Submit function for write store. */
export const submit = (
  post: PostModelOptionalSlug,
  isUpdating: boolean,
): TE.TaskEither<CommonError, void> => {
  const postE = E.fromPredicate(verifyRequirements, () =>
    error('invalid-argument', { post }),
  )(post);

  return pipe(
    postE,
    E.chain(setTitle),
    TE.fromEither,
    TE.chain(p => TE.rightIO(updateTimeInfo(p))),
    TE.chain(isUpdating ? updateBlogPost : addBlogPost),
  );
};
