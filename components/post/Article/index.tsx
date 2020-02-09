import { PostModel } from '@/models/post/model';

import clsx from 'clsx';
import { highlightAll } from 'prismjs';
import React, { useEffect, useState } from 'react';

import styles from './styles.module.scss';

interface ArticleProps {
  post: PostModel;
}

const Article: React.FC<ArticleProps> = ({ post }) => {
  const [isLighted, setLighted] = useState(false);

  useEffect(() => highlightAll(false, () => setLighted(true)), [post]);

  return (
    <article
      className={clsx(styles.article, isLighted && styles.lighted)}
      dangerouslySetInnerHTML={{ __html: post.contentHTML }}
    />
  );
};

export default Article;
