import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { COUPONAdd, COUPONUpdate, SetCOUPONObj ,CouponMultipleAdd} from "../../redux/actions/Coupon/Coupon.actions";
import CustomButton from "../Utility/Button";
import { generalModelStatuses } from "../Utility/constants";
import { DashboardBox } from "../Utility/DashboardBox";
import FileUpload from "../Utility/FileUpload";
import Select from "react-select";
import { generateFilePath } from "../Utility/utils";
import moment from "moment"
import { PRODUCTGet } from "../../redux/actions/Product/Product.actions";
import { toastError } from "../Utility/ToastUtils";
import { useNavigate } from "react-router-dom";
function AddCoupons() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productArr = useSelector((state) => state.product.products);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState(0);
  const [validTill, setValidTill] = useState(new Date());
  const [maximumNoOfUsersAllowed, setMaximumNoOfUsersAllowed] = useState(0);
  const [discountType, setDiscountType] = useState("");
  const [selectedCouponId, setselectedCouponId] = useState("");
  const [image, setImage] = useState("");
  const [isUpdateBanner, setIsUpdateBanner] = useState(false);
  const bannerObj = useSelector((state) => state.coupon.couponObj);
  const [previousImage, setPreviousImage] = useState("");


  const [discountTypeArr, setDiscountTypeArr] = useState([
    { label: "PERCENTAGEOFF", value: "PERCENTAGEOFF", },
    { label: "AMOUNTOFF", value: "AMOUNTOFF", },

  ]);

  // Multiple  Coupon Add
  const [couponVal, setCouponVal] = useState(""); 
  const [totalCoupon, setTotalCoupon] = useState(); 
  const [coupons, setCoupons] = useState([{ value: 0, count :0 }])
  const [productId, setproductId] = useState("")
  const [productList, setproductList] = useState("")


  const handleFileSet = (value) => {
    // console.log(value);
    setImage(value);
  };

  useEffect(() => {
    if (bannerObj) {
      console.log(bannerObj, "bannerObj")
      // setselectedCouponId(bannerObj._id);
      // setName(bannerObj.name);
      // setDescription(bannerObj.description);
      // setValue(bannerObj.value);
      // setPreviousImage(bannerObj.image);
      // setValidTill(bannerObj.validTill);
      // setMaximumNoOfUsersAllowed(bannerObj.maximumNoOfUsersAllowed);
      // let tempVal = discountTypeArr.find(el => el.value == bannerObj.discountType)
      // console.log(tempVal, "tempVal")
      // setDiscountType(tempVal);
      // setSelectedStatus({ value: brandObj.statusInfo, label: brandObj.statusInfo });
      setIsUpdateBanner(true);
    }
    return () => {
      dispatch(SetCOUPONObj(null));
    };
  }, [bannerObj]);

  useEffect(() => {
    dispatch(PRODUCTGet());

  }, []);
  useEffect(() => {
    if(productArr){
      setproductList(productArr)

    } 

  }, [productArr]);
 

  const handleSubmit = () => {
    let obj = {
      name,
      description,
      value,
      validTill: validTill,
      maximumNoOfUsersAllowed,
      discountType: discountType.value,
      image: image ? image : "",
    };

    if (isUpdateBanner) {
      dispatch(COUPONUpdate(obj, selectedCouponId));
    } else {
      dispatch(COUPONAdd(obj));
    }
  };

  const handleMultipleSubmit = () => {
    

    if(`${productId}` == ''){
        toastError("Please Select Product");
       return
    }
    if(`${couponVal}` == ''){
      toastError("Please fill Total Coupon Value");
     return
  }
    let obj = {
      amount:couponVal,
      count:totalCoupon,
      coupons,
      productId
    }
    console.log(obj);

    if (isUpdateBanner) {
      dispatch(COUPONUpdate(obj, selectedCouponId));
    } else {
      dispatch(CouponMultipleAdd(obj));

      navigate('/Coupon/ViewCoupons');
    }
  };



 let handleCouponArrayAdd = () => {
  setCoupons([...coupons, { value: "", count: "" }])
}

let handleChangeCouponArr = (i, e) => {
  let newCoupons = [...coupons];
  newCoupons[i][e.target.name] = e.target.value;
  setCoupons(newCoupons);
}

