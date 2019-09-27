import React, { useState, useEffect } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { PreviewGrid } from './DashboardModal.styled';

const useStyles = makeStyles(theme => ({
  paper: {
    margin: 'auto',
    marginTop: '10%',
    width: 'auto',
    maxWidth: '80%',
    overflow: 'auto',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none',
  },
}));

const DashboardModal = (props) => {
  const {
    modalType, modalData, openModal, closeModal,
  } = props;
  const classes = useStyles();
  const [importInputs, setImportInputs] = useState(modalData);

  useEffect(() => {
    setImportInputs(modalData);
  }, []);

  const handleChange = (e, i) => {
    e.persist();
    const copy = [...importInputs];
    const objToUpdate = { ...importInputs[i] };
    objToUpdate[e.target.name] = e.target.value;
    copy[i] = objToUpdate;
    setImportInputs(copy);
    console.log(e.target.value)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(importInputs);
    // POST to api and save property into database
  };

  let content;
  if (modalType === 'preview') {
    content = (
      <form onSubmit={handleSubmit}>
        <PreviewGrid
          gridTemplateColumns={`repeat(${Object.keys(modalData[0]).length}, minmax(200px, 1fr))`}
        >
          {
            Object.keys(modalData[0]).map(field => (
              <Typography
                key={`field-${field.split(' ').join('_').toLowerCase()}`}
                variant="subtitle2"
                className="sheet-fields"
              >
                {field.split(' ').join('_').toLowerCase()}
              </Typography>
            ))
          }
          {
            modalData.map((obj, i) => Object.entries(obj).map((entry => (
              <TextField
                key={`value-${entry[0]}`}
                name={entry[0]}
                variant="filled"
                className="sheet-values"
                label={entry[1] ? entry[1] : 'n/a'}
                margin="normal"
                style={{ overflowX: 'hidden' }}
                defaultValue={entry[1] ? entry[1] : 'n/a'}
                onChange={(e) => { handleChange(e, i); }}
              >
                {
                    entry[1] ? entry[1] : 'n/a'
                  }
              </TextField>
            ))))
          }
        </PreviewGrid>
        <Button
          variant="contained"
          color="default"
          type="submit"
          fullWidth
        >
          submit
        </Button>
      </form>
    );
  }

  return (
    <Modal
      id="dashboard-modal-container"
      aria-labelledby="dashboard-modal"
      aria-describedby="dashboard-modal-description"
      open={openModal}
      onClose={closeModal}
      disableBackdropClick={modalType === 'preview'}
    >
      <div className={classes.paper}>
        {content}
      </div>
    </Modal>
  );
};

export default DashboardModal;
