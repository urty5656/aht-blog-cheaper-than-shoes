import Layout from '@/components/layouts/DefaultLayout';
import { always, cond, equals, T as True } from 'ramda';
import React from 'react';
import styles from './styles.scss';

interface ErrorProps {
  statusCode: number;
}

const Error: React.FC<ErrorProps> = ({ statusCode }) => {
  const { heading, desc } = cond<number, { heading: string; desc: string }>([
    [equals(400), always({ heading: 'NO ACCESS', desc: 'IT IS 400' })],
    [equals(404), always({ heading: 'THERE IS NOTHING', desc: 'BUT 404' })],
    [equals(500), always({ heading: 'THE SERVER WENT ROGUE', desc: '500' })],
    [True, always({ heading: 'UNKNOWN ERROR', desc: 'WHAT HAVE YOU DONE' })],
  ])(statusCode);

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
