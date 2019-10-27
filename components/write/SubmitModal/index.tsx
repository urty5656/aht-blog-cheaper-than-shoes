import Modal from '@/components/common/Modal';
import { submit } from '@/functions/write/submit';
import { writeStoreCtx } from '@/stores/write';
import { prevented } from '@/utils/events';
import { alert } from '@/utils/io/modal';
import { navigate } from '@/utils/io/navigation';
import { pipe } from 'fp-ts/lib/pipeable';
import * as T from 'fp-ts/lib/Task';
import * as TE from 'fp-ts/lib/TaskEither';
import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';

const SubmitModal: React.FC = () => {
  const writeStore = useContext(writeStoreCtx);

  const navigateToThePost = (slug: string): T.Task<void> =>
    T.fromIO(navigate(`/posts/${slug}`));

  const submitPost: T.Task<void> = pipe(
    submit(writeStore.post, writeStore.isUpdating),
    TE.fold(
      error => T.fromIO(alert(error.code)),
      () => navigateToThePost(writeStore.post.slug!),
    ),
  );

  return writeStore.isModalOpened ? (
    <Modal onClickBackground={writeStore.toggleModal}>
      <form onSubmit={prevented(submitPost)} autoComplete="off">
        <label>
          고유주소
          <input
            value={writeStore.post.slug || ''}
            onChange={e => writeStore.setSlug(e.target.value)}
          />
        </label>
        <label>
          공개
          <input
            type="checkbox"
            checked={writeStore.post.public}
            onChange={e => writeStore.setPublic(e.target.checked)}
          />
        </label>
        <button type="submit">등록</button>
      </form>
    </Modal>
  ) : null;
};

export default observer(SubmitModal);
