import Error from '@/components/common/Error';
import { NextFC } from 'next';
import { prop } from 'ramda';
import React from 'react';

interface ErrorProps {
  statusCode: number;
}

const ErrorPage: NextFC<ErrorProps> = ({ statusCode }) => {
  console.log('error');
  return <Error statusCode={statusCode} />;
};
ErrorPage.getInitialProps = ({ res, err }) => {
  const pickStatusCode = prop('statusCode');
  const statusCode = pickStatusCode(res!) || pickStatusCode(err as any);

  return { statusCode };
};

export default ErrorPage;
