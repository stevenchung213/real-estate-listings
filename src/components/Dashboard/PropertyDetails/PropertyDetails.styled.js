import styled from 'styled-components';

export const PropertiesGrid = styled.div`
  display: grid;
  grid-template-columns: ${props => props.gridTemplateColumns || 'repeat(auto-fit, minmax(180px, 1fr))'};
  grid-gap: 20px;
  overflow: auto;
  padding: 25px;
  justify-items: center;
  text-align: center;
`;
