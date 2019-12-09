import React, { useEffect, useState } from 'react';
import UserRegistration from './UserRegistration';
import { FlexContainer } from '../../styles';
import Users from './Users';
import AdminModal from './AdminModal';

const Admin = (props) => {
  const api = process.env.API || 'http://localhost:3000/api/v1';
  const url = `${api}/users`;
  const {
    setErrors, setErrorModal, user,
  } = props;
  const { username, token, admin } = user;

  const [modal, setModal] = useState(false);
  const [users, setUsers] = useState(null);
  const [userToRemove, setUserToRemove] = useState(null);

  const removeUser = () => {
    console.log(userToRemove)
    const userObj = { _id: userToRemove };
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userObj),
    })
      .then(res => res.json())
      .then((json) => {
        console.log(json);
      })
      .catch((err) => {
        console.error(err);
        setErrors({
          type: err.message,
          message: 'An error occurred while fetching users.',
        });
        setErrorModal(true);
      });
  };

  const fetchUsers = () => {
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then((json) => {
        setUsers(json.payload);
      })
      .catch((err) => {
        setErrors({
          type: err.message,
          message: 'An error occurred while fetching users.',
        });
        setErrorModal(true);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <FlexContainer
      id="admin-container"
      width="100%"
      height="100%"
      padding="20px"
    >
      <Users
        users={users}
        setUserToRemove={setUserToRemove}
        setModal={setModal}
      />
      <UserRegistration
        setErrors={setErrors}
        setErrorModal={setErrorModal}
        fetchUsers={fetchUsers}
      />
      {
        modal
        && (
        <AdminModal
          modal={modal}
          setModal={setModal}
          removeUser={removeUser}
        />
        )
      }
    </FlexContainer>
  );
};

export default Admin;
