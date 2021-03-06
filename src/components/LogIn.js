import React, { useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import VpnKey from '@material-ui/icons/VpnKey';
import Home from '@material-ui/icons/Home';
import PersonAdd from '@material-ui/icons/PersonAdd';
import { Link } from 'react-router-dom';
import {
  CenteredHeader1, CenteredHeader2, FlexContainer, FullContainer,
} from './styles';

const styles = theme => ({
  margin: {
    margin: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
});

const LogIn = (props) => {
  const { classes, authUser } = props;

  const [userinfo, setUserinfo] = useState({
    username: '',
    password: '',
    loggingIn: false,
    complete: false,
  });

  const handleChange = (e) => {
    e.persist();
    setUserinfo(currentState => ({
      ...currentState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <FullContainer id="signup-container">
      <FlexContainer
        id="signup-input-container"
        flexDirection="column"
        margin="auto"
      >
        <CenteredHeader1>West USA Realty</CenteredHeader1>
        <form onSubmit={(e) => {
          e.preventDefault();
          authUser(userinfo);
        }}
        >
          <FormControl className={classes.margin}>
            <div className={classes.margin}>
              <Grid
                container
                spacing={1}
                alignItems="flex-end"
              >
                <Grid item>
                  <AccountCircle fontSize="large" />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    id="login-username-input"
                    label="username"
                    name="username"
                    onChange={handleChange}
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
                <Grid item>
                  <VpnKey fontSize="large" />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    id="login-password-input"
                    type="password"
                    label="password"
                    name="password"
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </Grid>
              </Grid>
            </div>
            <br />
            <Button
              variant="contained"
              color="default"
              type="submit"
            >
              log in
              <Home className={classes.rightIcon} />
            </Button>
            {/*<br />*/}
            {/*<br />*/}
            {/*<Button*/}
            {/*  variant="contained"*/}
            {/*  color="primary"*/}
            {/*  component={Link}*/}
            {/*  to="/signup"*/}
            {/*>*/}
            {/*  register*/}
            {/*  <PersonAdd className={classes.rightIcon} />*/}
            {/*</Button>*/}
          </FormControl>
        </form>
      </FlexContainer>
    </FullContainer>
  );
};

export default withStyles(styles)(LogIn);
