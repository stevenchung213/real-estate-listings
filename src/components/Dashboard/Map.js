import React from 'react';
import GoogleMapReact from 'google-map-react';
import { MapContainer } from "./Map.styled";
import Pin from "./Pin";

const PropertyMap = (props) => {
  // retrieve state from props (property markers)
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
        <Pin
          lat={33.6213578}
          lng={-112.134267}
          text="MY MARKER"
        />
      </GoogleMapReact>
    </MapContainer>
  );
};

export default PropertyMap;
