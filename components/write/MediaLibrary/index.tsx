import { MediaStore } from '@/stores/partial/media';
import { prevent } from '@/utils/events';
import { observer } from 'mobx-react-lite';
import { pipe } from 'ramda';
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
        <button type="button" onClick={() => mediaStore.fetchMedia()}>
          Load more
        </button>
      </section>
      <aside>
        <form
          onSubmit={pipe(
            prevent,
            mediaStore.uploadMedia,
          )}
        >
          <input type="file" onChange={mediaStore.setFile} />
          <button type="submit">등록</button>
          <button type="button" onClick={mediaStore.insertMedia}>
            삽입
          </button>
        </form>
      </aside>
    </section>
  );
};

export default observer(MediaLibrary);
