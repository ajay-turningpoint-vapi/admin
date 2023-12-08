import React from "react";
import CustomButton from "../../Utility/Button";

import { DashboardBox } from "../../Utility/DashboardBox";

function AddCurrency() {
  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <h5 className="blue-1 mb-4">Add New Currency</h5>
          <DashboardBox className='col-12 col-md-8'>
            <form action="#" className="form row">
              <div className="col-12">
                <label>
                  NAME<span className="red">*</span>
                </label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-12">
                <label>
                CODE <span className="red">*</span>
                </label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-12">
                <label>
                SYMBOL<span className="red">*</span>
                </label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-12">
                <label>
                CONVERT RATE 1 INR = ?<span className="red">*</span>
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
      </section>
    </main>
  );
}

export default AddCurrency;
