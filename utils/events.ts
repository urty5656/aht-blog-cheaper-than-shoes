import React from 'react';

export const prevent = (e: Event | React.SyntheticEvent) => {
  e.preventDefault();
  return e;
};
