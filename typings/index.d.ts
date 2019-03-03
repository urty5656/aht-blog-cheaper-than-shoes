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
