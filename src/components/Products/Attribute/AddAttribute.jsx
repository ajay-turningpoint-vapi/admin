import React, { useState, useEffect } from "react";
import Select from "react-select";
import CustomButton from "../../Utility/Button";
import { generalModelStatuses } from "../../Utility/constants";
import { useDispatch, useSelector } from "react-redux";
import { ATTRIBUTEAdd, ATTRIBUTEGet, ATTRIBUTE_VALUE_Get } from "../../../redux/actions/Attribute/Attribute.actions";
function AddAttribute() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedAttributeIdArr, setSelectedAttributeIdArr] = useState([]);

  const [status, setStatus] = useState(generalModelStatuses.APPROVED);
  const attributeValueArr = useSelector((state) => state.attribute.attributeValues);

  const handleSubmit = () => {
    let obj = {
      name,
      description,
      attributeValueArr: selectedAttributeIdArr.map((el) => ({ attributeId: el._id })),
    };
    // console.log(obj);
    dispatch(ATTRIBUTEAdd(obj));
  };
  useEffect(() => {
    dispatch(ATTRIBUTEGet());
  }, []);

  const handleAttributeValueChange = (e) => {
    setSelectedAttributeIdArr(e);
  };

  return (
    <form action="#" className="form row">
      <div className="col-12">
        <label className="blue-1 fs-12">
          Name <span className="red">*</span>
        </label>
        <input value={name} onChange={(event) => setName(event.target.value)} type="text" className="form-control" />
      </div>
      <div className="col-12">
        <label className="blue-1 fs-12">DESCRIPTION</label>
        <textarea value={description} onChange={(event) => setDescription(event.target.value)} className="form-control" rows="5"></textarea>
      </div>
      <div className="col-12">
        <label className="blue-1 fs-12">Attribute</label>
        <Select onChange={handleAttributeValueChange} isMulti options={attributeValueArr && attributeValueArr.length > 0 ? attributeValueArr.map((el) => ({ ...el, label: el.name, value: el._id })) : []} />
      </div>
      <div className="col-12">
        <label className="blue-1 fs-12">Status</label>
        <div className="d-flex">
          <div className="form-check form-check-inline d-flex align-items-center">
            <input className="form-check-input" type="radio" name="category-status" value={status} checked={status == generalModelStatuses.APPROVED} onClick={() => setStatus(generalModelStatuses.APPROVED)} id="category-Radio1" />
            <label className="form-check-label fs-14" htmlFor="category-Radio1">
              Active
            </label>
          </div>
          <div className="form-check form-check-inline d-flex align-items-center">
            <input className="form-check-input" type="radio" name="category-status" value={status} checked={status == generalModelStatuses.DECLINED} onClick={() => setStatus(generalModelStatuses.DECLINED)} id="category-Radio2" />
            <label className="form-check-label fs-14" htmlFor="category-Radio2">
              Inactive
            </label>
          </div>
        </div>
      </div>
      <div className="col-12 mt-2">
        <CustomButton btntype="button" ClickEvent={handleSubmit} isBtn iconName="fa-solid fa-check" btnName="Save" />
      </div>
    </form>
  );
}

export default AddAttribute;
