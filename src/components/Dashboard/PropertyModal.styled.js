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

export const PropertyRowContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
