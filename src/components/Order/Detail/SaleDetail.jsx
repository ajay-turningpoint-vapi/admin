import React from "react";
import DataTable from "react-data-table-component";
import { images } from "../../Images/Images";
import Select from "react-select";

import CustomButton from "../../Utility/Button";
import { DashboardBox, DashboardTable } from "../../Utility/DashboardBox";

function SaleDetail() {
  // =========================================================================================

  const sale_columns = [
    {
      name: "SL",
      selector: (row) => row.Seq,
      sortable: true,
    },
    {
      name: "Image",
      cell: (row) => <img src={row.img} alt={row.name} />,
    },
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Details",
      cell: (row) => (
        <>
          <p className="fs-14">Qty: {row.quantity}</p>
          <p className="fs-14">
            Color:{" "}
            <span
              className="color-circle"
              style={{ backgroundColor: row.color }}
            ></span>
          </p>
        </>
      ),
    },
    {
      name: "Price",
      selector: (row) => row.price,
    },
    {
      name: "TAX/GST",
      selector: (row) => row.tax,
    },

    {
      name: "Total",
      selector: (row) => row.total,
    },
  ];

  const sale_data = [
    {
      id: "1",
      Seq: "1",
      img: images.product,
      name: "VELVET MATTE LIPSTICK",
      quantity: "6",
      color: "blue",
      price: "₹ 600.00",
      tax: "₹ 0.00",
      total: "₹ 3,600.00",
    },
  ];

  const order_comfirm = [
    { value: "Pending", label: "Pending" },
    { value: "Confirmed", label: "Confirmed" },
    { value: "Declined", label: "Declined" },
  ];
  const payment_status = [
    { value: "Pending", label: "Pending" },
    { value: "Paid", label: "Paid" },
  ];
  const is_complete = [
    { value: "Pending", label: "Pending" },
    { value: "Complete", label: "Complete" },
  ];
  const delivery = [
    { value: "Pending", label: "Pending" },
    { value: "Processing", label: "Processing" },
    { value: "Shipped", label: "Shipped" },
    { value: "Recieved", label: "Recieved" },
    { value: "Delivered", label: "Delivered" },
  ];

  //   =========================================================================================

  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <div className="col-12 col-md-8">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="blue-1 m-0">27220617041151</h5>
              <CustomButton
                isLink
                downloadAble
                btnName="PRINT"
                noIcon
                noIconMargin
              />
            </div>
          </div>
          <div className="row">
            <DashboardBox className="col-12 col-md-8 row gy-4 m-0">
              <div className="col-12 col-md-6">
                <DashboardBox className="blue-1">
                  <div className="customer-profile">
                    <h6 className="blue-1 text-capitalize mb-3">
                      Billing Info
                    </h6>
                    <ul className="blue-1 fs-14">
                      <li>
                        <span className="fw-600">
                          Name<span>:</span>
                        </span>
                        Devesh
                      </li>
                      <li>
                        <span className="fw-600">
                          Email<span>:</span>
                        </span>
                        devesh.batra@ebslon.com
                      </li>
                      <li>
                        <span className="fw-600">
                          Phone<span>:</span>
                        </span>
                        9999063652
                      </li>
                      <li>
                        <span className="fw-600">
                          Address<span>:</span>
                        </span>
                        506-507, GD ITL, A-09, Netaji Subhash place, Pitampura
                      </li>
                      <li>
                        <span className="fw-600">
                          City<span>:</span>
                        </span>
                        New Delhi
                      </li>
                      <li>
                        <span className="fw-600">
                          State<span>:</span>
                        </span>
                        Delhi
                      </li>
                      <li>
                        <span className="fw-600">
                          Country<span>:</span>
                        </span>
                        New Delhi
                      </li>
                      <li>
                        <span className="fw-600">
                          Postcode<span>:</span>
                        </span>
                        110034
                      </li>
                    </ul>
                  </div>
                </DashboardBox>
              </div>
              <div className="col-12 col-md-6">
                <DashboardBox className="blue-1">
                  <div className="customer-profile">
                    <h6 className="blue-1 text-capitalize mb-3">
                      Shipping Info
                    </h6>
                    <ul className="blue-1 fs-14">
                      <li>
                        <span className="fw-600">
                          Name<span>:</span>
                        </span>
                        Devesh
                      </li>
                      <li>
                        <span className="fw-600">
                          Email<span>:</span>
                        </span>
                        devesh.batra@ebslon.com
                      </li>
                      <li>
                        <span className="fw-600">
                          Phone<span>:</span>
                        </span>
                        9999063652
                      </li>
                      <li>
                        <span className="fw-600">
                          Address<span>:</span>
                        </span>
                        506-507, GD ITL, A-09, Netaji Subhash place, Pitampura
                      </li>
                      <li>
                        <span className="fw-600">
                          City<span>:</span>
                        </span>
                        New Delhi
                      </li>
                      <li>
                        <span className="fw-600">
                          State<span>:</span>
                        </span>
                        Delhi
                      </li>
                      <li>
                        <span className="fw-600">
                          Country<span>:</span>
                        </span>
                        India
                      </li>
                      <li>
                        <span className="fw-600">
                          Postcode<span>:</span>
                        </span>
                        110034
                      </li>
                    </ul>
                  </div>
                </DashboardBox>
              </div>
              <div className="col-12 col-md-6">
                <DashboardBox className="blue-1">
                  <div className="customer-profile">
                    <h6 className="blue-1 text-capitalize mb-3">
                      Payment Info
                    </h6>
                    <ul className="blue-1 fs-14">
                      <li>
                        <span className="fw-600">
                          Payment Method<span>:</span>
                        </span>
                        Cash On Delivery
                      </li>
                      <li>
                        <span className="fw-600">
                          Amount<span>:</span>
                        </span>
                        ₹ 4,232.00
                      </li>
                      <li>
                        <span className="fw-600">
                          TXN ID<span>:</span>
                        </span>
                        none
                      </li>
                      <li>
                        <span className="fw-600">
                          Date<span>:</span>
                        </span>
                        17th Jun, 2022
                      </li>
                      <li>
                        <span className="fw-600">
                          Payment Status<span>:</span>
                        </span>
                        Pending
                      </li>
                    </ul>
                  </div>
                </DashboardBox>
              </div>
              <div className="col-12">
                <DashboardBox className="blue-1">
                  <div className="d-flex justify-content-between align-items-end">
                    <div>
                      <h5 className="blue-1 mb-3">Package: 22061704511176</h5>
                      <CustomButton redBtn btnName="Pending" />
                    </div>
                    <h6 className="border py-2 m-0 px-4 text-white bg-black rounded-2 fs-14">
                      Shipping Method : Flat Rate
                    </h6>
                  </div>
                  <DashboardTable className="my-4">
                    <DataTable
                      paginationPerPage={100}
                      columns={sale_columns}
                      data={sale_data}
                      pagination
                    />
                  </DashboardTable>
                  <div className="customer-profile">
                    <h6 className="blue-1 text-capitalize mb-3">Order Info</h6>
                    <ul className="blue-1 fs-14">
                      <li>
                        <span className="fw-600">
                          Is Paid<span>:</span>
                        </span>
                        No
                      </li>
                      <li>
                        <span className="fw-600">
                          Subtotal<span>:</span>
                        </span>
                        ₹ 3,600.00
                      </li>
                      <li>
                        <span className="fw-600">
                          Discount<span>:</span>
                        </span>
                        - ₹ 0.00
                      </li>
                      <li>
                        <span className="fw-600">
                          Shipping Charge<span>:</span>
                        </span>
                        ₹ 200.00
                      </li>
                      <li>
                        <span className="fw-600">
                          TAX/GST<span>:</span>
                        </span>
                        ₹ 432.00
                      </li>
                      <li>
                        <span className="fw-600">
                          Grand Total<span>:</span>
                        </span>
                        ₹ 4,232.00
                      </li>
                    </ul>
                  </div>
                </DashboardBox>
              </div>
            </DashboardBox>
            <div className="col-12 col-md-4">
              <DashboardBox>
                <form action="#" className="form row">
                  <div className="col-12">
                    <label>ORDER CONFIRMATION</label>
                    <Select options={order_comfirm} />
                  </div>
                  <div className="col-12">
                    <label>PAYMENT STATUS</label>
                    <Select options={payment_status} />
                  </div>
                  <div className="col-12">
                    <label>IS COMPLETED</label>
                    <Select options={is_complete} />
                  </div>
                  <div className="col-12">
                    <label>DELIVERY STATUS</label>
                    <Select options={delivery} />
                  </div>
                  <div className="col-12 text-center mt-2">
                    <CustomButton
                      isBtn
                      iconName="fa-solid fa-check"
                      btnName="Save"
                    />
                  </div>
                </form>
              </DashboardBox>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default SaleDetail;
