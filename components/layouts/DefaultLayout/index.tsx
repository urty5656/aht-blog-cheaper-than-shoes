import { observer } from 'mobx-react-lite';
import React from 'react';

import styles from './styles.scss';

const DefaultLayout: React.FC = ({ children }) => {
  return (
    <div className={styles.wrap}>
      <div className={styles.layout}>{children}</div>
    </div>
  );
};

export default observer(DefaultLayout);
