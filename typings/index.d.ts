type Nullable<T> = T | null;

declare namespace NodeJS {
  interface Process {
    browser: boolean;
  }
}

declare module '*.css' {
  const value: { [key: string]: string };
  export = value;
}

declare module 'firestore-parser' {
  const parse: <T>(val: T) => T;
  export = parse;
}
