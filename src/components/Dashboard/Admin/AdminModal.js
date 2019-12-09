import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import { AdminFlexContainer, AdminModalButton } from './AdminModal.styled';

const useStyles = makeStyles(theme => ({
  paper: {
    margin: 'auto',
    marginTop: 100,
    width: 400,
    height: 200,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2),
    outline: 'none',
    display: 'flex',
    flexDirection: 'column',
  },
}));

const AdminModal = (props) => {
  const { modal, setModal, removeUser } = props;
  const classes = useStyles();

  return (
    <Modal
      aria-labelledby="admin-modal"
      aria-describedby="admin-modal-description"
      open={modal}
      onClose={() => setModal(false)}
    >
      <div className={classes.paper}>
        <Typography variant="h6" id="admin-modal-title" align="center">
          Are you sure you want to remove this user?
        </Typography>
        <br/>
        <Typography variant="body2" id="admin-modal-sub" align="center">
          Warning: This process is irreversible...
        </Typography>
        <AdminFlexContainer
          width="100%"
          padding="5px"
          margin="auto"
        >
          <AdminModalButton
            variant="contained"
            color="default"
            onClick={removeUser}
          >
            confirm
          </AdminModalButton>
          <AdminModalButton
            variant="contained"
            color="secondary"
            onClick={() => setModal(false)}
          >
            cancel
          </AdminModalButton>
        </AdminFlexContainer>
      </div>
    </Modal>
  );
};

export default AdminModal;
