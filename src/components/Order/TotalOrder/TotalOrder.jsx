import React, { useState } from "react";
import PendingOrder from "./PendingOrder";
import ConfirmedOrder from "./ConfirmedOrder";
import CompleteOrder from "./CompleteOrder";
import PendingPaymentOrder from "./PendingPaymentOrder";
import CancleOrder from "./CancleOrder";
import InhouseOrder from "./InhouseOrder";
import CustomButton from "../../Utility/Button";
import tabClick from "../../Utility/TabClick";

function TotalOrder() {
  const [tabList, settabList] = useState([
    {
      tabName: "Pending Orders",
      active: true,
      render: <PendingOrder name="Pending Orders" />,
    },
    {
      tabName: "Confirmed Orders",
      active: false,
      render: <ConfirmedOrder name="Confirmed Orders" />,
    },
    {
      tabName: "Completed Orders",
      active: false,
      render: <CompleteOrder name="Completed Orders" />,
    },
    {
      tabName: "Pending Payment Orders",
      active: false,
      render: <PendingPaymentOrder name="Pending Payment Orders" />,
    },
    {
      tabName: "Refused/Cancelled Orders",
      active: false,
      render: <CancleOrder name="Refused/Cancelled Orders" />,
    },
    {
      tabName: "Inhouse Orders",
      active: false,
      render: <InhouseOrder name="Inhouse Orders" />,
    },
  ]);

  return (
    <main>
      <section className="total-order" style={{ minHeight: "75vh" }}>
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12">
              <ul className="d-flex total-order-tab align-items-center justify-content-end gap-2 dashboard-pills">
                {tabList.map((item, i) => {
                  return (
                    <li key={i}>
                      <CustomButton
                        navPills
                        btnName={item.tabName}
                        pillActive={item.active ? true : false}
                        ClickEvent={() => tabClick(i,tabList,settabList)}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
            {tabList.map((item, index) => {
              return (
                <div className="col-12" key={index}>
                  {item.active && item.render}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

export default TotalOrder;
