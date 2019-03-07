import { debounce } from 'lodash';
import React, { useRef, useLayoutEffect } from 'react';
import { attach } from '../../lib/editor';
import styles from './styles.css';
import { EditorView } from 'prosemirror-view';

const Editor: React.FunctionComponent = () => {
  const $el = useRef<HTMLDivElement>(null);
  const $editor = useRef<EditorView>();

  useLayoutEffect(() => {
    if ($el.current) {
      $editor.current = attach($el.current);
      $editor.current.dom.parentElement!.addEventListener(
        'update',
        debounce(() => console.log($editor.current!.state.toJSON()), 500, {
          trailing: true,
        }),
      );
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

export default Editor;
