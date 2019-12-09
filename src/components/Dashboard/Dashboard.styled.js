import styled from 'styled-components';

export const DashboardContent = styled.div`
  display: flex;
  flex-direction: column;
  margin: 48px 0 0 58px;
  padding: ${props => props.padding || 0};
  height: auto;
  width: auto;
`;

export const TopbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;


/* SHARED STYLES */
// export const FlexContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin: ${props => props.margin || 0};
//   width: auto;
//   height: auto;
//   padding: ${props => props.padding || 0};
// `;
