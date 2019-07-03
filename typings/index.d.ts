type Nullable<T> = T | null;

declare namespace NodeJS {
  interface Process {
    browser: boolean;
  }
}

declare module '*.scss' {
  const value: { [key: string]: string };
  export = value;
}

declare module '*.glsl' {
  const sourceCode: string;
  export { sourceCode };
}

declare module 'firestore-parser' {
  const parse: <T>(val: T) => T;
  export = parse;
}
