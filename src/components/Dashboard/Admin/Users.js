import React from 'react';
import { FlexContainer } from "../../styles";

const Users = (props) => {

  return (
    <FlexContainer
      id="users-list-container"
      width="60%"
      height="100%"
    >
      {
        [1,2,3,4,5,6,7,8,9,10].map(x => (
          <div>
            {`user #${x}`}
          </div>
        ))
      }
    </FlexContainer>
  );
};

export default Users;
