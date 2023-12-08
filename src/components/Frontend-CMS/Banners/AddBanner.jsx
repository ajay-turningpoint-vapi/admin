import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import CustomButton from "../../Utility/Button";
import { generalModelStatuses } from "../../Utility/constants";
import { DashboardBox } from "../../Utility/DashboardBox";
import FileUpload from "../../Utility/FileUpload";
import { useDispatch, useSelector } from "react-redux";
import { BANNERAdd, BANNERUpdate, SetBANNERObj } from "../../../redux/actions/Banner/Banner.actions";

function AddBanner() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [imageStr, setImageStr] = useState("");
  const [isUpdateBanner, setIsUpdateBanner] = useState(false);
  const [selectedBannerId, setselectedBannerId] = useState("");
  const [prevImage, setPrevImage] = useState("");
  const [status, setStatus] = useState(generalModelStatuses.PENDING);
  const bannerObj = useSelector((state) => state.banner.bannerObj);

  const handleFileSet = (value) => {
    // console.log(value);
    setImageStr(value);
  };

  useEffect(() => {
    if (bannerObj) {
      setselectedBannerId(bannerObj._id);
      setName(bannerObj.name);
      setDescription(bannerObj.description);
      setUrl(bannerObj.url);
      setselectedBannerId(bannerObj._id);
      setPrevImage(bannerObj.image);
      // setSelectedStatus({ value: brandObj.statusInfo, label: brandObj.statusInfo });
      setIsUpdateBanner(true);
    }
    return () => {
      dispatch(SetBANNERObj(null));
    };
  }, [bannerObj]);

  const handleSubmit = () => {
    let obj = {
      name,
      description,
      status,
      url,
      image: imageStr ? imageStr : prevImage,
    };
    console.log(selectedBannerId);
    if (isUpdateBanner) {
      dispatch(BANNERUpdate(obj, selectedBannerId));
    } else {
      dispatch(BANNERAdd(obj));
    }
  };
  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <h5 className="blue-1 mb-4">{isUpdateBanner ? "Update" : "Add New "} Branner</h5>
          <form action="#" className="form">
            <div className="row">
              <div className="col-12 col-md-8 mb-0">
                <DashboardBox>
                  <div className="row">
                    <h5 className="blue-1 mb-4">Banner Information</h5>
                    <div className="col-12">
                      <label>
                        Name <span className="red">*</span>
                      </label>
                      <input value={name} onChange={(event) => setName(event.target.value)} type="text" className="form-control" />
                    </div>
                    <div className="col-12">
                      <label>Description</label>
                      <ReactQuill value={description} onChange={(event) => setDescription(event)} theme="snow" />
                    </div>
                    <div className="col-12">
                      <label>WEBSITE LINK</label>
                      <input value={url} onChange={(event) => setUrl(event.target.value)} type="text" className="form-control" />
                    </div>
                  </div>
                </DashboardBox>
              </div>
              <div className="col-12 col-md-4 mb-0">
                <DashboardBox>
                  <div className="row">
                    <h5 className="blue-1 mb-4">Status Info</h5>
                    <div className="col-12">
                      <label>Banner (150x150)PX</label>
                      <FileUpload onFileChange={handleFileSet} />
                    </div>
                    <div className="col-12">
                      <label>Status</label>
                      <div className="form-check form-check-inline d-flex align-items-center">
                        <input checked={status == generalModelStatuses.APPROVED} className="form-check-input" type="checkbox" name="category-status" value="option1" id="active-banner" />
                        <label className="form-check-label fs-14" htmlFor="active-banner">
                          Active
                        </label>
                      </div>
                    </div>
                    <div className="col-12 mt-2">
                      <CustomButton btntype="button" ClickEvent={handleSubmit} isBtn iconName="fa-solid fa-check" btnName="Save" />
                    </div>
                  </div>
                </DashboardBox>
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

export default AddBanner;
