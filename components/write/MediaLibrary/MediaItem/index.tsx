import { MediaModel } from '@/models/media';
import { MediaStore } from '@/stores/partial/media';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Anchorable, withAnchor } from '../../../common/withAnchor';
import styles from './styles.scss';

interface MediaItemProps extends Anchorable {
  mediaStore: MediaStore;
  item: MediaModel;
  index: number;
}

const MediaItem: React.FC<MediaItemProps> = ({
  mediaStore,
  item,
  index,
  ...anchorEvents
}) => {
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
      {...anchorEvents}
    >
      <div className={styles.image} style={style} />
    </li>
  );
};

export default withAnchor(observer(MediaItem));
