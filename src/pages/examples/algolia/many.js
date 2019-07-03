import axios from 'axios';
import React from 'react';
import { Segment } from 'semantic-ui-react';

import AlgoliaGridResults from '../../../components/algolia/GridResults';
import Layout from '../../../components/common/Layout';

const port = parseInt(process.env.PORT, 10) || 3001;

const AlgoliaMany = props => {
  const { data, searchIndex } = props;

  return (
    <Layout title={data.pageName}>
      <Segment>
        <AlgoliaGridResults algoliaIndex={searchIndex} results={data} />
      </Segment>
    </Layout>
  );
};

AlgoliaMany.getInitialProps = async ({ asPath }) => {
  const pathObj = asPath.split('/');
  const queryParams = `searchIndex=${pathObj[1]}`;

  try {
    const res = await axios(
      `http://localhost:${port}/api/algolia?${queryParams}`
    );

    return {
      data: res.data.data.hits,
      searchIndex: pathObj[1],
    };
  } catch (error) {
    console.error(error);
  }
};

export default AlgoliaMany;
