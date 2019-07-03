import axios from 'axios';
import React from 'react';
import { Segment } from 'semantic-ui-react';

import Layout from '../../../components/common/Layout';
// import AlgoliaGridResults from '../../../components/algolia/GridResults';

const port = parseInt(process.env.PORT, 10) || 3001;

const AlgoliaSingle = props => {
  const { data } = props;

  return (
    <Layout title={data.pageName}>
      <Segment {...data}>
        {data.name}
        ... show their products
      </Segment>
    </Layout>
  );
};

AlgoliaSingle.getInitialProps = async ({ asPath }) => {
  const pathObj = asPath.split('/');
  const queryParams = `searchIndex=${pathObj[1]}&lookFor=${pathObj[2]}&find=30`;

  try {
    const res = await axios(
      `http://localhost:${port}/api/algolia?${queryParams}`
    );

    return {
      data: res.data.data.hits,
    };
  } catch (error) {
    console.error(error);
  }
};

export default AlgoliaSingle;
