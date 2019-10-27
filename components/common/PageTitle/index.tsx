import React from 'react';
import Link from '../Link';
import styles from './styles.scss';

interface PageTitleProps {
  isAtHome?: boolean;
  children: React.ReactText;
}

const PageTitle: React.FC<PageTitleProps> = ({ isAtHome, children }) => {
  if (isAtHome) {
    return <h1 className={styles.pageTitle}>{children}</h1>;
  }

  // [todo] should be able to choose destination
  // e.g. Posts -> /, Post -> Posts
  return (
    <Link href="/">
      <h1 className={styles.pageTitle}>{children}</h1>
    </Link>
  );
};

export default PageTitle;
