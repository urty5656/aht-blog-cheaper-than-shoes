import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { authStoreCtx } from '../stores/auth';

const render = (flag: boolean, content: JSX.Element): JSX.Element => {
  return flag ? content : <h1>Loading...</h1>;
};

const Write: React.FunctionComponent = () => {
  const authStore = useContext(authStoreCtx);

  return (
    <main>
      {
        render(
          authStore.initialized,
          (
            <form action="#" autoComplete="off">
              <input placeholder="제목" />
              <textarea placeholder="내용" style={{ resize: 'none' }} />
              <button type="submit">등록</button>
            </form>
          )
        )
      }
    </main>
  )
};

export default observer(Write);
