import React, { useState } from "react";
import ConfirmedOrder from "../TotalOrder/ConfirmedOrder";
import CompleteOrder from "../TotalOrder/CompleteOrder";
import PendingPaymentOrder from "../TotalOrder/PendingPaymentOrder";
import CancleOrder from "../TotalOrder/CancleOrder";
import CreateOrder from "./CreateOrder";
import CustomButton from "../../Utility/Button";
import tabClick from "../../Utility/TabClick";

function Inhouse() {
  const [tabList, settabList] = useState([
    {
      tabName: "Confirmed Orders",
      active: true,
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
      tabName: "+ Create New Order",
      active: false,
      render: <CreateOrder />,
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
                        pillTarget="basic-info"
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

export default Inhouse;
