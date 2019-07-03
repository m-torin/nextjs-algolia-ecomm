import React from 'react';
import { Card, Container, Grid } from 'semantic-ui-react';

let AboutPage = props => {
  return (
    <Container>
      <h1>About</h1>

      <Card fluid>
        <Grid centered columns={2}>
          <Grid.Column>
            <p>yada yada yada...</p>
            <p>yada yada yada...</p>
            <p>yada yada yada...</p>
            <p>yada yada yada...</p>
            <p>yada yada yada...</p>
            <p>yada yada yada...</p>
          </Grid.Column>
        </Grid>
      </Card>
    </Container>
  );
};

export default AboutPage;
