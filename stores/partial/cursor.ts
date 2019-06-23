import { action, computed, observable } from 'mobx';

export enum CursorType {
  Normal,
  Pointer,
  Pressed,
}

export class CursorStore {
  @observable isInitialized: boolean = false;

  @observable type: CursorType = CursorType.Normal;
  @observable isPressed: boolean = false;
  @observable isLoading: boolean = false;

  @computed
  get Type() {
    return this.isPressed ? CursorType.Pressed : this.type;
  }

  @action
  setInitialized() {
    this.isInitialized = true;
  }

  @action
  setType(type: CursorType) {
    this.type = type;
  }

  @action
  setPressed(value: boolean) {
    this.isPressed = value;
  }

  @action.bound
  startLoading() {
    this.isLoading = true;
  }

  @action.bound
  finishLoading() {
    this.isLoading = false;
  }
}
