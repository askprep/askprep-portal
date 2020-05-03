import React from 'react';
import styled from 'styled-components';
import {
    Dropdown, Search, Grid
} from 'semantic-ui-react';

const StyledDropdown = styled(Dropdown)`
  &:hover {
    box-shadow: 0 0 5px 0 #ccc,
      0 0 0 1px ${(props) => props.theme.backgroundPrimary}!important;
  }
  && {
    background-color: ${(props) => props.theme.backgroundPrimary};
    box-shadow: ${(props) => props.theme.boxShadow};
    justify-content: center;
  }
`;
const StyledSearch = styled(Search)`
  && {
    background-color: ${(props) => props.theme.backgroundPrimary};
    box-shadow: ${(props) => props.theme.boxShadow};
    justify-content: center;
}
& .ui.icon.input {
    width: 100%;
    & input.prompt {
        border-radius: 5px;
    }
  }
`;

const friendOptions = [
    {
      key: 'Jadavpur University',
      text: 'Jadavpur University',
      value: 'Jadavpur University',
      image: { avatar: true, src: 'https://upload.wikimedia.org/wikipedia/en/5/58/Jadavpur_University_Logo.svg' },
    },
    {
      key: 'IIT BHU',
      text: 'IIT BHU',
      value: 'IIT BHU',
      image: { avatar: true, src: 'https://upload.wikimedia.org/wikipedia/en/4/4c/Official_Logo_of_IIT%28BHU%29%2CVaranasi%2CIndia%2C2013.png' },
    },
    {
      key: 'NIT Warangal',
      text: 'NIT Warangal',
      value: 'NIT Warangal',
      image: { avatar: true, src: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/fb/National_Institute_of_Technology%2C_Warangal_logo.png/220px-National_Institute_of_Technology%2C_Warangal_logo.png' },
    },
  ];

  const results = [
    {
      title: 'Stehr - Yundt',
      description: 'Extended methodical website',
      image: 'https://s3.amazonaws.com/uifaces/faces/twitter/Elt_n/128.jpg',
      price: '$18.69',
    },
    {
      title: 'Kautzer and Sons',
      description: 'Robust object-oriented core',
      image: 'https://s3.amazonaws.com/uifaces/faces/twitter/dahparra/128.jpg',
      price: '$96.94',
    },
    {
      title: 'Mueller - Lehner',
      description: 'Stand-alone 3rd generation approach',
      image: 'https://s3.amazonaws.com/uifaces/faces/twitter/iamkarna/128.jpg',
      price: '$30.01',
    },
    {
      title: 'Zemlak Group',
      description: 'Reduced optimizing matrices',
      image:
        'https://s3.amazonaws.com/uifaces/faces/twitter/santi_urso/128.jpg',
      price: '$5.22',
    },
    {
      title: 'Schmidt, Raynor and Tillman',
      description: 'Cloned national application',
      image: 'https://s3.amazonaws.com/uifaces/faces/twitter/scips/128.jpg',
      price: '$88.96',
    },
  ];

const SearchFilterBar = (props) => {
  return (
    <>
    <Grid.Column width={4}>
        <StyledDropdown
            placeholder='Select Friend'
            fluid
            search
            selection
            options={friendOptions}
        />
    </Grid.Column>
    <Grid.Column width={12}>
        <StyledSearch
            // loading={}
            className="search-bar"
            fluid
            width={10}
            onResultSelect={() => {}}
            onSearchChange={() => {}}
            results={results}
            value={'Search in this portal'}
            {...props}
        />
    </Grid.Column>
        
    </>
  );
};

export default SearchFilterBar;
