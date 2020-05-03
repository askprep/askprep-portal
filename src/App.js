import React, { useState, useContext, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  Button,
  Icon,
  Menu,
  Container,
  Image,
  Dropdown,
} from 'semantic-ui-react';
import { ThemeProvider } from 'styled-components';
import Theme from './themes';
import { GlobalStyles } from './themes/global';
import Toggle from './components/Toggle';
import { useTheme } from './hooks';
import RichTextEditor from './common/Editor';
import ForumLanding from './components/ForumLanding/ForumLanding';
import LoginModal from './components/login/login';
import { Auth } from './Auth/auth';
import { ProfileDropdown } from './components/UserProfile/ProfileDropdown ';

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

const App = () => {
  const [theme, changeTheme] = useTheme();
  const [menuFixed] = useState(false);
  const [isloginModalOpen, setisloginModalOpen] = useState(false);
  const onloginModalClose = () => {
    setisloginModalOpen(false);
  };
  const onloginModalOpen = () => {
    setisloginModalOpen(true);
  };
  const [userDetails, setUserDetails] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      let userProfile = await Auth.CallUserRoleApi();
      setUserDetails(userProfile);
    };
    fetchData();
  }, []);
  return (
    <div>
      <ThemeProvider theme={Theme[theme]}>
        <GlobalStyles />
        {/* <Visibility
          onBottomPassed={setMenuFixed(true)}
          onBottomVisible={setMenuFixed(false)}
          once={false}
        > */}
        {/* <UserDetailsConsumer>
          {(value) => ( */}
        <>
          <Menu
            borderless
            className="ask-prep-header"
            fixed={menuFixed ? 'top' : undefined}
            style={menuFixed ? fixedMenuStyle : menuStyle}
          >
            <Container>
              <Menu.Item>
                <Image size="mini" src="/logo.png" />
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
              {!userDetails && (
                <Button onClick={onloginModalOpen} circular animated="vertical">
                  <Button.Content hidden>Login</Button.Content>
                  <Button.Content visible>
                    <Icon size="large" name="user" />
                  </Button.Content>
                </Button>
              )}
              {userDetails && <ProfileDropdown {...userDetails} />}
            </Container>
          </Menu>
        {/* </Visibility> */}
        <Switch>
          <Route exact path="/">
            <ForumLanding />
          </Route>
          <Route path="/upload">
            <div>upload view <RichTextEditor /> </div>
          </Route>
        </Switch>
        <LoginModal isOpen={isloginModalOpen} onClose={onloginModalClose} />
        </>
      </ThemeProvider>
    </div>
  );
};

export default App;
