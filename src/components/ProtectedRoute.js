import React from 'react';
import { Route, Redirect } from "react-router-dom";


const ProtectedRoute = ({ component: Component, loggedIn, setErrors, setModal, ...rest }) => {
  console.log(loggedIn)
  if (loggedIn) {
    return <Route {...rest} render={props =>
      <Component {...props} setErrors={setErrors} setModal={setModal} {...rest}/>}
    />
  } else {
    // setErrors({
    //   type: '403 Forbidden Access',
    //   message: `Please log in`
    // });
    // setModal(true);
    return <Route {...rest} render={props =>
      <Redirect to={{ pathname: "/", state: { from: props.location } }}/>}
    />
  }
};

export default ProtectedRoute;
