import React, { useRef, useLayoutEffect } from 'react';
import { attach } from '../../lib/editor';
import styles from './styles.css';

const Editor: React.FunctionComponent = () => {
  const editorRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (editorRef.current) {
      attach(editorRef.current);
    }
  });

  return <div ref={editorRef} className={styles.container} />;
};

export default Editor;
