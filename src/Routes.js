import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Components
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const Routes = () => {
  return (
    <Switch>
      {/* Public views */}
      <Route exact path="/" component={Login} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route component={NotFound} />
    </Switch>
  ); 
};

export default Routes;
