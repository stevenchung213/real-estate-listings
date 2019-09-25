import React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles(theme => ({
  paper: {
    margin: 'auto',
    marginTop: '10%',
    width: 350,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none',
  },
}));

const DashboardModal = ({ modalType, modalMessage, openModal, closeModal }) => {

  const classes = useStyles();
  const split = modalMessage.split('\n')
  return (
    <Modal aria-labelledby="dashboard-modal"
           aria-describedby="dashboard-modal-description"
           open={openModal}
           onClose={closeModal}
    >
      <div className={classes.paper}>
        <Typography variant="h6" id="error-modal-title" align={`center`}>
          {modalType}
        </Typography>
        <br />
        {
          split.map((line, i) =>
            <div key={`line${i + 1}`}>
              <Typography variant="subtitle1" id="error-modal-description">
                {line}
              </Typography>
              <br />
            </div>)
        }
      </div>
    </Modal>
  );
};

export default DashboardModal;
