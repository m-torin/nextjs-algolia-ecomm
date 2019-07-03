import fetch from 'isomorphic-unfetch';
import React from 'react';

import Layout from '../../components/common/Layout';

const AsyncExample = props => {
  const { stars } = props;

  return <Layout title="Async Example">Next stars: {stars}</Layout>;
};

AsyncExample.getInitialProps = async ({ req }) => {
  const res = await fetch('https://api.github.com/repos/zeit/next.js');
  const json = await res.json();

  return { stars: json.stargazers_count };
};

export default AsyncExample;
