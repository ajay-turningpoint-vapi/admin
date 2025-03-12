import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { url } from "../../services/url.service";
import { useDispatch, useSelector } from "react-redux";
import { PRODUCTGet } from "../../redux/actions/Product/Product.actions";
import { useLocation } from "react-router-dom";
import { Box, Chip, CircularProgress, Snackbar } from "@material-ui/core";
import moment from "moment";
import { Alert } from "bootstrap";
import { MarkerClusterer, SuperClusterAlgorithm } from "@googlemaps/markerclusterer";

const ScannedCouponsMap = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const couponData = location.state?.couponData;
  const productArr = useSelector((state) => state.product.products);

  const [map, setMap] = useState(null);
  const [coupons, setCoupons] = useState([]);
  const [searchProductName, setSearchProductName] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [productTotals, setProductTotals] = useState({});
  const [selectedProduct, setSelectedProduct] = useState("");
  const [allCoupons, setAllCoupons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const autocompleteRef = useRef(null);
  const [markers, setMarkers] = useState([]);

  // Load Google Maps script and initialize map
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB_mx6YLhBCVyk1luPlHDC-z1BKwxkPf3o&libraries=places`;
    script.async = true;

    script.onload = () => {
      initializeMap();
      dispatch(PRODUCTGet());
    };

    script.onerror = () => {
      setError("Failed to load Google Maps script.");
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [dispatch]);

  // Fetch coupons based on search parameters
  useEffect(() => {
    if (!map) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        if (couponData) {
          await fetchCouponsByEmail();
        } else {
          await fetchCoupons();
        }
      } catch (err) {
        setError("Failed to fetch coupons.");
        console.error("Error fetching coupons:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [
    map,
    couponData,
    searchProductName,
    searchName,
    searchLocation,
    startDate,
    endDate,
  ]);

  // Initialize the map
  const initializeMap = () => {
    const mapElement = document.getElementById("map");
    if (!mapElement) {
      setError("Map element not found.");
      return;
    }

    const mapOptions = {
      center: { lat: 20.365550412275475, lng: 72.92123606774173 },
      zoom: 13,
    };

    const newMap = new window.google.maps.Map(mapElement, mapOptions);
    setMap(newMap);

    if (autocompleteRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        autocompleteRef.current,
        { types: ["geocode"] }
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
          setError("No details available for the selected location.");
          return;
        }

        setSearchLocation(place.formatted_address);
        newMap.setCenter(place.geometry.location);
        newMap.setZoom(15);
      });
    }
  };

  // Fetch all coupons
  const fetchCoupons = async () => {
    try {
      const response = await axios.get(url + "/coupon/getScannedCoupons", {
        params: {
          productName: searchProductName,
          name: searchName,
          startDate,
          endDate,
          location: searchLocation,
        },
      });
      const data = response.data.data;
      setAllCoupons(data);
      setCoupons(data);
      calculateProductTotals(data);
      placeCouponsOnMap(data);
    } catch (err) {
      throw err;
    }
  };

  // Fetch coupons by email
  const fetchCouponsByEmail = async () => {
    try {
      const response = await axios.get(
        url + `/coupon/getScannedCouponsByEmail?scannedEmail=${couponData}`,
        { params: { productName: selectedProduct } }
      );
      const scannedCoupons = response.data.data.scannedCoupons || [];
      setAllCoupons(scannedCoupons);
      setCoupons(scannedCoupons);
      calculateProductTotals(scannedCoupons);
      placeCouponsOnMap(scannedCoupons);
    } catch (err) {
      throw err;
    }
  };

  // Calculate product totals
  const calculateProductTotals = (coupons) => {
    const productCounts = coupons.reduce((acc, coupon) => {
      acc[coupon.productName] = (acc[coupon.productName] || 0) + 1;
      return acc;
    }, {});
    setProductTotals(productCounts);
  };

  // Place coupons on the map as markers
  // const placeCouponsOnMap = (coupons) => {
  //   markers.forEach((marker) => marker.setMap(null)); // Clear existing markers

  //   const newMarkers = coupons
  //     .filter((coupon) => coupon.location?.coordinates?.length === 2)
  //     .map((coupon) => {
  //       const {
  //         location,
  //         productName,
  //         value,
  //         scannedUserName,
  //         updatedAt,
  //         name,
  //       } = coupon;
  //       const [longitude, latitude] = location.coordinates;
  //       const position = { lat: latitude, lng: longitude };

  //       const marker = new window.google.maps.Marker({
  //         map,
  //         position,
  //         title: `${scannedUserName} - ${name} ${productName} - ${value} Time:${moment(
  //           updatedAt
  //         ).format("DD-MM-YYYY hh:mm A")}`,
  //       });

  //       marker.addListener("click", () => {
  //         alert(
  //           `The coupon for ${name} ${productName} worth ${value} was scanned by ${scannedUserName} (Time: ${moment(
  //             updatedAt
  //           ).format("DD-MM-YYYY hh:mm A")})`
  //         );
  //       });

  //       return marker;
  //     });

  //   setMarkers(newMarkers);
  // };

  const placeCouponsOnMap = (coupons) => {
    // Clear existing markers
    markers.forEach((marker) => marker.setMap(null));
  
    const newMarkers = coupons
      .filter((coupon) => coupon.location?.coordinates?.length === 2)
      .map((coupon) => {
        const {
          location,
          productName,
          value,
          scannedUserName,
          updatedAt,
          name,
        } = coupon;
        const [longitude, latitude] = location.coordinates;
        const position = { lat: latitude, lng: longitude };
  
        const marker = new window.google.maps.Marker({
          position,
          map, // Ensure it's attached to the map
          title: `${scannedUserName} - ${name} ${productName} - ${value} Time:${moment(
            updatedAt
          ).format("DD-MM-YYYY hh:mm A")}`,
        });
  
        marker.addListener("click", () => {
          alert(
            `The coupon for ${name} ${productName} worth ${value} was scanned by ${scannedUserName} (Time: ${moment(
              updatedAt
            ).format("DD-MM-YYYY hh:mm A")})`
          );
        });
  
        return marker;
      });
  
    // Clear previous markers from state
    setMarkers(newMarkers);
  
    // **Use Marker Clusterer and clear old clusters**
    if (window.markerCluster) {
      window.markerCluster.clearMarkers();
    }
  
    // Reinitialize the marker cluster with new markers
    window.markerCluster = new MarkerClusterer({
      map,
      markers: newMarkers,
      algorithm: new SuperClusterAlgorithm({ maxZoom: 15 }),
    });
  };
  

  // Handle chip click to filter by product
  const handleChipClick = (product) => {
    if (selectedProduct === product) {
      setSelectedProduct("");
      setCoupons(allCoupons);
      placeCouponsOnMap(allCoupons);
    } else {
      setSelectedProduct(product);
      const filteredCoupons = allCoupons.filter(
        (coupon) => coupon.productName === product
      );
      setCoupons(filteredCoupons);
      placeCouponsOnMap(filteredCoupons);
    }
  };

  // Handle date changes
  const handleStartDateChange = (e) => setStartDate(e.target.value);
  const handleEndDateChange = (e) => setEndDate(e.target.value);

  return (
    <div style={{ marginLeft: "15px" }}>
      {loading && (
        <CircularProgress style={{ margin: "20px auto", display: "block" }} />
      )}

      {error && (
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={() => setError(null)}
        >
          <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        </Snackbar>
      )}

      {!couponData && (
        <div style={{ display: "flex" }}>
          <input
            type="text"
            ref={autocompleteRef}
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            placeholder="Search by location"
            style={inputStyle}
          />
          <input
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Search by coupon number"
            style={inputStyle}
          />
          {productArr && (
            <select
              value={searchProductName}
              onChange={(e) => setSearchProductName(e.target.value)}
              style={inputStyle}
            >
              <option value="" disabled>
                Select a product
              </option>
              {productArr.map((product) => (
                <option key={product.id} value={product.name}>
                  {product.name}
                </option>
              ))}
            </select>
          )}
          <input
            type={startDate ? "date" : "text"}
            value={startDate}
            onChange={handleStartDateChange}
            placeholder="Start date"
            style={inputStyle}
            onFocus={(e) => (e.target.type = "date")}
          />
          <input
            type={endDate ? "date" : "text"}
            value={endDate}
            onChange={handleEndDateChange}
            placeholder="End date"
            style={inputStyle}
            onFocus={(e) => (e.target.type = "date")}
          />
        </div>
      )}

      {couponData && (
        <div style={{ marginBottom: "10px", marginTop: "10px" }}>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {Object.entries(productTotals).map(([product, count]) => (
              <Chip
                key={product}
                label={`${product}: ${count}`}
                color={selectedProduct === product ? "secondary" : "primary"}
                style={{ marginRight: "5px", marginBottom: "5px" }}
                onClick={() => handleChipClick(product)}
              />
            ))}
          </Box>
        </div>
      )}

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

// Reusable input style
const inputStyle = {
  marginTop: "10px",
  marginRight: "10px",
  width: "15%",
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

export default ScannedCouponsMap;
