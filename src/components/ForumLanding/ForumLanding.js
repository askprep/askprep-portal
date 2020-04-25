import React from 'react';
import { Grid } from 'semantic-ui-react';
import QuestionPreviewFeed from '../QuestionPreviewFeed/QuestionPreviewFeed';

const ForumLanding = () => {
  return (
    <Grid container columns="equal" stackable>
      <Grid.Row>
        <Grid.Column width={12}>
          <QuestionPreviewFeed />
        </Grid.Column>
        <Grid.Column width={4}>colmn right</Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default ForumLanding;
