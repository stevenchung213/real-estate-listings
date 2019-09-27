import styled from 'styled-components';

export const PreviewGrid = styled.div`
  display: grid;
  grid-template-columns: ${props => props.gridTemplateColumns || 'repeat(auto-fit, minmax(200px, 1fr))'};
  grid-gap: 10px;
  overflow: auto;
  margin-bottom: 20px;
`;
