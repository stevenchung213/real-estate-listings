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
import { DashboardContent } from './Dashboard.styled';
import XLSX from 'xlsx';

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
    padding: theme.spacing(0),
  },
  toolbar: theme.mixins.toolbar,
}));

const Dashboard = props => {

  const api = process.env.API || `http://localhost:3000/api/v1`;
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
      icon: <Add />
    }
  ];

  const [view, setView] = useState('map');
  const [dashModal, setDashModal] = useState(false);

  const { user, setErrors, setErrorModal, history } = props;
  const { username } = user;
  console.log(props)

  const handlePreview = (files, e) => {
    e.preventDefault();
    // convert xls to json then display as key/value pairs
    console.log(files)
    console.log(XLSX)
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = (ev) => {
      /* Parse data */
      console.log('IMPORT.reader.ev\n', ev);
      const bstr = ev.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array' });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      /* Update state */
      console.log('IMPORT.data\n', data);
    };
    if (rABS) {
      reader.readAsBinaryString(files);
    } else {
      reader.readAsArrayBuffer(files);
    }

    // open property preview modal
    // user should be able to modify any values before sending to database
  };

  const handlePinClick = () => {
    // update state as well after modifying a property
  };

  // USEEFFECT to call API for properties data on mount

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
        {view === 'import' && <Import handlePreview={handlePreview} />}
      </DashboardContent>
    </FullContainer>
  );
};

export default Dashboard;
