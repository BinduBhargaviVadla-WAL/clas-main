import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './features/login';
import routes from './constants/routes';
import Dashboard from './features/dashboard';
import CustomerDirectory from './features/customerDirectory';
import Statements from './features/statements';
import Journals from './features/journals';
import Reports from './features/reports';
import Settings from './features/settings';
import HelpCenter from './features/helpcenter';
import PrivacyPolicy from './features/policies';
import App from './app';

export default function ProtectedRoute(isLoggedIn) {
  if (isLoggedIn) {
    return (
      <App>
        <Route
          render={() => (
            <Switch>
              <Route path={routes.DASHBOARD} component={Dashboard} />
              <Route
                path={routes.CUSTOMER_DIRECTORY}
                component={CustomerDirectory}
              />
              <Route path={routes.STATEMENTS} component={Statements} />
              <Route path={routes.JOURNALS} component={Journals} />
              <Route path={routes.REPORTS} component={Reports} />
              <Route path={routes.SETTINGS} component={Settings} />
              <Route path={routes.HELPCENTER} component={HelpCenter} />
              <Route path={routes.PRIVACYPOLICY} component={PrivacyPolicy} />
              <Route
                path="*"
                render={() => <Redirect to={routes.DASHBOARD} />}
              />
            </Switch>
          )}
        />
      </App>
    );
  } else {
    return (
      <Route
        render={() => (
          <div>
            <Route path={routes.LOGIN} component={Login} />
            <Route path="*" render={() => <Redirect to={routes.LOGIN} />} />
          </div>
        )}
      />
    );
  }
}
