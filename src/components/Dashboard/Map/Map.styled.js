import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons/faMapMarkerAlt';

export const MapContainer = styled.div`
  height: 100%;
  width: 100%;
`;

const PinContainer = styled.div`
  cursor: pointer;
  
`;

export const MapPin = ({ color, ...rest }) => (
  <PinContainer {...rest}>
    <FontAwesomeIcon
      icon={faMapMarkerAlt}
      size="2x"
      color={color}
    />
  </PinContainer>
);
