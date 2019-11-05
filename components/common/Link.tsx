import { UrlObject } from 'url';

import NextLink from 'next/link';
import React from 'react';

interface LinkProps {
  href: string | UrlObject;
  as?: string | UrlObject;
  className?: string;
}

const Link: React.FC<LinkProps> = ({ className, children, ...props }) => {
  return (
    <NextLink {...props}>
      <a className={className}>{children}</a>
    </NextLink>
  );
};

export default Link;
