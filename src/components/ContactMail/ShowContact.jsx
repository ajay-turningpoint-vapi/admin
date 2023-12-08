import React from "react";
import { DashboardBox } from "../Utility/DashboardBox";

function ShowContact() {
  return (
    <main>
      <section className="product-category" style={{ minHeight: "75vh" }}>
        <div className="container-fluid p-0">
          <h5 className="blue-1 mb-4">Contact Mail</h5>
          <DashboardBox>
            <ul className="blue-1 fs-14 customer-profile p-3">
              <li>
                <span className="fw-600">
                  Name<span>:</span>
                </span>
                test
              </li>
              <li>
                <span className="fw-600">
                  Email<span>:</span>
                </span>
                contact@visionpublictrust.org
              </li>
              <li>
                <span className="fw-600">
                  Message<span>:</span>
                </span>
                mnmd, white, #93c47d, #ffe000, #483c3c, #5b5b5b
              </li>
            </ul>
          </DashboardBox>
        </div>
      </section>
    </main>
  );
}

export default ShowContact;
