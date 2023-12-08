import React, { useState } from "react";
import DataTable from "react-data-table-component";
import ActionIcon from "../Utility/ActionIcon";
import CustomButton from "../Utility/Button";
import { DashboardTable } from "../Utility/DashboardBox";
import SearchBox from "../Utility/SearchBox";
import tabClick from "../Utility/TabClick";

function ProductReview(e) {
  const review_columns = [
    {
      name: "SL",
      selector: (row) => row.Seq,
      sortable: true,
      width: "5%",
    },
    {
      name: "Rating",
      selector: (row) => row.rating,
      width: "10%",
    },
    {
      name: "Customer Feedback",
      cell: (row) => row.feedback,
      width: "50%",
    },
    {
      name: "Status",
      button: true,
      cell: (row) => (
        <CustomButton
          isBtn
          btnName={row.status}
          btntype="button"
          changeClass={row.class}
          noIconMargin
          noIcon
        />
      ),
      width: "15%",
    },
    {
      name: "Customer & Time",
      selector: (row) => row.customer,
      width: "10%",
    },
    {
      name: "Approve",
      cell: (row) => <ActionIcon approve decline Uniquekey={row.id} />,
      width: "10%",
    },
  ];

  const review_data = [
    {
      id: "1",
      Seq: "1",
      rating: "Average",
      feedback:
        "Lorem ispum Lorem ispum Lorem ispum Lorem ispum Lorem ispum Lorem ispum Lorem ispum Lorem ispum Lorem ispum Lorem ispum Lorem ispum Lorem ispum ",
      status: "Pending",
      customer: "Rahul, 7:40pm",
      class: "btn btn-red",
    },
    {
      id: "2",
      Seq: "2",
      rating: "Average",
      feedback:
        "Lorem ispum Lorem ispum Lorem ispum Lorem ispum Lorem ispum Lorem ispum Lorem ispum Lorem ispum Lorem ispum Lorem ispum Lorem ispum Lorem ispum ",
      status: "Decline",
      customer: "Rahul, 7:40pm",
      class: "btn btn-red",
    },
    {
      id: "3",
      Seq: "3",
      rating: "Average",
      feedback:
        "Lorem ispum Lorem ispum Lorem ispum Lorem ispum Lorem ispum Lorem ispum Lorem ispum Lorem ispum Lorem ispum Lorem ispum Lorem ispum Lorem ispum ",
      status: "Approve",
      customer: "Rahul, 7:40pm",
      class: "btn btn-green",
    },
  ];

  const [tabList, settabList] = useState([
    {
      tabName: "All Review",
      active: true,
    },
    {
      tabName: "Approve",
      active: false,
    },
    {
      tabName: "Pending",
      active: false,
    },
    {
      tabName: "Declined",
      active: false,
    },
  ]);

  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="blue-1 m-0">All Product Review List</h5>
                <div className="d-flex align-items-center gap-3">
                  <ul
                    className="nav nav-pills dashboard-pills justify-content-end"
                    id="pills-tab"
                    role="tablist"
                  >
                    {tabList.map((item, i) => {
                      return (
                        <li key={i}>
                          <CustomButton
                            navPills
                            btnName={item.tabName}
                            pillActive={item.active ? true : false}
                            ClickEvent={() => {
                              tabClick(i, tabList, settabList);
                            }}
                          />
                        </li>
                      );
                    })}
                  </ul>
                  <SearchBox extraClass='bg-white' />
                </div>
              </div>
              <DashboardTable>
                <DataTable
                  columns={review_columns}
                  data={review_data}
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

export default ProductReview;
