import { useStaticRendering as staticRendering } from 'mobx-react-lite';
import Document, { Head, Main, NextScript } from 'next/document';
import React from 'react';

staticRendering(true);

class CustomDocument extends Document {
  render(): JSX.Element {
    return (
      <html lang="ko">
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
          <link href="/static/crystal-64.png" rel="icon" sizes="64x64" type="image/png" />
          <link href="/static/crystal-128.png" rel="icon" sizes="128x128" type="image/png" />
          <link href="/static/crystal-256.png" rel="icon" sizes="256x256" type="image/png" />
          <link href="/static/crystal-512.png" rel="icon" sizes="512x512" type="image/png" />
          <link href="/manifest.json" rel="manifest" />
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
