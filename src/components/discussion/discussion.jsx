import React, { useState } from 'react';
import Rects from '../rects/rects';
import { Icon, Button, Step, Grid } from 'semantic-ui-react';
import { Pages } from './pages';

export const Discussion = () => {
  const [currentPage, setCurrentPage] = useState('upload');
  const [imageUrl, setImageUrl] = useState(undefined);
  const [tabDisbled, settabDisbled] = useState([
    { type: 'upload', isdiabled: false, iscompleted: false, isActive: true },
    { type: 'compress', isdiabled: true, iscompleted: false, isActive: false },
    { type: 'post', isdiabled: true, iscompleted: false, isActive: false },
  ]);

  const changeSteps = () => {
    const changeSteps = [...tabDisbled];
    for (let index = 0; index < changeSteps.length; index++) {
      if (changeSteps[index].isActive && index < 3) {
        changeSteps[index].isActive = false;
        changeSteps[index].iscompleted = true;
        changeSteps[index].isdiabled = false;
        setCurrentPage(changeSteps[index + 1].type);
        changeSteps[index + 1].isActive = true;
        changeSteps[index + 1].iscompleted = false;
        changeSteps[index + 1].isdiabled = false;
        settabDisbled(changeSteps);
        break;
      }
    }
  };
  return (
    <>
      <Grid>
        <Grid.Row>
          <Step.Group attached="top">
            <Step
              completed={tabDisbled[0].iscompleted}
              disabled={tabDisbled[0].isdiabled}
            >
              <Icon name="upload" />
              <Step.Content>
                <Step.Title>Upload Picture</Step.Title>
                <Step.Description>Choose your picture</Step.Description>
              </Step.Content>
            </Step>

            <Step
              completed={tabDisbled[1].iscompleted}
              disabled={tabDisbled[1].isdiabled}
            >
              <Icon name="compress" />
              <Step.Content>
                <Step.Title>Select </Step.Title>
                <Step.Description>Enter billing information</Step.Description>
              </Step.Content>
            </Step>

            <Step
              completed={tabDisbled[2].iscompleted}
              disabled={tabDisbled[2].isdiabled}
            >
              <Icon name="paper plane outline" />
              <Step.Content>
                <Step.Title>Post Discussion</Step.Title>
              </Step.Content>
            </Step>
          </Step.Group>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Pages
              setImageUrl={setImageUrl}
              imageUrl={imageUrl}
              tabDisbled={tabDisbled}
              settabDisbled={settabDisbled}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column floated="right" width={5}>
            <Button
              disabled={imageUrl ? false : true}
              positive={imageUrl ? true : false}
              icon
              labelPosition="right"
              onClick={changeSteps}
            >
              Next
              <Icon name="right arrow" />
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};
//  currentPage === 'rects' ? <Rects /> : <RichTextEditor />;
