import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Switch } from "@mui/material";
import { images } from "../../Images/Images";
import ActionIcon from "../../Utility/ActionIcon";
import CustomButton from "../../Utility/Button";
import { downloadCSV } from "../../Utility/CSV";
import SearchBox from "../../Utility/SearchBox";
import { DashboardTable } from "../../Utility/DashboardBox";

import { useSelector, useDispatch } from "react-redux";
import { BrandDelete, BrandGet, SetBrandObj } from "../../../redux/actions/Brand/brand.actions";
import { generateFilePath } from "../../Utility/utils";
function Brand() {
  const dispatch = useDispatch();
  const brandArr = useSelector((state) => state.brand.brands);

  const handleInit = () => {
    dispatch(BrandGet());
  };

  const handleEdit = (row) => {
    dispatch(SetBrandObj(row));
  };

  const handleBrandDelete = (id) => {
    dispatch(BrandDelete(id));
  };
  useEffect(() => {
    handleInit();
  }, []);

  const brand_columns = [
    {
      name: "ID",
      cell: (row, index) => index + 1,
      sortable: false,
    },
    {
      name: "Name",
      selector: (row) => row?.name,
    },
    {
      name: "Logo",
      grow: 0,
      minWidth: "200px",
      maxWidth: "210px",
      cell: (row) => <img height="84px" width="56px" alt={row?.name} src={generateFilePath(row.imageUrl)} />,
    },
    {
      name: "Status",
      button: true,
      minWidth: "200px",
      maxWidth: "210px",
      cell: (row) => row.statusInfo,
    },
    {
      name: "Featured",
      button: true,
      minWidth: "200px",
      maxWidth: "210px",
      cell: (row) => <Switch defaultChecked={row.isFeatured} disabled />,
    },
    {
      name: "Action",
      minWidth: "200px",
      maxWidth: "210px",
      cell: (row) => <ActionIcon isRedirected={true} onEditClick={() => handleEdit(row)} editPath="/Product/Brand-Create" onDeleteClick={() => handleBrandDelete(row._id)} deletePath="/Product/Brand" remove edit Uniquekey={row._id} />,
    },
  ];

  const brand_data = [
    {
      id: "1",
      Seq: "1",
      Name: "Nails",
      img: `${images.brand}`,
      url: "/",
    },
    {
      id: "2",
      Seq: "2",
      Name: "Eyes",
      img: `${images.brand}`,
      url: "/",
    },
    {
      id: "3",
      Seq: "3",
      Name: "Face",
      img: `${images.brand}`,
      url: "/",
    },
    {
      id: "4",
      Seq: "4",
      Name: "Lips",
      img: `${images.brand}`,
      url: "/",
    },
    {
      id: "5",
      Seq: "5",
      Name: "Nail polish",
      img: `${images.brand}`,
      url: "/",
    },
    {
      id: "6",
      Seq: "6",
      Name: "Perfect Finish box(Nail P...",
      img: `${images.brand}`,
      url: "/",
    },
    {
      id: "7",
      Seq: "7",
      Name: "Foundation",
      img: `${images.brand}`,
      url: "/",
    },
    {
      id: "8",
      Seq: "8",
      Name: "LIQUID SINDOOR",
      img: `${images.brand}`,
      url: "/",
    },
    {
      id: "9",
      Seq: "9",
      Name: "BEAUTY POP BOX LIP COLOR",
      img: `${images.brand}`,
      url: "/",
    },
    {
      id: "10",
      Seq: "10",
      Name: "LIPSTIC A & B",
      img: `${images.brand}`,
      url: "/",
    },
  ];

  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="blue-1 m-0">Brand List</h5>
                <div className="d-flex align-items-center gap-3">
                  <CustomButton isLink iconName="fa-solid fa-plus" btnName="ADD NEW BRAND" path="/Product/Brand-Create" small roundedPill />
                  <CustomButton isLink iconName="fa-solid fa-plus" btnName="BULK BRAND UPLOAD" path="/Product/Bulk-Brand-Upload" small roundedPill />
                  <CustomButton isLink iconName="fa-solid fa-download" btnName="BRAND CSV" path="/" small roundedPill downloadAble ClickEvent={() => downloadCSV(brand_data)} />
                  <SearchBox extraClass="bg-white" />
                </div>
              </div>
              {brandArr && brandArr.length > 0 && (
                <DashboardTable>
                  <DataTable columns={brand_columns} data={brandArr} pagination />
                </DashboardTable>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Brand;
