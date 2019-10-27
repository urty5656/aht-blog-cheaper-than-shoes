import { IO } from 'fp-ts/lib/IO';
import React from 'react';

export const prevent = (
  e: Event | React.SyntheticEvent,
): IO<Event | React.SyntheticEvent> => () => {
  e.preventDefault();
  return e;
};

export const prevented = <E extends React.SyntheticEvent>(
  handler: React.EventHandler<E>,
) => (e: E) => {
  e.preventDefault();
  handler(e);
};
