import autobind from 'autobind-decorator';
import { action, observable, computed } from 'mobx';
import { createContext } from 'react';
import { auth } from '../lib/firebase';

const nothing = () => {};

export class AuthStore {
  @observable
  initialized: boolean = false;
  @observable
  user: firebase.User | null = null;

  constructor() {
    auth.instance.onAuthStateChanged(this.setUser);
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
    console.log(this.user);
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
