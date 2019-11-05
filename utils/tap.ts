export const tap = <T>(fn: (val: T) => any, value: T): T => {
  fn(value);
  return value;
};
