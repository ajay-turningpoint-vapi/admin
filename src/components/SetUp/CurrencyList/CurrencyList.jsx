import React from "react";
import DataTable from "react-data-table-component";
import { Switch } from "@mui/material";
import ActionIcon from "../../Utility/ActionIcon";
import CustomButton from "../../Utility/Button";
import { downloadCSV } from "../../Utility/CSV";
import SearchBox from "../../Utility/SearchBox";
import { DashboardTable } from "../../Utility/DashboardBox";

function CurrencyList() {
  const currency_columns = [
    {
      name: "ID",
      selector: (row) => row.Seq,
      width:'10%',
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.Name,
      width:'15%',
    },
    {
      name: "CODE",
      selector: (row) => row.code,
      width:'15%',
    },
    {
        name: "SYMBOL",
      selector: (row) => row.symbol,
      width:'10%',
    },
    {
        name: "ACTIVATE",
        button: true,
        cell: (row) => <Switch />,
        width:'15%',
    },
    {
      name: "CONVERT RATE 1 INR = ?",
      selector: (row) => row.convert,
      width:'15%',
    },
    {
      name: "Action",
      cell: (row) => <ActionIcon remove edit Uniquekey={row.id} />,
      width:'20%',
    },
  ];

  const currency_data = [
    {
      id: "1",
      Seq: "1",
      Name: "India",
      code: 'INR',
      symbol: "₹",convert:'0 ₹'
    },
    {
      id: "2",
      Seq: "2",
      Name: "India",
      code: 'INR',
      symbol: "₹",convert:'0 ₹'
    },
    {
      id: "3",
      Seq: "3",
      Name: "India",
      code: 'INR',
      symbol: "₹",convert:'0 ₹'
    },
  ];

  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="blue-1 m-0">Currency List</h5>
                <div className="d-flex align-items-center gap-3">
                  <CustomButton
                    isLink
                    iconName="fa-solid fa-plus"
                    btnName="ADD NEW CURRENCY"
                    path="/SetUp/Currency-Create"
                    small
                    roundedPill
                  />
                  <CustomButton
                    isLink
                    iconName="fa-solid fa-download"
                    btnName="CURRENCY CSV"
                    path="/"
                    small
                    roundedPill
                    downloadAble
                    ClickEvent={() => downloadCSV(currency_data)}
                  />
                 <SearchBox extraClass='bg-white' />
                </div>
              </div>
              <DashboardTable>
                <DataTable
                  columns={currency_columns}
                  data={currency_data}
                  pagination
                />
              </DashboardTable>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default CurrencyList;
