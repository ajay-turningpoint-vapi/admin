import React from "react";
import DataTable from "react-data-table-component";
import ActionIcon from "../../Utility/ActionIcon";
import CustomButton from "../../Utility/Button";
import { DashboardBox, DashboardTable } from "../../Utility/DashboardBox";
import SearchBox from "../../Utility/SearchBox";

function Tags() {
  const tag_columns = [
    {
      name: "ID",
      selector: (row) => row.sl,
      sortable: true,
    },
    {
      name: "NAME",
      selector: (row) => row.Name,
    },
    {
      name: "Action",
      minWidth: "210px",
      maxWidth: "211px",
      cell: (row) => <ActionIcon Uniquekey={row.id} remove edit />,
    },
  ];

  const tag_data = [
    {
      id: "1",
      sl: "1",
      Name: "Nails",
    },
    {
      id: "2",
      sl: "2",
      Name: "Eyes",
    },
    {
      id: "3",
      sl: "3",
      Name: "Face",
    },
    {
      id: "4",
      sl: "4",
      Name: "Lips",
    },
    {
      id: "5",
      sl: "5",
      Name: "Nail polish",
    },
    {
      id: "6",
      sl: "6",
      Name: "Perfect Finish box(Nail P...",
    },
    {
      id: "7",
      sl: "7",
      Name: "Foundation",
    },
    {
      id: "8",
      sl: "8",
      Name: "LIQUID SINDOOR",
    },
    {
      id: "9",
      sl: "9",
      Name: "BEAUTY POP BOX LIP COLOR",
    },
    {
      id: "10",
      sl: "10",
      Name: "LIPSTIC A & B",
    },
  ];

  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12 col-md-4">
              <h5 className="blue-1 mb-4">Add Tag</h5>
              <DashboardBox>
                <form action="#" className="form row">
                  <div className="col-12">
                    <label className="blue-1 fs-12">
                      Name <span className="red">*</span>
                    </label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-12 mt-2">
                    <CustomButton
                      isBtn
                      iconName="fa-solid fa-check"
                      btnName="Save"
                    />
                  </div>
                </form>
              </DashboardBox>
            </div>
            <div className="col-12 col-md-8">
              <div className="d-flex gap-3 justify-content-between mb-3 align-items-center">
                <h5 className="blue-1 m-0">Tags List</h5>
                <SearchBox extraClass="bg-white" />
              </div>
              <DashboardTable>
                <DataTable columns={tag_columns} data={tag_data} pagination />
              </DashboardTable>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Tags;
