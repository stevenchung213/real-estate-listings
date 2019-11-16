import React from 'react';
import GoogleMapReact from 'google-map-react';
import { MapContainer, MapPin } from './Map.styled';

const PropertyMap = (props) => {
  // retrieve listings from props (to display markers on map)
  const apiKey = process.env.GOOGLE_MAPS_APIKEY;
  console.log(props);
  const { listings, handlePinClick } = props;
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
          listings.map((property, i) => {
            const {
              status, lat, long, notice_number, _id,
            } = property;
            const currentStatus = status === 'hotlead' ? '#349044'
            : status === 'contacted' ? '#f97300'
            : status === 'left_note' ? '#f9b100'
            : '#808080';
            return (
              <MapPin
                key={`id-${notice_number}`}
                lat={lat}
                lng={long}
                color={currentStatus}
                onClick={() => handlePinClick(_id)}
              />
            );
          })
        }
      </GoogleMapReact>
    </MapContainer>
  );
};

export default PropertyMap;
