import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { ATTRIBUTEDelete, ATTRIBUTE_VALUE_Get } from "../../../redux/actions/Attribute/Attribute.actions";
import ActionIcon from "../../Utility/ActionIcon";
import CustomButton from "../../Utility/Button";
import { DashboardBox, DashboardTable } from "../../Utility/DashboardBox";
import { AddModal } from "../../Utility/Modal";
import SearchBox from "../../Utility/SearchBox";
import AddAttribute from "./AddAttribute";
function Attribute() {
  const dispatch = useDispatch();

  const attributeArr = useSelector((state) => state.attribute.attributes);
  const [ModalType, setModalType] = useState("");
  const [ModalName, setModalName] = useState("");
  const [ModalBox, setModalBox] = useState(false);

  const handleEdit = (row) => {
    // dispatch(SetATTRIBUTE_VALUEObj(row));
  };

  const handleDeleteById = (id) => {
    dispatch(ATTRIBUTEDelete(id));
  };

  useEffect(() => {
    dispatch(ATTRIBUTE_VALUE_Get());
  }, []);

  const product_sale_columns = [
    {
      name: "SL",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "ATTRIBUTE NAME",
      selector: (row) => row.name,
    },
    {
      name: "DESCRIPTION",
      selector: (row) => row.description,
    },
    {
      name: "Status",
      minWidth: "210px",
      maxWidth: "211px",
      button: true,
      cell: (row) => <CustomButton greenBtn noIcon btnName="Active" path={row.url} />,
    },
    {
      name: "Action",
      minWidth: "210px",
      maxWidth: "211px",
      cell: (row) => (
        <>
          <ActionIcon Uniquekey={row.id} remove edit deletePath="/Product/Attribute" onDeleteClick={() => handleDeleteById(row._id)} isRedirected={true} onEditClick={() => handleEdit(row)} editPath="/Product/Attribute" />
          <AddModal ModalBox={ModalBox} setModalBox={setModalBox} name={ModalName} ModalType={ModalType} width="min-content" />
        </>
      ),
    },
  ];

  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12 col-md-4">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="blue-1 m-0">Add New Attribute</h5>
                <CustomButton isLink iconName="fa-solid fa-plus" btnName="Add Attribute Value" path="/Product/Attribute-Value" small />
              </div>
              <DashboardBox>
                <AddAttribute />
              </DashboardBox>
            </div>
            <div className="col-12 col-md-8">
              <div className="d-flex gap-3 justify-content-between mb-4 align-items-center">
                <h5 className="blue-1 m-0">Attribute Lists</h5>
                <SearchBox extraClass="bg-white" />
              </div>
              <DashboardTable>
                <DataTable columns={product_sale_columns} data={attributeArr && attributeArr.length > 0 ? attributeArr : []} pagination />
              </DashboardTable>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Attribute;
