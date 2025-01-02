import React from "react";
import QRCode from "react-qr-code";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../../assets/style.css";
function ViewCoupons() {
  const couponArr = useSelector((state) => state.coupon.coupons);

  return (
    <>
      <Link
        to="/Coupon/Coupon-Create"
        className="btn btn-secondary my-2 no-print"
      >
        <i className="fa fa-arrow-left"></i> Back
      </Link>

      <div className="parent-container">
        {couponArr &&
          couponArr.length > 0 &&
          couponArr.map((coupon) => (
            <div key={coupon._id} className="coupon">
              <QRCode
                value={coupon._id}
                style={{ height: "2.5cm", width: "2.5cm" }}
                viewBox="0 0 256 256"
              />
              <div className="text-content">
                <span className="coupon-name">{coupon.name}</span>
                <span className="coupon-product-name">
                  {coupon.productName}
                </span>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default ViewCoupons;
