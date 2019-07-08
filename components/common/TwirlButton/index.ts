import dynamic from 'next/dynamic';

const TwirlButton = dynamic(() => import('./component'), { ssr: false });

export default TwirlButton;
