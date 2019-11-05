import { MediaModel } from '@/models/media/model';
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
  const style: React.CSSProperties = {
    backgroundImage: `url(${item.src})`,
  };

  return (
    <li
      key={item.ref}
      className={clsx(
        styles.item,
        mediaStore.selectedIndex === index && styles.selected,
      )}
      onClick={() => mediaStore.selectIndex(index)}
    >
      <div className={styles.image} style={style} />
    </li>
  );
};

export default observer(MediaItem);
