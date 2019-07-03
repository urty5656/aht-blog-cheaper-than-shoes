import dynamic from 'next/dynamic';
import React from 'react';

const Canvasic = dynamic(() => import('../Canvasic'), {
  ssr: false,
  loading: () => null,
});

const Placeholder: React.FC = () => {
  return <Canvasic />;
};

export default Placeholder;
