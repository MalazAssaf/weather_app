import React, { useState, useEffect } from "react";

export default function Location() {
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div>
      <h2>User Location</h2>
      {error && <p>Error: {error}</p>}
      {location.lat && location.lon ? (
        <p>
          Latitude: {location.lat} <br />
          Longitude: {location.lon}
        </p>
      ) : (
        !error && <p>Fetching location...</p>
      )}
    </div>
  );
}
