import { Switch } from "@mui/material";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import CustomButton from "../Utility/Button";
import { DashboardBox, DashboardTable } from "../Utility/DashboardBox";
import FileUpload from "../Utility/FileUpload";
import tabClick from "../Utility/TabClick";

function PaymentGateway() {
  // ====================================================================================
  const payment_gateway_columns = [
    {
      name: "ID",
      selector: (row) => row.sl,
      sortable: true,
      width: "33.33%",
    },
    {
      name: "NAME",
      selector: (row) => row.name,
      width: "33.33%",
    },
    {
      name: "ACTIVATE",
      cell: (row) => (
        <Switch
          defaultChecked={row.check}
          onChange={(e) => handleChange(e.target.checked, row)}
        />
      ),
      width: "33.33%",
    },
  ];

  const payment_gateway_data = [
    {
      id: "1",
      sl: "1",
      name: "CASH ON DELIVERY",
      check: false,
    },
    {
      id: "2",
      sl: "2",
      name: "WALLET",
      check: false,
    },
    {
      id: "3",
      sl: "3",
      name: "PAYPAL",
      check: true,
    },
    {
      id: "4",
      sl: "4",
      name: "STRIPE",
      check: false,
    },
    {
      id: "5",
      sl: "5",
      name: "PAYSTACK",
      check: false,
    },
  ];

  const [tabList, settabList] = useState([
    {
      tabName: "PAYPAL",
      active: true,
    },
  ]);

  const handleChange = (checked, row) => {
    let temp = [];
    let index = tabList.findIndex((item) => item.tabName === row.name);
    // console.log({ checked, row,index  });
    if (checked && index === -1) {
      temp = [
        ...tabList,
        {
          tabName: row.name,
          active: false,
        },
      ];
    } else {
      temp = [...tabList];
      temp.splice(index, 1);
    }
    settabList([...temp]);
  };

  // ====================================================================================

  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12 col-md-6">
              <h5 className="blue-1 mb-4">Activation</h5>
              <DashboardTable>
                <DataTable
                  paginationPerPage={100}
                  columns={payment_gateway_columns}
                  data={payment_gateway_data}
                  pagination
                />
              </DashboardTable>
            </div>
            <div className="col-12 col-md-6">
              <ul
                className="nav nav-pills dashboard-pills mb-4 gap-2"
                id="pills-tab"
                role="tablist"
              >
                {tabList.map((item, i) => {
                  if (
                    item.tabName !== "CASH ON DELIVERY" &&
                    item.tabName !== "WALLET"
                  ) {
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
                  }
                })}
              </ul>
              <DashboardBox>
                {tabList.map((item) => {
                  if (item.active) {
                    return (
                      <>
                        <h5 className="blue-1 mb-4">
                          {item.tabName} Configuration
                        </h5>
                        <form action="#" className="form row">
                          {item.tabName === "PAYPAL" && (
                            <div className="col-12">
                              <div className="d-flex">
                                <div className="form-check form-check-inline d-flex align-items-center">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="category-status"
                                    value="option1"
                                    id="paypal-sandbox"
                                  />
                                  <label
                                    className="form-check-label fs-14 pointer"
                                    htmlFor="paypal-sandbox"
                                  >
                                    Sandbox
                                  </label>
                                </div>
                                <div className="form-check form-check-inline d-flex align-items-center">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="category-status"
                                    value="option2"
                                    id="paypal-live"
                                  />
                                  <label
                                    className="form-check-label fs-14 pointer"
                                    htmlFor="paypal-live"
                                  >
                                    Live
                                  </label>
                                </div>
                              </div>
                            </div>
                          )}

                          {item.tabName === "PAYPAL" && (
                            <div className="col-12">
                              <label className="blue-1 fs-12">
                                {item.tabName} CLIENT ID
                              </label>
                              <input type="text" className="form-control" />
                            </div>
                          )}
                          {item.tabName === "PAYSTACK" && (
                            <div className="col-12">
                              <label className="blue-1 fs-12">
                                {item.tabName} MERCHANT EMAIL
                              </label>
                              <input type="email" className="form-control" />
                            </div>
                          )}

                          {(item.tabName === "STRIPE" ||
                            item.tabName === "PAYSTACK") && (
                              <div className="col-12">
                                <label className="blue-1 fs-12">
                                  {item.tabName} KEY
                                </label>
                                <input type="text" className="form-control" />
                              </div>
                            )}

                          {item.tabName === "STRIPE" && (
                            <div className="col-12">
                              <label className="blue-1 fs-12">
                                {item.tabName} USER NAME
                              </label>
                              <input type="text" className="form-control" />
                            </div>
                          )}

                          <div className="col-12">
                            <label className="blue-1 fs-12">
                              {item.tabName} CLIENT SECRET KEY
                            </label>
                            <input type="text" className="form-control" />
                          </div>

                          {item.tabName === "PAYSTACK" && (
                            <div className="col-12">
                              <label className="blue-1 fs-12">
                                {item.tabName} PAYMENT URL
                              </label>
                              <input type="url" className="form-control" />
                            </div>
                          )}

                          <div className="col-12">
                            <label className="blue-1 fs-12">
                              GATEWAY LOGO (400X166)PX
                            </label>
                            <FileUpload />
                          </div>

                          <div className="col-12 text-center mt-4">
                            <CustomButton
                              iconName="fa-solid fa-check"
                              btnName="Save"
                              isBtn
                            />
                          </div>
                        </form>
                      </>
                    );
                  }
                })}
              </DashboardBox>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default PaymentGateway;
