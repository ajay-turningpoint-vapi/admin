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
import { Pagination } from "@mui/material";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import Loader from "../Utility/Loader.jsx";
function Coupons() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const couponArr = useSelector((state) => state.coupon.coupons);
  const couponArrTotalPages = useSelector((state) => state.coupon.totalPages);
  const productArr = useSelector((state) => state.product.products);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [pageLimit, setPageLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [usedCoupon, setUsedCoupon] = useState("All");
  const [productId, setproductId] = useState("");
  const [filterType, setFilterType] = useState("");

  const handleGetAllCoupons = () => {
    setLoading(true);
    let query = "";
    if (page) query += `&page=${page}`;
    if (pageLimit) query += `&limit=${pageLimit}`;
    if (usedCoupon) query += `&couponUsed=${usedCoupon}`;
    if (productId) query += `&productId=${productId}`;
    if (searchQuery) query += `&search=${searchQuery}`;
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
      dispatch(COUPONGetActive(query, navigate));
    }
  };

  const handlePageChange = (event, value) => {
    setLoading(true);
    setPage(value);
  };

  useEffect(() => {
    handleGetAllCoupons();
    dispatch(PRODUCTGet());
  }, [page]);

  useEffect(() => {
    if (filterType !== "activeCoupons" && filterType !== "productName") {
      handleGetAllCoupons();
    }
  }, [usedCoupon, productId, filterType, searchQuery]);

  const handleEdit = (row) => {
    dispatch(SetCOUPONObj(row));
  };

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
      width: "15%",
    },
    {
      name: "Coupon Value",
      cell: (row) =>
        row?.productObj ? <p>{row?.value}</p> : <p>No Product</p>,
      width: "10%",
    },
    {
      name: "Product",
      cell: (row) =>
        row?.productObj ? <p>{row.productObj?.name}</p> : <p>No Product</p>,
      width: "15%",
    },
    {
      name: "Coupon",
      width: "20%",
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
      name: "Created At",
      cell: (row) => <p>{new Date(row.createdAt).toDateString()}</p>,
      width: "15%",
    },
    {
      name: "ScannedBy",
      cell: (row) =>
        row?.scannedUserName ? (
          <p>{row.scannedUserName}</p>
        ) : (
          <p>Not Scanned</p>
        ),
      width: "15%",
    },
  ];

  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="blue-1 m-0">Coupon List</h5>
                <div className="d-flex align-items-center gap-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <label>Coupons</label>
                  <select
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
                    className="form-control"
                    value={filterType}
                    onChange={handleFilterChange}
                  >
                    <option value="">Please Select</option>
                    <option value="activeCoupons" style={{ fontWeight: "500" }}>
                      View Active Coupons
                    </option>
                    <option value="productName">Select Product</option>
                  </select>

                  {filterType === "productName" && (
                    <select
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

                  <CustomButton
                    isLink
                    iconName="fa-solid fa-plus"
                    btnName="ADD NEW Coupon"
                    path="/Coupon/Coupon-Create"
                    small
                    roundedPill
                  />
                </div>
              </div>
              {loading ? (
                <Loader />
              ) : (
                <DashboardTable>
                  <DataTable
                    columns={brand_columns}
                    data={couponArr && couponArr?.length > 0 ? couponArr : []}
                  />
                  <div className="d-flex align-items-center justify-content-between mt-4">
                    <h5 className="blue-1 m-0"></h5>
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
