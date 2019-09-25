import React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import { PreviewGrid } from "./DashboardModal.styled";
import Button from "@material-ui/core/Button";

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

const DashboardModal = props => {

  const { modalType, modalData, openModal, closeModal, submitImport } = props;
  const classes = useStyles();
  let content;

  if (modalType === 'preview') {
    content = (
      <form onSubmit={submitImport}>
        <PreviewGrid
          gridTemplateColumns={`repeat(${modalData[0].length}, minmax(140px, 1fr))`}
        >
          {
            modalData.map((row, i) => (
              row.map(col => (
                i === 0 ? (
                    <Typography
                      variant="subtitle2"
                      className={`sheet-fields`}
                    >
                      {col.split(' ').join('_').toLowerCase()}
                    </Typography>
                  )
                  :
                  (
                    <Typography
                      variant="body2"
                      className={`sheet-values`}
                      noWrap
                    >
                      {
                        col ? col : 'n/a'
                      }
                    </Typography>
                  )
              ))
            ))
          }
        </PreviewGrid>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="default"
            type={`submit`}
          >
            submit
          </Button>
        </div>
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
