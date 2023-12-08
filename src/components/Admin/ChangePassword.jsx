import React from "react";
import CustomButton from "../Utility/Button";
import { DashboardTable } from "../Utility/DashboardBox";

function ChangePassword() {
  return (
    <DashboardTable>
      <h5 className="blue-1 mb-4">Change Password</h5>
      <form action="#" className="form row">
        <div className="col-12 mb-3">
          <label>
            CURRENT PASSWORD <span className="red">*</span>
          </label>
          <input
            name="CURRENT PASSWORD"
            className="form-control"
            placeholder="CURRENT PASSWORD"
            type="text"
            required=""
          />
        </div>
        <div className="col-12 mb-3">
          <label>
            NEW PASSWORD<span className="red">*</span>
          </label>
          <input
            name="NEW PASSWORD"
            className="form-control"
            placeholder="NEW PASSWORD"
            type="text"
            required=""
          />
        </div>
        <div className="col-12 mb-3">
          <label>
            RE ENTER NEW PASSWORD
            <span className="red">*</span>
          </label>
          <input
            name="RE ENTER NEW PASSWORD"
            className="form-control"
            placeholder="RE ENTER NEW PASSWORD"
            type="text"
          />
        </div>
        <div className="col-12 mt-2">
          <CustomButton isBtn iconName="fa-solid fa-check" btnName="Update" />
        </div>
      </form>
    </DashboardTable>
  );
}

export default ChangePassword;
