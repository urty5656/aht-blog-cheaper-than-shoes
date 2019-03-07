import React, { useRef } from 'react';
import styles from './styles.css';
import { useScrollLock } from '../../../utils/hooks';

interface ModalProps {
  onClickBackground: React.MouseEventHandler;
}

const Modal: React.FunctionComponent<ModalProps> = ({
  onClickBackground,
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
      onClick={onClickOnlyBackground}
    >
      <div className={styles.container}>{children}</div>
    </div>
  );
};

export default Modal;
