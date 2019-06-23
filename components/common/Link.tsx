import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import React, { useContext } from 'react';
import { globalStoreCtx } from '../../stores/global';
import { Anchorable, withAnchor } from './withAnchor';

interface LinkProps extends Pick<NextLinkProps, 'href' | 'as'>, Anchorable {
  children: React.ReactNode;
}

const Link: React.FC<LinkProps> = ({
  children,
  onMouseEnter,
  onMouseLeave,
  ...props
}) => {
  const { cursor } = useContext(globalStoreCtx);

  return (
    <NextLink {...props}>
      <a
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
