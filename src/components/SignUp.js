import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import Done from '@material-ui/icons/Done';
import AccountCircle from '@material-ui/icons/AccountCircle';
import VpnKey from '@material-ui/icons/VpnKey';
import { CenteredHeader1, FlexContainer, FullContainer } from './styles';

const styles = theme => ({
  icon: {
    marginBottom: 14,
  },
  margin: {
    margin: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    width: '100%',
  },
});

const SignUp = (props) => {
  const api = process.env.API || 'http://localhost:3000/api/v1';
  const admin_pw = process.env.ADMIN_PW || '123456';
  const { classes, setErrors, setErrorModal } = props;

  const [userinfo, setUserinfo] = useState({
    username: '',
    password: '',
    adminPassword: '',
    admin: false,
    submitting: false,
    complete: false,
  });

  const handleChange = (e) => {
    e.persist();
    setUserinfo(currentState => ({
      ...currentState,
      [e.target.name]: e.target.value,
    }));
  };

  const submit = (e) => {
    e.preventDefault();
    console.log('init\n', userinfo);
    const { username, password, adminPassword } = userinfo;
    // form validation
    // requires '.' between first and last name
    if (!username.includes('.')) {
      setErrors({
        type: 'Invalid Username',
        message: 'Please use the " firtname.lastname " naming convention with ALL LOWER-CASED letters combined with a " . "\n\nExample:\njane.smith',
      });
      setErrorModal(true);
      return;
    }

    const lowerCasedLetters = /^[a-z]+$/;
    const splitName = username.split('.');
    const firstName = splitName[0];
    const lastName = splitName.length > 2 ? splitName[2] : splitName[1];
    const middleName = splitName.length > 2 ? splitName[1] : undefined;
    // lower-cased only user name
    if (!lowerCasedLetters.test(firstName) || !lowerCasedLetters.test(lastName) || (middleName && !lowerCasedLetters.test(middleName))) {
      setErrors({
        type: 'Invalid Username',
        message: 'Please use the " firtname.lastname " naming convention with ALL LOWER-CASED letters combined with a \' . \'\n\nExample:\njane.smith',
      });
      setErrorModal(true);
      return;
    }
    // password length of at least 6 chars
    if (password.length < 6) {
      setErrors({
        type: 'Invalid Password',
        message: 'Password must be at least 6 characters long',
      });
      setErrorModal(true);
      return;
    }

    // admin check
    const admin = adminPassword === admin_pw;

    // disable sign up button until completed
    setUserinfo(currentState => ({
      ...currentState,
      submitting: true,
    }));

    const url = `${api}/register`;
    const user = { username, password, admin };

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(resp => resp.json())
      .then((resp) => {
        setUserinfo(currentState => ({
          ...currentState,
          submitting: false,
        }));
        if (resp.message) {
          setErrors({
            type: 'Username Exists',
            message: 'This username already exists\nYou may try adding a middle name\n\nExample:\njane.alice.smith',
          });
          setErrorModal(true);
          return;
        }
        if (resp.error) {
          setErrors({
            type: 'Unknown Error',
            message: 'Please contact your engineering team',
          });
          setErrorModal(true);
          return;
        }
        setErrors({
          type: 'Account Created',
          message: 'Account created!  Click out of this box to go to log in screen.',
        });
        setErrorModal(true);
        setUserinfo(currentState => ({
          ...currentState,
          complete: true,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    userinfo.complete ? <Redirect to="/" />
      : (
        <FullContainer id="signup-container">
          <FlexContainer
            flexDirection="column"
            margin="auto"
          >
            <CenteredHeader1>Agent Registration</CenteredHeader1>
            <FlexContainer
              id="signup-input-container"
              flexDirection="column"
              margin="auto"
            >
              <form onSubmit={submit}>
                <div className={classes.margin}>
                  <Grid
                    container
                    spacing={1}
                    alignItems="flex-end"
                  >
                    <Grid
                      item
                      className={classes.icon}
                    >
                      <AccountCircle fontSize="large" />
                    </Grid>
                    <Grid item>
                      <TextField
                        id="signup-username-input"
                        label="username"
                        className={classes.textField}
                        required
                        name="username"
                        onChange={handleChange}
                        helperText="first.last (lower-cased)"
                      />
                    </Grid>
                  </Grid>
                </div>
                <div className={classes.margin}>
                  <Grid
                    container
                    spacing={1}
                    alignItems="flex-end"
                  >
                    <Grid
                      item
                      className={classes.icon}
                    >
                      <VpnKey fontSize="large" />
                    </Grid>
                    <Grid item>
                      <TextField
                        required
                        id="password-username-input"
                        label="password"
                        className={classes.textField}
                        name="password"
                        onChange={handleChange}
                        helperText="at least 6 characters"
                      />
                    </Grid>
                  </Grid>
                </div>
                <div className={classes.margin}>
                  <Grid
                    container
                    spacing={1}
                    alignItems="flex-end"
                  >
                    <Grid
                      item
                      className={classes.icon}
                    >
                      <VpnKey fontSize="large" />
                    </Grid>
                    <Grid item>
                      <TextField
                        id="password-username-input"
                        label="admin password"
                        type="password"
                        className={classes.textField}
                        name="adminPassword"
                        onChange={handleChange}
                        helperText="password required only when creating an admin user"
                      />
                    </Grid>
                  </Grid>
                </div>
                <br />
                <Button
                  variant="contained"
                  color="default"
                  type="submit"
                  fullWidth
                  disabled={userinfo.submitting}
                >
                  create
                  <Done className={classes.rightIcon} />
                </Button>
              </form>
            </FlexContainer>
          </FlexContainer>
        </FullContainer>
      )
  );
};

export default withStyles(styles)(SignUp);
