import React from "react";
import DataTable from "react-data-table-component";
import ActionIcon from "../../Utility/ActionIcon";
import { DashboardTable } from "../../Utility/DashboardBox";

function DeliveryProcessTable() {
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
      width: '15%'
    },
    {
      name: "DESCRIPTION",
      cell: (row) => row.desp,
      width: '60%',
    },
    {
      name: "Action",
      cell: (row) => <ActionIcon edit Uniquekey={row.id} />,
      width: '15%'
    },
  ];

  const delivery_process_data = [
    {
      id: "1",
      sl: "1",
      process: "Pending",
      desp: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College.	",
    },
    {
      id: "2",
      sl: "2",
      process: "Processing",
      desp: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College.	",
    },
    {
      id: "3",
      sl: "3",
      process: "Shipped",
      desp: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College.	",
    },
    {
      id: "4",
      sl: "4",
      process: "Recieved",
      desp: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,	",
    },
    {
      id: "5",
      sl: "5",
      process: "Delivered",
      desp: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,",
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

export default DeliveryProcessTable;
