import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { COUPONDelete, COUPONGet, SetCOUPONObj } from "../../redux/actions/Coupon/Coupon.actions";
import { PRODUCTGet } from "../../redux/actions/Product/Product.actions";
import { downloadCouponsLink } from "../../services/Coupons.service";
import ActionIcon from "../Utility/ActionIcon";
import CustomButton from "../Utility/Button";
import { DashboardTable } from "../Utility/DashboardBox";
import SearchBox from "../Utility/SearchBox";
import { toastError } from "../Utility/ToastUtils";
import { generateFilePath, generateQrFilePath } from "../Utility/utils";

function Coupons() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const couponArr = useSelector((state) => state.coupon.coupons);
  const productArr = useSelector((state) => state.product.products);


  const [usedCoupon, setUsedCoupon] = useState('All')
  const [productId, setproductId] = useState("")
  const handleGetAllCoupons = () => {
    let query = '';
    if (usedCoupon) {
      query += `couponUsed=${usedCoupon}`;
    }
    if (productId) {
      query += `&productId=${productId}`;
    }
    dispatch(COUPONGet(query));


  }


  const handleDownloadAllCouponsZip = async (e) => {
    try {
      e.preventDefault()
      let { data: res } = await downloadCouponsLink()
      console.log(res, "ads")
      const link = document.createElement('a');
      console.log(generateQrFilePath(res.data.zipFileName), "link")
      window.open(`${generateQrFilePath(res.data.zipFileName)}`)
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    catch (err) {
      toastError(err)
    }
  }



  const handleDelete = (row) => {
    COUPONDelete(row._id);
    handleGetAllCoupons()
  }

  useEffect(() => {
    handleGetAllCoupons()
    dispatch(PRODUCTGet());

    // navigate('/Coupon/ViewCoupons');

  }, []);


  useEffect(() => {
    handleGetAllCoupons()
  }, [usedCoupon, productId]);
  const handleEdit = (row) => {
    dispatch(SetCOUPONObj(row));
  };
  const brand_columns = [
    {
      name: "ID",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "7%",
    },
    {
      name: "Name",
      cell: (row) => <p>{row.name}</p>,

      width: "25%",
    },
    {
      name: "Product",
      cell: (row) => row?.productObj ? <p>{row.productObj?.name}</p> : <p>No Product</p>,
      width: "15%",
    },

    // {
    //   name: "Image",
    //   grow: 0,
    //   cell: (row) => <img height="84px" width="56px" alt={row.name} src={generateFilePath(row.image)} />,
    // },
    // {
    //   name: "Discount Type",
    //   grow: 0,
    //   selector: (row) => row.discountType,
    //   width: "16%",
    // },
    // {
    //   name: "Discount Value",
    //   grow: 0,
    //   selector: (row) => row.value,
    // },
    // {
    //   name: "Valid Till",
    //   grow: 0,
    //   selector: (row) => `${new Date(row.validTill).toDateString()}`,
    //   width: "17%",

    // },
    {
      name: "Maximum No Of Users Allowed",
      // grow: 0,
      width: "15%",
      selector: (row) => row.maximumNoOfUsersAllowed == 0 ? <span className="badge bg-danger p-2">{row.maximumNoOfUsersAllowed} (Used)</span> : row.maximumNoOfUsersAllowed
    },
    {
      name: "Created At",
      cell: (row) => <p>{new Date(row.createdAt).toDateString()}</p>,
      width: "15%",
    },

    // {
    //   name: "Action",
    //   width: "20%",
    //   cell: (row) => <ActionIcon isRedirected={true} onEditClick={() => handleEdit(row)} editPath="/Coupon/Coupon-Create" onDeleteClick={() => handleDelete(row._id)} deletePath="/Coupons" remove edit Uniquekey={row.id} />,
    // },
  ];

  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="blue-1 m-0">Coupon List</h5>
                <div className="d-flex align-items-center gap-3">
                  <label>Copouns</label>
                  <select className="form-control" value={usedCoupon} onChange={(e) => { setUsedCoupon(e.target.value) }}>
                    <option>Please Select </option>
                    <option value="All">All</option>
                    <option value="0">Used</option>
                    <option value="1">Unused</option>
                  </select>
                  <label>Products</label>
                  <select className="form-control" value={productId} onChange={(e) => { setproductId(e.target.value) }}>
                    <option>Please Select </option>
                    {
                      productArr && productArr.map(product => <option value={product?._id}>{product.name}</option>)
                    }
                  </select>
                  <CustomButton isBtn iconName="fa-solid fa-download" btnName="Download Active Coupons Zip" path="/Coupon/Coupon-Create" ClickEvent={(e) => handleDownloadAllCouponsZip(e)} small roundedPill />
                  <CustomButton isLink iconName="fa-solid fa-plus" btnName="ADD NEW Coupon" path="/Coupon/Coupon-Create" small roundedPill />
                  {/* <SearchBox extraClass="bg-white" /> */}

                </div>
              </div>
              <DashboardTable>
                <DataTable columns={brand_columns} paginationPerPage={100} data={couponArr && couponArr.length > 0 ? couponArr : []} pagination />
              </DashboardTable>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Coupons;
