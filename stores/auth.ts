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

  @action.bound
  setUser(user: firebase.User | null) {
    if (!process.browser) {
      return;
    }
    if (!this.initialized) {
      this.initialized = true;
    }
    this.user = user;
  }

  @action.bound
  signIn(): Promise<any> {
    return auth.signIn();
  }

  @action.bound
  signOut(): Promise<void> {
    return auth.signOut();
  }
}

export const authStoreCtx = createContext(new AuthStore());
