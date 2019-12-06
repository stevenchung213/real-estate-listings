import React, { useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {
  PropertyContainer, PropertyModalGrid, StyledModal, SwitchContainer
} from './PropertyModal.styled';

const useStyles = makeStyles(theme => ({
  paper: {
    margin: 'auto',
    width: '100%',
    maxWidth: '90vw',
    height: 'auto',
    maxHeight: '90vh',
    overflow: 'auto',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 'auto',
  },
  menu: {
    width: 200,
  },
  buttons: {
    margin: '8px 0',
  },
}));

const PropertyModal = (props) => {
  const {
    modalData, openModal, closeModal, handleEditProperty,
  } = props;
  const classes = useStyles();
  const fields = ['status', 'notice_number', 'notice_date', 'property_address', 'city', 'zip', 'current_phone', 'owner_name', 'owner_address', 'mailing_city', 'mailing_zip', 'estimated_value', 'beneficiary', 'trustee_name', 'trustee_id', 'original_loan_amount', 'open_bid', 'schedule_date', 'time', 'spanish'];
  const statuses = ['hotlead', 'contacted', 'left_note', 'done'];

  const [propertyData, setPropertyData] = useState(modalData);
  const {
    agents, beneficiary, city, current_phone, estimated_value, mailing_city, mailing_zip, notice_date, notice_number, open_bid, original_loan_amount, owner_address, owner_name, property_address, sales_date, schedule_date, spanish, status, trustee_id, trustee_name, zip, _id,
  } = propertyData;

  const admin = true;
  const formattedStatus = {
    hotlead: 'HOT Lead',
    contacted: 'Contacted',
    left_note: 'Left Note',
    done: 'Done',
  };

  const titleCase = str => str.split('_')
    .map(word => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  const handleChange = (e) => {
    e.persist();
    setPropertyData(currentState => ({
      ...currentState,
      [e.target.name]: e.target.name === 'spanish' ? e.target.checked : e.target.value,
    }));
  };
  // submit handler from parent???
  console.log(propertyData);
  return (
    <StyledModal
      id="property-modal-backdrop-container"
      aria-labelledby="property-modal"
      aria-describedby="property-modal-description"
      open={openModal}
      onClose={closeModal}
      disableBackdropClick
    >
      <div className={classes.paper}>
        <PropertyContainer id="property-edit-container">
          <PropertyModalGrid>
            {
              fields.map(field => (
                field === 'status'
                  ? (
                    <TextField
                      key={field}
                      select
                      label={titleCase(field)}
                      className={classes.textField}
                      name={field}
                      value={propertyData[field]}
                      onChange={handleChange}
                      SelectProps={{
                        MenuProps: {
                          className: classes.menu,
                        },
                      }}
                      margin="dense"
                      variant="outlined"
                    >
                      {
                        statuses.map(option => (
                          <MenuItem key={option} value={option}>
                            {formattedStatus[option]}
                          </MenuItem>
                        ))
                      }
                    </TextField>
                  )
                  : field === 'spanish'
                    ? (
                      <SwitchContainer key={field}>
                        <FormControlLabel
                          label="Spanish"
                          labelPlacement="start"
                          control={
                            (
                              <Switch
                                checked={propertyData[field]}
                                onChange={handleChange}
                                color="primary"
                                value="spanish"
                                name="spanish"
                              />
                            )
                          }
                        />
                      </SwitchContainer>
                    )
                    : (
                      <TextField
                        key={field}
                        label={titleCase(field)}
                        className={classes.textField}
                        name={field}
                        margin="dense"
                        defaultValue={propertyData[field]}
                        value={propertyData[field]}
                        onChange={handleChange}
                        variant="outlined"
                      />
                    )
              ))
            }
          </PropertyModalGrid>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              onClick={() => handleEditProperty(`${_id}`, propertyData)}
            >
              submit
            </Button>
          </div>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              disableRipple
              onClick={closeModal}
            >
              cancel
            </Button>
          </div>
        </PropertyContainer>
      </div>
    </StyledModal>
  );
};

export default PropertyModal;
