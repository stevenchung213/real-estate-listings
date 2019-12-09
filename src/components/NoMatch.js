import React from 'react';
import { FlexContainer } from './styles';

const NoMatch = () => (
  <FlexContainer
    id="404-container"
    flexDirection="column"
    margin="auto"
  >
    <h1 style={{ fontSize: '500%' }}>404</h1>
    <h5>{`The requested URL ${window.location} does not exist...`}</h5>
  </FlexContainer>
);

export default NoMatch;
