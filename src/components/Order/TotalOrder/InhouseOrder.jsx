import React from "react";
import DataTable from "react-data-table-component";
import ActionIcon from "../../Utility/ActionIcon";
import CustomButton from "../../Utility/Button";
import { DashboardTable } from "../../Utility/DashboardBox";
import SearchBox from "../../Utility/SearchBox";

function InhouseOrder({ name }) {
  const PendingOrder_columns = [
    {
      name: "SL",
      selector: (row) => row.Seq,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.date,
    },
    {
      name: "Order ID",
      selector: (row) => row.order_id,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Total Product QTY",
      selector: (row) => row.product_quantity,
    },
    {
      name: "Total Amount",
      selector: (row) => row.amount,
    },
    {
      name: "Order Status",
      button: true,
      width: "10%",
      cell: () => <CustomButton redBtn btnName="Pending" />,
    },
    {
      name: "Is Paid",
      button: true,
      width: "10%",
      cell: () => <CustomButton redBtn btnName="Pending" />,
    },
    {
      name: "Action",
      cell: (row) => <ActionIcon detail detailpath='/Order/Sale-Detail' Uniquekey={row.id} />,
    },
  ];
  const PendingOrder_data = [];

  return (
    <DashboardTable className="mt-4">
      <div className="d-flex gap-3 justify-content-between mb-4">
        <h5 className="blue-1 m-0">{name}</h5>
        <SearchBox extraClass='bg-white' />
      </div>
      <DataTable
        paginationPerPage={100}
        columns={PendingOrder_columns}
        data={PendingOrder_data}
        pagination
        noDataComponent="No data available in table"
      />
    </DashboardTable>
  );
}

export default InhouseOrder;
