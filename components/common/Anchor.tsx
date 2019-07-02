import React from 'react';
import { Anchorable, withAnchor } from './withAnchor';

interface AnchorProps extends Anchorable {
  children: React.ReactNode;
}

const Anchor: React.FC<AnchorProps> = ({ children, ...anchorEvents }) => {
  return <span {...anchorEvents}>{children}</span>;
};

export default withAnchor(Anchor);
