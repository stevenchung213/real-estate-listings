import styled from 'styled-components';

export const PreviewGrid = styled.div`
  display: grid;
  //grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  grid-template-columns: ${props => props.gridTemplateColumns || 'repeat(auto-fit, minmax(140px, 1fr))'};
  grid-gap: 10px;
`;
