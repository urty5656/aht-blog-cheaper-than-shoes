import Router from 'next/router';
import React, { useEffect, useState } from 'react';

import SideIndex from './SideIndex';
import styles from './styles.module.scss';

const Sidebar: React.FC = () => {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const close = (): void => setOpened(false);
    Router.events.on('routeChangeStart', close);

    return () => Router.events.off('routeChangeStart', close);
  }, []);

  return (
    <aside className={opened ? styles.container : styles.containerClosed}>
      <SideIndex />
      <button className={styles.handle} onClick={() => setOpened(!opened)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={opened ? styles.caret : styles.caretClosed}
          version="1.1"
          viewBox="0 0 240 240"
        >
          <path d="M60,15 L60,15 L180,120 L60,225 " />
        </svg>
      </button>
    </aside>
  );
};

export default Sidebar;
