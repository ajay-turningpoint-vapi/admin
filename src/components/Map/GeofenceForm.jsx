import CustomButton from "../Utility/Button";
import React, { useState } from "react";
import axios from "axios";
import MapPicker from "./MapPicker"; // Assuming you have defined the MapPicker component
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { url } from "../../services/url.service";
const GeofenceForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    latitude: "",
    longitude: "",
    radius: "",
    notificationMessage: "",
  });
  const handleLocationChange = (location) => {
    setFormData({
      ...formData,
      latitude: location.lat,
      longitude: location.lng,
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, latitude, longitude, radius } = formData;

      console.log(formData);
      if (latitude === "" || longitude === "") {
        alert("Latitude and longitude cannot be blank.");
        return;
      }
      console.log("before", formData);
      const response = await axios.post(`${url}/users/addGeofence`, formData);
      const { data } = response;
      toast.success(data.message);
      window.location.reload();
      setFormData({
        name: "",
        latitude: "",
        longitude: "",
        radius: "",
      });
    } catch (error) {
      console.error("Error creating geofence:", error.response.data.error);
    }
  };

  return (
    <div className="geofence-form">
      <h4 style={{ marginLeft: "10px" }}>Create Geofence</h4>
      <form onSubmit={handleSubmit} style={{ marginLeft: "10px" }}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
            style={{
              borderRadius: "10px",
              marginBottom: "10px",
              border: "none",
              height: "40px",
              width: "350px",
              paddingLeft: "10px",
            }}
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            name="radius"
            required
            value={formData.radius}
            onChange={handleChange}
            placeholder="Radius (in meters)"
            style={{
              borderRadius: "10px",
              marginBottom: "10px",
              border: "none",
              height: "40px",
              width: "350px",
              paddingLeft: "10px",
            }}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="notificationMessage"
            required
            value={formData.notificationMessage}
            onChange={handleChange}
            placeholder="Notification Message"
            style={{
              borderRadius: "10px",
              marginBottom: "10px",
              border: "none",
              height: "40px",
              width: "350px",
              paddingLeft: "10px",
            }}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          style={{ marginRight: "10px" }}
        >
          Create Geofence
        </button>
        <MapPicker onLocationChange={handleLocationChange} />
      </form>
    </div>
  );
};

export default GeofenceForm;
