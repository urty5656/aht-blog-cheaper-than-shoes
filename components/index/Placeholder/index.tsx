import dynamic from 'next/dynamic';
import React from 'react';

const Canvasic = dynamic(() => import('../Canvasic'), {
  ssr: false,
});

const Placeholder: React.FC = () => {
  return <Canvasic />;
};

export default Placeholder;
