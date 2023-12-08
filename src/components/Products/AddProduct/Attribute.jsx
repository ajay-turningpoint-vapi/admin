import React, { useState } from "react";
import CustomButton from "../../Utility/Button";
import Select from "react-select";
import { AddModal } from "../../Utility/Modal";

function Attribute({
  ModalBox,
  setModalBox,
  ModalType,
  ModalName,
  setModalType,
  setModalName,
}) {
  // =====================================================================================================

  const attr = [
    { value: "size", label: "Size" },
    { value: "color", label: "Color" },
  ];

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const [AttributeFeild, setAttributeFeild] = useState([]);
  const [AttributeSelected, setAttributeSelected] = useState("");
  const [AttributeMessage, setAttributeMessage] = useState(false);
  // =====================================================================================================

  const onAttributeSelected = (e) => {
    addAttributeField(e.value);
    setAttributeSelected(e.value);
    console.log(AttributeSelected, e.value);
  };

  const deleteAttributeField = (index) => {
    const temp = [...AttributeFeild];
    temp.splice(index, 1);
    setAttributeFeild([...temp]);
  };
  const addAttributeField = (value) => {
    let array = [];
    let index = AttributeFeild.findIndex((item) => item.subcategory === value);
    if (index === -1) {
      array = [...AttributeFeild, { subcategory: value, select: options }];
    } else {
      setAttributeMessage(true);
      setTimeout(() => setAttributeMessage(false), 1300);
      array = [...AttributeFeild];
      // array.splice(index, 1);
    }
    setAttributeFeild([...array]);
  };

  // =====================================================================================================

  return (
    <div className="col-12 mb-3">
      <div className="d-flex align-items-baseline justify-content-between">
        <label>ATTRIBUTE</label>
        <CustomButton
          isBtn
          iconName="fa-solid fa-circle-plus"
          btnName="ADD NEW"
          changeClass="green fs-12 border-0 bg-white"
          ClickEvent={(e) => {
            e.preventDefault();
            setModalBox(true);
            setModalType("addAttributeModal");
            setModalName("Create Attribute");
          }}
        />
        <AddModal
          ModalBox={ModalBox}
          setModalBox={setModalBox}
          name={ModalName}
          ModalType={ModalType}
        />
      </div>
      <Select
        options={attr}
        defaultInputValue={AttributeSelected}
        onChange={(e) => onAttributeSelected(e)}
      />
      {AttributeMessage && (
        <div className="form-text">Attribute is already selected</div>
      )}
      {AttributeFeild.map((item, i) => {
        return (
          <div className="row mt-3 align-items-center" key={i}>
            <div className="col-12 col-md-5 mb-0">
              <input
                type="text"
                value={item.subcategory}
                className="form-control text-capitalize"
                readOnly
              />
            </div>
            <div className="col-12 col-md-6 mb-0">
              <Select options={item.select} />
            </div>
            <div className="col-12 col-md-1 mb-0">
              <i
                className="ion-close-circled fs-4"
                onClick={() => deleteAttributeField(i)}
                style={{ cursor: "pointer" }}
              ></i>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Attribute;
