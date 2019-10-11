import React from 'react';
import Typography from '@material-ui/core/Typography';
import { FlexContainer } from './Dashboard.styled';
import PropertyDetailsEntry from './PropertyDetailsEntry';
import { PropertiesGrid } from './PropertyDetails.styled';

const PropertyDetails = (props) => {
  const { listings } = props;
  // const relevantOnly =
  return (
    <FlexContainer
      id="property-details-container"
      padding="10px"
    >
      <PropertiesGrid>
        {
          <PropertyDetailsEntry
            listing={listings[0]}
            headers
          />
        }
        {/*{*/}
        {/*  listings.map(listing => (*/}
        {/*    <PropertyDetailsEntry*/}
        {/*      key={`key-${listing.notice_number}`}*/}
        {/*      listing={listing}*/}
        {/*    />*/}
        {/*  ))*/}
        {/*}*/}
      </PropertiesGrid>
      {
        !listings && <Typography variant="h2">No properties found...</Typography>
      }
    </FlexContainer>
  );
};

export default PropertyDetails;
