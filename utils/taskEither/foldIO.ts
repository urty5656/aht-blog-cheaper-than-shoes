import { O, TE, pipe } from '@/prelude';

/** Fold `Option` of `TaskEither<unknown, Option>`. */
export const foldIO = <E, A>(noneVal: E) => (
  task: TE.TaskEither<E, O.Option<A>>,
): TE.TaskEither<E, A> =>
  TE.taskEither.chain(task, postDetail =>
    pipe(
      postDetail,
      O.fold(() => TE.left(noneVal), TE.right),
    ),
  );
