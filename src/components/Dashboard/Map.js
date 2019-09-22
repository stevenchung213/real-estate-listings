import React from 'react';
import GoogleMapReact from 'google-map-react';
import { MapContainer, MapPin } from "./Map.styled";

const PropertyMap = (props) => {
  // retrieve listings from props (to display markers on map)
  const apiKey = process.env.GOOGLE_MAPS_APIKEY;
  console.log(props)
  const center = {
    lat: 33.6213578,
    lng: -112.134267
  };
  return (
    <MapContainer>
      <GoogleMapReact
        bootstrapURLKeys={{ key: apiKey }}
        defaultCenter={center}
        defaultZoom={11}
      >
        <MapPin
          lat={33.6213578}
          lng={-112.134267}
          color={'green'}
        />
      </GoogleMapReact>
    </MapContainer>
  );
};

export default PropertyMap;
