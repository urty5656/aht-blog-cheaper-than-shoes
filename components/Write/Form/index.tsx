import { pipe } from 'ramda';
import React, { useContext } from 'react';
import { writeStoreCtx } from '../../../stores/write';
import { prevent } from '../../../utils/events';
import Editor from '../../Editor';
import styles from './styles.css';

const Form: React.FunctionComponent = () => {
  const writeStore = useContext(writeStoreCtx);

  const openSubmitModal = pipe(
    prevent,
    writeStore.toggleModal,
  );

  return (
    <form className={styles.form} onSubmit={openSubmitModal} autoComplete="off">
      <Editor />
      <button type="submit">등록</button>
    </form>
  );
};

export default Form;
