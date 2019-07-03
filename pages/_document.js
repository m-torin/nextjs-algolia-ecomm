// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file
import * as Sentry from '@sentry/browser';
import LogRocket from 'logrocket';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

// LogRocket
LogRocket.init('ouoefb/amp');

// Sentry alerting
process.on('unhandledRejection', err => {
  Sentry.captureException(err);
});
process.on('uncaughtException', err => {
  Sentry.captureException(err);
});

export default class extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
