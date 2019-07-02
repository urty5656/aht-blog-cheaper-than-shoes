import PageTitle from '@/components/common/PageTitle';
import Layout from '@/components/layouts/DefaultLayout';
import PostBody from '@/components/posts/PostBody';
import { PageFC } from '@/components/SortApp';
import { getBlogPostList } from '@/lib/firebase/firestore/blog';
import { PostModel } from '@/models/blog';
import { useGlobalStore } from '@/stores/global';
import React from 'react';

interface BlogProps {
  posts: readonly PostModel[];
}

/**
 * Blog post list
 */
const Posts: PageFC<BlogProps> = ({ posts }) => {
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
  const posts = await getBlogPostList();
  return { posts };
};

export default Posts;
