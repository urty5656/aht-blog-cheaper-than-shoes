import { NextComponentType, NextPageContext } from 'next';

// Left with null is same as { statusCode: 500 }
export type PageFC<P = object> = NextComponentType<NextPageContext, P, P>;
