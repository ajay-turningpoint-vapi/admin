import React from "react";
import CustomButton from "../Utility/Button";
import { DashboardBox } from "../Utility/DashboardBox";
import FileUpload from "../Utility/FileUpload";

function BulkProductUpload() {
  return (
    <main>
      <section className="product-category" style={{ minHeight: "75vh" }}>
        <div className="container-fluid p-0">
          <DashboardBox>
            <h5 className="blue-1 mb-4">Bulk Product Upload</h5>
            <form action="" className="form row">
              <div className="col-12 mb-3">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <label>CSV FILE</label>
                  <CustomButton isLink downloadAble noIcon changeClass='btn p-0 m-0 fs-12 text-primary border-0' btnName='SAMPLE FILE DOWNLOAD' />
                </div>
                <FileUpload />
                <div className="form-text fs-12 blue-1">
                  PLEASE DOWNLOAD THE SAMPLE FILE INPUT YOUR DESIRE INFORMATION
                  THEN UPLOAD. DON'T TRY TO UPLOAD DIFFERENT FILE FORMAT AND
                  INFORMATION
                </div>
              </div>
              <div className="col-12 text-center">
                <CustomButton isBtn iconName='fa-solid fa-check' btnName='Save' />
              </div>
            </form>
          </DashboardBox>
        </div>
      </section>
    </main>
  );
}

export default BulkProductUpload;
