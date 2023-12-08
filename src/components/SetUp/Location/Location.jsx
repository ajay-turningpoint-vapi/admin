import React, { useState } from "react";
import CustomButton from "../../Utility/Button";
import tabClick from "../../Utility/TabClick";
import State from "./State";
import Country from "./Country";
import City from "./City";

function Location() {
  const [tabList, settabList] = useState([
    {
      tabName: "Country",
      active: false,
      render: <Country />,
    },
    {
      tabName: "State",
      active: true,
      render: <State />,
    },
    {
      tabName: "City",
      active: false,
      render: <City />,
    },
  ]);

  return (
    <main>
      <section className="total-order" style={{ minHeight: "75vh" }}>
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12">
              <div className="d-flex justify-content-between mb-4 align-items-center">
                <h5 className="blue-1 mb-0">Location</h5>
                <ul className="d-flex total-order-tab align-items-center justify-content-end gap-2 dashboard-pills">
                  {tabList.map((item, i) => {
                    return (
                      <li key={i}>
                        <CustomButton
                          navPills
                          btnName={item.tabName}
                          pillActive={item.active ? true : false}
                          ClickEvent={() => tabClick(i, tabList, settabList)}
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>
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

export default Location;
