import React, { useState } from "react";
import CustomButton from "../Utility/Button";
import { DashboardBox } from "../Utility/DashboardBox";

function AddCustomer() {
  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <h5 className="blue-1 mb-4">Add New Customer</h5>
          <DashboardBox>
            <form action="#" className="form row">
          <h5 className="blue-1 mb-4">Basic Info</h5>
              <div className="col-12 col-md-4 mb-3">
                <label>
                  First Name <span className="red">*</span>
                </label>
                <input
                  name="first_name"
                  className="form-control"
                  type="text"
                  required=""
                />
              </div>
              <div className="col-12 col-md-4 mb-3">
                <label>Last Name</label>
                <input
                  name="last_name"
                  className="form-control"
                  type="text"
                  required=""
                />
              </div>
              <div className="col-12 col-md-4 mb-3">
                <label>
                  Email Address or Phone Number
                  <span className="red">*</span>
                </label>
                <input name="text" className="form-control" type="email" />
              </div>
              <div className="col-12 col-md-4 mb-3">
                <label>
                  {" "}
                  PASSWORD (MINIMUM 8 CHARECTER)
                  <span className="red">*</span>
                </label>
                <input name="phone" className="form-control" type="password" />
              </div>
              <div className="col-12 col-md-4 mb-3">
                <label>
                  CONFIRM PASSWORD
                  <span className="red">*</span>
                </label>
                <input name="phone" className="form-control" type="password" />
              </div>
              <div className="col-12 col-md-4 mb-3">
                <label>REFERRAL CODE (OPTIONAL)</label>
                <input
                  className="form-control"
                  type="text"
                  name="REFERRAL-CODE"
                />
              </div>
              <div className="col-12 mb-3">
                <label className="blue-1 fs-12">STATUS</label>
                <div className="d-flex">
                  <div className="form-check form-check-inline d-flex align-items-center">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="category-status"
                      value="option1"
                      id="active-customer"
                    />
                    <label
                      className="form-check-label fs-14"
                      htmlFor="active-customer"
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
                      id="inActive-customer"
                    />
                    <label
                      className="form-check-label fs-14"
                      htmlFor="inActive-customer"
                    >
                      Inactive
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-12 mt-2 text-center">
                <CustomButton
                  isBtn
                  iconName="fa-solid fa-check"
                  btnName="Create"
                />
              </div>
            </form>
          </DashboardBox>
        </div>
      </section>
    </main>
  );
}

export default AddCustomer;
