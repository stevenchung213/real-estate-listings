import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root'
import { Route, Switch, withRouter } from 'react-router-dom';
import { FullContainer } from "./styles";
import SignUp from './SignUp';
import NoMatch from "./NoMatch";
import LogIn from "./LogIn";
import ErrorModal from "./ErrorModal";
import Dashboard from "./Dashboard/Dashboard";
import ProtectedRoute from "./ProtectedRoute";

const Main = (props) => {

  const api = process.env.API || `http://localhost:3000/api/v1`;

  const [userinfo, setUserinfo] = useState({
    userID: '',
    username: '',
    loggingIn: false,
    loggedIn: false,
    token: ''
  });

  const [errorModal, setErrorModal] = useState(false);

  const [errors, setErrors] = useState({
    type: '',
    message: ''
  });

  useEffect(()=> {
    const token = JSON.parse(localStorage.getItem('token')) || null;
    if (token) {
      console.log(`main component mounted\n${token}`)
      setUserinfo(token);
      props.history.replace('/dashboard')
    }
  },[]);

  const authUser = (userObj) => {

    setUserinfo(currentState => ({
      ...currentState,
      loggingIn: true
    }));
    console.log(userObj)
    const url = `${api}/login`;
    const { username, password } = userObj;
    const user = { username, password };

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" }
    })
      .then(resp => resp.json())
      .then((resp) => {
        console.log(resp)
        if (resp.token) {
          setUserinfo({
            userID: resp.userID,
            username: resp.username,
            token: resp.token,
            loggingIn: false,
            loggedIn: true
          });
          const cookie = {
            userID: resp.userID,
            username: resp.username,
            token: resp.token,
            loggingIn: false,
            loggedIn: true
          };
          localStorage.setItem('sei-prep', JSON.stringify(cookie));
          props.history.push('/dashboard');
        } else {
          setErrors({
            type: '403 Forbidden Access',
            message: `Invalid credentials`
          });
          setUserinfo(currentState => ({
            ...currentState,
            loggingIn: false,
            loggedIn: false
          }));
          setErrorModal(true);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  console.log(userinfo)
  return (
    <FullContainer id={`main-container`}>
      <Switch>
        <Route exact path={`/`} render={() =>
          <LogIn authUser={authUser}/>}
        />
        <Route path={`/signup`} render={() =>
          <SignUp setErrors={setErrors}
                  setErrorModal={setErrorModal}/>}
        />
        <ProtectedRoute path={`/dashboard`} component={Dashboard}
                        setErrors={setErrors} setErrorModal={setErrorModal}
                        loggedIn={userinfo.loggedIn} user={userinfo}
        />
        <Route component={NoMatch}/>
      </Switch>
      <ErrorModal openModal={errorModal} closeModal={() => setErrorModal(false)}
                  errorType={errors.type} errorMessage={errors.message}
      />
    </FullContainer>
  )

};

export default hot(withRouter(Main));
