import React from 'react';
import { ColumnFlexBox } from "./styles";

const NoMatch = () => {

  return (
    <ColumnFlexBox className='404-container'>
      <h1 style={{fontSize: '500%'}}>404</h1>
      <h5>{`The requested URL ${window.location} does not exist...`}</h5>
    </ColumnFlexBox>
  );
};

export default NoMatch;
