import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Theme from './themes';
import { GlobalStyles } from './themes/global';
import RichTextEditor from './common/Editor';
import ForumLanding from './components/ForumLanding/ForumLanding';
import { useTheme } from './hooks';
import Header from './components/Header/header';
import FileUploader from './components/FileUploader/FileUploader';

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
            <div>
              upload view <RichTextEditor />{' '}
            </div>
          </Route>
          <Route path="/forum">
            <FileUploader
              validExtensionList=".jpg"
              uploadUrl="http://127.0.0.1:5000/fileUpload"
              uploaderText={{
                titleText:
                  'Click here to select the file or drag and drop the selected file.',
                allowdFileText: 'Allowed file type is',
              }}
            />
          </Route>
        </Switch>
      </ThemeProvider>
    </div>
  );
};

export default App;
