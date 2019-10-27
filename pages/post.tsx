import { TaskFC, withTaskHandler } from '@/components/common/withTaskHandler';
import Layout from '@/components/layouts/DefaultLayout';
import { getPostDetailOf } from '@/models/Blog/detail';
import { PostModel } from '@/models/Blog/model';
import { error } from '@/models/Common/error';
import { useGlobalStore } from '@/stores/global';
import postStyles from '@/styles/common/post.scss';
import { foldIO } from '@/utils/taskEither/foldIO';
import clsx from 'clsx';
import * as E from 'fp-ts/lib/Either';
import { identity } from 'fp-ts/lib/function';
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
  const slug = E.fromNullable(error('not-found'))(query.slug as
    | string
    | undefined);

  return pipe(
    slug,
    E.map(getPostDetailOf),
    E.map(foldIO(error('not-found'))),
    E.fold(TE.left, identity),
    TE.map(post => ({ post })),
  );
};

export default withTaskHandler(Post);
