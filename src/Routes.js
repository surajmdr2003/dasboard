import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Components
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Campaign from './pages/Campaign';
import Creatives from './pages/Creatives';
import LandingPages from './pages/LandingPages';
import Targeting from './pages/Targeting';
import Stats from './pages/Stats';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';

const Routes = () => { 
  return (
    <Switch>
      {/* Public views */}
      <Route exact path="/" component={Login} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/campaign" component={Campaign} />
      <Route exact path="/creatives" component={Creatives} />
      <Route exact path="/landingPages" component={LandingPages} />
      <Route exact path="/targeting" component={Targeting} />
      <Route exact path="/stats" component={Stats} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/notifications" component={Notifications} />
      <Route component={NotFound} />
    </Switch>
  ); 
};

export default Routes;
