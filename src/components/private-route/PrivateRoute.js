/* eslint-disable */

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions/actions';
import { signInPath } from '../../routeService';

const PrivateRoute = ({ component: Component, authFlag, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (authFlag) {
        return <Component {...props} />;
      } else {
        return (
          <Redirect
            to={{
              pathname: signInPath,
              state: {
                from: props.location,
              },
            }}
          />
        );
      }
    }}
  />
);

const mapStateToProps = (state) => ({
  authFlag: state.form.authFlag,
});

export default connect(mapStateToProps, actions)(PrivateRoute);
