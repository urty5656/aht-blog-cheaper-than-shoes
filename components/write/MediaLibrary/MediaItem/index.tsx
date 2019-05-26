import { MediaModel } from '@/models/media';
import { MediaStore } from '@/stores/partial/media';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import React from 'react';
import styles from './styles.scss';

interface MediaItemProps {
  mediaStore: MediaStore;
  item: MediaModel;
  index: number;
}

const MediaItem: React.FC<MediaItemProps> = ({ mediaStore, item, index }) => {
  return (
    <li
      key={item.ref}
      className={clsx(
        styles.item,
        mediaStore.SelectedMedia === item && styles.selected,
      )}
      onClick={() => mediaStore.selectIndex(index)}
    >
      <div
        className={styles.image}
        style={{ backgroundImage: `url(${item.src})` }}
      />
    </li>
  );
};

export default observer(MediaItem);
