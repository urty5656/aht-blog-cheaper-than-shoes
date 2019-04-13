import clsx from 'clsx';
import React from 'react';
import styles from './styles.scss';

interface ContactProps {
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
}) => (
  <a className={clsx(styles.contact, className)} href={href} onClick={onClick}>
    <img className={styles.image} src={icon} />
  </a>
);

export default Contact;
