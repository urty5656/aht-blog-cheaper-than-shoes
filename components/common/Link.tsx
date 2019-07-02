import clsx from 'clsx';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import React, { useContext } from 'react';
import { globalStoreCtx } from '../../stores/global';
import { Anchorable, withAnchor } from './withAnchor';

interface LinkProps extends Pick<NextLinkProps, 'href' | 'as'>, Anchorable {
  children: React.ReactNode;
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
