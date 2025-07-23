import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../services/url.service";


const Top50UsersTables = () => {
  const [carpenters, setCarpenters] = useState([]);
  const [contractors, setContractors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        const [carpentersRes, contractorsRes] = await Promise.all([
          axios.get(url + "/users/getTop50MonthlyCarpentersScanPoints"),
          axios.get(url + "/users/getTop50MonthlyContractorsScanPoints"),
        ]);

        setCarpenters(carpentersRes.data.data || []);
        setContractors(contractorsRes.data.data || []);
      } catch (err) {
        console.error("Error fetching top users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopUsers();
  }, []);

  const renderTable = (data, title) => (
    <div style={tableCardStyle}>
      <h4 style={titleStyle}>{title}</h4>
      <div style={{ overflowX: "auto" }}>
        <table style={tableStyle}>
          <thead>
            <tr style={headerRowStyle}>
              <th style={thStyle}>#</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Phone</th>
              <th style={thStyle}>Scan</th>
              <th style={thStyle}>Points</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, i) => (
              <tr key={i} style={i % 2 === 0 ? rowEvenStyle : rowOddStyle}>
                <td style={tdStyle}>{i + 1}</td>
                <td style={tdStyle}>{user.name || "N/A"}</td>
                <td style={tdStyle}>{user.phone || "N/A"}</td>
                <td style={tdStyle}>{user.scanCount || 0}</td>
                <td style={tdStyle}>{user.totalPointsEarned || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  if (loading)
    return <p style={{ textAlign: "center", padding: "40px" }}>Loading...</p>;

  return (
    <div>
 
      <h2 style={{textAlign:"center"}}>Top Users Who Scanned Coupons After the Last Contest</h2>
      <div style={containerStyle}>
        {renderTable(carpenters, "Top 50 Carpenters ")}
        {renderTable(contractors, "Top 50 Contractors")}
      </div>
    </div>
  );
};

// 🎨 Styles
const containerStyle = {
  display: "flex",
  gap: "2rem",
  padding: "2rem",
  flexWrap: "wrap",
  justifyContent: "center",
};

const tableCardStyle = {
  width: "48%",
  backgroundColor: "#fff",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  padding: "1rem",
};

const titleStyle = {
  marginBottom: "1rem",
  textAlign: "center",
  color: "#333",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  minWidth: "500px",
};

const thStyle = {
  padding: "10px",
  textAlign: "left",
  borderBottom: "2px solid #ccc",
  backgroundColor: "#f4f4f4",
  color: "#333",
};

const tdStyle = {
  padding: "10px",
  borderBottom: "1px solid #eee",
};

const rowEvenStyle = {
  backgroundColor: "#fff",
};

const rowOddStyle = {
  backgroundColor: "#f9f9f9",
};

const headerRowStyle = {
  backgroundColor: "#f0f0f0",
};

export default Top50UsersTables;
