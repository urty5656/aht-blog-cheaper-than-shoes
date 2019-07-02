import React, { useContext } from 'react';
import { globalStoreCtx } from '../../stores/global';
import { CursorType } from '../../stores/partial/cursor';

export interface Anchorable {
  onMouseEnter?: React.MouseEventHandler;
  onMouseLeave?: React.MouseEventHandler;
}

export const withAnchor = <P extends Anchorable>(
  Wrapped: React.ComponentType<P>,
): React.FC<P> => props => {
  const globalStore = useContext(globalStoreCtx);

  const onMouseEnter: React.MouseEventHandler<HTMLAnchorElement> = e => {
    props.onMouseEnter && props.onMouseEnter(e);
    globalStore.cursor.setType(CursorType.Pointer);
  };

  const onMouseLeave: React.MouseEventHandler<HTMLAnchorElement> = e => {
    props.onMouseLeave && props.onMouseLeave(e);
    globalStore.cursor.setType(CursorType.Normal);
  };

  return (
    <Wrapped
      {...props}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
};
