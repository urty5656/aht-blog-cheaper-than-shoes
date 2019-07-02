import Link from '@/components/common/Link';
import { PostModel } from '@/models/blog';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import styles from './styles.scss';

interface PostItemProps {
  item: PostModel;
  formatter: Intl.DateTimeFormat;
  className?: string;
}

const PostItem: React.FC<PostItemProps> = ({ className, item, formatter }) => {
  const [dateTime, setDateTime] = useState('');

  const created = new Date(item.created!);

  useEffect(() => {
    setDateTime(formatter.format(created));
  }, []);

  return (
    <article className={clsx(className)}>
      <Link className={styles.link} href={`/posts/${item.slug}`}>
        <h2 className={styles.title}>{item.title}</h2>
        <time className={styles.dateTime} dateTime={created.toISOString()}>
          {dateTime}
        </time>
      </Link>
    </article>
  );
};

export default PostItem;
