import { observer } from 'mobx-react-lite';
import { NextFC } from 'next';
import dynamic from 'next/dynamic';
import React, { useContext, useEffect } from 'react';
import Layout from '../components/layouts/DefaultLayout';
import EditorForm from '../components/write/EditorForm';
import SubmitModal from '../components/write/SubmitModal';
import { getBlogPost } from '../lib/firebase/firestore';
import { PostModel } from '../models/blog';
import { authStoreCtx } from '../stores/auth';
import { useGlobalStore } from '../stores/global';
import { writeStoreCtx } from '../stores/write';

const UnauthorizedWarning = dynamic(
  () => import('../components/common/UnauthorizedWarning'),
  {
    ssr: false,
  },
);

interface WriteProps {
  post?: PostModel;
}

const render = (flag: boolean, content: JSX.Element): JSX.Element => {
  return flag ? content : <h1>Loading...</h1>;
};

const Write: NextFC<WriteProps> = ({ post }) => {
  useGlobalStore();

  const authStore = useContext(authStoreCtx);
  const writeStore = useContext(writeStoreCtx);

  useEffect(() => {
    post && writeStore.setPost(post);
  }, [post]);

  return (
    <Layout>
      <main>
        {render(
          process.browser && authStore.initialized,
          <EditorForm initialState={post && post.content} />,
        )}
      </main>
      {<UnauthorizedWarning />}
      <SubmitModal />
    </Layout>
  );
};
Write.getInitialProps = async ({ query }) => {
  const slug = query.slug as string;

  if (!slug) {
    return {};
  }

  try {
    const post = await getBlogPost(slug);
    return { post };
  } catch (_) {
    return {};
  }
};

export default observer(Write);
