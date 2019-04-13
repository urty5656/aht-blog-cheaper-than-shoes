import { NextFC } from 'next';
import { always, cond, equals, prop, T as True } from 'ramda';
import React from 'react';
import Layout from '../components/layouts/DefaultLayout';
import styles from '../styles/pages/error.scss';

interface ErrorProps {
  heading: string;
  desc: string;
}

const Error: NextFC<ErrorProps> = ({ heading, desc }) => {
  return (
    <Layout>
      <main className={styles.container}>
        <h1 className={styles.heading}>{heading}</h1>
        <p>{desc}</p>
      </main>
    </Layout>
  );
};
Error.getInitialProps = ({ res, err }) => {
  const pickStatusCode = prop('statusCode');

  const statusCode = pickStatusCode(res!) || pickStatusCode(err as any);
  const props = cond<number, ErrorProps>([
    [equals(400), always({ heading: 'NO ACCESS', desc: 'IT IS 400' })],
    [equals(404), always({ heading: 'THERE IS NOTHING', desc: 'BUT 404' })],
    [equals(500), always({ heading: 'THE SERVER WENT ROGUE', desc: '500' })],
    [True, always({ heading: 'UNKNOWN ERROR', desc: 'WHAT HAVE YOU DONE' })],
  ])(statusCode);

  return props;
};

export default Error;
