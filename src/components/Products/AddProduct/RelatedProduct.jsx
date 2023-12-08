
import React from "react";
import DataTable from "react-data-table-component";
import { images } from "../../Images/Images";
import ActionIcon from "../../Utility/ActionIcon";
import { DashboardTable } from "../../Utility/DashboardBox";

function RelatedProduct({ name }) {
  const Related_product_columns = [
    {
      name: "SL",
      selector: (row) => row.Seq,
      sortable: true,
    },
    {
      name: "NAME",
      selector: (row) => row.Name,
      sortable: true,
    },
    {
      name: "CREATED AT",
      selector: (row) => row.date,
    },
    {
      name: "BRAND",
      cell: (row) => (
        <img height="84px" width="56px" alt={row.Name} src={row.brand} />
      ),
    },
    {
      name: "THUMBNAIL",
      cell: (row) => (
        <img height="84px" width="56px" alt={row.Name} src={row.thumbnail} />
      ),
    },
    {
      name: "Action",
      cell: (row) => <ActionIcon remove edit disable Uniquekey={row.id} />,
    },
  ];
  const Related_product_data = [
    {
      id: "1",
      Seq: "1",
      date: "17th Jun, 2022",
      Name: "	SIGNATURE FOUNDATION",
      brand: `${images.brand}`,
      thumbnail: `${images.product}`,
    },
    {
      id: "2",
      Seq: "2",
      date: "17th Jun, 2022",
      Name: "	SIGNATURE FOUNDATION",
      brand: `${images.brand}`,
      thumbnail: `${images.product}`,
    },
    {
      id: "3",
      Seq: "4",
      date: "17th Jun, 2022",
      Name: "	SIGNATURE FOUNDATION",
      brand: `${images.brand}`,
      thumbnail: `${images.product}`,
    },
    {
      id: "4",
      Seq: "4",
      date: "17th Jun, 2022",
      Name: "	SIGNATURE FOUNDATION",
      brand: `${images.brand}`,
      thumbnail: `${images.product}`,
    },
    {
      id: "5",
      Seq: "5",
      date: "17th Jun, 2022",
      Name: "	SIGNATURE FOUNDATION",
      brand: `${images.brand}`,
      thumbnail: `${images.product}`,
    },
    {
      id: "6",
      Seq: "6",
      date: "17th Jun, 2022",
      Name: "	SIGNATURE FOUNDATION",
      brand: `${images.brand}`,
      thumbnail: `${images.product}`,
    },
    {
      id: "7",
      Seq: "7",
      date: "17th Jun, 2022",
      Name: "	SIGNATURE FOUNDATION",
      brand: `${images.brand}`,
      thumbnail: `${images.product}`,
    },
    {
      id: "8",
      Seq: "8",
      date: "17th Jun, 2022",
      Name: "	SIGNATURE FOUNDATION",
      brand: `${images.brand}`,
      thumbnail: `${images.product}`,
    },
    {
      id: "9",
      Seq: "9",
      date: "17th Jun, 2022",
      Name: "	SIGNATURE FOUNDATION",
      brand: `${images.brand}`,
      thumbnail: `${images.product}`,
    },
    {
      id: "10",
      Seq: "10",
      date: "17th Jun, 2022",
      Name: "	SIGNATURE FOUNDATION",
      brand: `${images.brand}`,
      thumbnail: `${images.product}`,
    },
  ];

  return (
    <DashboardTable className="mt-4">
      <h5 className="blue-1 mb-4">{name}</h5>
      <DataTable
        columns={Related_product_columns}
        data={Related_product_data}
        pagination
      />
    </DashboardTable>
  );
}

export default RelatedProduct;
