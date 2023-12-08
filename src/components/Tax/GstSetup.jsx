import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import ActionIcon from "../Utility/ActionIcon";
import CustomButton from "../Utility/Button";
import { generalModelStatuses } from "../Utility/constants";
import { DashboardBox, DashboardTable } from "../Utility/DashboardBox";
import SearchBox from "../Utility/SearchBox";
import { useSelector, useDispatch } from "react-redux";
import { SetTAXObj, TAXAdd, TAXGet, TAXUpdate } from "../../redux/actions/Tax/Tax.actions";
function GstSetup() {
  const [name, setName] = useState("");
  const [rate, setRate] = useState(0);
  const [status, setStatus] = useState(generalModelStatuses.APPROVED);
  const taxObj = useSelector((state) => state.taxes.taxObj);
  const [isUpdate, setIsUpdate] = useState(false);
  const [taxId, setTaxId] = useState(null);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    let obj = {
      name,
      rate,
    };
    if (isUpdate) {
      dispatch(TAXUpdate(obj, taxId));
    } else {
      dispatch(TAXAdd(obj));
    }
  };

  const taxes = useSelector((state) => state.taxes.taxes);
  console.log(taxes);
  useEffect(() => {
    dispatch(TAXGet());
  }, []);

  useEffect(() => {
    if (taxObj) {
      setName(taxObj.name);
      setRate(taxObj.rate);
      setIsUpdate(true);
      setTaxId(taxObj._id);
    }
  }, [taxObj]);

  const handleEdit = (row) => {
    dispatch(SetTAXObj(row));
  };
  const gst_columns = [
    {
      name: "ID",
      cell: (row, index) => index + 1,
      sortable: false,
      width: "20%",
    },
    {
      name: "NAME",
      selector: (row) => row.name,
      width: "20%",
    },
    {
      name: "RATE (%)",
      selector: (row) => row.rate,
      width: "20%",
    },
    {
      name: "STATUS",
      button: true,
      cell: (row) => <CustomButton greenBtn btnName="ACTIVE" />,
      width: "20%",
    },
    {
      name: "Action",
      cell: (row) => <ActionIcon edit onEditClick={() => handleEdit(row)} isRedirected={true} editPath="/GST-SETUP" deletePath="/GST-SETUP" remove Uniquekey={row.id} />,
      width: "20%",
    },
  ];

  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12 col-md-4">
              <h5 className="blue-1 mb-4"> {!isUpdate ? "Add New" : "Update "} GST/VAT/TAX</h5>
              <DashboardBox>
                <form className="form row">
                  <div className="col-12 mb-3">
                    <label className="blue-1 fs-12">
                      NAME<span className="red">*</span>
                    </label>
                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="col-12 mb-3">
                    <label className="blue-1 fs-12">
                      RATE (%)<span className="red">*</span>
                    </label>
                    <input type="number" className="form-control" value={rate} onChange={(e) => setRate(e.target.value)} />
                  </div>
                  <div className="col-12 mb-4">
                    <label className="blue-1 fs-12">STATUS</label>
                    <div className="d-flex">
                      <div className="form-check form-check-inline d-flex align-items-center">
                        <input onClick={(e) => setStatus(generalModelStatuses.APPROVED)} checked={status == generalModelStatuses.APPROVED} className="form-check-input" type="radio" name="category-status" value="option1" id="active-tax" />
                        <label className="form-check-label fs-14" htmlFor="active-tax">
                          Active
                        </label>
                      </div>
                      <div className="form-check form-check-inline d-flex align-items-center">
                        <input onClick={(e) => setStatus(generalModelStatuses.DECLINED)} checked={status == generalModelStatuses.DECLINED} className="form-check-input" type="radio" name="category-status" value="option2" id="inActive-tax" />
                        <label className="form-check-label fs-14" htmlFor="inActive-tax">
                          Inactive
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <CustomButton btntype="button" ClickEvent={handleSubmit} iconName="fa-solid fa-check" btnName="Save" isBtn />
                  </div>
                </form>
              </DashboardBox>
            </div>
            <div className="col-12 col-md-8">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="blue-1 m-0">GST/VAT/TAX List</h5>
                <SearchBox extraClass="bg-white" />
              </div>

              <DashboardTable>
                <DataTable columns={gst_columns} data={taxes && taxes.length > 0 ? taxes : []} pagination />
              </DashboardTable>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default GstSetup;
