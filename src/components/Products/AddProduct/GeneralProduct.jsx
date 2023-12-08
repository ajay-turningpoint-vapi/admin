import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill"; // ES6
import Select from "react-select";
import CustomButton from "../../Utility/Button";
import { DashboardBox } from "../../Utility/DashboardBox";
import FileUpload from "../../Utility/FileUpload";
import { AddModal } from "../../Utility/Modal";
import { useSelector, useDispatch } from "react-redux";
import { getAllNestedCategories } from "../../../redux/actions/Category/Category.actions";
import { BrandGet } from "../../../redux/actions/Brand/brand.actions";
import { PRODUCTAdd ,PRODUCTUpdate} from "../../../redux/actions/Product/Product.actions";
import { ATTRIBUTEGet } from "../../../redux/actions/Attribute/Attribute.actions";
import { toastError } from "../../Utility/ToastUtils";
function GeneralProduct() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [brand, setBrand] = useState("");
  const [company, setCompany] = useState("");
  const [mainCategoryArr, setMainCategoryArr] = useState([]);
  const [subCategoryArr, setSubCategoryArr] = useState([]);
  const [modelNumber, setModelNumber] = useState("");
  const [minimumOrderQuantity, setMinimumOrderQuantity] = useState("");
  const [maximumOrderQuantity, setMaximumOrderQuantity] = useState("");
  const [selectedBrandId, setSelectedBrandId] = useState("");
  const [tags, setTags] = useState("");
  const [dimension_width, setDimension_width] = useState(0);
  const [dimension_height, setDimension_height] = useState(0);
  const [dimension_length, setDimension_length] = useState(0);
  const [dimension_weight, setDimension_weight] = useState(0);
  const [additionalShippingCharge, setAdditionalShippingCharge] = useState(0);
  const [stock, setStock] = useState(0);
  const [sellingPrice, setSellingPrice] = useState(0);
  const [discountValue, setDiscountValue] = useState(0);
  const [gst, setgst] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedDiscountType, setSelectedDiscountType] = useState("");
  const [despcription, setdespcription] = useState("");
  const [Specifications, setSpecifications] = useState("");
  const [ModalBox, setModalBox] = useState(false);
  const [ModalType, setModalType] = useState("");
  const [ModalName, setModalName] = useState("");

  const [productImageStr, setProductImageStr] = useState("");
  const [specificationFile, setSpecificationFile] = useState("");

  const brands = useSelector((state) => state.brand.brands);
  const categoryArr = useSelector((state) => state.category.categories);
  const [mainAttributesArr, setMainAttributesArr] = useState([]);
  const [subAttributesArr, setSubAttributesArr] = useState([]);
  const productObj = useSelector((state) => state.product.productObj);
  const attributes = useSelector((state) => state.attribute.attributes);
  useEffect(() => {
    // dispatch(getAllNestedCategories());
    // dispatch(BrandGet());
    // dispatch(ATTRIBUTEGet());
  }, []);

  useEffect(() => {
    if (categoryArr && categoryArr.length > 0) {
      setMainCategoryArr([...categoryArr]);
    }
  }, [categoryArr]);

  useEffect(() => {
    if (attributes && attributes.length > 0) {
      setMainAttributesArr([...attributes]);
    }
  }, [attributes]);

  const handleMainCategorySelection = (obj) => {
    console.log(obj);
    if (obj?.subCategoryArr && obj?.subCategoryArr.length > 0) {
      setSubCategoryArr(obj.subCategoryArr);
    }
    setSellingPrice(obj?.price);
    setSelectedCategoryId(obj?._id);
  };

  const handleMainAttributeSelection = (obj) => {
    console.log(obj);
    if (obj?.attributeValueArr && obj?.attributeValueArr.length > 0) {
      setSubAttributesArr(obj.attributeValueArr);
    }
  };

  const handleBrandSelection = (obj) => {
    console.log(obj);
    setSelectedBrandId(obj?._id);
  };

  const handleFileSet = (value) => {
    setProductImageStr(value);
  };

  const handlePdfFileSet = (value) => {
    // console.log(value);
    setSpecificationFile(value);
  };

  const handleSubmit = () => {


    if (name == "") {
      toastError("Name cannot be empty !")
        return;
        
    }
    if (brand == "") {
      toastError("brand cannot be empty !")
        return;
    }
    if (company == "") {
      toastError("Company cannot be empty !")
        return;
    }
    let obj = {
      name,
      brand,
     company,

      // minimumOrderQuantity,
      // maximumOrderQuantity,
      // modelNumber,
      // description: despcription,
      // specification: Specifications,
      // productImageStr,
      // specificationFile,
      // stock,
      // weight: dimension_weight,
      // height: dimension_height,
      // width: dimension_width,
      // length: dimension_length,
      // sellingPrice: sellingPrice,
      // discountValue,
      // discountType: selectedDiscountType,
      // categoryId: selectedCategoryId,
      // brandId: selectedBrandId,
    };

    if(productObj?._id){
      dispatch(PRODUCTUpdate(obj,productObj._id))
    } else {
    dispatch(PRODUCTAdd(obj));

    }
  };

  useEffect(() => {
    if (productObj && productObj?._id) {
      setName(productObj.name);
      setBrand(productObj.brand);
      setCompany(productObj.company);
      // setdespcription(productObj.despcription);
      // setSpecifications(productObj.specification);
      // setModelNumber(productObj.modelNumber);
      // setSku(productObj.sku);
      // setMinimumOrderQuantity(productObj.minimumOrderQuantity);
      // setMaximumOrderQuantity(productObj.maximumOrderQuantity);
      // setDimension_height(productObj.height);
      // setDimension_length(productObj?.length);
      // setDimension_weight(productObj.weight);
      // setDimension_length(productObj.length);
      // setDiscountValue(productObj.discountValue);
      // setSellingPrice(productObj.sellingPrice);
      // setStock(productObj.stock);
    }
  }, [productObj]);

  const handleDiscountTypeChange = (obj) => {
    setSelectedDiscountType(obj.value);
  };

  const options = [
    { value: "chocolate", label: "CGST" },
    { value: "strawberry", label: "IGST" },
    { value: "vanilla", label: "SGST" },
  ];

  const discount = [
    { value: "amount", label: "Amount" },
    { value: "percentage", label: "Percentage" },
  ];

  return (
    <form className="form">
      <div className="row">
        <div className="col-12 col-md-8">
          <DashboardBox>
            <div className="border-bottom pb-3 mb-4 row">
              <h5 className="blue-1 mb-4">Product Information</h5>

              <div className="col-12 col-md-6 mb-3">
                <label>
                  Name <span className="red">*</span>
                </label>
                <input value={name} onChange={(event) => setName(event.target.value)} type="text" className="form-control" />
              </div>
              <div className="col-12 col-md-6 mb-3">
                <label>
                  Brand Name <span className="red">*</span>
                </label>
                <input value={brand} onChange={(event) => setBrand(event.target.value)} type="text" className="form-control" />
              </div>
              <div className="col-12 col-md-12 mb-3">
                <label>Company</label> <span className="red">*</span>
                {/* <textarea className="form-control" rows="5" vale={despcription} onChange={(event) => setdespcription(event.target.value)}></textarea> */}
                <input type="text" value={company} onChange={(event) => setCompany(event.target.value)} className="form-control" />
              </div>
              <div className="col-12">
                <CustomButton btntype="button" ClickEvent={handleSubmit} isBtn iconName="fa-solid fa-check" btnName="Save" />
              </div>
            
              {/* <div className="col-12 col-md-3 mb-3">
                <div className="d-flex align-items-baseline justify-content-between">
                  <label>
                    CATEGORY<span className="red">*</span>
                  </label>
                  <CustomButton
                    isBtn
                    iconName="fa-solid fa-circle-plus"
                    btnName="ADD NEW"
                    changeClass="green fs-12 border-0 bg-white"
                    ClickEvent={(e) => {
                      e.preventDefault();
                      setModalBox(true);
                      setModalType("addCategoryModal");
                      setModalName("Create Category");
                    }}
                  />
                  <AddModal ModalBox={ModalBox} setModalBox={setModalBox} name={ModalName} ModalType={ModalType} />
                </div>
                {mainCategoryArr && mainCategoryArr.length > 0 && <Select onChange={handleMainCategorySelection} options={mainCategoryArr} />}
              </div>
              {subCategoryArr && subCategoryArr.length > 0 && (
                <div className="col-12 col-md-3 mb-3">
                  <div className="d-flex align-items-baseline justify-content-between">
                    <label>
                      Sub CATEGORY<span className="red">*</span>
                    </label>
                    <CustomButton
                      isBtn
                      iconName="fa-solid fa-circle-plus"
                      btnName="ADD NEW"
                      changeClass="green fs-12 border-0 bg-white"
                      ClickEvent={(e) => {
                        e.preventDefault();
                        setModalBox(true);
                        setModalType("addCategoryModal");
                        setModalName("Create Category");
                      }}
                    />
                    <AddModal ModalBox={ModalBox} setModalBox={setModalBox} name={ModalName} ModalType={ModalType} />
                  </div>
                  {subCategoryArr && subCategoryArr.length > 0 && <Select onChange={handleMainCategorySelection} options={subCategoryArr} />}
                </div>
              )}

              <div className="col-12 col-md-3 mb-3">
                <div className="d-flex align-items-baseline justify-content-between">
                  <label>BRAND</label>
                  <CustomButton
                    isBtn
                    iconName="fa-solid fa-circle-plus"
                    btnName="ADD NEW"
                    changeClass="green fs-12 border-0 bg-white"
                    ClickEvent={(e) => {
                      e.preventDefault();
                      setModalBox(true);
                      setModalType("addBrandModal");
                      setModalName("Create Brand");
                    }}
                  />
                  <AddModal ModalBox={ModalBox} setModalBox={setModalBox} name={ModalName} ModalType={ModalType} />
                </div>
                {brands && brands.length > 0 && <Select onChange={handleBrandSelection} options={brands && brands.length > 0 ? brands.map((el) => ({ ...el, label: el.name, value: el._id })) : []} />}
              </div>

              <div className="col-12 col-md-4 mb-3">
                <label>
                  MINIMUM ORDER QTY <span className="red">*</span>
                </label>
                <input value={minimumOrderQuantity} onChange={(event) => setMinimumOrderQuantity(event.target.value)} type="number" className="form-control" />
              </div>
              <div className="col-12 col-md-4 mb-3">
                <label>MAX ORDER QTY</label>
                <input value={maximumOrderQuantity} onChange={(event) => setMaximumOrderQuantity(event.target.value)} type="number" className="form-control" />
              </div>
              <div className="col-12 col-md-3 mb-3">
                <label>
                  Attributes<span className="red">*</span>
                </label>
                {mainAttributesArr && mainAttributesArr.length > 0 && <Select onChange={handleMainAttributeSelection} options={mainAttributesArr} />}
              </div>
              {subAttributesArr && subAttributesArr.length > 0 && (
                <div className="col-12 col-md-3 mb-3">
                  <div className="d-flex align-items-baseline justify-content-between">
                    <label>
                      Attribute Values<span className="red">*</span>
                    </label>
                  </div>
                  {subAttributesArr && subAttributesArr.length > 0 && <Select options={subAttributesArr} />}
                </div>
              )}
              <div className="col-12 mb-3">
                <label>
                  Tags (Comma Separated)
                  <span className="red">*</span>
                </label>
                <input value={tags} onChange={(event) => setTags(event.target.value)} type="text" className="form-control" />
              </div> */}
            </div>
            {/* <div className="border-bottom pb-3 mb-4 row">
              <div className="col-12 mb-0">
                <h5 className="blue-1 mb-4">Weight Height Info</h5>
              </div>
              <div className="col-12 col-md-3 mb-3">
                <label>Weight [Gm]</label>
                <input value={dimension_weight} onChange={(event) => setDimension_weight(event.target.value)} type="number" className="form-control" />
              </div>
              <div className="col-12 col-md-3 mb-3">
                <label>Length [Cm]</label>
                <input value={dimension_length} onChange={(event) => setDimension_length(event.target.value)} type="number" className="form-control" />
              </div>
              <div className="col-12 col-md-3 mb-3">
                <label>Breadth [Cm]</label>
                <input value={dimension_width} onChange={(event) => setDimension_width(event.target.value)} type="number" className="form-control" />
              </div>
              <div className="col-12 col-md-3 mb-3">
                <label>Height [Cm]</label>
                <input type="number" value={dimension_height} onChange={(event) => setDimension_height(event.target.value)} className="form-control" />
              </div>
              <div className="col-12 mb-3">
                <label>Additional Shipping Charge</label>
                <input type="number" min={0} value={additionalShippingCharge} onChange={(event) => setAdditionalShippingCharge(event.target.value)} className="form-control" />
              </div>
            </div>
            <div className="border-bottom pb-3 mb-4 row">
              <h5 className="blue-1 mb-4">Price Info And Stock</h5>

              <>
                <div className="col-12 col-md-6 mb-3">
                  <label>PRODUCT STOCK</label>
                  <input type="number" min={0} value={stock} onChange={(event) => setStock(event.target.value)} className="form-control" />
                </div>
                <div className="col-12 col-md-6 mb-3">
                  <label>
                    SELLING PRICE<span className="red">*</span>
                  </label>
                  <input type="number" min={0} value={sellingPrice} onChange={(event) => setSellingPrice(event.target.value)} className="form-control" />
                </div>
              </>
              <div className="col-12 col-md-3 mb-3">
                <label>DISCOUNT</label>
                <input type="number" value={discountValue} onChange={(event) => setDiscountValue(event.target.value)} className="form-control" />
              </div>
              <div className="col-12 col-md-3 mb-3">
                <label>DISCOUNT TYPE</label>
                <Select options={discount} onChange={handleDiscountTypeChange} />
              </div>
              <div className="col-12 col-md-6 mb-3">
                <label>GST/VAT/TAX GROUP</label>
                <Select options={options} />
              </div>
            </div>
            <div className="border-bottom pb-3 mb-4 row">
              <h5 className="blue-1 mb-4">Description</h5>
              <div className="col-12 mb-3">
                <ReactQuill theme="snow" onChange={(e) => setdespcription(e)} />
              </div>
            </div>
            <div className="border-bottom pb-3 mb-4 row">
              <h5 className="blue-1 mb-4">Specifications</h5>
              <div className="col-12 mb-3">
                <ReactQuill onChange={(e) => setSpecifications(e)} />
              </div>
            </div>
            <div className="row">
              <h5 className="blue-1 mb-4">SEO info</h5>
              <div className="col-12 mb-3">
                <label>META TITLE</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-12 mb-3">
                <label>META DESCRIPTION</label>
                <textarea name="META DESCRIPTION" className="form-control" rows="3"></textarea>
              </div>
              <div className="col-12 mb-3">
                <label>META IMAGE (300X300)PX</label>
                <FileUpload />
              </div>
              <div className="col-12">
                <CustomButton btntype="button" ClickEvent={handleSubmit} isBtn iconName="fa-solid fa-check" btnName="Save" />
              </div>
            </div> */}
          </DashboardBox>
        </div>
        {/* <div className="col-12 col-md-4">
          <DashboardBox>
            <div className="border-bottom pb-3 mb-4 row">
              <h5 className="blue-1 mb-3">Product Image Info</h5>
              <div className="col-12 mb-3">
                <label>
                  Product Image<span className="red">*</span>
                </label>
                <FileUpload onFileChange={handleFileSet} />
              </div>
            </div>
            <div className="border-bottom pb-3 mb-4 row">
              <h5 className="blue-1 mb-3">Pdf Specifications</h5>
              <div className="col-12 mb-3">
                <label>PDF SPECIFICATIONS</label>
                <FileUpload onFileChange={handlePdfFileSet} />
              </div>
            </div>
            <div className="border-bottom pb-3 mb-4 row">
              <h5 className="blue-1 mb-3">Product Video Info</h5>
              <div className="col-12 mb-3">
                <label>VIDEO PROVIDER</label>
                <Select options={options} />
              </div>
              <div className="col-12 mb-3">
                <label>VIDEO LINK</label>
                <input type="url" className="form-control" />
              </div>
            </div>
            <div className="row">
              <h5 className="blue-1 mb-3">Others Info</h5>
              <div className="col-12 mb-3">
                <label>
                  STATUS<span className="red">*</span>
                </label>
                <div className="d-flex">
                  <div className="form-check form-check-inline d-flex align-items-center pointer">
                    <input className="form-check-input pointer" type="radio" name="product-status" value="option1" id="product-publish" />
                    <label className="form-check-label fs-14 pointer" htmlFor="product-publish">
                      Publish
                    </label>
                  </div>
                  <div className="form-check form-check-inline d-flex align-items-center pointer">
                    <input className="form-check-input pointer" type="radio" name="product-status" value="option2" id="product-pending" />
                    <label className="form-check-label fs-14 pointer" htmlFor="product-pending">
                      Pending
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </DashboardBox>
        </div> */}
      </div>
    </form>
  );
}

export default GeneralProduct;
