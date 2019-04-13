import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { attach } from '../../../lib/editor';
import styles from './styles.scss';

export interface EditorRef {
  getState: () => EditorState;
  getInnerHTML: () => string;
}

export interface EditorProps {
  onUpdate: (event: Event) => void;
}

const Editor: React.FC<EditorProps> = ({ onUpdate }, ref) => {
  const $el = useRef<HTMLDivElement>(null);
  const $editor = useRef<EditorView>();

  useImperativeHandle(ref, () => ({
    getState: () => $editor.current!.state,
    getInnerHTML: () => $editor.current!.dom.innerHTML,
  }));

  useEffect(() => {
    if ($el.current) {
      $editor.current = attach($el.current);
      $editor.current.dom.parentElement!.addEventListener('update', onUpdate);
    }
  }, []);

  return (
    <div>
      <div ref={$el} className={styles.container} />
      <button
        onClick={e => {
          e.preventDefault();
          console.log($editor.current && $editor.current.dom.innerHTML);
          console.log($editor.current && $editor.current.state.toJSON());
        }}
      >
        Log
      </button>
    </div>
  );
};

export default forwardRef<EditorRef, EditorProps>(Editor);
