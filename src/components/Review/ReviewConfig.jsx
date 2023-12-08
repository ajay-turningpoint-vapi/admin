import React from "react";
import CustomButton from "../Utility/Button";
import { DashboardBox } from "../Utility/DashboardBox";

function ReviewConfig() {
  return (
    <main>
      <section className="product-category" style={{ minHeight: "75vh" }}>
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12">
              <DashboardBox className="col-lg-6">
                <h5 className="blue-1 mb-4">Auto approve Review Configuration</h5>
                <form action="#" className="form row">
                  <div className="col-12 mb-4">
                    <label className="blue-1 fs-12">AUTO APPROVE PRODUCT REVIEW</label>
                    <div className="d-flex">
                      <div className="form-check form-check-inline d-flex align-items-center">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="category-status"
                          value="option1"
                          id="active-product-review"
                        />
                        <label
                          className="form-check-label fs-14"
                          htmlFor="active-product-review"
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
                          id="inActive-product-review"
                        />
                        <label
                          className="form-check-label fs-14"
                          htmlFor="inActive-product-review"
                        >
                          Inactive
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 mb-4">
                    <label className="blue-1 fs-12">AUTO APPROVE COMPANY REVIEW    </label>
                    <div className="d-flex">
                      <div className="form-check form-check-inline d-flex align-items-center">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="category-status"
                          value="option1"
                          id="active-company-review"
                        />
                        <label
                          className="form-check-label fs-14"
                          htmlFor="active-company-review"
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
                          id="inActive-company-review"
                        />
                        <label
                          className="form-check-label fs-14"
                          htmlFor="inActive-company-review"
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

export default ReviewConfig;
