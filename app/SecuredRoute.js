import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

export default function SecuredRoute(props) {
  if (props.isLoggedIn) {
    return <Route path={props.path} component={props.component} />;
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
  return <div>SecuredRoute</div>;
}
