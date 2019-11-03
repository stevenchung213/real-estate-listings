import React, { useState, useEffect } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { PropertyContainer, PropertyRowContainer, StyledModal } from './PropertyModal.styled';

const useStyles = makeStyles(theme => ({
  paper: {
    margin: 'auto',
    width: '100%',
    maxWidth: '90vw',
    height: 'auto',
    maxHeight: '90vh',
    overflow: 'hidden',
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
  buttons: {
    margin: '8px 0',
  }
}));

const PropertyModal = (props) => {
  const {
    modalData, openModal, closeModal, handleEditProperty,
  } = props;
  const {
    agents, beneficiary, city, current_phone, estimated_value, mailing_city, mailing_zip, notice_date, notice_number, open_bid, original_loan_amount, owner_address, owner_name, property_address, sales_date, schedule_date, status, trustee_id, trustee_name, zip, _id,
  } = modalData;
  const classes = useStyles();

  const [propertyData, setPropertyData] = useState(modalData);

  const handleChange = (e) => {
    e.persist();
    setPropertyData(currentState => ({
      ...currentState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    // load existing input values from modalData
  }, []);
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
          <PropertyRowContainer>
            <TextField
              label="Notice #"
              className={classes.textField}
              name="notice_number"
              variant="filled"
              margin="normal"
              defaultValue={notice_number}
              onChange={handleChange}
            />
            <TextField
              label="Notice Date"
              className={classes.textField}
              name="notice_date"
              variant="filled"
              margin="normal"
              defaultValue={notice_date}
              onChange={handleChange}
            />
          </PropertyRowContainer>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              onClick={() => handleEditProperty('test')}
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
