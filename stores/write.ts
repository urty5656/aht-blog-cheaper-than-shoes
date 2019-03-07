import autobind from 'autobind-decorator';
import { observable, action } from 'mobx';
import { createContext } from 'react';

export class WriteStore {
  @observable
  isModalOpened: boolean = false;

  @autobind
  @action
  toggleModal() {
    this.isModalOpened = !this.isModalOpened;
  }
}

export const writeStoreCtx = createContext(new WriteStore());
