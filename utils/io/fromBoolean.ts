import { none, some } from 'fp-ts/lib/Option';

export const fromBoolean = (val: boolean) => (val ? none : some(null));
