import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Theme from './themes';
import { GlobalStyles } from './themes/global';
import RichTextEditor from './components/discussion/RichTextEditor';
import ForumLanding from './components/ForumLanding/ForumLanding';
import { useTheme } from './hooks';
import Header from './components/Header/header';
import { Discussion } from './components/discussion/discussion';

const App = () => {
  const [theme, changeTheme] = useTheme();
  return (
    <div>
      <ThemeProvider theme={Theme[theme]}>
        <GlobalStyles />
        <Header theme={theme} changeTheme={changeTheme} />
        <Switch>
          <Route exact path="/">
            <ForumLanding />
          </Route>
          <Route path="/upload">
            <RichTextEditor />
          </Route>
          <Route path="/discussion">
            <Discussion />
          </Route>
        </Switch>
      </ThemeProvider>
    </div>
  );
};

export default App;
