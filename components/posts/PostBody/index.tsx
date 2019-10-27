import { PostModel } from '@/models/post/model';
import React from 'react';
import PostItem from './PostItem';
import styles from './styles.scss';

interface PostBodyProps {
  items: readonly PostModel[];
}

const PostBody: React.FC<PostBodyProps> = ({ items }) => {
  const formatter = new Intl.DateTimeFormat('ko-KR', {
    timeZone: 'Asia/Seoul',
  });

  return (
    <div className={styles.container}>
      {items.map(item => (
        <PostItem
          key={item.slug}
          className={styles.item}
          item={item}
          formatter={formatter}
        />
      ))}
    </div>
  );
};

export default PostBody;
