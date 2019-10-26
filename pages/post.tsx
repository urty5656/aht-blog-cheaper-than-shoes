import { TaskFC, withTaskHandler } from '@/components/common/withTaskHandler';
import Layout from '@/components/layouts/DefaultLayout';
import { getPostDetailOf } from '@/models/Blog/detail';
import { PostModel } from '@/models/Blog/model';
import { CommonError, error } from '@/models/Common/error';
import { useGlobalStore } from '@/stores/global';
import postStyles from '@/styles/common/post.scss';
import clsx from 'clsx';
import * as E from 'fp-ts/lib/Either';
import { identity } from 'fp-ts/lib/function';
import { fold as foldOption, Option } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import * as TE from 'fp-ts/lib/TaskEither';
import Prism from 'prismjs';
import React, { useEffect, useState } from 'react';

interface PostProps {
  post: PostModel;
}

/**
 * Blog post detail
 */
const Post: TaskFC<PostProps> = ({ post }) => {
  useGlobalStore();

  const [isLighted, setLighted] = useState(false);

  useEffect(() => Prism.highlightAll(false, () => setLighted(true)), [post]);

  return (
    <Layout>
      <article
        className={clsx(
          postStyles.postBody,
          isLighted && postStyles.postBodyLighted,
        )}
        dangerouslySetInnerHTML={{ __html: post.contentHTML }}
      />
    </Layout>
  );
};
Post.getInitialProps = ({ query }) => {
  /** Fold `Option` of `TaskEither<unknown, Option>`. */
  const flatten = (
    postDetail: TE.TaskEither<CommonError, Option<PostModel>>,
  ): TE.TaskEither<CommonError, PostModel> =>
    TE.taskEither.chain(postDetail, postDetail =>
      pipe(
        postDetail,
        foldOption(() => TE.left(error('not-found')), TE.right),
      ),
    );

  return pipe(
    E.fromNullable(error('not-found'))(query.slug as string | undefined),
    E.map(getPostDetailOf),
    E.map(flatten),
    E.fold(TE.left, identity),
    TE.map(post => ({ post })),
  );
};

export default withTaskHandler(Post);
