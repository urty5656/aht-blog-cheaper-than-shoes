import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { globalStoreCtx } from '../../../stores/global';
import styles from './styles.scss';

const DefaultLayout: React.FC = ({ children }) => {
  const { cursor } = useContext(globalStoreCtx);

  return (
    <div
      className={clsx(styles.wrap, cursor.isInitialized && styles.cursorLoaded)}
    >
      <div className={styles.layout}>{children}</div>
    </div>
  );
};

export default observer(DefaultLayout);
