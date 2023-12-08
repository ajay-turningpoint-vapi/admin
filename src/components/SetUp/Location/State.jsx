import { Switch } from "@mui/material";
import React from "react";
import DataTable from "react-data-table-component";
import Select from "react-select";
import ActionIcon from "../../Utility/ActionIcon";
import CustomButton from "../../Utility/Button";
import { DashboardBox, DashboardTable } from "../../Utility/DashboardBox";
import SearchBox from "../../Utility/SearchBox";

function State() {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const state_columns = [
    {
      name: "SL",
      selector: (row) => row.sl,
      sortable: true,
      width:'20%',
    },
    {
      name: "NAME",
      selector: (row) => row.Name,
      width:'20%',
    },
    {
      name: "Country",
      selector: (row) => row.country,
      width:'20%',
    },
    {
      name: "Status",
      button: true,
      cell: (row) => <Switch />,
      width:'20%',
    },
    {
      name: "Action",
      cell: (row) => <ActionIcon Uniquekey={row.id} remove edit />,
      width:'20%',
    },
  ];

  const state_data = [
    {
      id: "1",
      sl: "1",
      Name: "Montebello Vicentino",
      country: "Italy",
    },
  ];

  return (
    <div className="row">
      <div className="col-12 col-md-4">
        <DashboardBox>
          <h5 className="blue-1 mb-4">Add State</h5>
          <form action="#" className="form row">
            <div className="col-12">
              <label>
                Name <span className="red">*</span>
              </label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-12">
              <label>COUNTRY LIST</label>
              <Select options={options} />
            </div>
            <div className="col-12">
              <label>Status</label>
              <div className="d-flex">
                <div className="form-check form-check-inline d-flex align-items-center">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="category-status"
                    value="option1"
                    id="category-Radio1"
                  />
                  <label
                    className="form-check-label fs-14"
                    htmlFor="category-Radio1"
                  >
                    Active
                  </label>
                </div>
                <div className="form-check form-check-inline d-flex align-items-center">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="category-status"
                    value="option2"
                    id="category-Radio2"
                  />
                  <label
                    className="form-check-label fs-14"
                    htmlFor="category-Radio2"
                  >
                    Inactive
                  </label>
                </div>
              </div>
            </div>
            <div className="col-12 mt-2">
              <CustomButton isBtn iconName="fa-solid fa-check" btnName="Save" />
            </div>
          </form>
        </DashboardBox>
      </div>
      <div className="col-12 col-md-8">
        <DashboardTable>
          <div className="d-flex gap-3 justify-content-between mb-4 align-items-center">
            <h5 className="blue-1 m-0">State List</h5>
            <SearchBox extraClass="bg-white" />
          </div>
          <DataTable columns={state_columns} data={state_data} pagination />
        </DashboardTable>
      </div>
    </div>
  );
}

export default State;
