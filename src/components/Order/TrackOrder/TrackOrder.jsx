import React from "react";
import CustomButton from "../../Utility/Button";
import { DashboardBox } from "../../Utility/DashboardBox";

function TrackOrder() {
  return (
    <main>
      <section className="product-category" style={{ minHeight: "75vh" }}>
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12">
              <DashboardBox className="col-lg-6">
                <h5 className="blue-1 mb-4">Track order Configuration</h5>
                <form action="#" className="form row">
                  <div className="col-12 mb-4">
                    <label className="blue-1 fs-12">TRACK ORDER BY SECRET ID</label>
                    <div className="d-flex">
                      <div className="form-check form-check-inline d-flex align-items-center">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="category-status"
                          value="option1"
                          id="active-order"
                        />
                        <label
                          className="form-check-label fs-14"
                          htmlFor="active-order"
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
                          id="inActive-order"
                        />
                        <label
                          className="form-check-label fs-14"
                          htmlFor="inActive-order"
                        >
                          Inactive
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 text-center">
                    <CustomButton
                      isBtn
                      iconName="fa-solid fa-check"
                      btnName="Udate"
                      roundedPill
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

export default TrackOrder;
