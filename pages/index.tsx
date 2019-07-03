import { observer } from 'mobx-react-lite';
import { NextFC } from 'next';
import React, { useContext } from 'react';
import Anchor from '../components/common/Anchor';
import Contact from '../components/common/Contact';
import Link from '../components/common/Link';
import PageTitle from '../components/common/PageTitle';
import Layout from '../components/layouts/DefaultLayout';
import { authStoreCtx } from '../stores/auth';
import { useGlobalStore } from '../stores/global';
import styles from '../styles/pages/index.scss';

const Index: NextFC = () => {
  const authStore = useContext(authStoreCtx);

  useGlobalStore();

  return (
    <Layout>
      <main>
        <PageTitle>NOT 整列</PageTitle>
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
          <li className={styles.navItem}>
            <Anchor>
              <span onClick={authStore.signIn}>SIGN IN</span>
            </Anchor>
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
      </main>
    </Layout>
  );
};

export default observer(Index);
