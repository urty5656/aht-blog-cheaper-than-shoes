import { Option, none, some } from 'fp-ts/lib/Option';

export const fromBoolean = (val: boolean): Option<null> =>
  val ? none : some(null);
