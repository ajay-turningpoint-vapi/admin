import React from "react";
import DataTable from "react-data-table-component";
import Select from "react-select";
import { images } from "../Images/Images";
import ActionIcon from "../Utility/ActionIcon";
import CustomButton from "../Utility/Button";
import { DashboardBox, DashboardTable } from "../Utility/DashboardBox";
import FileUpload from "../Utility/FileUpload";
import SearchBox from "../Utility/SearchBox";

function BlogCategory() {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const blog_category_columns = [
    {
      name: "SL",
      selector: (row) => row.Num,
      sortable: true,
    },
    {
      name: "IMAGE",
      cell: (row) => (
        <img height="84px" width="56px" alt={row.category} src={row.img} />
      ),
    },
    {
      name: "Category",
      selector: (row) => row.category,
    },
    {
      name: "Action",
      cell: (row) => (
        <ActionIcon remove edit Uniquekey={row.id} />
      ),
    },
  ];

  const blog_category_data = [
    {
      id: "1",
      Num: "1",
      category: "Nails",
      img: `${images.brand}`,
    },
    {
      id: "2",
      Num: "2",
      category: "Eyes",
      img: `${images.brand}`,
    },
    {
      id: "3",
      Num: "3",
      category: "Face",
      img: `${images.brand}`,
    },
    {
      id: "4",
      Num: "4",
      category: "Lips",
      img: `${images.brand}`,
    },
    {
      id: "5",
      Num: "5",
      category: "Nail polish",
      img: `${images.brand}`,
    },
    {
      id: "6",
      Num: "6",
      category: "Perfect Finish box(Nail P...",
      img: `${images.brand}`,
    },
    {
      id: "7",
      Num: "7",
      category: "Foundation",
      img: `${images.brand}`,
    },
    {
      id: "8",
      Num: "8",
      category: "LIQUID SINDOOR",
      img: `${images.brand}`,
    },
    {
      id: "9",
      Num: "9",
      category: "BEAUTY POP BOX LIP COLOR",
      img: `${images.brand}`,
    },
    {
      id: "10",
      Num: "10",
      category: "LIPSTIC A & B",
      img: `${images.brand}`,
    },
  ];

  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12 col-md-4">
              <h5 className="blue-1 mb-4">Add Blog Category</h5>
              <DashboardBox>
                <form action="#" className="form row">
                  <div className="col-12 mb-3">
                    <label className="blue-1 fs-12">
                      CATEGORY NAME<span className="red">*</span>
                    </label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-12 mb-3">
                    <label className="blue-1 fs-12">
                      SELECT PARENT CATEGORY <span className="red">*</span>
                    </label>
                    <Select options={options} />
                  </div>
                  <div className="col-12 mb-3">
                    <label className="blue-1 fs-12">Image</label>
                    <FileUpload />
                  </div>
                  <div className="col-12">
                    <CustomButton
                      isBtn
                      iconName="fa-solid fa-check"
                      btnName="ADD"
                    />
                  </div>
                </form>
              </DashboardBox>
            </div>
            <div className="col-12 col-md-8">
              <div className="d-flex justify-content-between mb-2 align-items-center">
                <h5 className="blue-1 m-0">Category List</h5>
                <SearchBox extraClass='bg-white' />
              </div>
              <DashboardTable>
                <DataTable
                  paginationPerPage={100}
                  columns={blog_category_columns}
                  data={blog_category_data}
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

export default BlogCategory;
