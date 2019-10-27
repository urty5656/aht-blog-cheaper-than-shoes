import { IO } from 'fp-ts/lib/IO';

export const alert = (message: string): IO<void> => () =>
  window.alert(`Error: ${message}`);
