import React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import { PreviewGrid } from "./DashboardModal.styled";

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

const DashboardModal = ({ modalType, modalData, openModal, closeModal }) => {

  const classes = useStyles();
  let content;
  if (modalType === 'preview') {
    // display grid with xls values
    // content = JSON.stringify(modalData);
    content = (
      <PreviewGrid
        gridTemplateColumns={`repeat(${modalData[0].length}, minmax(140px, 1fr))`}
      >
        {
          modalData[0].map(field => (
            <div key={`${field}-field`}>
              <Typography variant="h5" className="sheet-fields" align={`center`}>
                {field.split(' ').join('_').toLowerCase()}
              </Typography>
            </div>
          ))
        }
      </PreviewGrid>
    );
  }

  return (
    <Modal
      id="dashboard-modal-container"
      aria-labelledby="dashboard-modal"
      aria-describedby="dashboard-modal-description"
      open={openModal}
      onClose={closeModal}
      // disableBackdropClick
    >
      <div className={classes.paper}>
        {content}
      </div>
    </Modal>
  );
};

export default DashboardModal;
