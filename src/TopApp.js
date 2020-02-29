import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { ToastContainer } from 'react-toastify';
import App from './App';
// import PrivateRoute from './PrivateRoute';
import { UserContext, userContext } from './userContext';
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.baseURL = 'http://localhost:4000/api';

export default function TopApp() {
  // Example of setting isAuthenticated in userContext, This function is for demonstration.
  function handleOnAuthenticated(username) {
    userContext.isAuthenticated = true;
    userContext.username = username;
  }

  return (
    <Container fluid>
      <Router>
        <UserContext.Provider value={userContext}>
          <Switch>
            <Route path="/admin">
                <div>Admins go here</div>
            </Route>
            <Route path="/">
                <App />
            </Route>
          </Switch>
        </UserContext.Provider>
      </Router>
      <ToastContainer />
    </Container>
  );
}
