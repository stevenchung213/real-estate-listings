import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Explore, Person, House, Add } from "@material-ui/icons";
import PropertyMap from './Map';
import PropertyDetails from "./Details";
import Import from "./Import";
import Info from "./Info";
import { FullContainer } from '../styles/';
import { DashboardContent } from "./Import.styled";

const drawerWidth = 180;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    paddingTop: 18,
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  toolbar: theme.mixins.toolbar,
}));

const Dashboard = props => {

  const classes = useStyles();
  const navLinks = [
    {
      name: 'Map',
      view: 'map',
      icon: <Explore />
    },
    {
      name: 'Properties',
      view: 'properties',
      icon: <House />
    },
    {
      name: 'Info',
      view: 'info',
      icon: <Person />
    },
    {
      name: 'Import',
      view: 'import',
      icon: <Add/>
    }
  ];

  const [view, setView] = useState('map');

  const { user, setErrors, setModal, history } = props;
  const { username } = user;
  console.log(props)

  const handlePinClick = () => {
    // update state as well after modifying a property
  };

  // USEEFFECT to call API for properties data on component mount

  return (
    <FullContainer
      id={`dashboard-container`}
      className={classes.root}
      padding={0}
    >
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h5" noWrap>
            {`${username}`}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer className={classes.drawer} variant="permanent"
              classes={{ paper: classes.drawerPaper }}>
        <div className={classes.toolbar} />
        {
          navLinks.map(nav =>
            <List key={nav.view}>
              <ListItem button key={`nav-${nav.view}`}
                        onClick={() => setView(`${nav.view}`)}>
                <ListItemIcon>
                  {nav.icon}
                </ListItemIcon>
                <ListItemText primary={nav.name} />
              </ListItem>
            </List>)
        }
      </Drawer>
      <DashboardContent
        id={`dashboard-content-container`}
        className={classes.content}
      >
        {view === 'map' && <PropertyMap />}
        {view === 'properties' && <PropertyDetails />}
        {view === 'info' && <Info />}
        {view === 'import' && <Import />}
      </DashboardContent>
    </FullContainer>
  );
};

export default Dashboard;
