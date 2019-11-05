import Layout from '@/components/layouts/DefaultLayout';
import React from 'react';

import styles from './styles.scss';

interface ErrorProps {
  statusCode: number;
}

const Error: React.FC<ErrorProps> = ({ statusCode }) => {
  const { heading, desc } = (() => {
    switch (statusCode) {
      case 400:
        return { heading: 'NO ACCESS', desc: 'IT IS 400' };
      case 404:
        return { heading: 'THERE IS NOTHING', desc: 'BUT 404' };
      case 500:
        return { heading: 'THE SERVER WENT ROGUE', desc: '500' };
      default:
        return { heading: 'UNKNOWN ERROR', desc: 'WHAT HAVE YOU DONE' };
    }
  })();

  return (
    <Layout>
      <main className={styles.container}>
        <h1 className={styles.heading}>{heading}</h1>
        <p>{desc}</p>
      </main>
    </Layout>
  );
};

export default Error;
