import { debounce } from 'lodash';
import { observer } from 'mobx-react-lite';
import { pipe } from 'ramda';
import React, { useContext, useRef } from 'react';
import { writeStoreCtx } from '../../../stores/write';
import { prevent } from '../../../utils/events';
import Editor, { EditorRef } from '../Editor';
import styles from './styles.scss';

const EditorForm: React.FC = () => {
  const writeStore = useContext(writeStoreCtx);
  const $editor = useRef<EditorRef>(null);

  const onUpdate = debounce(
    () => {
      writeStore.setContents(
        $editor.current!.getState(),
        $editor.current!.getInnerHTML(),
      );
    },
    500,
    { trailing: true },
  );

  const openSubmitModal = pipe(
    prevent,
    writeStore.toggleModal,
  );

  return (
    <form className={styles.form} onSubmit={openSubmitModal} autoComplete="off">
      <Editor ref={$editor} onUpdate={onUpdate} />
      <button type="submit">등록</button>
    </form>
  );
};

export default observer(EditorForm);
