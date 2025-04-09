import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Switch } from "@mui/material";
import { images } from "../Images/Images";
import ActionIcon from "../Utility/ActionIcon";
import CustomButton from "../Utility/Button";
import { DashboardTable } from "../Utility/DashboardBox";
import { AddModal } from "../Utility/Modal";
import { useSelector, useDispatch } from "react-redux";
import {
  PRODUCTDelete,
  PRODUCTGet,
  SetPRODUCTObj,
} from "../../redux/actions/Product/Product.actions";
import { generateFilePath } from "../Utility/utils";
function ProductList() {
  const dispatch = useDispatch();
  const productArr = useSelector((state) => state.product.products);
 const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(productArr);

  useEffect(() => {
    dispatch(PRODUCTGet());
  }, [dispatch]);

  useEffect(() => {
    setFilteredProducts(
      productArr?.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, productArr]);

  const handleEdit = (row) => {
    dispatch(SetPRODUCTObj(row));
  };

  const handleDeleteById = (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (isConfirmed) {
      dispatch(PRODUCTDelete(id));
    }
  };

  const [ModalType, setModalType] = useState("");
  const [ModalName, setModalName] = useState("");
  const [ModalBox, setModalBox] = useState(false);

  const product_sale_columns = [
    {
      name: "Sr. No.",
      cell: (row, index) => <p>{index + 1 + currentPage * 10}</p>,
      sortable: true,
      width: "7%",
    },
    {
      name: "Name",
      cell: (row) => <p>{row.name}</p>,
      width: "20%",
    },
    {
      name: "Brand",
      sortable: true,
      selector: (row) => row.brand,
      width: "12%",
    },
    {
      name: "Company",
      sortable: true,
      selector: (row) => row.company,
      width: "12%",
    },
    {
      name: "Sale Price",
      sortable: true,
      selector: (row) => row.salePrice,
      width: "15%",
    },
    {
      name: "Commision Allowed(%)",
      sortable: true,
      selector: (row) => row.commisionAllowed,
      width: "15%",
    },
    {
      name: "Action",
      width: "15%",
      cell: (row) => (
        <>
          <ActionIcon
            Uniquekey={row.id}
            remove
            edit
            deletePath="/Product-list"
            onDeleteClick={() => handleDeleteById(row._id)}
            isRedirected={true}
            onEditClick={() => handleEdit(row)}
            editPath="/Product/AddProduct"
          />
          <AddModal
            ModalBox={ModalBox}
            setModalBox={setModalBox}
            name={ModalName}
            ModalType={ModalType}
          />
        </>
      ),
    },
  ];

  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h5 className="blue-1">Coupon Product List</h5>
                <div className="d-flex align-items-center">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ marginRight: "10px" }}
                  />
                  <CustomButton
                    isLink
                    iconName="fa-solid fa-plus"
                    btnName="ADD NEW PRODUCT"
                    path="/Product/AddProduct"
                  />
                </div>
              </div>

              <DashboardTable>
                <DataTable
                  columns={product_sale_columns}
                  data={
                    filteredProducts && filteredProducts.length > 0
                      ? filteredProducts
                      : []
                  }
                  pagination
                  onChangePage={(page) => setCurrentPage(page - 1)}
                  paginationRowsPerPageOptions={[10]}
                />
              </DashboardTable>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProductList;
