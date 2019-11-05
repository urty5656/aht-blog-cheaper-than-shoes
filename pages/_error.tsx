import { ServerResponse } from 'http';

import Error from '@/components/common/Error';
import { TaskFC, withTaskHandler } from '@/components/common/withTaskHandler';
import { TE } from '@/utils/prelude';
import { prop } from 'fp-ts-ramda';
import React from 'react';

interface ErrorProps {
  statusCode: number;
}

const ErrorPage: TaskFC<ErrorProps> = ({ statusCode }) => {
  return <Error statusCode={statusCode} />;
};
ErrorPage.getInitialProps = ({ res, err }) => {
  const pickStatusCode = prop('statusCode');
  const statusCode =
    pickStatusCode(res as ServerResponse) ||
    pickStatusCode(err as Record<'statusCode', number>);

  return TE.right({ statusCode });
};

export default withTaskHandler(ErrorPage);
