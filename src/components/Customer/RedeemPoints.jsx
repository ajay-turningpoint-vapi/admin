import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Snackbar,
  CircularProgress,
  Alert,
} from "@mui/material";

import axios from "axios";
import { DashboardTable } from "../Utility/DashboardBox";
import { getAllUser } from "../../services/users.service";
import Select from "react-select";
const RedeemPoints = () => {
  const [userId, setUserId] = useState("");
  const [users, setUsers] = useState([]);
  const [points, setPoints] = useState("");
  const [reason, setReason] = useState("");
  const [mobileDescription, setMobileDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUser();
        console.log(response);

        setUsers(response.data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchUsers(); // Call the fetch function when the component mounts
  }, []);

  const handleSelectChange = (selectedOption) => {
    // When a user is selected, update userId with the selected user's _id
    setUserId(selectedOption ? selectedOption.value : "");
  };

  const userOptions = users.map((user) => ({
    value: user._id, // Assuming you use _id as the unique identifier for user
    label: `${user.name} - ${user.phone}`,
  }));

  const handleReasonChange = (e) => {
    const inputReason = e.target.value;
    const wordCount = inputReason.trim().split(/\s+/).length;

    if (wordCount <= 10) {
      setReason(inputReason);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!userId || !points || !reason) {
      setErrorMessage("User ID, Points, and Reason are required.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/users/reduce-points", {
        userId,
        pointsToDeduct: points,
        reason,
        mobileDescription,
      });

      setSuccessMessage(response.data.message);
      setPoints("");
      setReason("");
      setMobileDescription("");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Error occurred while reducing points."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: "70%", margin: "auto" }}>
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "20px" }}>
        <h4>Product Redeem Points</h4>
        <form onSubmit={handleSubmit}>
          <Select
            value={userOptions.find((option) => option.value === userId)} // Default selected option
            onChange={handleSelectChange}
            options={userOptions}
            placeholder="Select User"
            styles={{
              menuPortal: (base) => ({
                ...base,
                zIndex: 9999,
              }),
            }}
            menuPortalTarget={document.body}
          />
          <TextField
            label="Points to Deduct"
            variant="outlined"
            type="number"
            fullWidth
            value={points}
            onChange={(e) => setPoints(e.target.value)}
            style={{ marginBottom: "20px", marginTop: "20px" }}
          />
          <TextField
            label="Reason (Max 10 words)"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={reason}
            onChange={handleReasonChange}
            style={{ marginBottom: "20px" }}
            helperText="Maximum 10 words"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </div>

      {/* Success Snackbar */}
      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={() => setSuccessMessage("")}
      >
        <Alert onClose={() => setSuccessMessage("")} severity="success">
          {successMessage}
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={() => setErrorMessage("")}
      >
        <Alert onClose={() => setErrorMessage("")} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};
export default RedeemPoints;
