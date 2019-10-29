import Anchor from '@/components/common/Anchor';
import Contact from '@/components/common/Contact';
import Link from '@/components/common/Link';
import PageTitle from '@/components/common/PageTitle';
import Layout from '@/components/layouts/DefaultLayout';
import { PageFC } from '@/components/SortApp';
import { authStoreCtx } from '@/stores/auth';
import { useGlobalStore } from '@/stores/global';
import styles from '@/styles/pages/index.scss';
import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';

const Index: PageFC = () => {
  const authStore = useContext(authStoreCtx);

  useGlobalStore();

  return (
    <Layout>
      <main>
        <PageTitle isAtHome={true}>NOT 整列</PageTitle>
        <ul className={styles.nav}>
          <li className={styles.navItem}>
            <Link href="/posts">BLOG</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/me">ME</Link>
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
