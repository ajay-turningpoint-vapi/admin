import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { url } from "../../services/url.service";

const MapPicker = ({ onLocationChange }) => {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [circles, setCircles] = useState([]);
  const autocompleteRef = useRef(null); // Reference for autocomplete input element

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB_mx6YLhBCVyk1luPlHDC-z1BKwxkPf3o&libraries=places`;
    script.async = true;
    script.onload = initializeMap;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (map) {
      fetchGeofences();
    }
  }, [map]);

  const initializeMap = () => {
    const mapOptions = {
      center: { lat: 20.365550412275475, lng: 72.92123606774173 },
      zoom: 13,
    };
    const mapElement = document.getElementById("map");
    const newMap = new window.google.maps.Map(mapElement, mapOptions);
    setMap(newMap);

    // Add click event listener to the map
    newMap.addListener("click", (event) => {
      const clickedLocation = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };

      // Prompt user for confirmation
      const isConfirmed = window.confirm(
        "Are you sure you want to add a marker here?"
      );
      if (isConfirmed) {
        // Create marker at the clicked location
        const marker = new window.google.maps.Marker({
          position: clickedLocation,
          map: newMap,
        });

        // Store marker in state
        setMarkers((prevMarkers) => [...prevMarkers, marker]);
        onLocationChange(clickedLocation);
      }
    });

    // Initialize Autocomplete for search box
    const autocomplete = new window.google.maps.places.Autocomplete(
      autocompleteRef.current,
      {
        types: ["geocode"], // Restrict to addresses only
      }
    );

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) {
        console.error("No details available for input: '" + place.name + "'");
        return;
      }

      // Update map center to the selected place
      newMap.setCenter(place.geometry.location);
      newMap.setZoom(15); // Zoom in for better view

      // Add a marker for the selected place
      const marker = new window.google.maps.Marker({
        map: newMap,
        position: place.geometry.location,
      });

      // Store marker in state
      setMarkers((prevMarkers) => [...prevMarkers, marker]);
      onLocationChange(place.geometry.location);
    });
  };

  const fetchGeofences = async () => {
    try {
      const response = await fetch(`${url}/users/getAllGeofence`);
      const data = await response.json();
      const geofences = data.data;
      displayGeofences(geofences);
    } catch (error) {
      console.error("Error fetching geofences:", error);
    }
  };

  const displayGeofences = (geofences) => {
    geofences.forEach((geofence) => {
      const { _id, radius } = geofence;
      const center = {
        lat: geofence.location.coordinates[1],
        lng: geofence.location.coordinates[0],
      };

      // Create circle
      const circle = new window.google.maps.Circle({
        id: _id,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map: map,
        center: center,
        radius: radius,
      });
      circle.addListener("click", () => {
        const isConfirmed = window.confirm(
          "Are you sure you want to delete this geofence?"
        );
        if (isConfirmed) {
          deleteGeofence(_id);
          circle.setMap(null); // Remove the circle from the map
        }
      });
      // Store circle in state
      setCircles((prevCircles) => [...prevCircles, circle]);
    });
  };

  const deleteGeofence = async (geofenceId) => {
    try {
      const response = await axios.delete(
        `${url}/users/deletedGeofence/${geofenceId}`
      );
      const { data } = response;
      console.log(response);
      toast.success(data.message);
    } catch (error) {
      console.error("Error deleting geofence:", error);
    }
  };

  return (
    <div>
      <input
        ref={autocompleteRef}
        placeholder="Enter a location you want to add zone..."
        style={{
          marginTop: "10px",
          width: "30%",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
      <div
        id="map"
        style={{
          height: "500px",
          width: "90%",
          border: "1px solid",
          borderRadius: "10px",
          marginTop: "10px",
        }}
      ></div>
    </div>
  );
};

export default MapPicker;
