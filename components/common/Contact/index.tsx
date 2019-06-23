import clsx from 'clsx';
import React from 'react';
import { Anchorable, withAnchor } from '../withAnchor';
import styles from './styles.scss';

interface ContactProps extends Anchorable {
  href?: string;
  icon: string;
  onClick?: React.MouseEventHandler;
  className?: string;
}

const Contact: React.FC<ContactProps> = ({
  href,
  icon,
  onClick,
  className,
  ...anchorEvents
}) => (
  <a
    className={clsx(styles.contact, className)}
    href={href}
    onClick={onClick}
    {...anchorEvents}
  >
    <img className={styles.image} src={icon} />
  </a>
);

export default withAnchor(Contact);
