import React, { useState } from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import { Visibility, Menu, Container, Image, Dropdown } from 'semantic-ui-react';
import { ThemeProvider } from 'styled-components';

import Theme from './themes';
import { GlobalStyles } from './themes/global';
import Toggle from './components/Toggle';
import { useTheme } from './hooks';
import RichTextEditor from './common/Editor';

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
  const [menuFixed, setMenuFixed] = useState(false);
  return (
    <div>
      <ThemeProvider theme={Theme[theme]}>
        <GlobalStyles />
        {/* <Visibility
          onBottomPassed={setMenuFixed(true)}
          onBottomVisible={setMenuFixed(false)}
          once={false}
        > */}
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
              <Menu.Item as="a" href="/forum">Forum</Menu.Item>
              <Menu.Item as="a" href="/upload">Upload</Menu.Item>

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
            </Container>
          </Menu>
        {/* </Visibility> */}
        <Switch>
          <Route exact path="/">
            This is default Route
          </Route>
          <Route path="/forum">
            <div>Forum</div>
          </Route>
          <Route path="/upload">
            <div>upload view <RichTextEditor /> </div>
          </Route>
        </Switch>
      </ThemeProvider>
    </div>
  );
};

export default App;
