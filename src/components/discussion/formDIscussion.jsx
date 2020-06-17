import React, { useState, useEffect } from 'react';
import { Grid, Dropdown, Button, TextArea, GridRow } from 'semantic-ui-react';
import RichTextEditor from './RichTextEditor';
import { getAlldrpDownValues } from '../../common/Repositories/discussionRepository';
import Chips from 'react-chips';
export const DiscussionForm = ({
  rectangels,
  transformImagewidth,
  imageUrl,
  imagepath,
}) => {
  const [universities, setUniversities] = useState([]);
  const [stream, setStream] = useState([]);
  const [subject, setSubject] = useState([]);
  const [tags, setTags] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const drpDownValues = await getAlldrpDownValues();
      if (drpDownValues) {
        setUniversities(
          drpDownValues[0].map((element) => ({
            key: element._id,
            value: element.shortName,
            text: element.name,
            image: {
              avatar: true,
              src: element.imageUrl,
            },
          })),
        );
        setStream(
          drpDownValues[1].map((element) => ({
            key: element._id,
            value: element.shortName,
            text: element.name,
          })),
        );
        setSubject(
          drpDownValues[2].map((element) => ({
            key: element._id,
            value: element.shortName,
            text: element.name,
          })),
        );
      }
    };
    fetchData();
  }, []);

  const handleAddChip = (chips) => {
    setTags(chips);
  };

  //   const handleDeleteChip = (chip, index) => {
  //     let newtag = [...tags];
  //     setTags([...newtag.splice(index, 1)]);
  //   };
  return (
    <Grid columns="equal" style={{ margin: '1%' }}>
      <Grid.Row>
        <Grid.Column>
          <GridRow>
            <label>Title</label>
          </GridRow>
          <GridRow>
            <TextArea style={{ width: '100%' }} placeholder="Tell us more" />
          </GridRow>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <label>Select University</label>
          <Dropdown
            placeholder="Select University"
            fluid
            multiple
            search
            search
            selection
            options={universities}
          />
        </Grid.Column>
        <Grid.Column>
          <label>Select Stream</label>
          <Dropdown
            placeholder="Select Stream"
            fluid
            search
            selection
            options={stream}
          />
        </Grid.Column>
        <Grid.Column>
          <label>Select Subject</label>
          <Dropdown
            placeholder="Select Subject"
            fluid
            search
            selection
            options={subject}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <GridRow>
            <label>Add Tags</label>
          </GridRow>
          <GridRow>
            <Chips
              value={tags}
              uniqueChips={true}
              onChange={(chip) => handleAddChip(chip)}
              suggestions={['C#', 'JS', 'C++', 'Java']}
            />
          </GridRow>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <RichTextEditor
            rectangels={rectangels}
            transformImagewidth={transformImagewidth}
            imageUrl={imageUrl}
            imagepath={imagepath}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column floated="right">
          <Button positive>Submit</Button>
        </Grid.Column>
        <Grid.Column floated="right">
          <Button negative>Cancel</Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
