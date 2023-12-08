import { Switch } from "@mui/material";
import React from "react";
import DataTable from "react-data-table-component";
import ActionIcon from "../Utility/ActionIcon";
import CustomButton from "../Utility/Button";
import { DashboardTable } from "../Utility/DashboardBox";
import SearchBox from "../Utility/SearchBox";

function Menus() {
  const brand_columns = [
    {
      name: "ID",
      selector: (row) => row.Seq,
      sortable: true,
      width: "20%",
    },
    {
      name: "Name",
      selector: (row) => row.Name,
      width: "20%",
    },
    {
      name: "Status",
      button: true,
      cell: () => <Switch />,
      width: "20%",
    },
    {
      name: "Created",
      width: "20%",
      selector: (row) => row.created,
    },
    {
      name: "Action",
      width: "20%",
      cell: (row) => (
        <ActionIcon
          remove
          edit
          disable
          Uniquekey={row.id}
          editPath="/Menus/Menus-Edit"
        />
      ),
    },
  ];

  const brand_data = [
    {
      id: "1",
      Seq: "1",
      Name: "Header Menu",
      created: "28 Mar 2022",
    },
    {
      id: "2",
      Seq: "2",
      Name: "Footer Menu",
      created: "28 Mar 2022",
    },
  ];

  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="blue-1 m-0">Menus</h5>
                <div className="d-flex align-items-center gap-3">

                  <CustomButton
                    isLink
                    iconName="fa-solid fa-plus"
                    btnName="Create Menu"
                    path="/Menus/Menus-Create"
                    small
                    roundedPill
                  />
                  <SearchBox extraClass="bg-white" />
                </div>
              </div>
              <DashboardTable>
                <DataTable
                  paginationPerPage={100}
                  columns={brand_columns}
                  data={brand_data}
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

export default Menus;
