import styled from 'styled-components';

export const EntryContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: ${props => props.margin || 0};
  width: auto;
  max-width: ${props => props.maxWidth || 'none'};
  height: auto;
  max-height: ${props => props.maxHeight || 'none'};
  padding: ${props => props.padding || 0};
`;

export const FlexCaptionContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
