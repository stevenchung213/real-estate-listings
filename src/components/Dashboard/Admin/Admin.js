import React, { useEffect, useState } from 'react';
import UserRegistration from './UserRegistration';
import { FlexContainer } from '../../styles';
import Users from './Users';

const Admin = (props) => {
  const api = process.env.API || 'http://localhost:3000/api/v1';
  const {
    setErrors, setErrorModal, user,
  } = props;
  const { username, token, admin } = user;
  const [users, setUsers] = useState(null);

  const fetchUsers = () => {
    const url = `${api}/users`;
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  console.log(users);

  return (
    <FlexContainer
      id="admin-container"
      width="100%"
      height="100%"
      padding="20px"
    >
      <Users />
      <UserRegistration
        setErrors={setErrors}
        setErrorModal={setErrorModal}
        fetchUsers={fetchUsers}
      />
    </FlexContainer>
  );
};

export default Admin;
