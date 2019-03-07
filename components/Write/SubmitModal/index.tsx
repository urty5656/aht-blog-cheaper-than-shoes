import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { writeStoreCtx } from '../../../stores/write';
import { prevent } from '../../../utils/events';
import Modal from '../../Common/Modal';

const SubmitModal: React.FunctionComponent = () => {
  const writeStore = useContext(writeStoreCtx);

  return writeStore.isModalOpened ? (
    <Modal onClickBackground={writeStore.toggleModal}>
      <form onSubmit={prevent}>
        <label>
          고유주소
          <input />
        </label>
        <label>
          공개
          <input type="checkbox" />
        </label>
      </form>
    </Modal>
  ) : null;
};

export default observer(SubmitModal);
