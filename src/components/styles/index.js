import styled from 'styled-components';

export const FullContainer = styled.div`
  font-family: Roboto, serif;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  max-width: 100%;
  max-height: 100%;
  padding: ${props => props.padding || 0};
`;

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: ${props => props.flexDirection || 'row'};
  width: ${props => props.width || 'auto'};
  height: ${props => props.height || 'auto'};
  margin: ${props => props.margin || 0};
  padding: ${props => props.padding || 0};
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
