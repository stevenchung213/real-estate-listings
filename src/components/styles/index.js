import styled from 'styled-components';

export const FullContainer = styled.div`
  font-family: Roboto, serif;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  max-width: 100%;
  max-height: 100%;
  padding: ${ props => props.padding || 0 };
`;

export const ColumnFlexBox = styled.div`
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  margin: auto;
`;

export const CenteredHeader1 = styled.h1`
  text-align: center;
`;

export const CenteredHeader2 = styled.h2`
  text-align: center;
`;

export const FloatRightDiv = styled.div`
  float: right;
`;

export const LoadingContainerDiv = styled.div`
  margin-bottom: 4px;
  height: 4px;
`;
