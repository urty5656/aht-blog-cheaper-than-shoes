import { NextFC } from 'next';

export type PageIP<P> = void | P | { statusCode?: number };

export type PageFC<P = object> = NextFC<P, PageIP<P>>;
