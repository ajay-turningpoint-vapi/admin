import React, { useState, useEffect } from "react";
import ActionIcon from "../../Utility/ActionIcon";
import CustomButton from "../../Utility/Button";
import DataTable from "react-data-table-component";
import { DashboardBox, DashboardTable } from "../../Utility/DashboardBox";
import SearchBox from "../../Utility/SearchBox";
import { useDispatch, useSelector } from "react-redux";
import { generalModelStatuses } from "../../Utility/constants";
import { ATTRIBUTE_VALUEDelete, ATTRIBUTE_VALUEUpdate, ATTRIBUTE_VALUE_Add, ATTRIBUTE_VALUE_Get, SetATTRIBUTE_VALUEObj } from "../../../redux/actions/Attribute/Attribute.actions";
function AttributeValue() {
  const [name, setName] = useState("");
  const [status, setStatus] = useState(generalModelStatuses.APPROVED);

  const attributeValueArr = useSelector((state) => state.attribute.attributeValues);
  const attributeValueObj = useSelector((state) => state.attribute.attributeValueObj);
  const [selectedAttributeId, setSelectedAttributeId] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    let obj = {
      name,
      status,
    };
    if (isUpdate) {
      console.log(selectedAttributeId);
      dispatch(ATTRIBUTE_VALUEUpdate(obj, selectedAttributeId));
    } else {
      dispatch(ATTRIBUTE_VALUE_Add(obj));
    }
  };

  const handleEdit = (row) => {
    dispatch(SetATTRIBUTE_VALUEObj(row));
  };

  const handleDeleteById = (id) => {
    dispatch(ATTRIBUTE_VALUEDelete(id));
  };

  useEffect(() => {
    dispatch(ATTRIBUTE_VALUE_Get());
  }, []);

  useEffect(() => {
    if (attributeValueObj) {
      setName(attributeValueObj?.name);
      setStatus(attributeValueObj?.status);
      setSelectedAttributeId(attributeValueObj?._id);
      setIsUpdate(true);
    }
  }, [attributeValueObj]);

  const product_sale_columns = [
    {
      name: "SL",
      cell: (row, index) => index + 1,
      sortable: false,
    },
    {
      name: "ATTRIBUTE NAME",
      selector: (row) => row.name,
    },

    {
      name: "Status",
      minWidth: "210px",
      maxWidth: "211px",
      button: true,
      cell: (row) => <CustomButton disabled greenBtn noIcon btnName="Active" path={row.url} />,
    },
    {
      name: "Action",
      minWidth: "210px",
      maxWidth: "211px",
      cell: (row) => (
        <ActionIcon Uniquekey={row.id} remove edit deletePath="/Product/Attribute-Value" onDeleteClick={() => handleDeleteById(row._id)} isRedirected={true} onEditClick={() => handleEdit(row)} editPath="/Product/Attribute-Value" />
      ),
    },
  ];

  //   ====================================================================

  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12 col-md-4">
              <h5 className="blue-1 mb-4">Attribute Value</h5>
              <DashboardBox>
                <form action="#" className="form row">
                  <div className="col-12">
                    <label className="blue-1 fs-12">
                      Name <span className="red">*</span>
                    </label>
                    <input value={name} onChange={(event) => setName(event.target.value)} type="text" className="form-control" />
                  </div>
                  <div className="col-12">
                    <label className="blue-1 fs-12">Status</label>
                    <div className="d-flex">
                      <div className="form-check form-check-inline d-flex align-items-center">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="category-status"
                          value={status}
                          checked={status == generalModelStatuses.APPROVED}
                          onClick={() => setStatus(generalModelStatuses.APPROVED)}
                          id="category-Radio1"
                        />
                        <label className="form-check-label fs-14" htmlFor="category-Radio1">
                          Active
                        </label>
                      </div>
                      <div className="form-check form-check-inline d-flex align-items-center">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="category-status"
                          value={status}
                          checked={status == generalModelStatuses.DECLINED}
                          onClick={() => setStatus(generalModelStatuses.DECLINED)}
                          id="category-Radio2"
                        />
                        <label className="form-check-label fs-14" htmlFor="category-Radio2">
                          Inactive
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 mt-3">
                    <CustomButton btntype="button" ClickEvent={handleSubmit} isBtn iconName="fa-solid fa-check" btnName="Save" />
                  </div>
                </form>
              </DashboardBox>
            </div>
            <div className="col-12 col-md-8">
              <div className="d-flex gap-3 align-items-center justify-content-between mb-4">
                <h5 className="blue-1 m-0">Attribute List</h5>
                <SearchBox extraClass="bg-white" />
              </div>
              <DashboardTable>
                <DataTable columns={product_sale_columns} data={attributeValueArr && attributeValueArr.length > 0 ? attributeValueArr : []} pagination />
              </DashboardTable>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AttributeValue;
