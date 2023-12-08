import React from "react";
import CustomButton from "../../Utility/Button";

function CancleReasonForm() {
  return (
    <form action="#" className="form row">
      <div className="col-12 mb-3">
        <label className="blue-1 fs-12">
          REASON <span className="red">*</span>
        </label>
        <input type="text" className="form-control" />
      </div>
      <div className="col-12 mb-3">
        <label className="blue-1 fs-12">
          DESCRIPTION<span className="red">*</span>
        </label>
        <textarea className="form-control" rows="5"></textarea>
      </div>
      <div className="col-12">
        <CustomButton iconName="fa-solid fa-check" btnName="Save" isBtn />
      </div>
    </form>
  );
}

export default CancleReasonForm;
