import React from 'react';
import { Route, Redirect } from 'react-router-dom';


const ProtectedRoute = ({
  component: Component, loggedIn, setErrors, setErrorModal, ...rest
}) => {
  if (loggedIn) {
    return (
      <Route
        {...rest}
        render={props => <Component {...props} setErrors={setErrors} setErrorModal={setErrorModal} {...rest} />}
      />
    );
  }
  return (
    <Route
      {...rest}
      render={props => <Redirect to={{ pathname: '/', state: { from: props.location } }} />}
    />
  );
};

export default ProtectedRoute;
