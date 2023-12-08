import React from "react";
import DataTable from "react-data-table-component";
import ActionIcon from "../../Utility/ActionIcon";
import CustomButton from "../../Utility/Button";
import SearchBox from "../../Utility/SearchBox";
import { DashboardTable } from "../../Utility/DashboardBox";

function PendingPaymentOrder({ name }) {
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
      width: '10%',
      cell: () => (
        <CustomButton redBtn btnName="Pending" />
      ),
    },
    {
      name: "Is Paid",
      button: true,
      width: '10%',
      cell: () => (
        <CustomButton redBtn btnName="Pending" />
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <ActionIcon detail detailpath='/Order/Sale-Detail' Uniquekey={row.id} />
      ),
    },
  ];
  const PendingOrder_data = [
    {
      id: "1",
      Seq: "1",
      date: "	17th Jun, 2022",
      order_id: "27220617041151	",
      email: "devesh.batra@ebslon.com",
      product_quantity: "6",
      amount: "4,232.00",
    },
    {
      id: "2",
      Seq: "2",
      date: "	17th Jun, 2022",
      order_id: "27220617041151	",
      email: "devesh.batra@ebslon.com",
      product_quantity: "6",
      amount: "4,232.00",
    },
  ];

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
      />
    </DashboardTable>
  );
}

export default PendingPaymentOrder;
