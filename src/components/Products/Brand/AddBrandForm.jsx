import { Switch } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill"; // ES6
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { BrandAdd, BrandUpdate, SetBrandObj } from "../../../redux/actions/Brand/brand.actions";
import CustomButton from "../../Utility/Button";
import { generalModelStatuses } from "../../Utility/constants";
import { DashboardBox } from "../../Utility/DashboardBox";
import FileUpload from "../../Utility/FileUpload";

function AddBrandForm({ makeChange }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [imageStr, setImageStr] = useState("");
  const [selectedStatus, setSelectedStatus] = useState({ value: generalModelStatuses.PENDING, label: generalModelStatuses.PENDING });
  const brandObj = useSelector((state) => state.brand.brandObj);
  const options = Object.keys(generalModelStatuses).map((el) => ({ value: generalModelStatuses[el], label: el }));
  const [isUpdateBrand, setIsUpdateBrand] = useState(false);
  const [selectedBrandId, setselectedBrandId] = useState(false);
  useEffect(() => {
    if (brandObj) {
      setselectedBrandId(brandObj._id);
      setName(brandObj.name);
      setDescription(brandObj.description);
      setWebsiteLink(brandObj.websiteLink);
      setMetaDescription(brandObj.metaDescription);
      setMetaTitle(brandObj.metaTitle);
      setIsFeatured(brandObj.isFeatured);
      setSelectedStatus({ value: brandObj.statusInfo, label: brandObj.statusInfo });
      setIsUpdateBrand(true);
    }
    return () => {
      dispatch(SetBrandObj(null));
    };
  }, [brandObj]);

  const handleFileSet = (value) => {
    // console.log(value);
    setImageStr(value);
  };

  const handleSubmit = () => {
    let obj = {
      name,
      description,
      websiteLink,
      metaTitle,
      metaDescription,
      isFeatured,
      imageStr,
    };
    console.log(selectedBrandId);
    if (isUpdateBrand) {
      dispatch(BrandUpdate(obj, selectedBrandId));
    } else {
      dispatch(BrandAdd(obj));
    }
  };
  return (
    <div className={makeChange ? "makeChange" : ""}>
      <form className="form">
        <div className="row">
          <div className="col-12 col-md-8 mb-0">
            <DashboardBox className={makeChange ? "p-0" : ""}>
              <div className="border-bottom pb-3 mb-4 row">
                <h5 className={makeChange ? "blue-1" : "blue-1 mb-4"}>Brand Information</h5>
                <div className="col-12">
                  <label>
                    Name <span className="red">*</span>
                  </label>
                  <input type="text" onChange={(event) => setName(event.target.value)} value={name} className="form-control" />
                </div>
                <div className="col-12">
                  <label>Description</label>
                  <ReactQuill
                    theme="snow"
                    onChange={(event) => {
                      setDescription(event);
                    }}
                    value={description}
                  />
                </div>
                <div className="col-12">
                  <label>WEBSITE LINK</label>
                  <input type="text" onChange={(event) => setWebsiteLink(event.target.value)} value={websiteLink} className="form-control" />
                </div>
              </div>
              <div className="row">
                <h5 className={makeChange ? "blue-1" : "blue-1 mb-4"}>SEO info</h5>
                <div className="col-12">
                  <label>META TITLE</label>
                  <input type="text" onChange={(event) => setMetaTitle(event.target.value)} value={metaTitle} className="form-control" />
                </div>
                <div className="col-12">
                  <label>META DESCRIPTION</label>
                  <textarea name="META DESCRIPTION" onChange={(event) => setMetaDescription(event.target.value)} value={metaDescription} className="form-control" rows="3"></textarea>
                </div>
              </div>
            </DashboardBox>
          </div>
          <div className="col-12 col-md-4 mb-0">
            <DashboardBox className={makeChange ? "p-0" : ""}>
              <div className="row">
                <h5 className={makeChange ? "blue-1" : "blue-1 mb-4"}>Status Info</h5>

                <div className="col-12">
                  <label>
                    STATUS <span className="red">*</span>
                  </label>
                  <Select value={selectedStatus} options={options} />
                </div>
                <div className="col-12">
                  <label>Logo (150x150)PX</label>
                  <FileUpload onFileChange={handleFileSet} />
                </div>
                <div className="col-12">
                  <label>Is Featured</label>
                  <div>
                    <Switch defaultChecked={isFeatured} onChange={() => setIsFeatured(!isFeatured)} />
                  </div>
                </div>
                <div className="col-12">
                  <CustomButton isBtn btntype="button" ClickEvent={handleSubmit} iconName="fa-solid fa-check" btnName="Save" small={makeChange ? true : false} />
                </div>
              </div>
            </DashboardBox>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddBrandForm;
