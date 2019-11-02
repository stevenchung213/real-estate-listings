import React, { useState, useEffect } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { PreviewGrid, StyledModal } from './DashboardModal.styled';

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
}));

const DashboardModal = (props) => {
  const {
    modalType, modalData, openModal, closeModal, handleImport,
  } = props;

  const classes = useStyles();
  const [importInputs, setImportInputs] = useState(modalData);

  useEffect(() => {
    setImportInputs(modalData);
  }, [modalData]);

  const handleChange = (e, i) => {
    e.persist();
    const copy = [...importInputs];
    const objToUpdate = { ...importInputs[i] };
    objToUpdate[e.target.name] = isNaN(e.target.value) ? e.target.value : Number(e.target.value);
    copy[i] = objToUpdate;
    setImportInputs(copy);
  };

  let content;
  // import modal
  if (modalType === 'import_preview') {
    content = (
      <StyledModal id="import-preview-container">
        <PreviewGrid>
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
              entry[0] === 'property_address'
              || entry[0] === 'city'
              || entry[0] === 'zip'
              || entry[0] === 'lat'
              || entry[0] === 'long' ? (
                <TextField
                  key={`value-${entry[0]}`}
                  name={entry[0]}
                  variant="filled"
                  className="sheet-values"
                  label={entry[1] ? entry[1] : 'null'}
                  margin="normal"
                  style={{ overflowX: 'hidden', backgroundColor: 'lightgrey' }}
                  defaultValue={entry[1] && !isNaN(Number(entry[1])) ? Number(entry[1]) : entry[1] ? entry[1] : 'null'}
                  disabled
                >
                  {
                    entry[1] ? entry[1] : 'null'
                  }
                </TextField>
                )
                : (
                  <TextField
                    key={`value-${entry[0]}`}
                    name={entry[0]}
                    variant="filled"
                    className="sheet-values"
                    label={entry[1] ? entry[1] : 'null'}
                    margin="normal"
                    style={{ overflowX: 'hidden', backgroundColor: i % 2 === 0 ? 'lightyellow' : 'lightblue' }}
                    defaultValue={entry[1] ? entry[1] : 'null'}
                    onChange={(e) => {
                      handleChange(e, i);
                    }}
                  >
                    {
                      entry[1] ? entry[1] : 'null'
                    }
                  </TextField>
                )
            ))))
          }
        </PreviewGrid>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          onClick={() => handleImport(importInputs)}
        >
          submit
        </Button>
      </StyledModal>
    );

  // property modal
  } else if (modalType === 'property') {
    content = (
      <StyledModal />
    );
  }
  console.log(modalData);
  return (
    <StyledModal
      id="dashboard-modal-backdrop-container"
      aria-labelledby="dashboard-modal"
      aria-describedby="dashboard-modal-description"
      open={openModal}
      onClose={closeModal}
      disableBackdropClick={modalType === 'import_preview'}
    >
      <div className={classes.paper}>
        {content}
      </div>
    </StyledModal>
  );
};

export default DashboardModal;
