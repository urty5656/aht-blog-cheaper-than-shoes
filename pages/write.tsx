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
import { writeStoreCtx } from '@/stores/write';
import * as E from 'fp-ts/lib/Either';
import { identity } from 'fp-ts/lib/function';
import { fold, Option } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import * as TE from 'fp-ts/lib/TaskEither';
import { observer } from 'mobx-react-lite';
import dynamic from 'next/dynamic';
import React, { useContext, useEffect } from 'react';

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
  const writeStore = useContext(writeStoreCtx);

  // fetch 1st page of media
  useEffect(() => {
    writeStore.MediaStore.fetchMedia();
  }, []);

  // re-set post whenever the reference changes
  useEffect(() => {
    post && writeStore.setPost(post);
  }, [post]);

  return (
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
  );
};
Write.getInitialProps = ({ query }) => {
  /** Fold `Option` of `TaskEither<unknown, Option>`. */
  const flatten = (
    postDetail: TE.TaskEither<CommonError, Option<PostModel>>,
  ): TE.TaskEither<CommonError, PostModel> =>
    TE.taskEither.chain(postDetail, postDetail =>
      pipe(
        postDetail,
        fold(() => TE.left(error('not-found')), TE.right),
      ),
    );

  return pipe(
    E.fromNullable(error('not-found'))(query.slug as string | undefined),
    E.map(getPostDetailOf),
    E.map(flatten),
    E.fold(TE.left, identity),
    TE.map(post => ({ post })),
  );
};

export default withTaskHandler(observer(Write));
