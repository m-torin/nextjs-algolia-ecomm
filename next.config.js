/**
 * https://github.com/zeit/next.js#custom-configuration
 * https://github.com/zeit/next-plugins
 * https://github.com/cyrilwanner/next-compose-plugins
 */

const withPlugins = require('next-compose-plugins');
const { PHASE_PRODUCTION_BUILD } = require('next/constants');
const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");
const withCSS = require('@zeit/next-css');
const withImages = require('next-images');
const withSass = require('@zeit/next-sass');
const withSize = require('next-size');
require('dotenv').config();

// Variables exposed at build-time
const nextConfig = {
  env: {
    algolia: {
      apiKey: process.env.ALGOLIA_API_KEY,
      appId: process.env.ALGOLIA_APP_ID,
    },
    nodeEnv: process.env.NODE_ENV,
    segmentAnalyticsWriteKey: process.env.SEGMENT_ANALYTICS_WRITE_KEY,
    sentryDSN: process.env.SENTRY_DSN,
  },
};

const analyzer = {
  analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
    },
    browser: {
      analyzerMode: 'static',
    }
  }
};

module.exports = withPlugins([
  [withSass, {
    cssModules: true,
    cssLoaderOptions: {
      localIdentName: '[local]___[hash:base64:5]',
    },
    [PHASE_PRODUCTION_BUILD]: {
      cssLoaderOptions: {
        localIdentName: '[hash:base64:3]',
      },
    },
  }],
  withCSS,
  withImages,
  withSize,
  [withBundleAnalyzer, analyzer],
], nextConfig);

