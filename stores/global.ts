import { createContext, useContext, useEffect } from 'react';
import { CursorStore, CursorType } from './partial/cursor';

export class GlobalStore {
  readonly cursor = new CursorStore();
}

export const globalStoreCtx = createContext(new GlobalStore());

export const useGlobalStore = () => {
  const { cursor } = useContext(globalStoreCtx);
  useEffect(() => {
    cursor.setType(CursorType.Normal);
    cursor.finishLoading();

    const onPressed = () => cursor.setPressed(true);
    const onReleased = () => cursor.setPressed(false);

    window.addEventListener('mousedown', onPressed);
    window.addEventListener('mouseup', onReleased);

    return () => {
      window.removeEventListener('mousedown', onPressed);
      window.removeEventListener('mouseup', onReleased);
    };
  }, []);

  return cursor;
};
