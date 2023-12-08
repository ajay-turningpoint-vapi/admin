import React, { useEffect, useState } from "react";
import Select from "react-select";
import CustomButton from "../../Utility/Button";
import { generalModelStatuses } from "../../Utility/constants";
import FileUpload from "../../Utility/FileUpload";
import { useDispatch, useSelector } from "react-redux";
import { CATEGORYAdd, CATEGORYGet, CATEGORYUpdate, SetCATEGORYObj } from "../../../redux/actions/Category/Category.actions";
function AddCategory({ makeChange }) {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [isSearchable, setIsSearchable] = useState(false);
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState(generalModelStatuses.APPROVED);
  const [selectedParentCategoryId, setSelectedParentCategoryId] = useState("");
  const [toggleSubCategory, setToggleSubCategory] = useState(false);
  const [subcategoryArr, setSubcategoryArr] = useState([]);

  const [imageStr, setImageStr] = useState("");
  const [addSubCategory, setaddSubCategory] = useState(false);

  const [prevCategoryObj, setPrevCategoryObj] = useState(null);
  const [prevCategoryId, setPrevCategoryId] = useState(null);
  const categoryArr = useSelector((state) => state.category.categories);
  const categoryObj = useSelector((state) => state.category.categoryObj);
  const handleAddCategory = () => {
    let obj = {
      name,
      slug,
      price,
      status,
      isSearchable,
      imageStr,
      parentCategoryId: selectedParentCategoryId,
    };
    if (categoryObj?._id) {
      dispatch(CATEGORYUpdate(prevCategoryId, obj));
    } else {
      dispatch(CATEGORYAdd(obj));
    }
  };

  useEffect(() => {
    if (categoryObj) {
      setName(categoryObj?.name);
      setSlug(categoryObj?.slug);
      setIsSearchable(categoryObj?.isSearchable);
      setStatus(categoryObj?.status);
      setPrice(categoryObj?.price);

      if (categoryObj?.parentCategoryId) {
        setSelectedParentCategoryId(categoryObj?.parentCategoryId);
        setPrevCategoryObj({ label: categoryArr?.find((el) => el._id == categoryObj?.parentCategoryId)?.name, value: categoryObj.parentCategoryId });
        setaddSubCategory(true);
      }
      setPrevCategoryId(categoryObj?._id);
    }

    // return () => {
    //   dispatch(SetCATEGORYObj(null));
    // };
  }, [categoryObj]);

  useEffect(() => {
    dispatch(CATEGORYGet());
  }, []);

  const handleChange = (value) => {
    console.log(value);
    setSelectedParentCategoryId(value._id);
  };
  const handleFileSet = (value) => {
    setImageStr(value);
  };

  return (
    <div className={makeChange ? "makeChange" : ""}>
      <form className="form row">
        <div className={makeChange ? "col-12 col-md-6" : "col-12"}>
          <label className="blue-1 fs-12">
            Name <span className="red">*</span>
          </label>
          <input value={name} onChange={(event) => setName(event.target.value)} type="text" className="form-control" />
        </div>
        <div className={makeChange ? "col-12 col-md-6" : "col-12"}>
          <label className="blue-1 fs-12">
            SLUG <span className="red">*</span>
          </label>
          <input value={slug} onChange={(event) => setSlug(event.target.value)} type="text" className="form-control" />
        </div>
        <div className={makeChange ? "col-12 col-md-6" : "col-12"}>
          <label className="blue-1 fs-12">
            Price <span className="red">*</span>
          </label>
          <input value={price} onChange={(event) => setPrice(event.target.value)} type="number" className="form-control" />
        </div>
        {/* <div className={makeChange ? "col-12" : "col-12"}>
          <label className="blue-1 fs-12">
            ICON (TO USE THEMEFY ICON PLEASE TYPE HERE OR SELECT FONTAWESOME
            FROM LIST)
          </label>
          <input type="text" className="form-control" />
        </div> */}
        <div className={makeChange ? "col-12 col-md-4" : "col-12"}>
          <label className="blue-1 fs-12">SEARCHABLE</label>
          <div className="d-flex">
            <div className="form-check form-check-inline d-flex align-items-center">
              <input className="form-check-input" type="radio" name="category-status" id="category-searchable-Radio1" checked={isSearchable} onClick={() => setIsSearchable(true)} />
              <label className="form-check-label fs-14" htmlFor="category-searchable-Radio1">
                Active
              </label>
            </div>
            <div className="form-check form-check-inline d-flex align-items-center">
              <input className="form-check-input" type="radio" name="category-status" id="category-searchable-Radio2" checked={!isSearchable} onClick={() => setIsSearchable(false)} />
              <label className="form-check-label fs-14" htmlFor="category-searchable-Radio2">
                Inactive
              </label>
            </div>
          </div>
        </div>
        <div className={makeChange ? "col-12 col-md-4" : "col-12"}>
          <label className="blue-1 fs-12">Status</label>
          <div className="d-flex">
            <div className="form-check form-check-inline d-flex align-items-center">
              <input className="form-check-input" checked={status == generalModelStatuses.APPROVED} onClick={() => setStatus(generalModelStatuses.APPROVED)} type="radio" />
              <label className="form-check-label fs-14" htmlFor="category-Radio1">
                Active
              </label>
            </div>
            <div className="form-check form-check-inline d-flex align-items-center">
              <input className="form-check-input" type="radio" checked={status == generalModelStatuses.DECLINED} onClick={() => setStatus(generalModelStatuses.DECLINED)} />
              <label className="form-check-label fs-14" htmlFor="category-Radio2">
                Inactive
              </label>
            </div>
          </div>
        </div>
        <div className={makeChange ? "col-12 col-md-4 d-flex align-items-end" : "col-12"}>
          <div className="form-check form-check-inline d-flex align-items-center pointer">
            <input
              className="form-check-input"
              type="checkbox"
              name="category-status"
              value="option1"
              id="add-as-sub-category"
              checked={addSubCategory}
              onChange={(e) => {
                if (e.target.checked) {
                  setaddSubCategory(true);
                } else {
                  setaddSubCategory(false);
                }
              }}
            />
            <label className="form-check-label fs-14 pointer" htmlFor="add-as-sub-category">
              Add as Sub Category
            </label>
          </div>
        </div>
        {addSubCategory && (
          <div className="col-12">
            <label className="blue-1 fs-12">
              PARENT CATEGORY<span className="red">*</span>
            </label>
            {categoryArr && categoryArr.length > 0 && (
              <Select defaultValue={prevCategoryObj} onChange={handleChange} options={categoryArr.filter((el) => el.level == 1).map((el) => ({ ...el, label: el.name, value: el._id }))} placeholder="Select from options" />
            )}
          </div>
        )}
        <div className="col-12">
          <label className="blue-1 fs-12">UPLOAD PHOTO</label>
          <FileUpload onFileChange={handleFileSet} />
          <div className="form-text fs-12">(Ratio: (225 X 225)PX)</div>
        </div>
        <div className="col-12">
          <CustomButton btntype="button" ClickEvent={handleAddCategory} iconName="fa-solid fa-check" btnName="Save" isBtn small={makeChange ? true : false} />
        </div>
      </form>
    </div>
  );
}

export default AddCategory;
