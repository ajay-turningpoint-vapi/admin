import React from "react";
import { DashboardBox } from "../Utility/DashboardBox";
import QRCode from "react-qr-code";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

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
      <div
        className="parent-container"
        style={{
          width: "90%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          margin:"0 auto"
        }}
      >
        {couponArr &&
          couponArr?.length > 0 &&
          couponArr.map((coupon, i) => (
            <div
              key={coupon._id}
              className="coupon"
              style={{
                padding: "10px", border:"1px solid #000",  
                width: "400px",
                marginBottom: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "center", // Center horizontally
              }}
            >
              <div>
                <QRCode
                  value={coupon._id}
                  style={{ height: "70px", width: "70px" }}
                  viewBox={`0 0 256 256`}
                />
              </div>
              <div style={{ textAlign: "center" }}>
                <span
                  style={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    display: "block",
                    marginBottom: "5px",
                  }}
                >
                  {coupon.name}
                </span>
                <span style={{ fontSize: "15px", fontWeight: "bold" }}>
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
