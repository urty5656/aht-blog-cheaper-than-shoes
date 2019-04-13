import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import React, { useContext } from 'react';
import { globalStoreCtx } from '../../stores/global';

interface LinkProps extends Pick<NextLinkProps, 'href' | 'as'> {
  children: React.ReactNode;
}

const Link: React.FC<LinkProps> = ({ children, ...props }) => {
  const globalStore = useContext(globalStoreCtx);

  return (
    <NextLink {...props}>
      <a onClick={globalStore.startLoading}>{children}</a>
    </NextLink>
  );
};

export default Link;
