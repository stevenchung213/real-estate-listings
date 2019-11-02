import React from 'react';
import Typography from '@material-ui/core/Typography';
import { FlexContainer } from './Dashboard.styled';
import PropertyDetailsEntry from './PropertyDetailsEntry';
import { PropertiesGrid } from './PropertyDetails.styled';

const PropertyDetails = (props) => {
  const { listings } = props;

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
