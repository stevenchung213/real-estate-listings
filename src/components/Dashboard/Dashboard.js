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
import { DashboardContent, TopbarContainer } from './Dashboard.styled';
import ImportModal from './ImportModal';
import PropertyModal from './PropertyModal';
import FilterToolbar from './FilterToolbar';
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: 58,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 58,
    paddingTop: 12,
    overflow: 'hidden',
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
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState(null);
  const [importModal, setImportModal] = useState(false);
  const [importModalData, setImportModalData] = useState(null);
  const [propertyModal, setPropertyModal] = useState(false);
  const [propertyModalData, setPropertyModalData] = useState(null);
  const [filter, setFilter] = useState(false);
  const [spanish, setSpanish] = useState(false);

  const changeView = (view) => {
    setView(view);
  };

  const formatUsername = (name) => {
    const splitName = name.split('.');
    const firstName = splitName[0].charAt(0).toUpperCase() + splitName[0].slice(1);
    const lastName = splitName[1].charAt(0).toUpperCase() + splitName[1].slice(1);
    return `${firstName} ${lastName}`;
  };

  const handleSpanish = (bool) => {
    setSpanish(bool);
  };

  const handlePropertyModal = (data) => {
    if (!propertyModal) {
      setPropertyModalData(data);
      setPropertyModal(true);
    } else {
      setPropertyModal(false);
      setPropertyModalData(null);
    }
  };

  const handleEditProperty = (property) => {
    console.log('modifying: \n', property);
  };

  const handleFilters = (filterType) => {
    const filters = [
      {
        type: 'View All',
        values: null,
      },
      {
        type: 'By Status',
        values: ['HOT Lead', 'Contacted', 'Left Note', 'Done'],
      },
      {
        type: 'Date',
        values: ['Last 30 Days', 'Last 7 Days'],
      },
      {
        type: 'Spanish',
        values: null,
      },
    ];

    const filterMap = {
      hotlead: 'HOT Lead',
      contact: 'Contact',
      left_note: 'Left Note',
      done: 'Done',

    };
  };

  const handleSpanishFilter = () => {
    const copy = [...listings];

  };

  const handleImportModal = (data) => {
    if (!importModal) {
      setImportModalData(data);
      setImportModal(true);
    } else {
      setImportModal(false);
      setImportModalData(null);
    }
  };

  const handlePropertyClick = (listingId) => {
    // update state as well after modifying a property
    console.log(`clicked on listings[ ${listingId} ]`);
    const filtered = listings.filter(property => property._id === listingId);
    const selected = filtered[0];
    handlePropertyModal(selected);
  };

  const geocode = (address, city, zip = '') => {
    const apiKey = process.env.GOOGLE_MAPS_APIKEY;
    const base = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
    const query = `${address.split(' ').join('+')},+${city.split(' ').join('+')},+${zip}+&key=${apiKey}`;
    const url = `${base}${query}`;
    console.log(url);
    return fetch(url).then(res => res.json());
  };

  const handlePreview = (files, e) => {
    e.preventDefault();
    // convert xls to json then display as key/value pairs
    console.log(files);
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    const formattedData = [];
    setLoading(true);
    reader.onload = async (ev) => {
      // parse data
      const bstr = ev.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array' });
      // get first worksheet
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      // convert array of arrays
      const jsonSheet = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '', raw: false });
      // separate fields and values
      const filtered = jsonSheet.filter(row => row[0]);
      const fields = [...filtered[0], 'spanish'];
      const values = filtered.slice(1);
      console.log('Import.values\n', values, '\n', fields);
      // format sheet data
      for (let i = 0; i < values.length; i++) {
        const rowObj = {};
        for (let j = 0; j < values[i].length; j++) {
          const field = !fields[j] ? fields[j] : fields[j].split(' ').join('_').toLowerCase();
          const value = values[i][j];
          // remove $ sign from values before sending to database
          if (value.length === 0) {
            rowObj[field] = '';
          } else if (field === 'estimated_value' || field === 'original_loan_amount') {
            rowObj[field] = Number(value.slice(1).split(',').join(''));
          } else if (!isNaN(Number(value))) {
            rowObj[field] = Number(value);
          } else {
            rowObj[field] = value.toString();
          }
          console.log(j, rowObj);
          if (j === values[i].length - 1) {
            rowObj.spanish = false;
          }
        }
        formattedData.push(rowObj);
      }
      // add spanish
      console.log(formattedData)
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
          handleImportModal(formattedData);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err.message);
          setLoading(false);
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

  const handleImport = (data) => {
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
        console.log(json);
        if (json.error) {
          throw Error(json.error.errmsg);
        } else {
          setErrors({
            type: 'Success',
            message: 'Properties have been imported successfully!',
          });
          setErrorModal(true);
          setImportModal(false);
          fetchListings();
        }
      })
      .catch((err) => {
        console.error(err.message);
        setErrors({
          type: err.message,
          message: 'An error occurred while importing. Contact administrator.',
        });
        setErrorModal(true);
      });
  };

  useEffect(() => {
    fetchListings();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {

  }, []);

  const toolbarContent = view === 'map' || view === 'properties'
    ? (
      <FilterToolbar
        spanish={spanish}
        handleSpanish={handleSpanish}
        handleFilters={handleFilters}
      />
    )
    : null;

  console.log(listings)

  return (
    <FullContainer
      id="dashboard-container"
      className={classes.root}
    >
      <CssBaseline />
      <AppBar
        position="fixed"
        className={classes.appBar}
        color="default"
      >
        <Toolbar variant="dense">
          <TopbarContainer>
            <Typography variant="h5" noWrap>
              {`${formatUsername(username)}`}
            </Typography>
            {
              toolbarContent
            }
          </TopbarContainer>
        </Toolbar>
        {
          loading && <LinearProgress />
        }
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
                onClick={() => changeView(`${nav.view}`)}
              >
                <ListItemIcon>
                  {nav.icon}
                </ListItemIcon>
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
              handlePinClick={handlePropertyClick}
            />
          )
        }
        {
          view === 'properties'
          && (
            <PropertyDetails
              listings={listings}
              handlePropertyClick={handlePropertyClick}
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
        importModal && (
          <ImportModal
            openModal={importModal}
            closeModal={handleImportModal}
            modalData={importModalData}
            handleImport={handleImport}
          />
        )
      }
      {
        propertyModal && (
          <PropertyModal
            openModal={propertyModal}
            closeModal={handlePropertyModal}
            modalData={propertyModalData}
            handleEditProperty={handleEditProperty}
          />
        )
      }
    </FullContainer>
  );
};

export default Dashboard;
