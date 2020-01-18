import { TaskFC, withTaskHandler } from '@/components/common/withTaskHandler';
import Layout from '@/components/layouts/DefaultLayout';
import EditorForm from '@/components/write/EditorForm';
import MediaLibrary from '@/components/write/MediaLibrary';
import SubmitModal from '@/components/write/SubmitModal';
import { signOut } from '@/lib/firebase/auth';
import { CommonError, error } from '@/models/Common/error';
import { getMediaList } from '@/models/media/list';
import { getPostDetailOf } from '@/models/post/detail';
import { PostModel } from '@/models/post/model';
import { authStoreCtx } from '@/stores/auth';
import { WriteStore, writeStoreCtx } from '@/stores/write';
import { foldIO } from '@/utils/taskEither/foldIO';
import { useTaskEitherEffect } from '@/utils/taskEither/useTaskEitherEffect';
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
  const authStore = useContext(authStoreCtx);
  const writeStore = useRef(new WriteStore(!!post)).current;

  // fetch 1st page of media
  useTaskEitherEffect(getMediaList(25, O.none));

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
              <EditorForm initialState={post && post.content} />
              <MediaLibrary mediaStore={writeStore.media} />
            </>,
          )}
        </main>
        <button onClick={signOut}>Sign Out</button>
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
