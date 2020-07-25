import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Card, Icon, Image, Label } from 'semantic-ui-react';
import { Discussion } from '../discussion/discussion';
import { getQuestions } from '../../common/Repositories/discussionRepository';
import moment from 'moment';

const QuestionPreviewFeed = () => {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    const fetchQuestions = async () => {
      const questionsdata = await getQuestions();
      if (Array.isArray(questionsdata) && questionsdata.length > 0)
        setQuestions(
          questionsdata.sort((a, b) => new Date(b.date) - new Date(a.date)),
        );
    };
    fetchQuestions();
  }, []);

  return (
    <>
      <StyledCard fluid>
        {questions.length > 0 &&
          questions.map((item, index) => (
            <Card.Content target="_blank" key={index} href="www.google.com">
              <div className="imageContainer">
                <p className="stat-count">50</p>
                <p className="stat-description">views</p>
              </div>
              <div className="imageContainer">
                <p className="stat-count">4</p>
                <p className="stat-description">answers</p>
              </div>

              <Label className="category-info" image>
                <Icon name="laptop" />
                <span>{item.subject.join()}</span>
              </Label>

              <div className="url-heading">{item.title}</div>
              <Card.Meta>{item.snippet}</Card.Meta>
              <Label color="black" className="tag-container">
                <Icon name="clipboard outline" />
                {Array.isArray(item.college) &&
                  item.college.length > 0 &&
                  item.college.map((elem, i) => (
                    <>
                      <Label.Detail key={i} className="tag-link">
                        {elem}
                      </Label.Detail>
                    </>
                  ))}
              </Label>

              <Label className="subject-info" image>
                <Icon name="laptop" />
                <span>{item.subject.join()}</span>
              </Label>
              <Label className="user-info" image>
                <Image
                  avatar
                  spaced="right"
                  src="https://byblobstorage.blob.core.windows.net/bmby/htmlrockscomentutorialsspeedquick.png"
                />
                <span>Ayan Lohar</span>
                {` asked on ${moment(item.date).format('dddd, MMMM Do YYYY')}`}
              </Label>
            </Card.Content>
          ))}
      </StyledCard>
      <Discussion />
    </>
  );
};

export default QuestionPreviewFeed;
export const StyledCard = styled(Card)`
  &:hover {
    box-shadow: 0 0 5px 0 #ccc,
      0 0 0 1px ${(props) => props.theme.backgroundPrimary}!important;
  }
  && {
    background-color: ${(props) => props.theme.backgroundPrimary};
    box-shadow: ${(props) => props.theme.boxShadow};
    justify-content: center;
  }
  & .content {
    &:hover {
      color: ${(props) => props.theme.text};
    }
  }
  & .url-heading {
    font-family: Rubik, Lato;
    font-size: 1.5rem;
    padding: 0.8rem;
    &:hover {
      color: ${(props) => props.theme.text};
    }
  }
  && .meta {
    color: ${(props) => props.theme.text};
    font-size: 0.85rem;
    font-family: Montserrat;
    font-weight: 700;
    padding: 0 0.8rem;
    word-break: break-word;
    margin-bottom: 1.25rem;
  }

  & .imageContainer {
    min-height: 5em;
    min-width: 6em;
    border-radius: 5px;
    float: right;
    position: relative;

    & .stat-count {
      font-size: 2em;
      position: absolute;
      font-weight: 100;
      top: 40%;
      left: 50%;
      margin-right: -50%;
      transform: translate(-50%, -50%);
      text-transform: uppercase;
    }
    & .stat-description {
      font-size: 1em;
      position: absolute;
      font-weight: 100;
      top: 75%;
      left: 50%;
      margin-right: -50%;
      transform: translate(-50%, -50%);
    }
  }

  & .ui.label.category-info {
    background: none;
    color: ${(props) => props.theme.text};
    font-family: Rubik, Lato;
    font-weight: lighter;
  }

  & .ui.label.tag-container {
    color: ${(props) => props.theme.text};
    & .tag-link {
      font-family: Montserrat !important;
      font-weight: lighter;
    }
  }

  & .ui.label.subject-info {
    color: ${(props) => props.theme.text};
    background: none;
    font-family: Montserrat !important;
    font-weight: lighter;
    margin: 0 0.5rem;
  }

  & .ui.label.user-info {
    float: right;
    background: none;
    font-family: Montserrat !important;
    font-weight: lighter;
    color: ${(props) => props.theme.text};
  }
`;
