import React from 'react';
import Link from '../../Link';
import styles from './styles.scss';

const SideIndex: React.FC = () => {
  return (
    <nav className={styles.container}>
      <h1 className={styles.title}>
        <Link href="/">NOT 整列</Link>
      </h1>
      <ul className={styles.items}>
        <li className={styles.item}>
          <Link href="/posts">BLOG</Link>
        </li>
        <li className={styles.item}>
          <Link href="/me">ME</Link>
        </li>
        <li className={styles.item}>
          <Link href="/portfolio">WORKS</Link>
        </li>
        <li className={styles.item}>
          <Link href="/pics">PICTURES</Link>
        </li>
      </ul>
    </nav>
  );
};

export default SideIndex;
