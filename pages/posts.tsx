import { NextFC } from 'next';
import React from 'react';
import Link from '../components/common/Link';
import Layout from '../components/layouts/DefaultLayout';
import { getBlogPostList } from '../lib/firebase/firestore';
import { PostModel } from '../models/blog';
import { useGlobalStore } from '../stores/global';

interface BlogProps {
  posts: readonly PostModel[];
}

const Posts: NextFC<BlogProps> = ({ posts }) => {
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
