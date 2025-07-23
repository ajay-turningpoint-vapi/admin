import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // MUI icon

export default function BackButton({ label = "Back" }) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <button
      onClick={handleBack}
      style={{
        background: "none",
        border: "none",
        color: "black",
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        fontSize: "16px",
        padding: 0,
      }}
    >
      <ArrowBackIcon fontSize="small" style={{ marginRight: 4, }} />
      {label}
    </button>
  );
}
