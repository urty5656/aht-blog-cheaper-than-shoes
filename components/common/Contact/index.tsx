import clsx from 'clsx';
import React, { AnchorHTMLAttributes } from 'react';

import styles from './styles.module.scss';

interface ContactProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
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
