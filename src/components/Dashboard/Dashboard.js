import React, { useEffect, useState } from 'react';
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
import PropertyDetails from './PropertyDetails';
import Admin from './Admin';
import Import from './Import';
import { FullContainer } from '../styles';
import { DashboardContent } from './Dashboard.styled';
import DashboardModal from './DashboardModal';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: 180,
    flexShrink: 0,
  },
  drawerPaper: {
    paddingTop: 18,
    width: 180,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0),
  },
  toolbar: theme.mixins.toolbar,
}));

const Dashboard = (props) => {
  const api = process.env.API || 'http://localhost:3000/api/v1';
  const {
    user, setErrors, setErrorModal, history,
  } = props;
  const { username, token, admin } = user;
  const classes = useStyles();
  const navLinks = admin
    ? [
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
        name: 'Import',
        view: 'import',
        icon: <Add />,
      },
      {
        name: 'Admin',
        view: 'admin',
        icon: <Person />,
      },
    ]
    : [
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
        name: 'Import',
        view: 'import',
        icon: <Add />,
      },
    ];

  const [view, setView] = useState('map');
  const [listings, setListings] = useState(null);
  const [dashModal, setDashModal] = useState(false);
  const [dashModalData, setDashModalData] = useState({
    type: '',
    data: null,
  });

  const handleDashboardModals = (type, data) => {
    if (!dashModal) {
      setDashModalData({
        type,
        data,
      });
      setDashModal(true);
    } else {
      setDashModal(false);
      setDashModalData({
        type: '',
        data: null,
      });
    }
  };

  const handlePinClick = (listingsIdx) => {
    // update state as well after modifying a property

  };

  const geocode = (address, city, zip = '') => {
    const apiKey = process.env.GOOGLE_MAPS_APIKEY;
    const base = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
    const query = `${address.split(' ').join('+')},+${city.split(' ').join('+')},+${zip}+&key=${apiKey}`;
    const url = `${base}${query}`;
    return fetch(url).then(res => res.json());
  };

  const handlePreview = (files, e) => {
    e.preventDefault();
    // convert xls to json then display as key/value pairs
    console.log(files);
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    const formattedData = [];
    reader.onload = async (ev) => {
      // parse data
      const bstr = ev.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array' });
      // get first worksheet
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      // convert array of arrays
      const jsonSheet = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '', raw: false });
      // update state
      const filtered = jsonSheet.filter(row => row[0]);
      const fields = filtered[0];
      const values = filtered.slice(1);
      console.log('Import.values\n', values, '\n', fields);
      // format sheet data
      for (let i = 0; i < values.length; i++) {
        const rowObj = {};
        for (let j = 0; j < values[i].length; j++) {
          const field = fields[j].split(' ').join('_').toLowerCase();
          const value = values[i][j];
          // remove $ sign from values before sending to database
          if (value.length === 0) {
            rowObj[field] = '';
          } else if (field === 'estimated_value') {
            rowObj[field] = Number(value.slice(1).split(',').join(''));
          } else if (!isNaN(Number(value))) {
            rowObj[field] = Number(value);
          } else {
            rowObj[field] = value.toString();
          }
        }
        formattedData.push(rowObj);
      }
      // geocode address to lat & long
      const getGeoLocations = async arr => arr.map(listing => geocode(listing.property_address, listing.city, listing.zip));
      const test = await getGeoLocations(formattedData);

      Promise.all(test).then((json) => {
        for (let j = 0; j < json.length; j++) {
          const { lat, lng } = json[j].results[0].geometry.location;
          formattedData[j].lat = lat;
          formattedData[j].long = lng;
        }
      })
        .then(() => {
          handleDashboardModals('import_preview', formattedData);
        })
        .catch((err) => {
          console.error(err.message);
          setErrors({
            type: err.message,
            message: 'An error occurred while retrieving geo-locations.',
          });
          setErrorModal(true);
        });
    };

    if (rABS) {
      reader.readAsBinaryString(files);
    } else {
      reader.readAsArrayBuffer(files);
    }
  };

  const handleImport = (data) => {
    // POST to api and save property into database
    const url = `${api}/listings`;
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then((json) => {
        // successful import modal
        console.log(json);
        if (json.error) {
          throw Error(json.error.errmsg);
        } else {
          setErrors({
            type: 'Success',
            message: 'Properties have been imported successfully!',
          });
          setErrorModal(true);
          setDashModal(false);
        }
      })
      .catch((err) => {
        console.error(err.message);
        setErrors({
          type: err.message,
          message: 'A property with the listed notice_number is already in our database.  Please remove that row from the Excel'
            + ' spreadsheet then try again.',
        });
        setErrorModal(true);
      });
  };

  const fetchListings = () => {
    const url = `${api}/listings`;
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then((json) => {
        // set state for property listings data
        setListings(json.success);
        console.log(json);
      })
      .catch((err) => {
        console.error(err.message);
        setErrors({
          type: err.message,
          message: 'An error occurred while fetching properties.',
        });
        setErrorModal(true);
      });
  };

  // USEEFFECT to call API for properties data on mount
  useEffect(() => {
    fetchListings();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
        {
          view === 'map' && listings
          && (
            <PropertyMap
              listings={listings}
              handlePinClick={handlePinClick}
            />
          )
        }
        {
          view === 'properties'
          && (
            <PropertyDetails
              listings={listings}
            />
          )
        }
        {
          view === 'import'
          && (
            <Import
              handlePreview={handlePreview}
            />
          )
        }
        {
          view === 'admin'
          && <Admin />
        }
      </DashboardContent>
      {
        dashModal && (
          <DashboardModal
            openModal={dashModal}
            closeModal={() => setDashModal(false)}
            modalType={dashModalData.type}
            modalData={dashModalData.data}
            handleImport={handleImport}
          />
        )
      }
    </FullContainer>
  );
};

export default Dashboard;
