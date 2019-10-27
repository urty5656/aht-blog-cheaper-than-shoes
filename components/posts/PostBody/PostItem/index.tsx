import Link from '@/components/common/Link';
import { PostModel } from '@/models/post/model';
import clsx from 'clsx';
import React from 'react';
import styles from './styles.scss';

interface PostItemProps {
  item: PostModel;
  formatter: Intl.DateTimeFormat;
  className?: string;
}

const PostItem: React.FC<PostItemProps> = ({ className, item, formatter }) => {
  const created = new Date(item.created!);

  return (
    <article className={clsx(className)}>
      <Link
        className={styles.link}
        href="/posts/[slug]"
        as={`/posts/${item.slug}`}
      >
        <h2 className={styles.title}>{item.title}</h2>
        <time className={styles.dateTime} dateTime={created.toISOString()}>
          {formatter.format(created)}
        </time>
      </Link>
    </article>
  );
};

export default PostItem;
