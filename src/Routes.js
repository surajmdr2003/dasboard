import React from 'react';
import { Redirect } from 'react-router';
import { Route, Switch } from 'react-router-dom';

// Private Route Component
import PrivateRoute from './components/common/PrivateRoute.component';

// Required Components
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import AdminPages from './pages/Admin.page';
import Dashboard from './pages/Dashboard';
import Campaign from './pages/Campaign';
import Creatives from './pages/Creatives';
import LandingPages from './pages/LandingPages';
import Targeting from './pages/Targeting';
import Stats from './pages/Stats';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import EditProfile from './pages/EditProfile';
import CreateCustomReport from './pages/CreateCustomReport';
import Reports from './pages/Reports';
import Billing from './pages/Billing';
import PageNotFound from './pages/NotFound';
import CampaignList from './pages/CampaignList';

const Routes = () => {
  return (
    <Switch>
      <Route path={'/'} component={Welcome} exact />
      <Route exact path={'/login'} component={Login} />
      <Route exact path={'/others'} component={Welcome} />
      <Route
        path={'/dashboard'}
        render={({ match: { path } }) => (
          <AdminPages>
            <Switch>
              <PrivateRoute exact path={path + '/'} component={Dashboard} />
              <PrivateRoute exact path={path + '/campaigns'} component={CampaignList} />
              <PrivateRoute exact path={path + '/campaign'} component={Campaign} />
              <PrivateRoute exact path={path + '/creatives'} component={Creatives} />
              <PrivateRoute exact path={path + '/stats'} component={Stats} />
              <PrivateRoute exact path={path + '/profile'} component={Profile} />
              <PrivateRoute exact path={path + '/edit-profile'} component={EditProfile} />
              <PrivateRoute exact path={path + '/notifications'} component={Notifications} />
              <PrivateRoute exact path={path + '/create-report'} component={CreateCustomReport} />
              <PrivateRoute exact path={path + '/landing-pages'} component={LandingPages} />
              <PrivateRoute exact path={path + '/targeting'} component={Targeting} />
              <PrivateRoute exact path={path + '/reports'} component={Reports} />
              <PrivateRoute exact path={path + '/billing'} component={Billing} />

              {/* If no matching routes are requested */}
              <Redirect exact from={path + '/*'} to={path} />
            </Switch>
          </AdminPages>
        )}
      />
      <Route path="/page-not-found" component={PageNotFound} />
      <Redirect exact from={'*'} to={'/page-not-found'} />
    </Switch>
  );
};

export default Routes;
