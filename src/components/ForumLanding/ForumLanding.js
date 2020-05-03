import React from 'react';
import { Grid } from 'semantic-ui-react';
import QuestionPreviewFeed from '../QuestionPreviewFeed/QuestionPreviewFeed';
import CategoryCard from '../CategoryCards/CategoryCard';
import SearchFilterBar from '../SearchFilterBar/SearchFilterBar';

const ForumLanding = () => {
  return (
    <Grid container columns="equal" stackable>
      <Grid.Row>
        <SearchFilterBar />
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={12}>
          <QuestionPreviewFeed />
        </Grid.Column>
        <Grid.Column width={4}>
          <CategoryCard />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default ForumLanding;
