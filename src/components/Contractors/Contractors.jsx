import React, { useState } from "react";
import { getAllContractors } from "../../services/users.service";
import DataTable from "react-data-table-component";
import CustomButton from "../Utility/Button";
import CarpenterModal from "../Utility/CarpenterModal";
import { Chip } from "@material-ui/core";

export default function Contractors() {
  const [state, setState] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isModalOpen, setIsModalOpen] = useState(true);

  const fetchData = async () => {
    try {
      const response = await getAllContractors();
      setState(response.data);
      setFilteredData(response.data); // Initialize filtered data
    } catch (error) {
      console.error("Error:", error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  // Handle Search Function
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    if (value === "") {
      setFilteredData(state); // Reset to original data
    } else {
      const filtered = state.filter(
        (contractor) =>
          contractor.name.toLowerCase().includes(value) ||
          contractor.businessName.toLowerCase().includes(value) ||
          contractor.phone.includes(value)
      );
      setFilteredData(filtered);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const columns = [
    {
      name: "ID",
      cell: (row, index) => <p>{index + 1}</p>,
      sortable: true,
      width: "10%",
    },
    {
      name: "NAME",
      sortable: true,
      selector: (row) => <p>{row.name}</p>,
      width: "22%",
    },
    {
      name: "Business Name",
      sortable: true,
      selector: (row) => <p>{row.businessName}</p>,
      width: "22%",
    },
    {
      name: "Phone",
      sortable: true,
      selector: (row) => <p>{row.phone}</p>,
      width: "18%",
    },
    {
      name: "Points",
      sortable: true,
      selector: (row, index) => {
        // Check if the contractor is in the top 50 by points
        const isTop50 = index < 50;
        return (
          <div>
            {isTop50 ? (
              <Chip
                label={row.points}
                style={{
                  fontWeight: "bold",
                  backgroundColor: "#228B22",
                  color: "white",
                }} // Optional: To make the points bold
              />
            ) : (
              <p>{row.points}</p>
            )}
          </div>
        );
      },
      width: "10%",
    },
    {
      name: "Action",
      width: "28%",
      cell: (row) => {
        return (
          <>
            {isModalOpen && (
              <CarpenterModal
                handleClose={toggleModal}
                data={row.businessName}
              />
            )}
          </>
        );
      },
    },
  ];

  return (
    <div
      className="dashboard-table dashboard-box"
      style={{ maxWidth: "1200px", marginLeft: "20px" }}
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
              btnName={"All Contractors"}
              pillActive={true}
            />
          </li>
        </ul>

        <input
          type="text"
          placeholder="Search by name, business, or phone..."
          value={searchTerm}
          onChange={handleSearch}
          style={{
            width: "40%",
            padding: "8px",
            marginBottom: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            height: "35px",
          }}
        />
      </div>

      <DataTable columns={columns} data={filteredData} pagination />
    </div>
  );
}
