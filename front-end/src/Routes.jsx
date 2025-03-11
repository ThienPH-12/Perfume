import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import ProtectedPage from './pages/ProtectedPage';

const Routes = () => {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/protected">
          {user ? <ProtectedPage /> : <Redirect to="/login" />}
        </Route>
        {/* Add other routes here */}
      </Switch>
    </Router>
  );
};

export default Routes;
