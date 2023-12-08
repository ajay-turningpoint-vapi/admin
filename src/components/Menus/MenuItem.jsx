import React, { useState } from "react";
import Select from "react-select";
import CustomButton from "../Utility/Button";
import { DashboardBox } from "../Utility/DashboardBox";

function MenuItem() {
  const [ItemType, setItemType] = useState("category");
  const type = [
    { value: "category", label: "Category" },
    { value: "page", label: "Page" },
    { value: "url", label: "URL" },
  ];
  const category = [
    { value: "Anklets", label: "Anklets" },
    { value: "Best selling looks", label: "Best selling looks" },
    { value: "Big Diwali Sale", label: "Big Diwali Sale" },
    { value: "Chokers", label: "Chokers" },
    { value: "Clutches &amp; bags", label: "Clutches &amp; bags" },
    { value: "uffs", label: "uffs" },
    { value: "arrings", label: "arrings" },
    { value: "Gift Hampers", label: "Gift Hampers" },
    { value: "Hairpins", label: "Hairpins" },
    { value: "eckpiece", label: "eckpiece" },
    { value: "ose pins", label: "ose pins" },
    { value: "Options Under 3500", label: "Options Under 3500" },
    { value: "Pendants", label: "Pendants" },
    { value: "ings", label: "ings" },
    { value: "SALE", label: "SALE" },
  ];
  const page = [
    { value: "about-us", label: "about-us" },
    { value: "cancellation", label: "cancellation" },
    { value: "privacy-policy", label: "privacy-policy" },
    {
      value: "shipping-and-return-policy",
      label: "shipping-and-return-policy",
    },
    { value: "terms-conditions", label: "terms-conditions" },
  ];
  const target = [
    { value: "Same Tab", label: "Same Tab" },
    { value: "New Tab", label: "New Tab" },
  ];

  return (
    <main>
      <section className="product-category" style={{ minHeight: "75vh" }}>
        <div className="container-fluid p-0">
          <h5 className="blue-1 mb-4">Create Menu Item</h5>
          <DashboardBox className='col-lg-8'>
            <div className="form row">
              <div className="col-12">
                <label>
                  Name
                  <span className="red">*</span>
                </label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-12">
                <label>
                  Type
                  <span className="red">*</span>
                </label>
                <Select options={type} onChange={(e) => setItemType(e.value)} />
              </div>
              {ItemType === "category" && (
                <div className="col-12">
                  <label>
                    Category
                    <span className="red">*</span>
                  </label>
                  <Select options={category} />
                </div>
              )}
              {ItemType === "page" && (
                <div className="col-12">
                  <label>
                    Page
                    <span className="red">*</span>
                  </label>
                  <Select options={page} />
                </div>
              )}
              {ItemType === "url" && (
                <div className="col-12">
                  <label>
                    URL
                    <span className="red">*</span>
                  </label>
                  <input type="url" className="form-control" />
                </div>
              )}
              <div className="col-12">
                <label>Target</label>
                <Select options={target} />
              </div>
              <div className="col-12">
                <label>Parent Menu Item</label>
                <Select options={page} />
              </div>
              <div className="col-12 mb-4">
                <label>Status</label>
                <div className="d-flex">
                  <div className="form-check form-check-inline d-flex align-items-center">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="category-status"
                      value="option1"
                      id="enable-menu-item"
                    />
                    <label
                      className="form-check-label fs-14 pointer"
                      htmlFor="enable-menu-item"
                    >
                      Enable the menu item
                    </label>
                  </div>
                  <div className="form-check form-check-inline d-flex align-items-center">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="category-status"
                      value="option2"
                      id="full-menu"
                    />
                    <label
                      className="form-check-label fs-14 pointer"
                      htmlFor="full-menu"
                    >
                      This is a full width menu
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-12 text-center">
                <CustomButton
                  isBtn
                  iconName="fa-solid fa-check"
                  btnName="Save"
                  roundedPill
                />
              </div>
            </div>
          </DashboardBox>
        </div>
      </section>
    </main>
  );
}

export default MenuItem;
