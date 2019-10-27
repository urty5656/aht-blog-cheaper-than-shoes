import { deleteData, getData } from '@/lib/firebase/firestore';
import { Collections } from '@/models/Collections';
import { writeStoreCtx } from '@/stores/write';
import { prevented } from '@/utils/events';
import { fromBoolean } from '@/utils/io/fromBoolean';
import { alert } from '@/utils/io/modal';
import { navigate } from '@/utils/io/navigation';
import * as E from 'fp-ts/lib/Either';
import { constNull, identity } from 'fp-ts/lib/function';
import { pipe } from 'fp-ts/lib/pipeable';
import * as T from 'fp-ts/lib/Task';
import * as TE from 'fp-ts/lib/TaskEither';
import { debounce } from 'lodash';
import { observer } from 'mobx-react-lite';
import { tap } from 'ramda';
import React, { useContext, useEffect, useRef } from 'react';
import Editor, { EditorRef } from '../Editor';
import styles from './styles.scss';

interface EditorFormProps {
  initialState?: object;
}

const EditorForm: React.FC<EditorFormProps> = ({ initialState }) => {
  const store = useContext(writeStoreCtx);
  const $editor = useRef<EditorRef>(null);

  const startLoading = () => TE.rightIO(store.setLoading(true));
  const endLoading = () => T.fromIO(store.setLoading(false));

  const deletePost = pipe(
    E.fromOption(constNull)(fromBoolean(store.isLoading)),
    E.chain(() =>
      E.fromNullable<string | null>('존재하지 않는 포스트에요!')(
        store.post.slug,
      ),
    ),
    E.map(slug =>
      pipe(
        startLoading(),
        TE.chain(() => getData(Collections.Post)(slug)),
        TE.chain(doc => deleteData(doc.ref)),
        TE.bimap(e => tap(alert(e.code)), tap(alert('삭제 완료!'))),
        TE.fold(endLoading, () => T.fromIO(navigate('/posts'))),
      ),
    ),
    E.fold(
      errorMessage =>
        errorMessage ? T.fromIO(alert(errorMessage)) : T.of(undefined),
      identity,
    ),
  );

  const setContents = debounce(
    () => {
      store.setContents(
        $editor.current!.getState(),
        $editor.current!.getInnerHTML(),
      );
    },
    500,
    { trailing: true },
  );

  // set editor on init
  useEffect(() => {
    store.MediaStore.setEditor($editor);
  }, []);

  return (
    <form
      className={styles.form}
      onSubmit={prevented(store.toggleModal)}
      autoComplete="off"
    >
      <Editor
        ref={$editor}
        initialState={initialState}
        onUpdate={setContents}
      />
      <button type="submit">등록</button>
      {store.isUpdating && (
        <button type="button" onClick={deletePost}>
          삭제
        </button>
      )}
    </form>
  );
};

export default observer(EditorForm);
