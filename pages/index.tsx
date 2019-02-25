import React from 'react';
import Link from "next/link";

const Index: React.FunctionComponent = () => {
  return (
    <main>
      <h1>Hello!</h1>
      <Link href="/about"><a>Go About</a></Link>
    </main>
  );
};

export default Index;
