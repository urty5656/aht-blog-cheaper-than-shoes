import clsx from 'clsx';
import React, { useRef } from 'react';
import styles from './styles.css';
import { useScrollLock } from '../../../utils/hooks';

interface ModalProps {
  zIndex?: number;
  onClickBackground: React.MouseEventHandler;
  className?: string;
}

const Modal: React.FunctionComponent<ModalProps> = ({
  zIndex,
  onClickBackground,
  className,
  children,
}) => {
  const $el = useRef<HTMLDivElement>(null);
  useScrollLock();

  const onClickOnlyBackground = (e: React.MouseEvent) => {
    if (e.target !== $el.current) {
      return;
    }
    onClickBackground(e);
  };

  return (
    <div
      ref={$el}
      className={styles.background}
      style={{ zIndex }}
      onClick={onClickOnlyBackground}
    >
      <div className={clsx(styles.container, className)}>{children}</div>
    </div>
  );
};

export default Modal;
