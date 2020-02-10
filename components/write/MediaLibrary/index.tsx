import { upload } from '@/functions/write/media/upload';
import { deleteMedia } from '@/models/media/detail';
import { getMediaList } from '@/models/media/list';
import { E, O, T, TE, pipe } from '@/prelude';
import { MediaStore } from '@/stores/partial/media';
import { prevented } from '@/utils/events';
import { fromBoolean } from '@/utils/io/fromBoolean';
import { alert } from '@/utils/io/modal';
import { tap } from '@/utils/tap';

import { last } from 'fp-ts/lib/Array';
import { constNull, identity } from 'fp-ts/lib/function';
import { observer } from 'mobx-react-lite';
import React from 'react';

import MediaItem from './MediaItem';
import styles from './styles.module.scss';

interface MediaLibraryProps {
  mediaStore: MediaStore;
}

/**
 * Media library component for managing / inserting images.
 */
const MediaLibrary: React.FC<MediaLibraryProps> = ({ mediaStore }) => {
  const startLoading = (): TE.TaskEither<never, void> =>
    TE.rightIO(mediaStore.setLoading(true));
  const endLoading = (): T.Task<void> => T.fromIO(mediaStore.setLoading(false));

  const addMedia: T.Task<void> = pipe(
    E.fromOption(constNull)(fromBoolean(mediaStore.isLoading)),
    E.chain(() =>
      E.fromNullable<string | null>('파일이 없어요!')(mediaStore.file),
    ),
    E.map(file =>
      pipe(
        startLoading(),
        TE.chain(() => upload(file)),
        TE.bimap(e => tap(alert(e.code), e), alert('업로드 완료!')),
        TE.fold(endLoading, endLoading),
      ),
    ),
    E.fold(
      errorMessage =>
        errorMessage ? T.fromIO(alert(errorMessage)) : T.of(undefined),
      identity,
    ),
  );

  const fetchMoreMedia: T.Task<void> = pipe(
    fromBoolean(mediaStore.isLoading),
    O.map(() =>
      pipe(
        startLoading(),
        TE.chain(() => getMediaList(25, last(mediaStore.mediaRefs))),
        TE.chain(refs =>
          TE.rightIO(
            mediaStore.setMediaRefs(mediaStore.mediaRefs.concat(refs)),
          ),
        ),
        TE.bimap(e => tap(alert(e.code), e), identity),
        TE.fold(endLoading, endLoading),
      ),
    ),
    O.fold(() => T.of(undefined), identity),
  );

  const deleteSelectedMedia: T.Task<void> = pipe(
    E.fromOption(constNull)(fromBoolean(mediaStore.isLoading)),
    E.chain(() =>
      E.fromNullable<string | null>('no-selection')(mediaStore.SelectedMedia),
    ),
    E.map(media =>
      pipe(
        startLoading(),
        TE.chain(() => deleteMedia(media)),
        TE.bimap(e => tap(alert(e.code), e), alert('삭제 완료!')),
        TE.fold(endLoading, endLoading),
        T.chain(() =>
          T.fromIO(mediaStore.removeMediaRefAt(mediaStore.selectedIndex)),
        ),
      ),
    ),
    E.fold(
      errorType =>
        errorType ? T.fromIO(alert('선택한게 없어요!')) : T.of(undefined),
      identity,
    ),
  );

  return (
    <section>
      <h1>미디어 라이브러리</h1>
      <div className={styles.innerContainer}>
        <div className={styles.images}>
          {!!mediaStore.Media.length && (
            <ul className={styles.grid}>
              {mediaStore.Media.map((media, index) => (
                <MediaItem
                  key={media.ref}
                  mediaStore={mediaStore}
                  item={media}
                  index={index}
                />
              ))}
            </ul>
          )}
          <button type="button" onClick={fetchMoreMedia}>
            Load more
          </button>
          {mediaStore.SelectedMedia && (
            <button type="button" onClick={deleteSelectedMedia}>
              삭제
            </button>
          )}
        </div>
        <form onSubmit={prevented(addMedia)}>
          <label className={styles.inputButton} htmlFor="media-library-input">
            파일 선택...
          </label>
          <input
            className={styles.input}
            id="media-library-input"
            type="file"
            onChange={mediaStore.setFile}
          />
          <button type="submit" disabled={mediaStore.isLoading}>
            등록
          </button>
          <button type="button" onClick={mediaStore.insertMedia}>
            삽입
          </button>
        </form>
      </div>
    </section>
  );
};

export default observer(MediaLibrary);
