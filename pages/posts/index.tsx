import PageTitle from '@/components/common/PageTitle';
import { TaskFC, withTaskHandler } from '@/components/common/withTaskHandler';
import Layout from '@/components/layouts/DefaultLayout';
import PostBody from '@/components/posts/PostBody';
import { getPostList } from '@/models/post/list';
import { PostModel } from '@/models/post/model';
import { useGlobalStore } from '@/stores/global';
import { identity } from 'fp-ts/lib/function';
import { pipe } from 'fp-ts/lib/pipeable';
import { bimap } from 'fp-ts/lib/TaskEither';
import React from 'react';

interface PostsProps {
  posts: readonly PostModel[];
}

/**
 * Blog post list
 */
const Posts: TaskFC<PostsProps> = ({ posts }) => {
  useGlobalStore();

  return (
    <Layout>
      <main>
        <PageTitle>Posts</PageTitle>
        <PostBody items={posts} />
      </main>
    </Layout>
  );
};
Posts.getInitialProps = () => {
  const fn = pipe(
    getPostList,
    bimap(identity, posts => ({
      posts,
    })),
  );
  return fn;
};

export default withTaskHandler(Posts);
