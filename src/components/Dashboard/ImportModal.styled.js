import styled from 'styled-components';
import Modal from '@material-ui/core/Modal';

export const StyledModal = styled(Modal)`
  display: flex;
`;

export const PreviewContainer = styled.div`
  height: auto;
`;

export const PreviewGrid = styled.div`
  display: grid;
  grid-template-columns: ${props => props.gridTemplateColumns || 'repeat(23, minmax(200px, 1fr))'};
  grid-gap: 10px;
  margin-bottom: 20px;
  overflow: auto;
  max-height: 90%;
`;
