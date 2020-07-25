import React, { useState, useEffect } from 'react';
import {
  Grid,
  Dropdown,
  Button,
  Header,
  Input,
  GridRow,
} from 'semantic-ui-react';
import RichTextEditor from './RichTextEditor';
import {
  getAlldrpDownValues,
  postQuestion,
} from '../../common/Repositories/discussionRepository';
import Chips from 'react-chips';
import { Checkbox } from 'semantic-ui-react';

export const DiscussionForm = ({
  rectangels,
  transformImagewidth,
  imageUrl,
  imagepath,
}) => {
  const [universities, setUniversities] = useState([]);
  const [stream, setStream] = useState([]);
  const [subject, setSubject] = useState([]);
  const [snippet, setsnippet] = useState([]);
  const [editorData, setEditorData] = useState({});
  const [discussionData, setdiscussionData] = useState({
    title: '',
    university: '',
    stream: '',
    subject: '',
    tags: [],
    pinned: false,
  });
  useEffect(() => {
    const fetchData = async () => {
      const drpDownValues = await getAlldrpDownValues();
      if (drpDownValues) {
        setUniversities(
          drpDownValues[0] &&
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
          drpDownValues[1] &&
            drpDownValues[1].map((element) => ({
              key: element._id,
              value: element.name,
              text: element.name,
            })),
        );
        setSubject(
          drpDownValues[2] &&
            drpDownValues[2].map((element) => ({
              key: element._id,
              value: element.name,
              text: element.name,
            })),
        );
      }
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   console.log('++++++++++++++', snippet);
  // }, [snippet]);

  const submitQuestion = async () => {
    try {
      let questionData = {
        forum_id: '5f14696b149de644d38ad51a',
        user_id: '5e9b4b0a24114c06f95da6b1',
        title: discussionData.title,
        content: JSON.stringify({
          entityMap: {},
          blocks: editorData,
        }).replace(/"/g, '\\"'),
        subject: [discussionData.subject],
        stream: [discussionData.stream],
        college: discussionData.university,
        favorites: ['5e9b4b0a24114c06f95da6b1'],
        snippet: snippet,
        tags: discussionData.tags,
        pinned: discussionData.pinned,
      };
      const drpDownValues = await postQuestion(questionData);
      if (drpDownValues.postCreated) {
        window.history.push(`/`);
      }
    } catch (error) {}
  };

  const changeDiscussionData = (value, type) => {
    let objDiscussionData = {};
    switch (type) {
      case 'title':
        objDiscussionData.title = value;
        break;
      case 'university':
        objDiscussionData.university = value;
        break;
      case 'stream':
        objDiscussionData.stream = value;
        break;
      case 'subject':
        objDiscussionData.subject = value;
        break;
      case 'tags':
        objDiscussionData.tags = [...discussionData.tags].concat(value);
        break;

      case 'pinned':
        objDiscussionData.pinned = value;
        break;

      default:
        break;
    }
    setdiscussionData({ ...discussionData, ...objDiscussionData });
  };

  return (
    <Grid columns="equal" style={{ margin: '1%' }}>
      <Grid.Row>
        <Grid.Column>
          <GridRow>
            <Header as="h5">Title</Header>
          </GridRow>
          <GridRow>
            <Input
              value={discussionData.title}
              style={{ width: '100%' }}
              onChange={(e, data) => changeDiscussionData(data.value, 'title')}
              placeholder="Tell us more"
            />
          </GridRow>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Header as="h5">Select University</Header>
          <Dropdown
            placeholder="Select University"
            onChange={(e, data) =>
              changeDiscussionData(data.value, 'university')
            }
            fluid
            multiple
            search
            selection
            value={discussionData.university}
            options={universities}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Header as="h5">Select Stream</Header>
          <Dropdown
            placeholder="Select Stream"
            fluid
            onChange={(e, data) => changeDiscussionData(data.value, 'stream')}
            search
            selection
            value={discussionData.stream}
            options={stream}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Header as="h5">Select Subject</Header>
          <Dropdown
            placeholder="Select Subject"
            fluid
            search
            value={discussionData.subect}
            onChange={(e, data) => changeDiscussionData(data.value, 'subject')}
            selection
            options={subject}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <GridRow>
            <Header as="h5">Add Tags</Header>
          </GridRow>
          <GridRow>
            <Chips
              value={discussionData.tags}
              uniqueChips={true}
              onChange={(chip) => changeDiscussionData(chip, 'tags')}
              suggestions={['C#', 'JS', 'C++', 'Java']}
            />
          </GridRow>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <GridRow>
            <Header as="h5">Pinned Post</Header>
          </GridRow>
          <GridRow>
            <Checkbox
              value={discussionData.pinned}
              toggle
              onChange={() =>
                changeDiscussionData(!discussionData.pinned, 'pinned')
              }
            />
          </GridRow>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <RichTextEditor
            setEditorData={setEditorData}
            rectangels={rectangels}
            transformImagewidth={transformImagewidth}
            imageUrl={imageUrl}
            imagepath={imagepath}
            setsnippet={setsnippet}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column floated="right">
          <Button onClick={submitQuestion} positive>
            Submit
          </Button>
        </Grid.Column>
        <Grid.Column floated="right">
          <Button negative>Cancel</Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
