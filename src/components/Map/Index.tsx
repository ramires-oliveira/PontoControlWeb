import { useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import axios from "axios";
import { MapContainer, Address } from "./styles";

interface MapProps {
  onAddressChange: (address: string) => void;
}

export function Map({ onAddressChange }: MapProps) {
  const [currentLocation, setCurrentLocation] = useState({
    lat: 0,
    lng: 0,
  });
  const [currentAddress, setCurrentAddress] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({
          lat: latitude,
          lng: longitude,
        });

        try {
          const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyD1Vl5KStAedRHH92veIfmeLSVJWPd_QuY`
          );
          if (response.data.results.length > 0) {
            setCurrentAddress(response.data.results[0].formatted_address);
            onAddressChange(response.data.results[0].formatted_address);
          }
        } catch (error) {
          console.error("Error fetching address:", error);
        }
      });
    }
  }, []);

  const mapStyles: any = {
    height: "300px",
    width: "100%",
    borderRadius: "10px",
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyD1Vl5KStAedRHH92veIfmeLSVJWPd_QuY",
  });

  return (
    <>
      {isLoaded && (
        <MapContainer>
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={15}
            center={currentLocation}
          >
            <Marker position={currentLocation} />
          </GoogleMap>
          <Address>
            <span>{currentAddress}</span>
          </Address>
        </MapContainer>
      )}
    </>
  );
}

export default Map;
