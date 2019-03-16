import React from 'react';
import { NextFC } from 'next';
import Layout from '../components/layouts/DefaultLayout';
import { getBlogPost as getBlogPostREST } from '../lib/firebase/firestoreREST';
import { PostModel } from '../models/blog';
import { getBlogPost } from '../lib/firebase/firestore';

interface BlogProps {
  post: PostModel;
}

const Blog: NextFC<BlogProps> = ({ post }) => {
  console.log(post);
  return (
    <Layout>
      <div dangerouslySetInnerHTML={{ __html: post.contentHTML }} />
    </Layout>
  );
};
Blog.getInitialProps = async () => {
  if (process.browser) {
    const post = await getBlogPost('intro').promise();
    return { post: post.data() as PostModel };
  }
  const post = await getBlogPostREST('intro').promise();
  return { post };
};

export default Blog;
