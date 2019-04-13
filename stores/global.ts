import { action, observable } from 'mobx';
import { createContext, useContext, useEffect } from 'react';

export class GlobalStore {
  @observable
  isLoading: boolean = false;

  @action.bound
  startLoading() {
    this.isLoading = true;
  }

  @action.bound
  finishLoading() {
    this.isLoading = false;
  }
}

export const globalStoreCtx = createContext(new GlobalStore());

export const useGlobalStore = () => {
  const store = useContext(globalStoreCtx);
  useEffect(store.finishLoading, []);

  return store;
};
