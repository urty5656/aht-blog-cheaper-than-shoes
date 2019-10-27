import { upload } from '@/functions/write/media/upload';
import { deleteMedia } from '@/models/media/detail';
import { getMediaList } from '@/models/media/list';
import { MediaStore } from '@/stores/partial/media';
import { prevented } from '@/utils/events';
import { fromBoolean } from '@/utils/io/fromBoolean';
import { alert } from '@/utils/io/modal';
import { last } from 'fp-ts/lib/Array';
import * as E from 'fp-ts/lib/Either';
import { constNull, identity } from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import * as T from 'fp-ts/lib/Task';
import * as TE from 'fp-ts/lib/TaskEither';
import { observer } from 'mobx-react-lite';
import { tap } from 'ramda';
import React from 'react';
import MediaItem from './MediaItem';
import styles from './styles.scss';

interface MediaLibraryProps {
  mediaStore: MediaStore;
}

/**
 * Media library component for managing / inserting images.
 */
const MediaLibrary: React.FC<MediaLibraryProps> = ({ mediaStore }) => {
  const startLoading = () => TE.rightIO(mediaStore.setLoading(true));
  const endLoading = () => T.fromIO(mediaStore.setLoading(false));

  const addMedia: T.Task<void> = pipe(
    E.fromOption(constNull)(fromBoolean(mediaStore.isLoading)),
    E.chain(() =>
      E.fromNullable<string | null>('파일이 없어요!')(mediaStore.file),
    ),
    E.map(file =>
      pipe(
        startLoading(),
        TE.chain(() => upload(file)),
        TE.bimap(e => tap(alert(e.code)), tap(alert('업로드 완료!'))),
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
        TE.bimap(e => tap(alert(e.code)), identity),
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
        TE.bimap(e => tap(alert(e.code)), tap(alert('삭제 완료!'))),
        TE.fold(endLoading, endLoading),
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
      <section>
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
        <button type="button" onClick={fetchMoreMedia}>
          Load more
        </button>
      </section>
      <aside>
        <form onSubmit={prevented(addMedia)}>
          <input type="file" onChange={mediaStore.setFile} />
          <button type="button" onClick={deleteSelectedMedia}>
            삭제
          </button>
          <button type="submit" disabled={mediaStore.isLoading}>
            등록
          </button>
          <button type="button" onClick={mediaStore.insertMedia}>
            삽입
          </button>
        </form>
      </aside>
    </section>
  );
};

export default observer(MediaLibrary);
