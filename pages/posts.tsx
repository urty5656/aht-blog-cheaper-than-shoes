import { NextFC } from 'next';
import Link from 'next/link';
import React from 'react';
import Layout from '../components/layouts/DefaultLayout';
import { getBlogPostList } from '../lib/firebase/firestore';
import { getBlogPostList as getBlogPostListREST } from '../lib/firebase/firestoreREST';
import { PostModel } from '../models/blog';

interface BlogProps {
  posts: PostModel[];
}

const Posts: NextFC<BlogProps> = ({ posts }) => {
  return (
    <Layout>
      <ul>
        {posts.map(post => (
          <li key={post.slug}>
            <Link href={`/post?slug=${post.slug}`} as={`/posts/${post.slug}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};
Posts.getInitialProps = async () => {
  if (process.browser) {
    const posts = await getBlogPostList().promise();
    return { posts: posts as PostModel[] };
  }
  const posts = await getBlogPostListREST().promise();
  return { posts: posts as PostModel[] };
};

export default Posts;
