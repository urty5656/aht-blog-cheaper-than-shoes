import { NextFC } from 'next';
import Error from 'next/error';
import React from 'react';
import Layout from '../components/layouts/DefaultLayout';
import { getBlogPost } from '../lib/firebase/firestore';
import { getBlogPost as getBlogPostREST } from '../lib/firebase/firestoreREST';
import { PostModel } from '../models/blog';

interface BlogProps {
  post?: PostModel;
}

const Post: NextFC<BlogProps> = ({ post }) => {
  if (!post) {
    return <Error statusCode={404} />;
  }
  return (
    <Layout>
      <div dangerouslySetInnerHTML={{ __html: post.contentHTML }} />
    </Layout>
  );
};
Post.getInitialProps = async ({ res, query }) => {
  const slug = query.slug as string;
  const p404 = { post: undefined };

  if (!slug) {
    res && (res.statusCode = 404);
    return p404;
  }

  if (process.browser) {
    try {
      const post = await getBlogPost(slug).promise();
      return { post: post.data() as PostModel };
    } catch (_) {
      return p404;
    }
  }

  try {
    const post = await getBlogPostREST(slug).promise();
    return { post };
  } catch (_) {
    return p404;
  }
};

export default Post;
