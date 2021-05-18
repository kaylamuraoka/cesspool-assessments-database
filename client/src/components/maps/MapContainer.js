import React, { useState } from "react";
import { useSelector } from "react-redux";

import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { googleMapsApiKey } from "../../utils/config";
import InfoWindowPopup from "./InfoWindowPopup";

const mapStyles = {
  height: "80vh",
  width: "100%",
};

const defaultCenter = {
  lat: 21.46585,
  lng: -157.991627,
};

const MapContainer = () => {
  const [selected, setSelected] = useState({});

  const onSelect = (item) => {
    setSelected(item);
  };

  const { homePosts } = useSelector((state) => state);

  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey}>
      <GoogleMap mapContainerStyle={mapStyles} zoom={11} center={defaultCenter}>
        {homePosts.posts.map((item) => {
          return (
            <Marker
              key={item._id}
              position={item.coordinates}
              onClick={() => onSelect(item)}
            />
          );
        })}

        {selected.coordinates && (
          <InfoWindow
            position={selected.coordinates}
            clickable={true}
            onCloseClick={() => setSelected({})}
          >
            <InfoWindowPopup selected={selected} />
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainer;
