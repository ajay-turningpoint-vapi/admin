import React, { useState } from "react";
import { images } from "../Images/Images";
import CustomButton from "../Utility/Button";
import { DashboardBox, DashboardTable } from "../Utility/DashboardBox";
import SearchBox from "../Utility/SearchBox";
import tabClick from "../Utility/TabClick";
import ActionIcon from "../Utility/ActionIcon";
import DataTable from "react-data-table-component";
import { downloadCSV } from "../Utility/CSV";
import { generateFilePath } from "../Utility/utils";

function CustomerDetail({ customerData }) {
  // ==============================================================================================
  console.log(customerData, "CUSTOMER");
  const [tabList, settabList] = useState([
    {
      tabName: "ORDERS",
      active: true,
    },
    {
      tabName: "WALLET HISTORIES",
      active: false,
    },
    {
      tabName: "ADDRESSES",
      active: false,
    },
  ]);
  const table_columns = [
    {
      name: "SL",
      selector: (row) => row.Seq,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.date,
    },
    {
      name: "Order ID",
      selector: (row) => row.order_id,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Total Product QTY",
      selector: (row) => row.product_quantity,
    },
    {
      name: "Total Amount",
      selector: (row) => row.amount,
    },
    {
      name: "Order Status",
      button: true,
      width: "10%",
      cell: () => <CustomButton redBtn btnName="Pending" />,
    },
    {
      name: "Is Paid",
      button: true,
      width: "10%",
      cell: () => <CustomButton redBtn btnName="Pending" />,
    },
    {
      name: "Action",
      cell: (row) => <ActionIcon approve detail detailpath="/Order/Sale-Detail" Uniquekey={row.id} />,
    },
  ];

  const table_data = [
    {
      id: "1",
      Seq: "1",
      date: "	17th Jun, 2022",
      order_id: "27220617041151	",
      email: "devesh.batra@ebslon.com",
      product_quantity: "6",
      amount: "4,232.00",
    },
    {
      id: "2",
      Seq: "2",
      date: "	17th Jun, 2022",
      order_id: "27220617041151	",
      email: "devesh.batra@ebslon.com",
      product_quantity: "6",
      amount: "4,232.00",
    },
    {
      id: "3",
      Seq: "3",
      date: "	17th Jun, 2022",
      order_id: "27220617041151	",
      email: "devesh.batra@ebslon.com",
      product_quantity: "6",
      amount: "4,232.00",
    },
  ];
  const wallet_columns = [
    {
      name: "SL",
      selector: (row) => row.Seq,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.date,
    },
    {
      name: "User",
      selector: (row) => row.user,
    },
    {
      name: "TXN ID",
      selector: (row) => row.txn,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
    },
    {
      name: "Type",
      selector: (row) => row.type,
    },
    {
      name: "Payment Method",
      selector: (row) => row.method,
    },
    {
      name: "Action",
      cell: (row) => <ActionIcon approve decline Uniquekey={row.id} />,
    },
  ];

  const wallet_data = [
    {
      id: "1",
      Seq: "1",
      date: "	17th Jun, 2022",
      txn: "27220617041151	",
      user: "XYZ",
      method: "COD",
      type: "CGST",
      amount: "4,232.00",
    },
    {
      id: "2",
      Seq: "2",
      date: "	17th Jun, 2022",
      txn: "27220617041151	",
      user: "XYZ",
      method: "COD",
      type: "CGST",
      amount: "4,232.00",
    },
    {
      id: "3",
      Seq: "3",
      date: "	17th Jun, 2022",
      txn: "27220617041151	",
      user: "XYZ",
      method: "COD",
      type: "CGST",
      amount: "4,232.00",
    },
  ];

  const address_columns = [
    {
      name: "Full Name",
      sortable: true,
      selector: (row) => row.name,
    },
    {
      name: "Address",
      selector: (row) => row.address,
    },
    {
      name: "Region",
      minWidth: "200px",
      maxWidth: "210px",
      selector: (row) => row.region,
    },
    {
      name: "Email",
      minWidth: "200px",
      maxWidth: "210px",
      selector: (row) => row.email,
    },
    {
      name: "Phone Number",
      minWidth: "200px",
      maxWidth: "210px",
      selector: (row) => row.contact,
    },
    {
      name: "Action",
      minWidth: "200px",
      maxWidth: "210px",
      button: true,
      cell: (row) => <CustomButton greenBtn noIcon btnName="EDIT" />,
    },
  ];

  const address_data = [
    {
      id: "1",
      name: "XYZ",
      address: "112/6 XYZ",
      region: "Delhi, India",
      email: "XYZ@gmail.com",
      contact: "5665455423",
    },
  ];

  // ==============================================================================================

  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <DashboardBox className="mb-5">
            <h5 className="blue-1 mb-4">Customer Profile</h5>
            <div className="row">
              <div className="col-12 col-md-12">
                <div className="customer-profile">
                  <a href={generateFilePath(customerData.image)}><img src={customerData?.image ? generateFilePath(customerData.image) : images.customer} alt="" /></a>
                  <h6 className="blue-1 text-capitalize my-3">{customerData.firstName}</h6>
                  <ul className="blue-1 fs-14">
                    <li>
                      <span className="fw-600">
                        Name <span>:</span>
                      </span>
                      {customerData.name}
                    </li>
                    <li>
                      <span className="fw-600">
                        Email <span>:</span>
                      </span>
                      {customerData.email}
                    </li>
                    <li>
                      <span className="fw-600">
                        Phone <span>:</span>
                      </span>
                      {customerData.phone}
                    </li>
                    <li>
                      <span className="fw-600">
                        Business Name <span>:</span>
                      </span>
                      {customerData.shopName}
                    </li>
                    <li>
                      <span className="fw-600">
                        Points <span>:</span>
                      </span>
                      {customerData.points ?? 0}
                    </li>
                    <li>
                      <span className="fw-600">
                        Registered Date <span>:</span>
                      </span>
                      {new Date(customerData.createdAt).toDateString()}
                    </li>
                    <li>
                      <span className="fw-600">
                        Active Status <span>:</span>
                      </span>
                      <CustomButton greenBtn btnName="Active" />
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-12 col-md-7 mt-5 row">
                <h5 className="blue-1 mb-4">KYC Details</h5>

                <ul className="blue-1 fs-14">
                  <li> <span className="fw-600">Id Front Image <span>: </span></span>
                    <br />
                    <a href={generateFilePath(customerData.idFrontImage)}><img src={generateFilePath(customerData?.idFrontImage)} alt="" style={{ height: 100, width: 100 }} /></a>
                  </li>
                  <li> <span className="fw-600">Id Back Image <span>: </span></span>
                    <br />
                    <a href={generateFilePath(customerData.idFrontImage)}><img src={generateFilePath(customerData?.idBackImage)} alt="" style={{ height: 100, width: 100 }} /></a>
                  </li>

                  {customerData?.bankDetails?.length > 0 && customerData?.bankDetails?.map((bank, i) =>
                  (<>
                    <li> <span className="fw-600">Bank Name <span>: </span></span>
                      {bank?.bank}
                    </li>
                    <li> <span className="fw-600">Bank Type <span>: </span></span>
                      {bank?.banktype.charAt(0).toUpperCase() + bank?.banktype.slice(1)}
                    </li>

                    <li> <span className="fw-600">Account Number <span>: </span></span>
                      {bank?.accountNo}
                    </li>

                    <li> <span className="fw-600">Account Name <span>: </span></span>
                      {bank?.accountName}
                    </li>

                    <li> <span className="fw-600">IFSC Code <span>: </span></span>
                      {bank?.ifsc}
                    </li>
                  </>
                  )
                  )}
                </ul>
                <div className="col-12 col-md-3">
                  {/* <div className="customer-profile bg-light border-3 border-start border-dark border-opacity-50 p-4"> */}
                  {/* <h5 className="blue-1 text-capitalize mb-3">Online Portal </h5>
                  <img src={generateFilePath(customerData.onlinePortal)} alt={customerData?.firstName} /> */}
                  {/* <ul className="blue-1 fs-14">
                      <li>
                        <span className="fw-600">
                          Total Orders<span>:</span>
                        </span>
                        0
                      </li>
                      <li>
                        <span className="fw-600">
                          Confirmed Order<span>:</span>
                        </span>
                        0
                      </li>
                      <li>
                        <span className="fw-600">
                          Pending Order<span>:</span>
                        </span>
                        0
                      </li>
                      <li>
                        <span className="fw-600">
                          Completed Order<span>:</span>
                        </span>
                        0
                      </li>
                      <li>
                        <span className="fw-600">
                          Cancelled Order<span>:</span>
                        </span>
                        0
                      </li>
                    </ul> */}
                  {/* </div> */}
                </div>
                <div className="col-12 col-md-3 ml-2">
                  {/* <div className="customer-profile bg-light border-3 border-start border-dark border-opacity-50 p-4"> */}
                  {/* <h5 className="blue-1 text-capitalize mb-3">Visiting Card</h5>
                  <img src={generateFilePath(customerData.visitingCard)} alt={customerData?.firstName} /> */}

                  {/* <ul className="blue-1 fs-14">
                      <li>
                        <span className="fw-600">
                          Total Recharge<span>:</span>
                        </span>
                        ₹ 0.00
                      </li>
                      <li>
                        <span className="fw-600">
                          Pending Balance Approval<span>:</span>
                        </span>
                        ₹ 0.00
                      </li>
                      <li>
                        <span className="fw-600">
                          Total Balance<span>:</span>
                        </span>
                        ₹ 0.00
                      </li>
                    </ul> */}
                  {/* </div> */}
                </div>
                <div className="col-12 col-md-3 ml-2 mr-2">
                  {/* <div className="customer-profile bg-light border-3 border-start border-dark border-opacity-50 p-4"> */}
                  {/* <h5 className="blue-1 text-capitalize mb-3">Shop Image</h5>
                  <img src={generateFilePath(customerData.shopImage)} alt={customerData?.firstName} /> */}

                  {/* <ul className="blue-1 fs-14">
                      <li>
                        <span className="fw-600">
                          Total Recharge<span>:</span>
                        </span>
                        ₹ 0.00
                      </li>
                      <li>
                        <span className="fw-600">
                          Pending Balance Approval<span>:</span>
                        </span>
                        ₹ 0.00
                      </li>
                      <li>
                        <span className="fw-600">
                          Total Balance<span>:</span>
                        </span>
                        ₹ 0.00
                      </li>
                    </ul> */}
                  {/* </div> */}
                </div>
              </div>
            </div>
          </DashboardBox>
          {/* <ul
            className="nav nav-pills dashboard-pills mb-3"
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
          <DashboardBox>
            {tabList.map((item) => {
              if (item.active) {
                if (item.tabName === "ORDERS") {
                  return (
                    <>
                      <div className="d-flex justify-content-between mb-3">
                        <CustomButton
                          isLink
                          iconName="fa-solid fa-download"
                          btnName={`${item.tabName} CSV`}
                          extraClass="d-flex align-items-center"
                          path="/"
                          small
                          roundedPill
                          downloadAble
                          ClickEvent={() => downloadCSV(table_data)}
                        />
                        <SearchBox extraClass="bg-light" />
                      </div>
                      <DashboardTable>
                        <DataTable
                          columns={table_columns}
                          data={table_data}
                          pagination
                        />
                      </DashboardTable>
                    </>
                  );
                }
                
                if (item.tabName === "WALLET HISTORIES") {
                  return (
                    <>
                      <div className="d-flex justify-content-between mb-3">
                        <CustomButton
                          isLink
                          iconName="fa-solid fa-download"
                          btnName={`${item.tabName} CSV`}
                          extraClass="d-flex align-items-center"
                          path="/"
                          small
                          roundedPill
                          downloadAble
                          ClickEvent={() => downloadCSV(table_data)}
                        />
                        <SearchBox extraClass="bg-light" />
                      </div>
                      <DashboardTable>
                        <DataTable
                          columns={wallet_columns}
                          data={wallet_data}
                          pagination
                        />
                      </DashboardTable>
                    </>
                  );
                }
                if (item.tabName === "ADDRESSES") {
                  return (
                    <>
                      <div className="d-flex justify-content-between mb-3">
                        <CustomButton
                          isLink
                          iconName="fa-solid fa-download"
                          btnName={`${item.tabName} CSV`}
                          extraClass="d-flex align-items-center"
                          path="/"
                          small
                          roundedPill
                          downloadAble
                          ClickEvent={() => downloadCSV(table_data)}
                        />
                        <SearchBox extraClass="bg-light" />
                      </div>
                      <DashboardTable>
                        <DataTable
                          columns={address_columns}
                          data={address_data}
                          pagination
                        />
                      </DashboardTable>
                    </>
                  );
                }
              }
            })}
          </DashboardBox> */}
        </div>
      </section>
    </main>
  );
}

export default CustomerDetail;
