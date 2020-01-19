import PageTitle from '@/components/common/PageTitle';
import { TaskFC, withTaskHandler } from '@/components/common/withTaskHandler';
import Layout from '@/components/layouts/DefaultLayout';
import PostsBody from '@/components/posts/PostsBody';
import { getPostList } from '@/models/post/list';
import { PostModel } from '@/models/post/model';
import { TE } from '@/prelude';

import { identity } from 'fp-ts/lib/function';
import React from 'react';

interface PostsProps {
  posts: readonly PostModel[];
}

/**
 * Blog post list
 */
const Posts: TaskFC<PostsProps> = ({ posts }) => {
  return (
    <Layout>
      <main>
        <PageTitle>Posts</PageTitle>
        <PostsBody items={posts} />
      </main>
    </Layout>
  );
};
Posts.getInitialProps = () => {
  return TE.taskEither.bimap(getPostList, identity, posts => ({ posts }));
};

export default withTaskHandler(Posts);
