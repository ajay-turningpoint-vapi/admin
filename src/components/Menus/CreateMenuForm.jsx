import React from "react";
import CustomButton from "../Utility/Button";
import { DashboardBox } from "../Utility/DashboardBox";

function CreateMenuForm() {
  return (
    <DashboardBox className="col-lg-8 mb-4">
      <form action="#" className="form row">
        <div className="col-12 mb-4">
          <label>
            Name
            <span className="red">*</span>
          </label>
          <input type="text" className="form-control" />
        </div>
        <div className="col-12 mb-4">
          <label>Status</label>
          <div className="form-check form-check-inline d-flex align-items-center">
            <input
              className="form-check-input"
              type="checkbox"
              name="enable-menu"
              value="Enabled"
              id="enable-menu"
            />
            <label className="form-check-label fs-14 pointer" htmlFor="enable-menu">
              Enable the menu
            </label>
          </div>
        </div>
        <div className="col-12 text-center">
          <CustomButton
            isBtn
            iconName="fa-solid fa-check"
            btnName="Save"
            roundedPill
          />
        </div>
      </form>
    </DashboardBox>
  );
}

export default CreateMenuForm;
