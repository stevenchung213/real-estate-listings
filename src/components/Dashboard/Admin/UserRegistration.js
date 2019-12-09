import React, { useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import TextField from '@material-ui/core/TextField';
import VpnKey from '@material-ui/icons/VpnKey';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import PersonAdd from '@material-ui/icons/PersonAdd';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { FlexContainer, CenteredHeader2 } from '../../styles';
import { InputContainer, SwitchContainer } from './UserRegistration.styled';

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
});

const UserRegistration = (props) => {
  const {
    classes, setErrors, setErrorModal, fetchUsers,
  } = props;
  const api = process.env.API || 'http://localhost:3000/api/v1';

  const [userInfo, setUserInfo] = useState({
    username: '',
    password: '',
    admin: false,
    submitting: false,
    complete: false,
  });

  const handleChange = (e) => {
    e.persist();
    setUserInfo(currentState => ({
      ...currentState,
      [e.target.name]: e.target.name === 'admin' ? e.target.checked : e.target.value,
    }));
  };

  const submit = (e) => {
    e.preventDefault();
    console.log('init\n', userInfo);
    const { username, password, admin } = userInfo;
    // form validation
    // requires '.' between first and last name
    if (!username.includes('.')) {
      setErrors({
        type: 'Invalid Username',
        message: 'Please use the " firstname.lastname " naming convention with ALL LOWER-CASED letters combined with a " .'
          + ' "\n\nExample:\njane.smith',
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
        message: 'Please use the " firstname.lastname " naming convention with ALL LOWER-CASED letters combined with a \' .'
          + ' \'\n\nExample:\njane.smith',
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

    // disable sign up button until completed
    setUserInfo(currentState => ({
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
        setUserInfo(currentState => ({
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
        fetchUsers();
        setErrorModal(true);
        setUserInfo(currentState => ({
          ...currentState,
          complete: true,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <FlexContainer
      id="user-registration-container"
      flexDirection="column"
      width="38%"
      height="100%"
    >
      <CenteredHeader2>User Registration</CenteredHeader2>
      <FlexContainer id="signup-input-container">
        <InputContainer onSubmit={submit}>
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
                <VerifiedUserIcon fontSize="large" />
              </Grid>
              <Grid item>
                <SwitchContainer>
                  <FormControlLabel
                    label="administrator"
                    control={(
                      <Switch
                        name="admin"
                        checked={userInfo.admin}
                        onChange={handleChange}
                        color="primary"
                      />
                    )}
                  />
                </SwitchContainer>
              </Grid>
            </Grid>
          </div>
          <br />
          <Button
            variant="contained"
            color="default"
            type="submit"
            fullWidth
            disabled={userInfo.submitting}
          >
            create user
            <PersonAdd className={classes.rightIcon} />
          </Button>
        </InputContainer>
      </FlexContainer>
    </FlexContainer>
  );
};

export default withStyles(styles)(UserRegistration);
