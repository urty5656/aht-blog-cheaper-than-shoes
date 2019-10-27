import { TaskFC, withTaskHandler } from '@/components/common/withTaskHandler';
import Layout from '@/components/layouts/DefaultLayout';
import EditorForm from '@/components/write/EditorForm';
import MediaLibrary from '@/components/write/MediaLibrary';
import SubmitModal from '@/components/write/SubmitModal';
import { getPostDetailOf } from '@/models/Blog/detail';
import { PostModel } from '@/models/Blog/model';
import { CommonError, error } from '@/models/Common/error';
import { authStoreCtx } from '@/stores/auth';
import { useGlobalStore } from '@/stores/global';
import { WriteStore, writeStoreCtx } from '@/stores/write';
import { foldIO } from '@/utils/taskEither/foldIO';
import { identity } from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import * as TE from 'fp-ts/lib/TaskEither';
import { observer } from 'mobx-react-lite';
import dynamic from 'next/dynamic';
import React, { useContext, useEffect, useRef } from 'react';

const UnauthorizedWarning = dynamic(
  () => import('@/components/common/UnauthorizedWarning'),
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

const Write: TaskFC<WriteProps> = ({ post }) => {
  useGlobalStore();

  const authStore = useContext(authStoreCtx);
  const writeStore = useRef(new WriteStore(!!post)).current;

  // fetch 1st page of media
  useEffect(() => {
    writeStore.MediaStore.fetchMedia();
  }, []);

  // re-set post whenever the reference changes
  useEffect(() => {
    post && writeStore.setPost(post);
  }, [post]);

  return (
    <writeStoreCtx.Provider value={writeStore}>
      <Layout>
        <main>
          {render(
            process.browser && authStore.initialized,
            <>
              <MediaLibrary mediaStore={writeStore.MediaStore} />
              <EditorForm initialState={post && post.content} />
            </>,
          )}
        </main>
        <button onClick={authStore.signOut}>Sign Out</button>
        <UnauthorizedWarning />
        <SubmitModal />
      </Layout>
    </writeStoreCtx.Provider>
  );
};
Write.getInitialProps = ({ query }) => {
  const slug = O.fromNullable(query.slug as string | undefined);

  return pipe(
    slug,
    O.map(getPostDetailOf),
    O.map(foldIO(error('not-found'))),
    O.fold(
      () => TE.right<CommonError, PostModel | undefined>(undefined),
      identity,
    ),
    TE.map(post => ({ post })),
  );
};

export default withTaskHandler(observer(Write));
