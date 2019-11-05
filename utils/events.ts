import React from 'react';

export const prevented = <E extends React.SyntheticEvent>(
  handler: React.EventHandler<E>,
) => (e: E) => {
  e.preventDefault();
  handler(e);
};
