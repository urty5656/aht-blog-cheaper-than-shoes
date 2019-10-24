import PageTitle from '@/components/common/PageTitle';
import Layout from '@/components/layouts/DefaultLayout';
import PostBody from '@/components/posts/PostBody';
import { PageFC } from '@/components/SortApp';
import { getPostList } from '@/models/Blog/list';
import { PostModel } from '@/models/Blog/model';
import { useGlobalStore } from '@/stores/global';
import { constNull } from 'fp-ts/lib/function';
import { pipe } from 'fp-ts/lib/pipeable';
import { bimap } from 'fp-ts/lib/TaskEither';
import React from 'react';

interface PostsProps {
  posts: readonly PostModel[];
}

/**
 * Blog post list
 */
const Posts: PageFC<PostsProps> = ({ posts }) => {
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
Posts.getInitialProps = async () => {
  return pipe(
    getPostList,
    bimap(constNull, posts => ({
      posts,
    })),
  );
};

export default Posts;
