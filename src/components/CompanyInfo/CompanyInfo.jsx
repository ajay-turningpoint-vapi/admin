import React from "react";
import CustomButton from "../Utility/Button";
import { DashboardBox } from "../Utility/DashboardBox";

function CompanyInfo() {
  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <DashboardBox>
            <h5 className="blue-1 mb-4">Company Information</h5>
            <form action="#" className="form row">
             <div className="col-12 col-md-6">
                <label>Company Name</label>
                <input type="text" className="form-control mt-1" />
             </div>
             <div className="col-12 col-md-6">
                <label>Email</label>
                <input type="text" className="form-control mt-1" />
             </div>
             <div className="col-12 col-md-6">
                <label>Phone Number</label>
                <input type="text" className="form-control mt-1" />
             </div>
             <div className="col-12 col-md-6">
                <label>VAT Number</label>
                <input type="text" className="form-control mt-1" />
             </div>
             <div className="col-12 col-md-6">
                <label>Facebook Link</label>
                <input type="url" className="form-control mt-1" />
             </div>
             <div className="col-12 col-md-6">
                <label>Instagran Link</label>
                <input type="url" className="form-control mt-1" />
             </div>
             <div className="col-12 col-md-6">
                <label>Linkedin Link</label>
                <input type="url" className="form-control mt-1" />
             </div>
             <div className="col-12 col-md-6">
                <label>Twitter Link</label>
                <input type="url" className="form-control mt-1" />
             </div>
             <div className="col-12">
                <label>Address</label>
                <input type="text" className="form-control mt-1" />
             </div>
             <div className="col-12">
                <label>Company Information Format</label>
                <textarea className="form-control mt-1" rows="5"></textarea>
             </div>
              <div className="col-12 text-center mt-4">
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

export default CompanyInfo;
