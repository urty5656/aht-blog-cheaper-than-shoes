import clsx from 'clsx';
import React from 'react';

import styles from './styles.scss';

interface ContactProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  icon: string;
}

const Contact: React.FC<ContactProps> = ({
  className,
  icon,
  ...anchorProps
}) => (
  <a className={clsx(styles.contact, className)} {...anchorProps}>
    <img className={styles.image} src={icon} />
  </a>
);

export default Contact;
