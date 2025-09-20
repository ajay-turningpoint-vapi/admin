import React, { useEffect, useState } from "react";
import { getAllContractors } from "../../services/users.service";
import DataTable from "react-data-table-component";
import CustomButton from "../Utility/Button";
import CarpenterModal from "../Utility/CarpenterModal";
import { Chip } from "@material-ui/core";
import { useLocation, useNavigate } from "react-router-dom";


export default function Contractors() {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get("page")) || 1;
  const initialPerPage = parseInt(queryParams.get("limit")) || 10;
  const initialSearch = queryParams.get("search") || "";

  const [contractors, setContractors] = useState([]);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [debouncedSearch, setDebouncedSearch] = useState(initialSearch);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(initialPerPage);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = parseInt(params.get("page")) || 1;
    const limit = parseInt(params.get("limit")) || 10;
    const search = params.get("search") || "";

    setCurrentPage(page);
    setPerPage(limit);
    setSearchTerm(search);
    setDebouncedSearch(search);
  }, [location.search]);
  
  // Update URL whenever page/perPage/search changes
  useEffect(() => {
    const params = new URLSearchParams();
    params.set("page", currentPage);
    params.set("limit", perPage);
    if (debouncedSearch) params.set("search", debouncedSearch);

    navigate({ search: params.toString() });
  }, [currentPage, perPage, debouncedSearch, navigate]);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1); // reset to first page when searching
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Fetch contractors
  const fetchContractors = async (page = 1, limit = perPage, search = debouncedSearch) => {
    setLoading(true);
    try {
      const response = await getAllContractors({ page, limit, search });
      setContractors(response.data.contractors);
      setTotalRows(response.data.totalContractors);
    } catch (error) {
      console.error("Error fetching contractors:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when state changes
  useEffect(() => {
    fetchContractors(currentPage, perPage, debouncedSearch);
  }, [currentPage, perPage, debouncedSearch]);

  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handlePageChange = (page) => setCurrentPage(page);
  const handlePerRowsChange = (newPerPage, page) => {
    setPerPage(newPerPage);
    setCurrentPage(page);
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const columns = [
    {
      name: "ID",
      cell: (row, index) => <p>{index + 1 + (currentPage - 1) * perPage}</p>,
      sortable: true,
      width: "10%",
    },
    { name: "NAME", sortable: true, cell: (row) => <p>{row.name}</p>, width: "22%" },
    { name: "Business Name", sortable: true, cell: (row) => <p>{row.businessName}</p>, width: "22%" },
    { name: "Phone", sortable: true, cell: (row) => <p>{row.phone}</p>, width: "18%" },
    {
      name: "Points",
      sortable: true,
      cell: (row, index) => {
        const isTop50 = index + (currentPage - 1) * perPage < 50;
        return isTop50 ? (
          <Chip
            label={row.points}
            style={{ fontWeight: "bold", backgroundColor: "#228B22", color: "white" }}
          />
        ) : (
          <p>{row.points}</p>
        );
      },
      width: "10%",
    },
    {
      name: "Action",
      width: "28%",
      cell: (row) => isModalOpen && <CarpenterModal handleClose={toggleModal} data={row.phone} />,
    },
  ];

  return (
    <div className="dashboard-table dashboard-box" style={{ maxWidth: "1200px", marginLeft: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignContent: "center" }}>
        <ul className="nav nav-pills dashboard-pills justify-content-start" style={{ marginBottom: "20px" }}>
          <li>
            <CustomButton navPills btnName={"All Contractors"} pillActive={true} />
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

      <DataTable
        columns={columns}
        data={contractors}
        progressPending={loading}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        paginationDefaultPage={currentPage} // important for syncing
      />
    </div>
  );
}