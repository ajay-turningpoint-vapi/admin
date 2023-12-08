import React from "react";
import DataTable from "react-data-table-component";
import ActionIcon from "../../Utility/ActionIcon";
import { DashboardTable } from "../../Utility/DashboardBox";

function CancleReasonTable() {
  const delivery_process_columns = [
    {
      name: "ID",
      selector: (row) => row.sl,
      sortable: true,
      width: '10%'
    },
    {
      name: "PROCESS",
      selector: (row) => row.process,
      width: '20%'
    },
    {
      name: "DESCRIPTION",
      cell: (row) => row.desp,
      width: '50%',
    },
    {
      name: "Action",
      cell: (row) => <ActionIcon edit remove Uniquekey={row.id} />,
      width: '20%'
    },
  ];

  const delivery_process_data = [
    {
      id: "1",
      sl: "1",
      process: "Personal issue",
      desp: "I have some personal issue.",
    },
    {
      id: "2",
      sl: "2",
      process: "High price",
      desp: "Product price is very high.",
    },
    {
      id: "3",
      sl: "3",
      process: "Delivery date change",
      desp: "I want to cancel my order for changing delivery date.",
    },
    {
      id: "4",
      sl: "4",
      process: "Delivery place change",
      desp: "I want to cancel my order for changing delivery place.",
    },
  ];

  return (
    <DashboardTable>
      <DataTable
        paginationPerPage={100}
        columns={delivery_process_columns}
        data={delivery_process_data}
        pagination
      />
    </DashboardTable>
  );
}

export default CancleReasonTable;
