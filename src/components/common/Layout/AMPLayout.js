import Head from 'next/head';
import PropTypes from 'prop-types';
import React, { Fragment, PureComponent } from 'react';

class AMPLayout extends PureComponent {
  render() {
    const { title, children } = this.props;
    const segmentKey =
      '{"vars": {"writeKey": "AMP_WRITE_KEY","name": "My Page Name"}}';

    return (
      <Fragment>
        <Head>
          <title>{title}</title>
          <script
            async
            custom-element="amp-analytics"
            src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"
          />
        </Head>

        <main>{children}</main>

        <amp-analytics type="segment">
          <script
            dangerouslySetInnerHTML={{ __html: segmentKey }}
            type="application/json"
          />
        </amp-analytics>
      </Fragment>
    );
  }
}

AMPLayout.propTypes = {
  title: PropTypes.string.isRequired,
};

export default AMPLayout;
