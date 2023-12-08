import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Switch } from "@mui/material";
import { images } from "../Images/Images";
import ActionIcon from "../Utility/ActionIcon";
import CustomButton from "../Utility/Button";
import { DashboardTable } from "../Utility/DashboardBox";
import { AddModal } from "../Utility/Modal";
import { useSelector, useDispatch } from "react-redux";
import { PRODUCTDelete, PRODUCTGet, SetPRODUCTObj } from "../../redux/actions/Product/Product.actions";
import { generateFilePath } from "../Utility/utils";
function ProductList() {
  const dispatch = useDispatch();

  const productArr = useSelector((state) => state.product.products);

  useEffect(() => {
    dispatch(PRODUCTGet());
  }, []);

  const handleEdit = (row) => {
    dispatch(SetPRODUCTObj(row));
  };

  const handleDeleteById = (id) => {
    dispatch(PRODUCTDelete(id));
  };

  const [ModalType, setModalType] = useState("");
  const [ModalName, setModalName] = useState("");
  const [ModalBox, setModalBox] = useState(false);

  const product_sale_columns = [
    {
      name: "SL",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "15%",
    },
    {
      name: "Name",
      cell: (row) => <p>{row.name}</p>,
      width: "20%",
    },
    {
      name: "Brand",
      selector: (row) => row.brand,
      width: "25%",
    },
    {
      name: "Company",
      selector: (row) => row.company,
      width: "25%",
    },
    // {
    //   name: "Image",
    //   grow: 0,
    //   cell: (row) => <img height="84px" width="56px" alt={row.Name} src={generateFilePath(row.productImage)} />,
    //   width: "15%",
    // },
    // {
    //   name: "Stock",
    //   grow: 0,
    //   selector: (row) => row.stock,
    //   width: "10%",
    // },
    // {
    //   name: "Status",
    //   button: true,
    //   cell: () => <Switch />,
    //   width: "10%",
    // },
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
          // detail
          // detailClick={(e) => {
          //   e.preventDefault();
          //   setModalBox(true);
          //   setModalType("show-product");
          //   setModalName(row.Name);
          // }}
          />

          <AddModal ModalBox={ModalBox} setModalBox={setModalBox} name={ModalName} ModalType={ModalType} />
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
                <h5 className="blue-1">Product List</h5>
                <CustomButton isLink iconName="fa-solid fa-plus" btnName="ADD NEW PRODUCT" path="/Product/AddProduct" />
              </div>
              <DashboardTable>
                <DataTable columns={product_sale_columns} data={productArr && productArr.length > 0 ? productArr : []} pagination />
              </DashboardTable>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProductList;
