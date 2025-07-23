import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  COUPONDelete,
  COUPONGet,
  COUPONGetActive,
  SetCOUPONObj,
} from "../../redux/actions/Coupon/Coupon.actions";
import { PRODUCTGet } from "../../redux/actions/Product/Product.actions";
import DownloadIcon from "@mui/icons-material/Download";
import {
  downloadCouponsExcel,
  downloadCouponsLink,
} from "../../services/Coupons.service";
import ActionIcon from "../Utility/ActionIcon";
import CustomButton from "../Utility/Button";
import { DashboardTable } from "../Utility/DashboardBox";
import SearchBox from "../Utility/SearchBox";
import { toastError } from "../Utility/ToastUtils";
import { generateFilePath, generateQrFilePath } from "../Utility/utils";
import { Button, Pagination } from "@mui/material";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import Loader from "../Utility/Loader.jsx";
import { url } from "../../services/url.service.js";


const downloadPdf = async (queryObj) => {
  console.log("Downloading PDF with query:", queryObj); // Should show %20 not +

  try {
    const response = await fetch(
      `${url}/coupon/active-coupons/pdf?${queryObj}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", "active_coupons.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      throw new Error("Failed to download PDF");
    }
  } catch (error) {
    console.error("Download failed:", error);
  }
};

function Coupons() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const couponArr = useSelector((state) => state.coupon.coupons);
  const couponArrTotalPages = useSelector((state) => state.coupon.totalPages);
  const couponArrCount = useSelector((state) => state.coupon.couponsCount);
  const productArr = useSelector((state) => state.product.products);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [pageLimit, setPageLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [usedCoupon, setUsedCoupon] = useState("All");
  const [productId, setproductId] = useState("");
  const [filterType, setFilterType] = useState("");
  const [searchText, setSearchText] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  // const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const handleoptionSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearch = () => {
    if (!searchText.trim()) {
      alert("Please enter a name to search!");
      return;
    }
    console.log("Searching for:", searchText);

    let query = `name=${searchText}`;

    dispatch(COUPONGetActive(query, navigate));

    // Call your API or filtering function here
  };

  const handleGetAllCoupons = () => {
    setLoading(true);
    let query = "";
    if (page) query += `&page=${page}`;
    if (pageLimit) query += `&limit=${pageLimit}`;
    if (usedCoupon) query += `&couponUsed=${usedCoupon}`;
    if (productId) query += `&productId=${productId}`;
    if (searchQuery) query += `&search=${searchQuery}`;
    if (startDate) query += `&startDate=${startDate}`;
    if (endDate) query += `&endDate=${endDate}`;
    // if (sortBy) query += `&sortBy=${sortBy}`;
    if (sortOrder) query += `&sortOrder=${sortOrder}`;
    dispatch(COUPONGet(query)).then(() => setLoading(false));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    const selectedOption = e.target.value;
    setFilterType(selectedOption);
    setproductId("");

    if (selectedOption === "activeCoupons") {
      let query = "";
      dispatch(COUPONGetActive(query, navigate));
    }
  };

  const handleProductChange = (e) => {
    const selectedProductId = e.target.value;
    setproductId(selectedProductId);

    const selectedProduct = productArr.find(
      (product) => product._id === selectedProductId
    );
    if (selectedProduct) {
      let query = "";
      if (selectedProduct.name) query += `productName=${selectedProduct.name}`;
      downloadPdf(query);
    }
  };

  const handlePageChange = (event, value) => {
    setLoading(true);
    setPage(value);
  };

  useEffect(() => {
    handleGetAllCoupons();
    dispatch(PRODUCTGet());
  }, [page, endDate, sortOrder]);

  useEffect(() => {
    if (filterType !== "productName") {
      handleGetAllCoupons();
    }
  }, [usedCoupon, productId, filterType, searchQuery]);

  const handleEdit = (row) => {
    dispatch(SetCOUPONObj(row));
  };

  const handleStartDateChange = (e) => setStartDate(e.target.value);
  const handleEndDateChange = (e) => setEndDate(e.target.value);

  const brand_columns = [
    {
      name: "ID",
      selector: (row, index) => (page - 1) * pageLimit + index + 1,
      sortable: true,
      width: "7%",
    },
    {
      name: "Name",
      cell: (row) => <p>{row.name}</p>,
      width: "12%",
    },
    {
      name: "Coupon Value",
      sortable: true,
      selector: "value",
      cell: (row) =>
        row?.productObj ? <p>{row?.value}</p> : <p>No Product</p>,
      width: "10%",
    },
    {
      name: "Product",
      sortable: true,
      cell: (row) =>
        row?.productObj ? <p>{row.productObj?.name}</p> : <p>No Product</p>,
      width: "20%",
    },
    {
      name: "Coupon",
      sortable: true,
      width: "10%",
      selector: (row) =>
        row.maximumNoOfUsersAllowed === 0 ? (
          <span className="badge bg-danger p-2">
            {row.maximumNoOfUsersAllowed} (Used)
          </span>
        ) : (
          <span className="badge bg-success p-2">(Not Used)</span>
        ),
    },
    {
      name: "Coupon Created At",
      sortable: true,
      cell: (row) => <p>{new Date(row.createdAt).toDateString()}</p>,
      width: "15%",
    },
    {
      name: "ScannedBy",
      sortable: true,
      cell: (row) =>
        row?.carpenterId ? <p>{row.carpenterId?.name}</p> : <p>Not Scanned</p>,
      width: "15%",
    },

    {
      name: "Scanned On",
      sortable: true,
      cell: (row) => (
        <p className={row?.carpenterId?.name ? "badge bg-danger" : ""}>
          {row?.carpenterId?.name
            ? new Date(row?.updatedAt).toDateString()
            : "Not Scanned"}
        </p>
      ),
      width: "15%",
    },
  ];

  const handleSort = (column, direction) => {
    console.log("Sorting by:", column.selector);
    // setSortBy(column.selector); // ✅ Fixed
    setSortOrder(direction); // ✅ Fixed
  };

  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
         
          <div className="row">
            <div className="col-12">
              <h5 className="blue-1 mb-2">Coupon List</h5>
              <div className="d-flex align-items-center gap-3 flex-wrap mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                  value={searchQuery}
                  style={{ width: "200px" }}
                  onChange={handleSearchChange}
                />
                <label>Coupons</label>
                <select
                  style={{ width: "200px" }}
                  className="form-control"
                  value={usedCoupon}
                  onChange={(e) => setUsedCoupon(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="0">Used</option>
                  <option value="1">Unused</option>
                </select>
                <label>Products</label>
                <select
                  style={{ width: "400px" }}
                  className="form-control"
                  value={productId}
                  onChange={(e) => setproductId(e.target.value)}
                >
                  <option>Please Select </option>
                  {productArr &&
                    productArr.map((product) => (
                      <option key={product._id} value={product._id}>
                        {product.name}
                      </option>
                    ))}
                </select>

                <label>Active_Coupons</label>
                <select
                  style={{ width: "250px" }}
                  className="form-control"
                  value={filterType}
                  onChange={handleFilterChange}
                >
                  <option value="">Please Select</option>
                  <option value="productName">Select Product</option>
                  <option value="search">Search by Name</option>
                </select>

                {filterType === "productName" && (
                  <select
                    style={{ width: "400px" }}
                    className="form-control"
                    value={productId}
                    onChange={handleProductChange}
                  >
                    <option>Please Select a Product</option>
                    {productArr &&
                      productArr.map((product) => (
                        <option key={product._id} value={product._id}>
                          {product.name}
                        </option>
                      ))}
                  </select>
                )}

                {filterType === "search" && (
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      marginTop: "10px",
                    }}
                  >
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter name to search"
                      value={searchText}
                      onChange={handleoptionSearchChange}
                    />
                    <button className="btn btn-primary" onClick={handleSearch}>
                      Search
                    </button>
                  </div>
                )}

                <input
                  className="form-control"
                  type={startDate ? "date" : "text"}
                  value={startDate}
                  style={{ width: "auto" }}
                  onChange={handleStartDateChange}
                  placeholder="Start Date"
                  onFocus={(e) => (e.target.type = "date")}
                />

                <input
                  className="form-control"
                  type={endDate ? "date" : "text"}
                  value={endDate}
                  style={{ width: "auto" }}
                  onChange={handleEndDateChange}
                  placeholder="End Date"
                  onFocus={(e) => (e.target.type = "date")}
                />

                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "black",
                    color: "white",
                    "&:hover": { backgroundColor: "#333" },
                  }}
                >
                  Total Coupons ({couponArrCount || 0})
                </Button>

                {/* <a
                  href={`${url}/coupon/exportCouponReport`}
                  download="coupon-report.xlsx"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    padding: "7px",
                    borderRadius: "20px",
                    fontSize: "11px",
                    width: "auto",
                  }}
                >
                  Excel Report
                </a> */}

                <Button
                  variant="contained"
                  component="a"
                  href={`${url}/coupon/exportCouponReport`}
                  download="coupon-report.xlsx"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    backgroundColor: "black",
                    color: "white",
                    "&:hover": { backgroundColor: "#333" },
                    borderRadius: "20px",
                    fontSize: "13px",
                    padding: "7px 16px", // similar padding to your original style
                    textTransform: "none", // optional: prevents all caps
                  }}
                >
                  <DownloadIcon sx={{ fontSize: 19, marginRight: 1 }} />
                  EXCEL REPORT
                </Button>

                <CustomButton
                  isLink
                  iconName="fa-solid fa-plus"
                  btnName="ADD NEW Coupon"
                  path="/Coupon/Coupon-Create"
                  small
                  roundedPill
                />
              </div>

              {loading ? (
                <Loader />
              ) : (
                <DashboardTable>
                  <DataTable
                    columns={brand_columns}
                    data={couponArr && couponArr.length > 0 ? couponArr : []}
                    onSort={handleSort}
                    sortServer
                    // defaultSortFieldId={sortBy} // ✅ Initial sorting field
                    defaultSortAsc={sortOrder === "asc"}
                  />
                  <div className="d-flex align-items-center justify-content-between mt-4">
                    {/* <h5 className="blue-1 m-0"></h5> */}
                    <Pagination
                      count={couponArrTotalPages}
                      onChange={handlePageChange}
                      page={page}
                      showFirstButton
                      showLastButton
                    />
                  </div>
                </DashboardTable>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Coupons;
