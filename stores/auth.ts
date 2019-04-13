import autobind from 'autobind-decorator';
import { action, computed, observable } from 'mobx';
import { createContext } from 'react';
import { auth } from '../lib/firebase';

export class AuthStore {
  @observable
  initialized: boolean = false;
  @observable
  user: firebase.User | null = null;

  constructor() {
    auth.auth.onAuthStateChanged(this.setUser);
  }

  @computed
  get IsAdmin() {
    return this.user && this.user.email === 'urty5656@gmail.com';
  }

  @autobind
  @action
  setUser(user: firebase.User | null) {
    if (!process.browser) {
      return;
    }
    if (!this.initialized) {
      this.initialized = true;
    }
    this.user = user;
  }

  @autobind
  @action
  signIn(): Promise<any> {
    return auth.signIn();
  }

  @autobind
  @action
  signOut(): Promise<void> {
    return auth.signOut();
  }
}

export const authStoreCtx = createContext(new AuthStore());
