import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { globalStoreCtx } from '../../../stores/global';
import styles from './styles.scss';

const Loader: React.FC = () => {
  const globalStore = useContext(globalStoreCtx);

  return (
    <>
      {globalStore.isLoading && (
        <div className={styles.wrap}>
          <div className={styles.loader} />
        </div>
      )}
    </>
  );
};

export default observer(Loader);
