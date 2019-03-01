import autobind from 'autobind-decorator';
import { action, observable } from 'mobx';
import { createContext } from 'react';
import { auth } from '../services/firebase';

const nothing = () => { };

class AuthStore {
  @observable
  initialized: boolean = false;
  @observable
  user: firebase.User | null = null;

  constructor() {
    auth.instance.onAuthStateChanged(this.setUser);
  }

  @autobind
  @action
  setUser(user: firebase.User | null) {
    if (!this.initialized) {
      this.initialized = true;
    }
    this.user = user;
  }

  @autobind
  @action
  signIn(): void {
    auth.signIn().fork(console.error, nothing);
  }

  @autobind
  @action
  signOut(): void {
    auth.signOut().fork(console.error, nothing);
  }
}

export const authStoreCtx = createContext(new AuthStore());
