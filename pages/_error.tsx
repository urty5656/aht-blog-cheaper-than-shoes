import { ServerResponse } from 'http';

import Error from '@/components/common/Error';
import { PageFC } from '@/components/SortApp';
import { prop } from 'ramda';
import React from 'react';

interface ErrorProps {
  statusCode: number;
}

const ErrorPage: PageFC<ErrorProps> = ({ statusCode }) => {
  return <Error statusCode={statusCode} />;
};
ErrorPage.getInitialProps = async ({ res, err }) => {
  const pickStatusCode = prop('statusCode');
  const statusCode =
    pickStatusCode(res as ServerResponse) ||
    pickStatusCode(err as Record<'statusCode', number>);

  return { statusCode };
};

export default ErrorPage;
