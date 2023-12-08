import React from "react";
import DataTable from "react-data-table-component";
import ActionIcon from "../Utility/ActionIcon";
import { DashboardTable } from "../Utility/DashboardBox";

function ContactMail() {
  // ======================================================================================
  const mail_columns = [
    {
      name: "SL",
      selector: (row) => row.Seq,
      sortable: true,
      width: '10%'
    },
    {
      name: "NAME",
      selector: (row) => row.Name,
      width: '20%'
    },
    {
      name: "EMAIL",
      selector: (row) => row.email,
      width: '20%'
    },
    {
      name: "MESSAGE",
      cell: (row) => row.msg,
      width: '35%'
    },
    {
      name: "Action",
      cell: (row) => <ActionIcon remove detail detailpath='/Contact-Info' Uniquekey={row.id} />,
      width: '15%'
    },
  ];

  const mail_data = [
    {
      id: "1",
      Seq: "1",
      Name: "Rahul",
      email: "rahul@gmail.com",
      msg: "Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum",
    },
    {
      id: "2",
      Seq: "2",
      Name: "Rahul",
      email: "rahul@gmail.com",
      msg: "Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum",
    },
    {
      id: "3",
      Seq: "3",
      Name: "Rahul",
      email: "rahul@gmail.com",
      msg: "Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum",
    },
    {
      id: "4",
      Seq: "4",
      Name: "Rahul",
      email: "rahul@gmail.com",
      msg: "Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum",
    },
    {
      id: "5",
      Seq: "5",
      Name: "Rahul",
      email: "rahul@gmail.com",
      msg: "Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum",
    },
  ];
  // ======================================================================================

  return (
    <main>
      <section className="product-category" style={{ minHeight: "75vh" }}>
        <div className="container-fluid p-0">
          <h5 className="blue-1 mb-4">Contact Mail List</h5>
          <DashboardTable>
            <DataTable
              paginationPerPage={100}
              columns={mail_columns} data={mail_data} pagination />
          </DashboardTable>
        </div>
      </section>
    </main>
  );
}

export default ContactMail;
