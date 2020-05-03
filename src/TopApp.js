import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { ToastContainer } from 'react-toastify';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';
import { Auth } from './Auth/auth';
import { UserDetailsProvider } from './common/Providers/UserContext/UserProvider';
import SessionStorageService from './common/Services/session-storage.service';

const TopApp = () => {
  // Example of setting isAuthenticated in userContext, This function is for demonstration.
  // const handleOnAuthenticated = (username)=> {
  //   userContext.isAuthenticated = true;
  //   userContext.username = username;
  // }
  useEffect(() => {
    if (
      ['Redirecting', 'Done'].includes(
        SessionStorageService.getOAuthStatus(),
      ) ||
      SessionStorageService.getAccessToken()
    )
      Auth.login();
  }, []);

  return (
    <Container fluid>
      <Router>
        <UserDetailsProvider value={Auth.GetuserDetails()}>
          <Switch>
            <Route path="/admin">
              <div>Admins go here</div>
            </Route>
            <Route path="/">
              <App />
            </Route>
          </Switch>
        </UserDetailsProvider>
      </Router>
      <ToastContainer />
    </Container>
  );
};

export default TopApp;
