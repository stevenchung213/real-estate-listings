import React from 'react';
import Typography from '@material-ui/core/Typography';
import { FlexContainer } from '../Dashboard.styled';
import PropertyDetailsEntry from './PropertyDetailsEntry';
import { PropertiesGrid } from './PropertyDetails.styled';

const PropertyDetails = (props) => {
  const { listings, handlePropertyClick } = props;
  return (
    <FlexContainer
      id="property-details-container"
      padding="10px"
    >
      {
        listings
        && (
        <PropertiesGrid id="property-cards-grid">
          {
            listings.map(listing => (
              <PropertyDetailsEntry
                key={listing.notice_number}
                listing={listing}
                handleCardClick={handlePropertyClick}
              />
            ))
          }
        </PropertiesGrid>
        )
      }
      {
        !listings
        && (
        <Typography variant="h2">
          No properties found...
        </Typography>
        )
      }
    </FlexContainer>
  );
};

export default PropertyDetails;
