import React from "react";
import { DashboardBox } from "../Utility/DashboardBox";
import QRCode from "react-qr-code";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function ViewCoupons() {

    const couponArr = useSelector((state) => state.coupon.coupons);

    return (

        <>
            <Link to="/Coupon/Coupon-Create" className="btn btn-secondary my-2 no-print" ><i className="fa fa-arrow-left"></i> Back</Link>
            {
                couponArr && couponArr?.length > 0 && couponArr.map((coupon, i) => <div style={{ display: "grid", placeItems: "center" }} >
                    <QRCode
                        value={coupon?._id}
                        style={{ height: "35px", width: "35px", marginTop: 10, marginBottom: 10 }}
                        viewBox={`0 0 256 256`}
                    />
                    <span className="asd" style={{ fontSize: 7, fontWeight: "bolder", lineHeight: 1 }}>
                        {coupon?.name}
                    </span>
                    <span className="asd" style={{ fontSize: 7, fontWeight: "bold", lineHeight: 1, marginTop: 3 }}>
                        {coupon?.productName}
                    </span>
                    {
                        i != couponArr.length - 1 &&
                        <div className="pagebreak"></div>
                    }
                </div>)


            }
        </>

    );
}

export default ViewCoupons;
