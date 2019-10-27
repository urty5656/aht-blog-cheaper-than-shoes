import NextLink from 'next/link';
import React, { useContext } from 'react';
import { UrlObject } from 'url';
import { globalStoreCtx } from '../../stores/global';

interface LinkProps {
  href: string | UrlObject;
  as?: string | UrlObject;
  className?: string;
}

const Link: React.FC<LinkProps> = ({ className, children, ...props }) => {
  const { cursor } = useContext(globalStoreCtx);

  return (
    <NextLink {...props}>
      <a className={className} onClick={cursor.startLoading}>
        {children}
      </a>
    </NextLink>
  );
};

export default Link;
