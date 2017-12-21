import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { connect } from 'react-redux';

import App from './containers/App/App';
import asyncComponent from './helpers/AsyncFunc';

const RestrictedRoute = ({ component: Component, ...rest, isLoggedIn }) =>
  <Route
    {...rest}
    render={props =>
      isLoggedIn
        ? <Component {...props} />
        : <Redirect
            to={{
              pathname: '/signin',
              state: { from: props.location }
            }}
          />}
  />;
const PublicRoutes = ({ history, isLoggedIn }) => {
  return (
    <ConnectedRouter history={history}>
      <div>
        <Route
          exact
          path={'/'}
          component={asyncComponent(() => import('./containers/Page/signin'))}
        />
        <Route
          exact
          path={'/signin'}
          component={asyncComponent(() => import('./containers/Page/signin'))}
        />
        <Route
          exact
          path={'/signup'}
          component={asyncComponent(() => import('./containers/Page/signup'))}
        />
        
        <Route
          exact
          path={'/Validation/Compte'}
          component={asyncComponent(() => import('./containers/Page/ValidationCompte'))}
        />
        <Route
          exact
          path={'/Validation/Compte/Success'}
          component={asyncComponent(() => import('./containers/Page/ValidationCompteSuccess'))}
        />
        <Route
          exact
          path={`dashboard/InformationsCompte`}
          component={asyncComponent(() => import('./containers/Informations compte/informations'))}
        />
        <RestrictedRoute
          path="/dashboard"
          component={App}
          isLoggedIn={isLoggedIn}
        />
      </div>
    </ConnectedRouter>
  );
};

export default connect(state => ({
  isLoggedIn: state.Auth.get('idToken') !== null
}))(PublicRoutes);
