import React from "react";
import { DashboardBox } from "../../Utility/DashboardBox";
import SearchBox from "../../Utility/SearchBox";
import CancleReasonForm from "./CancleReasonForm";
import CancleReasonTable from "./CancleReasonTable";

function CancleReason() {

  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12 col-md-4">
              <h5 className="blue-1 mb-4">Add New Reason</h5>
              <DashboardBox>
              <CancleReasonForm />
              </DashboardBox>
            </div>
            <div className="col-12 col-md-8">
              <div className="d-flex gap-3 justify-content-between">
                <h5 className="blue-1 mb-4">Cancel Reason</h5>
               <SearchBox extraClass='bg-white' />
              </div>
              <CancleReasonTable />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default CancleReason;
