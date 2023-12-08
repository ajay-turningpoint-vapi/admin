import React, { useState } from "react";
import DataTable from "react-data-table-component";
import Select from "react-select";
import ActionIcon from "../Utility/ActionIcon";
import CustomButton from "../Utility/Button";
import { DashboardBox, DashboardTable } from "../Utility/DashboardBox";
import SearchBox from "../Utility/SearchBox";

function GstConfig() {
  // =====================================================================================================================

  const [ActiveTax, setActiveTax] = useState(true);
  const options = [
    { value: "CGST (6%)", label: "CGST (6 %)" },
    { value: "SGST (6%)", label: "SGST (6 %)" },
    { value: "IGST (12%)", label: "IGST (12 %)" },
  ];
  const gst_columns = [
    {
      name: "ID",
      selector: (row) => row.sl,
      sortable: true,
      width: "20%",
    },
    {
      name: "NAME",
      selector: (row) => row.name,
      width: "20%",
    },
    {
      name: "Same State GST/VAT/TAX",
      selector: (row) => row.same,
      width: "20%",
    },
    {
      name: "Outsite State GST/VAT/TAX",
      selector: (row) => row.outside,
      width: "20%",
    },
    {
      name: "Action",
      cell: (row) => <ActionIcon edit remove Uniquekey={row.id} />,
      width: "20%",
    },
  ];

  const gst_data = [
    {
      id: "1",
      sl: "1",
      name: "IGST",
      same: "12",
      outside: "4",
    },
    {
      id: "2",
      sl: "2",
      name: "SGST",
      same: "6",
      outside: "2",
    },
    {
      id: "3",
      sl: "3",
      name: "CGST",
      same: "8",
      outside: "4",
    },
    {
      id: "4",
      sl: "4",
      name: "IGST",
      same: "5",
      outside: "15",
    },
    {
      id: "5",
      sl: "5",
      name: "SGST",
      same: "2",
      outside: "8",
    },
  ];
  const [SameState, setSameState] = useState("");
  const [OutsideState, setOutsideState] = useState("");
  const [gstStateRate, setgstStateRate] = useState([]); //store data of state
  const [gstOutsideRate, setgstOutsideRate] = useState([]); //store data of state
  const GstSameState = (value) => {
    setSameState(value);
    addSameStateGst(value);
  };
  const addSameStateGst = (value) => {
    let temp = [];
    let state = value.split(" ");
    const type = state[0];
    const rate = state[1];
    const index = gstStateRate.findIndex((item) => item.type === type);
    console.log(type, index);
    if (index === -1) {
      temp = [...gstStateRate, { type, rate }];
    } else {
      temp = [...gstStateRate];
    }
    setgstStateRate([...temp]);
  };
  const GstOutsideState = (value) => {
    setOutsideState(value);
    addOutsideStateGst(value);
  };
  const addOutsideStateGst = (value) => {
    let temp = [];
    let state = value.split(" ");
    const type = state[0];
    const rate = state[1];

    const index = gstOutsideRate.findIndex((item) => item.type === type);
    if (index === -1) {
      temp = [...gstOutsideRate, { type, rate }];
    } else {
      temp = [...gstOutsideRate];
    }
    setgstOutsideRate([...temp]);
  };
  //   =====================================================================================================================

  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <div className="row gy-4">
            <div className="col-12">
              <DashboardBox>
                <h5 className="blue-1 mb-4">GST/VAT/TAX Configuration</h5>
                <form action="#" className="form row">
                  <div className="col-12 mb-3">
                    <div className="d-flex">
                      <div className="form-check form-check-inline d-flex align-items-center">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="category-status"
                          value="option1"
                          id="active-gst"
                          checked={ActiveTax}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setActiveTax(true);
                            } else {
                              setActiveTax(false);
                            }
                          }}
                        />
                        <label
                          className="form-check-label fs-14 pointer"
                          htmlFor="active-gst"
                        >
                          Is Active GST/VAT/TAX
                        </label>
                      </div>
                      <div className="form-check form-check-inline d-flex align-items-center">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="category-status"
                          value="option2"
                          id="active-flat-tax"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setActiveTax(false);
                            } else {
                              setActiveTax(true);
                            }
                          }}
                        />
                        <label
                          className="form-check-label fs-14 pointer"
                          htmlFor="active-flat-tax"
                        >
                          Is Active Flat Tax
                        </label>
                      </div>
                    </div>
                  </div>
                  {ActiveTax && (
                    <>
                      <div className="col-12 mb-3">
                        <label>DELIVERY INSIDE STATE</label>
                        <Select options={options} isMulti />
                      </div>
                      <div className="col-12 mb-3">
                        <label>DELIVERY OUTSIDE STATE</label>
                        <Select options={options} isMulti />
                      </div>
                    </>
                  )}
                  {!ActiveTax && (
                    <div className="col-12 mb-3">
                      <label>FLAT TAX PERCENTAGE</label>
                      <Select options={options} isMulti />
                    </div>
                  )}
                  <div className="col-12 text-center mt-2">
                    <CustomButton
                      iconName="fa-solid fa-check"
                      btnName="Save"
                      isBtn
                    />
                  </div>
                </form>
              </DashboardBox>
            </div>
            <div className="col-12 col-md-4">
              <DashboardBox>
                <h5 className="blue-1 mb-4">Add Group</h5>
                <form action="#" className="form row">
                  <div className="col-12 mb-3">
                    <label>
                      NAME<span className="red">*</span>
                    </label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-12 mb-3">
                    <h6 className="blue-1">Same State GST/VAT/TAX</h6>
                    <Select
                      options={options}
                      defaultInputValue={SameState}
                      onChange={(e) => GstSameState(e.value)}
                    />
                  </div>
                  {gstStateRate.map((item, i) => {
                    return (
                      <div className="row pe-0" key={i}>
                        <div className="col-12 col-md-6 mb-3">
                          <input
                            type="text"
                            readOnly
                            className="form-control"
                            defaultValue={item.type}
                          />
                        </div>
                        <div className="col-12 col-md-6 mb-3 pe-0">
                          <input
                            type="text"
                            className="form-control"
                            defaultValue={item.rate}
                          />
                        </div>
                      </div>
                    );
                  })}
                  <div className="col-12 mb-3">
                    <h6 className="blue-1">Outsite State GST/VAT/TAX</h6>
                    <Select
                      options={options}
                      defaultInputValue={OutsideState}
                      onChange={(e) => GstOutsideState(e.value)}
                    />
                  </div>
                  {gstOutsideRate.map((item, i) => {
                    return (
                      <div className="row pe-0" key={i}>
                        <div className="col-12 col-md-6 mb-3">
                          <input
                            type="text"
                            readOnly
                            className="form-control"
                            defaultValue={item.type}
                          />
                        </div>
                        <div className="col-12 col-md-6 mb-3 pe-0">
                          <input
                            type="text"
                            className="form-control"
                            defaultValue={item.rate}
                          />
                        </div>
                      </div>
                    );
                  })}
                  <div className="col-12">
                    <CustomButton
                      iconName="fa-solid fa-check"
                      btnName="Save"
                      isBtn
                    />
                  </div>
                </form>
              </DashboardBox>
            </div>
            <div className="col-12 col-md-8">
              <DashboardTable>
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <h5 className="blue-1 m-0">GST/VAT/TAX List</h5>
                  <SearchBox extraClass="bg-white" />
                </div>
                <DataTable columns={gst_columns} data={gst_data} pagination />
              </DashboardTable>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default GstConfig;
