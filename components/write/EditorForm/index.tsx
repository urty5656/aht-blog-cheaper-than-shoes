import { writeStoreCtx } from '@/stores/write';
import { prevent } from '@/utils/events';
import { debounce } from 'lodash';
import { observer } from 'mobx-react-lite';
import { pipe } from 'ramda';
import React, { useContext, useEffect, useRef } from 'react';
import Editor, { EditorRef } from '../Editor';
import styles from './styles.scss';

interface EditorFormProps {
  initialState?: object;
}

const EditorForm: React.FC<EditorFormProps> = ({ initialState }) => {
  const writeStore = useContext(writeStoreCtx);
  const $editor = useRef<EditorRef>(null);

  // set editor on init
  useEffect(() => {
    writeStore.MediaStore.setEditor($editor);
  }, []);

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
      <Editor ref={$editor} initialState={initialState} onUpdate={onUpdate} />
      <button type="submit">등록</button>
    </form>
  );
};

export default observer(EditorForm);
