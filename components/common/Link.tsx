import clsx from 'clsx';
import NextLink from 'next/link';
import React, { useContext } from 'react';
import { UrlObject } from 'url';
import { globalStoreCtx } from '../../stores/global';
import { Anchorable, withAnchor } from './withAnchor';

interface LinkProps extends Anchorable {
  href: string | UrlObject;
  as?: UrlObject;
  className?: string;
}

const Link: React.FC<LinkProps> = ({
  className,
  onMouseEnter,
  onMouseLeave,
  children,
  ...props
}) => {
  const { cursor } = useContext(globalStoreCtx);

  return (
    <NextLink {...props}>
      <a
        className={clsx(className)}
        onClick={cursor.startLoading}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {children}
      </a>
    </NextLink>
  );
};

export default withAnchor(Link);
