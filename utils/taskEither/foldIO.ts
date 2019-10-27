import { fold as foldOption, Option } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import { left, right, TaskEither, taskEither } from 'fp-ts/lib/TaskEither';

/** Fold `Option` of `TaskEither<unknown, Option>`. */
export const foldIO = <E, A>(noneVal: E) => (
  task: TaskEither<E, Option<A>>,
): TaskEither<E, A> =>
  taskEither.chain(task, postDetail =>
    pipe(
      postDetail,
      foldOption(() => left(noneVal), right),
    ),
  );
