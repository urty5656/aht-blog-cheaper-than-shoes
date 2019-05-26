import Layout from '@/components/layouts/DefaultLayout';
import { getBlogPost } from '@/lib/firebase/firestore/blog';
import { PostModel } from '@/models/blog';
import { useGlobalStore } from '@/stores/global';
import postStyles from '@/styles/common/post.scss';
import { NextFC } from 'next';
import Error from 'next/error';
import React from 'react';

interface BlogProps {
  post?: PostModel;
}

/**
 * Blog post detail
 */
const Post: NextFC<BlogProps> = ({ post }) => {
  useGlobalStore();

  if (!post) {
    return <Error statusCode={404} />;
  }
  return (
    <Layout>
      <div
        className={postStyles.postBody}
        dangerouslySetInnerHTML={{ __html: post.contentHTML }}
      />
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

  try {
    const post = await getBlogPost(slug);
    return { post };
  } catch (_) {
    return p404;
  }
};

export default Post;
