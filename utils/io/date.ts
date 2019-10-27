import { IO } from 'fp-ts/lib/IO';

export const getNow: IO<number> = () => Number(new Date());
