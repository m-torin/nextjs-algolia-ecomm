import React from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';

const errorMsg = ({ statusCode }) =>
  statusCode === 404 ? `Server Error (${statusCode})` : 'Browser Error';

const _Error = props => {
  return (
    <Container className="errorPageWrapper" text textAlign="center">
      <Segment>
        <Header as="h1">{errorMsg(props)}</Header>
      </Segment>
    </Container>
  );
};

_Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : null;

  return { statusCode };
};

export default _Error;
