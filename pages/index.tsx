import Contact from '@/components/common/Contact';
import Link from '@/components/common/Link';
import PageTitle from '@/components/common/PageTitle';
import Layout from '@/components/layouts/DefaultLayout';
import { PageFC } from '@/components/SortApp';
import styles from '@/styles/pages/index.scss';
import React from 'react';

const Index: PageFC = () => {
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

export default Index;
