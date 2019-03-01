import React, { useRef, useLayoutEffect } from 'react';
import { attach } from '../../lib/editor';

const Editor: React.FunctionComponent = () => {
  const editorRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (editorRef.current) {
      attach(editorRef.current);
    }
  });

  return (
    <div ref={editorRef} />
  )
}

export default Editor;