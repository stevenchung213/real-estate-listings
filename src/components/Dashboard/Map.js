import React from 'react';
import GoogleMapReact from 'google-map-react';
import { MapContainer, MapPin } from './Map.styled';

const PropertyMap = (props) => {
  // retrieve listings from props (to display markers on map)
  const apiKey = process.env.GOOGLE_MAPS_APIKEY;
  console.log(props);
  const { listings } = props;
  const center = {
    lat: 33.4213578,
    lng: -112.134267,
  };
  return (
    <MapContainer>
      <GoogleMapReact
        bootstrapURLKeys={{ key: apiKey }}
        defaultCenter={center}
        defaultZoom={11}
      >
        {
          listings.map(property => (
            <MapPin
              lat={property.lat}
              lng={property.long}
              color={'green'}
              onClick={() => console.log('clicked on a Map Pin')}
            />
          ))
        }
      </GoogleMapReact>
    </MapContainer>
  );
};

export default PropertyMap;
