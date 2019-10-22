import { useStaticRendering } from 'mobx-react-lite';
import Document, { Head, Main, NextScript } from 'next/document';
import React from 'react';

useStaticRendering(true);

class CustomDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Noto+Serif+KR:400,700,900&display=swap&subset=korean"
            rel="stylesheet"
          />
          <link
            href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.17.1/themes/prism-tomorrow.min.css"
            rel="stylesheet"
          />
          <link
            href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
            rel="stylesheet"
          />
        </Head>
        <body className="custom_class">
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default CustomDocument;
