import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import Theme from './themes';
import { GlobalStyles } from './themes/global';
import Toggle from './components/Toggle';
import { useTheme } from './hooks';

const App = () => {
  const [theme, changeTheme] = useTheme();
  return (
    <div>
      <ThemeProvider theme={Theme[theme]}>
        <GlobalStyles />
        <Switch>
          <Route exact path="/">
            <Toggle type={theme} toggleTheme={changeTheme}>
              Toggle Theme
            </Toggle>
          </Route>
          <Route path="/forum">
            <div>Forum</div>
          </Route>
        </Switch>
      </ThemeProvider>
    </div>
  );
};

export default App;
