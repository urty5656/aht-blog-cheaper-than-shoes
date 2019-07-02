import Layout from '@/components/layouts/DefaultLayout';
import { PageFC } from '@/components/SortApp';
import { getBlogPost } from '@/lib/firebase/firestore/blog';
import { PostModel } from '@/models/blog';
import { useGlobalStore } from '@/stores/global';
import postStyles from '@/styles/common/post.scss';
import React from 'react';

interface BlogProps {
  post: PostModel;
}

/**
 * Blog post detail
 */
const Post: PageFC<BlogProps> = ({ post }) => {
  useGlobalStore();

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

  if (!slug) {
    res && (res.statusCode = 404);
    return { statusCode: 404 };
  }

  try {
    const post = await getBlogPost(slug);
    return { post };
  } catch (_) {
    return { statusCode: 404 };
  }
};

export default Post;
