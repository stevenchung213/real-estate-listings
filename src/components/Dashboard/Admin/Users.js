import React from 'react';
import List from '@material-ui/core/List';
import User from './User';
import { FlexContainer } from '../../styles';

const Users = (props) => {
  const { users, setUserToRemove, setModal } = props;
  return (
    <FlexContainer
      id="users-list-container"
      width="62%"
      height="100%"
    >
      <List dense>
        {
          users && users.map(x => (
            <User
              key={x.username}
              user={x}
              setUserToRemove={setUserToRemove}
              setModal={setModal}
            />
          ))
        }
      </List>
    </FlexContainer>
  );
};

export default Users;
