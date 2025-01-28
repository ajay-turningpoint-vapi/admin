import React from "react";
import QRCode from "react-qr-code";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../../assets/style.css";

function ViewCoupons() {
  const couponArr = useSelector((state) => state.coupon?.coupons || []);

  // Shuffle function remains unchanged
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  return (
    <>
      <Link
        to="/Coupon/Coupon-Create"
        className="btn btn-secondary my-2 no-print"
      >
        <i className="fa fa-arrow-left"></i> Back
      </Link>

      <div className="parent-container">
        {couponArr.length > 0 ? (
          shuffleArray(couponArr).map((coupon) => (
            <div
              key={coupon._id}
              className="coupon"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-end",
                height: "5cm",
                width: "10cm",
                margin: "0",
                marginRight: "50px",
                marginTop: "2.8cm",
                pageBreakAfter: "always",
                overflow: "visible",
              }}
            >
              <QRCode
                value={coupon._id}
                style={{
                  height: "2.5cm",
                  width: "2.5cm",
                  marginRight: "23px",
                }}
                viewBox="0 0 256 256"
              />

              <div
                className="text-content"
                style={{
                  textAlign: "center",
                  marginTop: "10px",
                  overflow: "visible",
                  wordWrap: "break-word",
                }}
              >
                <span className="coupon-name" style={{ display: "block" }}>
                  {coupon.name}
                </span>

                <div
                  style={{
                    width: "5cm",
                    lineHeight: "1",
                    height: "1.5cm",
                  }}
                >
                  <p
                    style={{
                      textAlign: "center",
                      textWrap: "break-word",
                    }}
                  >
                    {coupon.productName}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No coupons available</div>
        )}
      </div>

      <style>
        {`
          @media print {
            @page {
              size: 10cm 5cm;
              margin: 0;
            }
            body {
              margin: 0;
              display: flex;
              justify-content: flex-end;
              align-items: center;
              height: 100vh;
            }
            .parent-container {
              display: flex;
              flex-direction: column;
              align-items: flex-end;
              justify-content: center;
              width: 100%;
              height: 100%;
            }
            .coupon {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: flex-end;
              height: 5cm;
              width: 10cm;
              margin: 0;
              page-break-after: always;
            }
          }
        `}
      </style>
    </>
  );
}


export default ViewCoupons;
