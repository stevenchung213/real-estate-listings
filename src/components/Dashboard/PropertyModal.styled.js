import styled from 'styled-components';
import Modal from '@material-ui/core/Modal';

export const StyledModal = styled(Modal)`
  display: flex;
`;

export const PropertyContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  padding: 15px;
`;

export const PropertyModalGrid = styled.div`
  display: grid;
  grid-template-columns: ${props => props.gridTemplateColumns || 'repeat(auto-fill, minmax(200px, 1fr))'};
  grid-gap: 10px;
  margin-bottom: 20px;
  overflow: auto;
  max-height: 90%;
`;

export const SwitchContainer = styled.div`
  display: flex;
  margin: auto;
  align-items: center;
  color: darkgrey;
`;
