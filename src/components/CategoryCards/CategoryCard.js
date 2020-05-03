import React from 'react';
import styled from 'styled-components';
import {
 Card, Icon, Image, Header,
} from 'semantic-ui-react';

const CategoryCardWrapper = styled.div`
  &.recommendation-card-container {
    background: linear-gradient(135deg,#333842 0,#161626 100%); /* #393939 */
  border: 1px solid #4c4c4c;
  border-radius: 7px;
  border-top: none;
  border-bottom: none;
  /* boxShadow: "inset 7px 0 9px -7px rgba(76,76,76,0.7)", */
  border-right: none;
  }

  & .recommendation-card-header {
    text-align: center; 
    padding-top: 1em;
    color: ${(props) => props.theme.text};
  }

  a.ui.fluid.card.recommendation-card {
    background-color: transparent;
    box-shadow: none;
    border-bottom: 1px solid #4c4c4c;
    margin: 0;
    border-radius: 0;
    &:hover {
      background-color: transparent;
    }
    & .category-name {
      color: ${(props) => props.theme.text};
      font-family: Rubik, Lato;
      font-size: 1.2rem;
    }
    & .category-meta {
      color: ${(props) => props.theme.text};
      font-family: Montserrat;
      font-size: 1rem;
      margin-top: .5rem;
    }
  }

  a.ui.fluid.card.recommendation-card:last-child {
    border-bottom: none;
  }

  & .left-logo {
    max-width: 3rem;
    float: left;
    margin-right: .75em;
  }
  
`;

const CategoryCard = () => {
  return (
    <CategoryCardWrapper className="recommendation-card-container">
      <Header as="h4" className="recommendation-card-header">
        <Icon name="bookmark" />
        By College
      </Header>
      <Card
        fluid
        className="recommendation-card"
        href="jsndjskn"
        key="1"
      >
        <Card.Content target="_blank">
          <div className="left-logo">
            <Image
              className="padding-right-medium"
              src="https://upload.wikimedia.org/wikipedia/en/5/58/Jadavpur_University_Logo.svg"
            />
          </div>
          <Card.Meta className="category-name"> Jadavpur University </Card.Meta>
          <Card.Meta className="category-meta">
            <Icon name="chart line" />
            Total 125 questions
          </Card.Meta>
        </Card.Content>
      </Card>
      <Card
        fluid
        className="recommendation-card"
        href="jsndjskn"
        key="2"
      >
        <Card.Content target="_blank">
          <div className="left-logo">
            <Image
              className="padding-right-medium"
              src="https://upload.wikimedia.org/wikipedia/en/5/58/Jadavpur_University_Logo.svg"
            />
          </div>
          <Card.Meta className="category-name"> Jadavpur University </Card.Meta>
          <Card.Meta className="category-meta">
            <Icon name="chart line" />
            Total 125 questions
          </Card.Meta>
        </Card.Content>
      </Card>
      <Card
        fluid
        className="recommendation-card"
        href="jsndjskn"
        key="3"
      >
        <Card.Content target="_blank">
          <div className="left-logo">
            <Image
              className="padding-right-medium"
              src="https://upload.wikimedia.org/wikipedia/en/5/58/Jadavpur_University_Logo.svg"
            />
          </div>
          <Card.Meta className="category-name"> Jadavpur University </Card.Meta>
          <Card.Meta className="category-meta">
            <Icon name="chart line" />
            Total 125 questions
          </Card.Meta>
        </Card.Content>
      </Card>
      
    </CategoryCardWrapper>
  );
};

export default CategoryCard;
