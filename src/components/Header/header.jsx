import React, { useState, useEffect } from 'react';
import {
  Button,
  Icon,
  Menu,
  Container,
  Image,
  Dropdown,
} from 'semantic-ui-react';
import { ProfileDropdown } from '../../components/UserProfile/ProfileDropdown ';
import Toggle from '../Toggle';
import LoginModal from '../../components/login/login';

import { Auth } from '../../Auth/auth';
import SessionStorageService from '../../common/Services/session-storage.service';

const menuStyle = {
  border: 'none',
  borderRadius: 0,
  boxShadow: 'none',
  marginBottom: '1em',
  marginTop: '4em',
  transition: 'box-shadow 0.5s ease, padding 0.5s ease',
};

const fixedMenuStyle = {
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
};

const Header = ({ changeTheme, theme }) => {
  const [menuFixed] = useState(false);
  const [isloginModalOpen, setisloginModalOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const oauthStatus = SessionStorageService.getOAuthStatus();
      const idToken = SessionStorageService.getAccessToken();
      if (oauthStatus && idToken) {
        const userProfile = await Auth.CallUserRoleApi();
        if (userProfile) setUserDetails(userProfile);
      }
    };
    fetchData();
  }, []);

  const onloginModalClose = () => {
    setisloginModalOpen(false);
  };
  const onloginModalOpen = () => {
    setisloginModalOpen(true);
  };
  return (
    <>
      <Menu
        borderless
        className="ask-prep-header"
        fixed={menuFixed ? 'top' : undefined}
        style={menuFixed ? fixedMenuStyle : menuStyle}
      >
        <Container>
          <Menu.Item>
            <Image size="mini" src={require('../../logo.svg')} />
          </Menu.Item>
          <Menu.Item header>Project Name</Menu.Item>
          <Menu.Item as="a" href="/forum">
            Forum
          </Menu.Item>
          <Menu.Item as="a" href="/upload">
            Upload
          </Menu.Item>

          <Menu.Menu position="right">
            <Menu.Item as="a">
              <Toggle type={theme} toggleTheme={changeTheme}>
                Toggle Theme
              </Toggle>
            </Menu.Item>
            <Dropdown text="Dropdown" pointing className="link item">
              <Dropdown.Menu>
                <Dropdown.Item>List Item</Dropdown.Item>
                <Dropdown.Item>List Item</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Header>Header Item</Dropdown.Header>
                <Dropdown.Item>
                  <i className="dropdown icon" />
                  <span className="text">Submenu</span>
                  <Dropdown.Menu>
                    <Dropdown.Item>List Item</Dropdown.Item>
                    <Dropdown.Item>List Item</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Item>
                <Dropdown.Item>List Item</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
          {userDetails ? (
            <ProfileDropdown {...userDetails} />
          ) : (
            <Button onClick={onloginModalOpen} circular animated="vertical">
              <Button.Content hidden>Login</Button.Content>
              <Button.Content visible>
                <Icon size="large" name="user" />
              </Button.Content>
            </Button>
          )}
        </Container>
      </Menu>
      <LoginModal isOpen={isloginModalOpen} onClose={onloginModalClose} />
    </>
  );
};

export default Header;