let removeCouponFields = (i) => {
  let newCoupons = [...coupons];
  newCoupons.splice(i, 1);
  setCoupons(newCoupons)
}

  const handleCoupnValueAdd = (event) => {
    console.log(event.target.value, discountType)
    if (discountType != "" && discountType.value == "PERCENTAGEOFF") {
      if (!(event.target.value > 100)) {
        console.log("Asdas");
        setValue(event.target.value)
      }
      else {
        alert("cannot be more than 100")
        setValue(100)
      }
    }
    else {
      setValue(event.target.value)
    }
  }

  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <h5 className="blue-1 mb-4">{isUpdateBanner ? "Update" : "Add New "} Coupon</h5>
          <form action="#" className="form">
             {/* Multiple Coupon Create */}

             <div className="row">
              <div className="col-12 col-md-8 mb-0">
                <DashboardBox>
                  <div className="row">
                    <h5 className="blue-1 mb-4">Coupon Information</h5>
                    <div className="col-md-12">
                      <label>
                        Product List <span className="red">*</span>
                      </label>
                      <select className="form-control" value={productId} onChange={(e)=>{setproductId(e.target.value)}}>
                        <option value="">Please Select Product</option>
                        {
                          productList && productList.map(product =>(<option value={product?._id}>{product?.name}</option>) )
                        }
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label>
                        Total Coupon Value <span className="red">*</span>
                      </label>
                      <input value={couponVal}  onChange={(event) => setCouponVal(event.target.value)} type="text" className="form-control" />
                    </div>
                    <div className="col-md-6">
                      <label>
                        No of Coupon <span className="red">*</span>
                      </label>
                      <input value={totalCoupon} name="count" onChange={(event) => setTotalCoupon(event.target.value)} type="text" className="form-control" />
                    </div>

                    <div className="col-md-12">
                      <h6 className="blue-1 my-2">
                        Coupons
                      </h6>
                      { coupons.map((element, index) => (
                      <div className="row" key={index}>
                          <div className="col-md-4">
                          <label>Coupon Value <span className="red">*</span> </label>
                          <input name="value" type="text" value={element.value} onChange={e => handleChangeCouponArr(index, e)} className="form-control" required />
                          </div>
                          <div className="col-md-4">
                          <label>No of Coupon <span className="red">*</span> </label>

                          <input name="count"   type="number" value={element.count} min="0" onChange={e => handleChangeCouponArr(index, e)}  className="form-control" required />
                          </div>
                          
                          {
                        index ? 
                          <div className="col-md-2">
                                   <button className="btn btn-danger btn-sm mt-4" onClick={() => removeCouponFields(index)}><i className="fa-solid fa-trash"> </i> </button>
                          </div>
                          :
                          null}
                      </div>
                      ))}
                    </div>
                    <div className="col-md-4">
                          <button type="button"  className="btn btn-secondary btn-sm"  onClick={handleCouponArrayAdd}><i className="fa-solid fa-plus"> </i> Add</button>
                          </div>
                    <div className="col-12 mt-2">
                      <CustomButton btntype="button" ClickEvent={handleMultipleSubmit} isBtn iconName="fa-solid fa-check" btnName="Save" />
                    </div>
                  </div>
                </DashboardBox>
              </div>
            </div> 


            {/* Single Add Coupon  */}


            {/* <div className="row">
              <div className="col-12 col-md-8 mb-0">
                <DashboardBox>
                  <div className="row">
                    <h5 className="blue-1 mb-4">Coupon Information</h5>
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
                      <label>
                        Value <span className="red">*</span>
                      </label>
                      <input value={value} onChange={(event) => { handleCoupnValueAdd(event) }} type="number" className="form-control" />
                    </div>
                    <div className="col-12">
                      <label>
                        Valid Till <span className="red">*</span>
                      </label>
                      <input value={moment(validTill).format("YYYY-MM-DD")} onChange={(event) => setValidTill(event.target.value)} type="date" className="form-control" />
                    </div>
                    <div className="col-12">
                      <label>
                        Maximum No Of Users Allowed <span className="red">*</span>
                      </label>
                      <input value={maximumNoOfUsersAllowed} onChange={(event) => setMaximumNoOfUsersAllowed(event.target.value)} type="number" className="form-control" />
                    </div>
                    <div className="col-12 col-md-12">
                      <label>
                        Discount Type <span className="red">*</span>
                      </label>
                      <Select
                        options={discountTypeArr}
                        placeholder="Select from options"
                        defaultInputValue={discountType}
                        value={discountType}
                        onChange={(e) => {
                          console.log(e)
                          if (e.value == "PERCENTAGEOFF") {
                            if (value != 0 && value > 100) {
                              setValue(100)
                            }
                          }
                          setDiscountType(e)
                        }
                        }
                      />
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
                    {
                      previousImage != "" &&
                      <img src={generateFilePath(previousImage)} style={{ width: 200, height: 100 }} alt="" />
                    }
                    <div className="col-12 mt-2">
                      <CustomButton btntype="button" ClickEvent={handleSubmit} isBtn iconName="fa-solid fa-check" btnName="Save" />
                    </div>
                  </div>
                </DashboardBox>
              </div>
            </div> */}
          </form>
        </div>
      </section>
    </main>
  );
}

export default AddCoupons;
