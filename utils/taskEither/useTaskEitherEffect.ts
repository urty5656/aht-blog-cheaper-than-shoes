import { TaskEither } from 'fp-ts/lib/TaskEither';
import { useEffect } from 'react';

export const useTaskEitherEffect = (
  task: TaskEither<any, any>,
  cleanUp?: () => void,
  deps?: any[],
) =>
  useEffect(() => {
    task();
    return cleanUp;
  }, deps);
