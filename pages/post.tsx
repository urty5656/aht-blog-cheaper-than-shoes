import Layout from '@/components/layouts/DefaultLayout';
import { PageFC } from '@/components/SortApp';
import { getPostDetailOf } from '@/models/Blog/detail';
import { PostModel } from '@/models/Blog/model';
import { useGlobalStore } from '@/stores/global';
import postStyles from '@/styles/common/post.scss';
import clsx from 'clsx';
import { constNull } from 'fp-ts/lib/function';
import { fold, fromNullable, map } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import { bimap, left, TaskEither } from 'fp-ts/lib/TaskEither';
import { Option } from 'fp-ts/lib/Option';
import Prism from 'prismjs';
import React, { useEffect, useState } from 'react';

interface PostProps {
  post: PostModel;
}

/**
 * Blog post detail
 */
const Post: PageFC<PostProps> = ({ post }) => {
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
Post.getInitialProps = async ({ query }) => {
  const wrapPost = (post: Option<PostModel>) => pipe(
    post,
    fold(() =>)
  )
  const asPageProps = (
    task: TaskEither<unknown, Option<PostModel>>,
  ): TaskEither<null, PostProps> =>
    pipe(
      task,
      bimap(constNull, post => ({
        post,
      })),
    );

  return pipe(
    fromNullable(query.slug as string | undefined),
    map(slug => getPostDetailOf(slug)),
    map(asPageProps),
    fold(() => left(null), pageProps => pageProps),
  );
};

export default Post;
