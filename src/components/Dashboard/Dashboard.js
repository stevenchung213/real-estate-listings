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
import {
  Explore, Person, House, Add,
} from '@material-ui/icons';
import XLSX from 'xlsx';
import PropertyMap from './Map';
import PropertyDetails from './Details';
import Import from './Import';
import Info from './Info';
import { FullContainer } from '../styles';
import { DashboardContent } from './Dashboard.styled';
import DashboardModal from './DashboardModal';
import ErrorModal from '../ErrorModal';

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

const Dashboard = (props) => {
  const api = process.env.API || 'http://localhost:3000/api/v1';
  const classes = useStyles();
  const navLinks = [
    {
      name: 'Map',
      view: 'map',
      icon: <Explore />,
    },
    {
      name: 'Properties',
      view: 'properties',
      icon: <House />,
    },
    {
      name: 'Info',
      view: 'info',
      icon: <Person />,
    },
    {
      name: 'Import',
      view: 'import',
      icon: <Add />,
    },
  ];

  const {
    user, setErrors, setErrorModal, history,
  } = props;
  const { username } = user;
  console.log(props);

  const [view, setView] = useState('map');
  const [dashModal, setDashModal] = useState(false);
  const [dashModalData, setDashModalData] = useState({
    type: '',
    data: null,
  });


  const handlePreview = (files, e) => {
    e.preventDefault();
    // convert xls to json then display as key/value pairs
    console.log(files);
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = (ev) => {
      /* Parse data */
      const bstr = ev.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array' });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      // const jsonSheet = XLSX.utils.sheet_to_json(ws, { header: 1 });
      const jsonSheet = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
      /* Update state */
      const filtered = jsonSheet.filter(row => row[0]);
      const fields = filtered[0];
      const values = filtered.slice(1);
      // const fields = filtered[0].reduce((fieldsObj, field, i) => {
      //   fieldsObj[field.split(' ').join('_').toLowerCase()] = true;
      //   return fieldsObj;
      // }, {});
      const formattedData = [];
      console.log('Import.values\n', values);
      for (let i = 0; i < values.length; i++) {
        const rowObj = {};
        for (let j = 0; j < values[i].length; j++) {
          rowObj[fields[j].split(' ').join('_').toLowerCase()] = values[i][j];
        }
        formattedData.push(rowObj);
      }

      console.log('IMPORT.data\n', formattedData);
      setDashModalData({
        type: 'preview',
        data: formattedData,
      });
      setDashModal(true);
    };
    if (rABS) {
      reader.readAsBinaryString(files);
    } else {
      reader.readAsArrayBuffer(files);
    }
  };

  const handlePinClick = () => {
    // update state as well after modifying a property
  };

  // USEEFFECT to call API for properties data on mount

  return (
    <FullContainer
      id="dashboard-container"
      className={classes.root}
    >
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h5" noWrap>
            {`${username}`}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{ paper: classes.drawerPaper }}
      >
        <div className={classes.toolbar} />
        {
          navLinks.map(nav => (
            <List key={nav.view}>
              <ListItem
                button
                key={`nav-${nav.view}`}
                onClick={() => setView(`${nav.view}`)}
              >
                <ListItemIcon>
                  {nav.icon}
                </ListItemIcon>
                <ListItemText primary={nav.name} />
              </ListItem>
            </List>
          ))
        }
      </Drawer>
      <DashboardContent
        id="dashboard-content-container"
        className={classes.content}
      >
        {view === 'map' && <PropertyMap />}
        {view === 'properties' && <PropertyDetails />}
        {view === 'info' && <Info />}
        {view === 'import' && <Import handlePreview={handlePreview} />}
      </DashboardContent>
      {
        dashModal && (
        <DashboardModal
          openModal={dashModal}
          closeModal={() => setDashModal(false)}
          modalType={dashModalData.type}
          modalData={dashModalData.data}
        />
        )
      }
    </FullContainer>
  );
};

export default Dashboard;
