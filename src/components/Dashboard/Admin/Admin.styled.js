import styled from 'styled-components';

export const AdminFlexContainer = styled.div`
  display: flex;
  flex-direction: ${props => props.flexDirection || 'row'};
  width: 100%;
  height: 100%;
  padding: 20px;
`;

export const UserListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  grid-gap: 10px;
  overflow: auto;
`;
