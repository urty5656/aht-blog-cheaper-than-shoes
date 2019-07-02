import Link from '@/components/common/Link';
import Layout from '@/components/layouts/DefaultLayout';
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
      <ul>
        {posts.map(post => (
          <li key={post.slug}>
            <Link href={`/post?slug=${post.slug}`} as={`/posts/${post.slug}`}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};
Posts.getInitialProps = async () => {
  const posts = await getBlogPostList();
  return { posts };
};

export default Posts;
