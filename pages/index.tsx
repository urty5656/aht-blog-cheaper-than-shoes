import { observer } from 'mobx-react-lite';
import { NextFC } from 'next';
import React from 'react';
import Contact from '../components/common/Contact';
import Link from '../components/common/Link';
import Layout from '../components/layouts/DefaultLayout';
import { useGlobalStore } from '../stores/global';
import styles from '../styles/pages/index.scss';

const Index: NextFC = () => {
  useGlobalStore();

  return (
    <Layout>
      <main className={styles.container}>
        <h1 className={styles.heading}>NOT 整列</h1>
        <ul className={styles.nav}>
          <li className={styles.navItem}>
            <Link href="/me">ME</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/posts">BLOG</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/portfolio">WORKS</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/pics">PICTURES</Link>
          </li>
        </ul>
        <div className={styles.outlinks}>
          <Contact
            href="https://www.instagram.com/jr_.yang/"
            icon="/static/instagram.svg"
          />
          <Contact
            icon="/static/mail.svg"
            onClick={() => (location.href = 'mailto:urty5656@gmail.com')}
          />
        </div>
        {/* <Placeholder /> */}
      </main>
    </Layout>
  );
};

export default observer(Index);
