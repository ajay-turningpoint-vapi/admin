import * as React from "react";
import Card from "@mui/material/Card";
import { notListedContractors } from "../../services/users.service";
import DataTable from "react-data-table-component";
import CustomButton from "../Utility/Button";


export default function NotListedContractors() {
  const [state, setState] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);
  const [search, setSearch] = React.useState("");

  const fetchData = async () => {
    try {
      const response = await notListedContractors();
      setState(response.data);
      setFilteredData(response.data); // Initialize filteredData with full data
    } catch (error) {
      console.error("Error:", error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  // Handle search filtering
  React.useEffect(() => {
    const filtered = state.filter(
      (contractor) =>
        contractor.name.toLowerCase().includes(search.toLowerCase()) ||
        contractor.phone.toLowerCase().includes(search.toLowerCase()) ||
        contractor.givenName.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(filtered);
  }, [search, state]);

  const columns = [
    {
      name: "ID",
      cell: (row, index) => <p>{index + 1}</p>,
      sortable: true,
      width: "10%",
    },
    {
      name: "Phone",
      cell: (row) => <p>{row.phone}</p>,
      width: "15%",
    },
    {
      name: "NAME",
      cell: (row) => <p>{row.name}</p>,
      width: "30%",
    },

    {
      name: "Carpenter Name",
      cell: (row) => <p>{row.givenName}</p>,
      width: "40%",
    },
  ];

  return (
   
    <div
      className="dashboard-table dashboard-box"
      style={{ maxWidth: "1500px", marginLeft: "20px" }}
    >
     
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignContent: "center",
        }}
      >
        <ul
          className="nav nav-pills dashboard-pills justify-content-start"
          id="pills-tab"
          role="tablist"
          style={{ marginBottom: "20px" }}
        >
          <li>
            <CustomButton
              navPills
              btnName={"Not Listed Contractors"}
              pillActive={true}
            />
          </li>
        </ul>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by name, phone, or carpenter name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            marginBottom: "10px",
            padding: "8px",
            width: "50%",
            border: "1px solid #ccc",
            borderRadius: "4px",
            height: "35px",
          }}
        />
      </div>
      <DataTable columns={columns} data={filteredData} pagination />
    </div>
  );
}
