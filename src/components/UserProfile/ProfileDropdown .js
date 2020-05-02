import React from 'react';
import { Header, Image } from 'semantic-ui-react';

export const ProfileDropdown = (props) => {
  return (
    <Header as="h5" style={{ marginTop: ' 0px', color: '#ffffff' }}>
      <Image
        circular
        style={{ width: 'auto', height: '7vh', margin: '8px' }}
        src={props.avatar_url}
      />
      {props.login}
    </Header>
  );
};
