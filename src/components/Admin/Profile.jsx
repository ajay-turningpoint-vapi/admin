import React, { useState } from "react";
import BaiscInfo from "./BaiscInfo";
import ChangePassword from "./ChangePassword";
import Address from "./Address";
import CustomButton from "../Utility/Button";
import tabClick from "../Utility/TabClick";

function Profile() {
  const [addAddress, setaddAddress] = useState(false);
  const [tabList, settabList] = useState([
    {
      tabName: "BASIC INFO",
      active: true,
      render: <BaiscInfo />,
    },
    {
      tabName: "CHANGE PASSWORD",
      active: false,
      render: <ChangePassword />,
    },
    // {
    //   tabName: "ADDRESS",
    //   active: false,
    //   render: <Address addAddress={addAddress} />,
    // },
  ]);

  return (
    <main>
      <section className="product-category" style={{ minHeight: "75vh" }}>
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12">
              <ul
                className="nav nav-pills dashboard-pills mb-3 justify-content-end"
                id="pills-tab"
                role="tablist"
              >
                {tabList.map((item, i) => {
                  return (
                    <li key={i}>
                      <CustomButton
                        navPills
                        btnName={item.tabName}
                        pillActive={item.active ? true : false}
                        ClickEvent={() => { setaddAddress(false); tabClick(i, tabList, settabList) }}
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

export default Profile;
