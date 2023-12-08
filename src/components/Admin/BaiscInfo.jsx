import React from "react";
import CustomButton from "../Utility/Button";
import { DashboardBox } from "../Utility/DashboardBox";
import FileUpload from "../Utility/FileUpload";

function BaiscInfo() {
  return (
    <DashboardBox>
      <h5 className="blue-1 mb-4">Basic Info</h5>
      <form action="#" className="form row">
        <div className="col-12 col-md-6 mb-3">
          <label>
            First Name <span className="red">*</span>
          </label>
          <input
            name="first_name"
            className="form-control"
            placeholder="First Name"
            type="text"
            required=""
          />
        </div>
        <div className="col-12 col-md-6 mb-3">
          <label>Last Name</label>
          <input
            name="last_name"
            className="form-control"
            placeholder="Last Name"
            type="text"
            required=""
          />
        </div>
        <div className="col-12 col-md-6 mb-3">
          <label>
            Email Address
            <span className="red">*</span>
          </label>
          <input
            name="email"
            className="form-control"
            placeholder="Email Address"
            type="email"
          />
        </div>
        <div className="col-12 col-md-6 mb-3">
          <label>
            Phone Number
            <span className="red">*</span>
          </label>
          <input
            name="phone"
            className="form-control"
            placeholder="Phone Number"
            type="tel"
          />
        </div>
        <div className="col-12 col-md-6 mb-3">
          <label>
            Date of Birth
            <span className="red">*</span>
          </label>
          <input
            placeholder="Date"
            className="form-control"
            type="date"
            name="date_of_birth"
          />
        </div>
        <div className="col-12 col-md-6 mb-3">
          <label>Avatar (165x165)PX</label>
          <FileUpload />
        </div>
        <div className="col-12 mb-3">
          <label>Description</label>
          <textarea
            className="form-control"
            placeholder="Description"
            name="description"
            spellCheck="false"
          ></textarea>
        </div>
        <div className="col-12 mt-2">
          <CustomButton isBtn iconName="fa-solid fa-check" btnName="Update" />
        </div>
      </form>
    </DashboardBox>
  );
}

export default BaiscInfo;
