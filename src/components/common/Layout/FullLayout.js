import * as snippet from '@segment/snippet';
import Head from 'next/head';
import Router from 'next/router';
import PropTypes from 'prop-types';
import React, { Fragment, PureComponent } from 'react';

class FullLayout extends PureComponent {
  // Segment analytics
  loadSegment = () => {
    const opts = {
      apiKey: process.env.segmentAnalyticsWriteKey,
      // note: the page option only covers SSR tracking.
      // Page.js is used to track other events using `window.analytics.page()`
      page: true,
    };

    if (process.env.nodeEnv === 'development') {
      return snippet.max(opts);
    }

    return snippet.min(opts);
  };

  render() {
    const { title, children } = this.props;

    if (process.env.nodeEnv === 'production') {
      // Track client-side page views with Segment
      Router.events.on('routeChangeComplete', url => {
        global.analytics.page(url);
      });
    }

    return (
      <Fragment>
        <Head>
          <title>{title}</title>
          <meta
            content="initial-scale=1.0, width=device-width"
            name="viewport"
          />
          <link href="/semantic/semantic.min.css" rel="stylesheet" />
          <script dangerouslySetInnerHTML={{ __html: this.loadSegment() }} />
        </Head>

        <main>{children}</main>
      </Fragment>
    );
  }
}

FullLayout.propTypes = {
  title: PropTypes.string.isRequired,
};

export default FullLayout;
