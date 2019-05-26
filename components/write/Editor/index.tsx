import { attach } from '@/lib/editor';
import postStyles from '@/styles/common/post.scss';
import clsx from 'clsx';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import styles from './styles.scss';

export interface EditorRef {
  getView: () => EditorView;
  getState: () => EditorState;
  getInnerHTML: () => string;
}

export interface EditorProps {
  initialState?: object;
  onUpdate: (event: Event) => void;
}

const Editor: React.FC<EditorProps> = ({ initialState, onUpdate }, ref) => {
  const $el = useRef<HTMLDivElement>(null);
  const $editor = useRef<EditorView>();

  useImperativeHandle(ref, () => ({
    getView: () => $editor.current!,
    getState: () => $editor.current!.state,
    getInnerHTML: () => $editor.current!.dom.innerHTML,
  }));

  useEffect(() => {
    if ($el.current) {
      $editor.current = attach($el.current, initialState);
      $editor.current.dom.parentElement!.addEventListener('update', onUpdate);
    }
  }, []);

  return (
    <div ref={$el} className={clsx(styles.container, postStyles.postBody)} />
  );
};

export default forwardRef<EditorRef, EditorProps>(Editor);
