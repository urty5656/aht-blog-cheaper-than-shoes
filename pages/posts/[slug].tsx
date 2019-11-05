import { E, TE, pipe } from '@@prelude';
import { TaskFC, withTaskHandler } from '@/components/common/withTaskHandler';
import Layout from '@/components/layouts/DefaultLayout';
import Article from '@/components/post/Article';
import { error } from '@/models/Common/error';
import { getPostDetailOf } from '@/models/post/detail';
import { PostModel } from '@/models/post/model';
import { foldIO } from '@/utils/taskEither/foldIO';
import { identity } from 'fp-ts/lib/function';
import React from 'react';

interface PostProps {
  post: PostModel;
}

/**
 * Blog post detail
 */
const Post: TaskFC<PostProps> = ({ post }) => {
  return (
    <Layout>
      <Article post={post} />
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
