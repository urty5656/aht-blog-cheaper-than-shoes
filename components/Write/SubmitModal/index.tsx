import { observer } from 'mobx-react-lite';
import { pipe } from 'ramda';
import React, { useContext } from 'react';
import { writeStoreCtx } from '../../../stores/write';
import { prevent } from '../../../utils/events';
import Modal from '../../common/Modal';

const SubmitModal: React.FC = () => {
  const writeStore = useContext(writeStoreCtx);

  return writeStore.isModalOpened ? (
    <Modal onClickBackground={writeStore.toggleModal}>
      <form
        onSubmit={pipe(
          prevent,
          writeStore.submit,
        )}
        autoComplete="off"
      >
        <label>
          고유주소
          <input
            value={writeStore.post.slug}
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
