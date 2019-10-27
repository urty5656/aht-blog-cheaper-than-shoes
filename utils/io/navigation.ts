import { IO } from 'fp-ts/lib/IO';

export const navigate = (path: string): IO<void> => () =>
  (location.href = path);
