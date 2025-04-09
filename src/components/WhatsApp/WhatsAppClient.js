import React, { useState, useEffect } from "react";
import axios from "axios";
import { url } from "../../services/url.service";
import toast from "react-hot-toast";
import Loader from "../Utility/Loader.jsx";

const WhatsAppClient = () => {
  const [qrCode, setQRCode] = useState(null);
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true); // Track client readiness
  const [qrLoading, setQrLoading] = useState(false); // Track QR code loading state

  // Check client status on component mount
  useEffect(() => {
    const checkClientStatus = async () => {
      try {
        const response = await axios.get(`${url}/whatsapp/status`);
        setStatus(response.data.status);
        setLoading(response.data.status !== "Client is ready"); // If not ready, show QR code scanner
      } catch (error) {
        console.error("Error fetching status:", error);
        setStatus("Failed to fetch status.");
        setLoading(true); // Assume not ready if there's an error
      }
    };

    checkClientStatus();
  }, []);

  // Fetch QR Code
  const fetchQRCode = async () => {
    setQrLoading(true); // Start loader
    try {
      const response = await axios.get(`${url}/whatsapp/qr`);
      setQRCode(response.data.qr);
    } catch (error) {
      console.error("Error fetching QR code:", error);
      toast.error("Failed to fetch QR code.");
    } finally {
      setQrLoading(false); // Stop loader
    }
  };

  // Send Message
  const sendMessage = async () => {
    try {
      const response = await axios.post(`${url}/whatsapp/send-message`, {
        number,
        message,
      });
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message.");
    }
  };

  // Logout
  const logout = async () => {
    try {
      const response = await axios.post(`${url}/whatsapp/logout`);
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("Failed to logout.");
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        marginLeft: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h3
        style={{ textAlign: "center", color: "#000000", marginBottom: "30px" }}
      >
        WhatsApp Web Client
      </h3>

      {loading ? (
        // Show QR Code Scanner if not ready
        <div
          style={{
            marginBottom: "30px",
            padding: "20px",
            border: "1px solid #000000",
            borderRadius: "8px",
            backgroundColor: "#ffffff",
          }}
        >
          <h5 style={{ color: "#000000" }}>QR Code Scanner</h5>
          <button
            onClick={fetchQRCode}
            style={{
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              backgroundColor: "#000000",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Generate QR Code
          </button>
          {qrLoading ? (
            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <Loader />
            </div>
          ) : (
            qrCode && (
              <div style={{ marginTop: "20px", textAlign: "center" }}>
                <img
                  src={`data:image/png;base64,${qrCode}`}
                  alt="QR Code"
                  style={{ maxWidth: "100%" }}
                />
              </div>
            )
          )}
        </div>
      ) : (
        // Show Send Message and Logout if ready
        <>
          <div
            style={{
              marginBottom: "30px",
              padding: "20px",
              border: "1px solid #000000",
              borderRadius: "8px",
              backgroundColor: "#ffffff",
            }}
          >
            <h5 style={{ color: "#000000" }}>Send Message</h5>
            <div style={{ marginBottom: "10px" }}>
              <input
                type="text"
                placeholder="Phone Number (with country code)"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
              <textarea
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  resize: "vertical", // Allows resizing
                  height: "100px", // Adjust height for better UX
                }}
              />
            </div>
            <button
              onClick={sendMessage}
              style={{
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                backgroundColor: "#000000",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Send
            </button>

        
          </div>
        </>
      )}
    </div>
  );
};

export default WhatsAppClient;
// <button
//   onClick={logout}
//   style={{
//     padding: "10px 20px",
//     border: "none",
//     borderRadius: "5px",
//     backgroundColor: "#000000",
//     color: "#fff",
//     cursor: "pointer",
//     marginLeft: "10px",
//   }}
// >
//   Logout
// </button>