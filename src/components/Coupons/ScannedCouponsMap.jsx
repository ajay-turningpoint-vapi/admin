import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { url } from "../../services/url.service";
import { useDispatch, useSelector } from "react-redux";
import { PRODUCTGet } from "../../redux/actions/Product/Product.actions";
import { useLocation } from "react-router-dom";
const ScannedCouponsMap = () => {
  const location = useLocation();
  const couponData = location.state?.couponData;
  console.log(couponData);

  const dispatch = useDispatch();
  const [map, setMap] = useState(null);
  const [coupons, setCoupons] = useState([]);
  const [searchProductName, setSearchProductName] = useState(""); // State for product name search
  const [searchName, setSearchName] = useState(""); // State for name search
  const [searchLocation, setSearchLocation] = useState(""); // State for location search
  const autocompleteRef = useRef(null); // Reference for autocomplete input element
  const [markers, setMarkers] = useState([]); // To store the markers on the map
  const productArr = useSelector((state) => state.product.products);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB_mx6YLhBCVyk1luPlHDC-z1BKwxkPf3o&libraries=places`;
    script.async = true;

    // Load the map script and dispatch the PRODUCTGet action after it's loaded
    script.onload = () => {
      initializeMap();
      dispatch(PRODUCTGet()); // Dispatch your action when the script is loaded
    };

    document.body.appendChild(script);

    // Clean up the script when the component is unmounted
    return () => {
      document.body.removeChild(script);
    };
  }, [dispatch]);

  useEffect(() => {
    if (map) {
      if (couponData) {
        fetchCouponsByEmail();
      } else {
        fetchCoupons();
      }
    }
  }, [map, couponData]);

  useEffect(() => {
    // Fetch and filter coupons whenever search parameters change
    fetchCoupons();
  }, [searchProductName, searchName, searchLocation]);

  // Initialize the map
  const initializeMap = () => {
    const mapOptions = {
      center: { lat: 20.365550412275475, lng: 72.92123606774173 }, // Default center
      zoom: 13,
    };
    const mapElement = document.getElementById("map");
    const newMap = new window.google.maps.Map(mapElement, mapOptions);
    setMap(newMap);

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
        console.error("No details available for input: " + place.name);
        return;
      }

      // Set the location coordinates
      setSearchLocation(place.formatted_address);

      // Update map center to the selected place
      newMap.setCenter(place.geometry.location);
      newMap.setZoom(15); // Zoom in for better view
    });
  };

  // Fetch coupons from the API with optional search parameters
  const fetchCoupons = async () => {
    try {
      // Include search parameters in the request
      const response = await axios.get(url + "/coupon/getScannedCoupons", {
        params: {
          productName: searchProductName, // Pass the productName query parameter
          name: searchName, // Pass the name query parameter
          location: searchLocation, // Pass the location query parameter
        },
      });
      const data = response.data; // Assuming the response contains the coupons

      setCoupons(data.data);
      placeCouponsOnMap(data.data);
    } catch (error) {
      console.error("Error fetching coupons:", error);
    }
  };

  const fetchCouponsByEmail = async () => {
    try {
      // Include search parameters in the request
      const response = await axios.get(
        url + `/coupon/getScannedCouponsByEmail?scannedEmail=${couponData}`,
        {
          params: {
            productName: searchProductName, // Pass the productName query parameter
            name: searchName, // Pass the name query parameter
            location: searchLocation, // Pass the location query parameter
          },
        }
      );
      const data = response.data; // Assuming the response contains the coupons

      setCoupons(data.data);
      placeCouponsOnMap(data.data);
    } catch (error) {
      console.error("Error fetching coupons:", error);
    }
  };

  // Place coupons on the map as markers
  const placeCouponsOnMap = (coupons) => {
    // Clear existing markers
    markers.forEach((marker) => {
      marker.setMap(null);
    });

    const newMarkers = [];

    coupons.forEach((coupon) => {
      const { location, productName, value, name, scannedUserName } = coupon;

      // Check if the location and coordinates are available
      if (
        location &&
        location.coordinates &&
        location.coordinates.length === 2
      ) {
        const [longitude, latitude] = location.coordinates;
        const position = { lat: latitude, lng: longitude };

        // Create a marker for each coupon
        const marker = new window.google.maps.Marker({
          map: map,
          position: position,
          title: `${scannedUserName} - ${name} - ${productName} - ${value}`,
        });

        // Optionally, you can add a click event to show more info or take action
        marker.addListener("click", () => {
          alert(
            `The coupon for ${productName} worth ${value} was scanned by ${scannedUserName} (${name})`
          );
        });

        // Store the marker in the array
        newMarkers.push(marker);
      } else {
        console.warn(`Coupon for ${productName} is missing valid coordinates.`);
      }
    });

    // Set the new markers array
    setMarkers(newMarkers);
  };

  return (
    <div style={{ marginLeft: "15px" }}>
      <div style={{ display: "flex" }}>
        <input
          type="text"
          ref={autocompleteRef}
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          placeholder="Search by location"
          style={{
            marginTop: "10px",
            marginRight: "30px",
            width: "25%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="text"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          placeholder="Search by coupon number"
          style={{
            marginTop: "10px",
            marginRight: "10px",
            width: "15%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />

        {productArr && (
          <select
            value={searchProductName}
            onChange={(e) => setSearchProductName(e.target.value)}
            style={{
              marginTop: "10px",
              width: "15%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              display: "block",
            }}
          >
            <option value="" disabled>
              Select a product
            </option>

            {productArr.length > 0 &&
              productArr.map((product) => (
                <option key={product.id} value={product.name}>
                  {product.name}
                </option>
              ))}
          </select>
        )}
      </div>
      <div
        id="map"
        style={{
          height: "700px",
          width: "90%",
          border: "1px solid",
          borderRadius: "10px",
          marginTop: "10px",
        }}
      ></div>
    </div>
  );
};

export default ScannedCouponsMap;
