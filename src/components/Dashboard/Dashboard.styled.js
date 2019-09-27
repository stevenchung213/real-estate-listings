import styled from 'styled-components';

export const DashboardContent = styled.div`
  display: flex;
  flex-direction: column;
  margin: 64px 0 0 180px;
  padding: ${props => props.padding || 0};
  height: auto;
  width: auto;
`;

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${props => props.margin || 0};
  width: auto;
  height: auto;
  padding: ${props => props.padding || 0};
`;
