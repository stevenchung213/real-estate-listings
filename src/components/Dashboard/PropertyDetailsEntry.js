import React from 'react';
import { EntryContainer } from './PropertyDetailsEntry.styled';

const PropertyDetailsEntry = (props) => {
  const { listing, headers } = props;
  let content;
  if (headers) {
    content = Object.keys(listing).map(field => (
      <div>
        {field}
      </div>
    ));
  } else {
    content = Object.values(listing).map(value => (
      <div>
        {value}
      </div>
    ));
  }
  return (
    <EntryContainer className="property-details-entry-container">
      {content}
    </EntryContainer>
  );
};

export default PropertyDetailsEntry;
