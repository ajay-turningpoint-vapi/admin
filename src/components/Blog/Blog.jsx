import React from "react";
import DataTable from "react-data-table-component";
import { Switch } from "@mui/material";
import ActionIcon from "../Utility/ActionIcon";
import CustomButton from "../Utility/Button";
import SearchBox from "../Utility/SearchBox";
import { DashboardTable } from "../Utility/DashboardBox";

function Blog() {
  const blog_columns = [
    {
      name: "SL",
      selector: (row) => row.Seq,
      sortable: true,
      width: "5%",
    },
    {
      name: "Title",
      selector: (row) => row.title,
      width: "20%",
    },
    {
      name: "Author",
      selector: (row) => row.author,
      width: "20%",
    },
    {
      name: "Is Approved",
      grow: 0,
      cell: () => <Switch defaultChecked />,
      width: "10%",
    },
    {
      name: "Status",
      grow: 0,
      cell: () => <Switch defaultChecked />,
      width: "10%",
    },
    {
      name: "Published At",
      grow: 0,
      selector: (row) => row.published,
      width: "20%",
    },
    {
      name: "Action",
      cell: (row) => <ActionIcon remove edit detail detailpath='/Blog/View-Post' Uniquekey={row.id} />,
      width: "15%",
    },
  ];
  const blog_data = [
    {
      id: "1",
      Seq: "1",
      title: "Beauty Treatmen...",
      author: "Super Admin",
      published: "Fri, May 20, 2022 4:18 PM",
    },
    {
      id: "2",
      Seq: "2",
      title: "Beauty Treatmen...",
      author: "Super Admin",
      published: "Fri, May 20, 2022 4:18 PM",
    },
    {
      id: "3",
      Seq: "3",
      title: "Beauty Treatmen...",
      author: "Super Admin",
      published: "Fri, May 20, 2022 4:18 PM",
    },
    {
      id: "4",
      Seq: "4",
      title: "Beauty Treatmen...",
      author: "Super Admin",
      published: "Fri, May 20, 2022 4:18 PM",
    },
    {
      id: "5",
      Seq: "5",
      title: "Beauty Treatmen...",
      author: "Super Admin",
      published: "Fri, May 20, 2022 4:18 PM",
    },
    {
      id: "6",
      Seq: "6",
      title: "Beauty Treatmen...",
      author: "Super Admin",
      published: "Fri, May 20, 2022 4:18 PM",
    },
    {
      id: "7",
      Seq: "7",
      title: "Beauty Treatmen...",
      author: "Super Admin",
      published: "Fri, May 20, 2022 4:18 PM",
    },
    {
      id: "8",
      Seq: "8",
      title: "Beauty Treatmen...",
      author: "Super Admin",
      published: "Fri, May 20, 2022 4:18 PM",
    },
    {
      id: "9",
      Seq: "9",
      title: "Beauty Treatmen...",
      author: "Super Admin",
      published: "Fri, May 20, 2022 4:18 PM",
    },
    {
      id: "10",
      Seq: "10",
      title: "Beauty Treatmen...",
      author: "Super Admin",
      published: "Fri, May 20, 2022 4:18 PM",
    },
  ];

  return (
    <main>
      <section className="product-category" style={{ minHeight: "75vh" }}>
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h5 className="blue-1 m-0">Blog List</h5>
                <div className="d-flex gap-3">
                  <CustomButton
                    isLink
                    iconName="fa-solid fa-plus"
                    btnName="ADD NEW BLOG"
                    path="/Blog/post/create"
                  />
                  <SearchBox extraClass="bg-white" />
                </div>
              </div>
              <DashboardTable>
                <DataTable
                  paginationPerPage={100}
                  columns={blog_columns} data={blog_data} pagination />
              </DashboardTable>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Blog;
