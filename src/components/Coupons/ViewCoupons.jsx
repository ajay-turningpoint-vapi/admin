import React, { useState } from "react";
import QRCode from "react-qr-code";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../../assets/style.css";
//skip problem solve
// function ViewCoupons() {
//   const couponArr = useSelector((state) => state.coupon?.coupons || []);

//   const shuffleArray = (array) => {
//     return array.sort(() => Math.random() - 0.5);
//   };

//   return (
//     <>
//       <Link
//         to="/Coupon/Coupon-Create"
//         className="btn btn-secondary my-2 no-print"
//       >
//         <i className="fa fa-arrow-left"></i> Back
//       </Link>

//       <div className="parent-container">
//         {couponArr.length > 0 ? (
//           shuffleArray(couponArr).map((coupon) => (
//             <div
//               key={coupon._id}
//               className="coupon"
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 height: "25mm",
//                 width: "50mm",
//                 margin: "5mm 0",
//                 border: "1px solid #000",
//                 pageBreakAfter: "always",
//               }}
//             >
//               <QRCode
//                 value={coupon._id}
//                 style={{
//                   height: "12mm",
//                   width: "12mm",
//                 }}
//                 viewBox="0 0 256 256"
//               />

//               <div
//                 className="text-content"
//                 style={{
//                   textAlign: "center",
//                   marginTop: "3mm",
//                   fontSize: "10px",
//                   overflow: "hidden",
//                   whiteSpace: "nowrap",
//                   textOverflow: "ellipsis",

//                   width: "45mm",
//                 }}
//               >
//                 <span className="coupon-name" style={{ fontWeight: "bold" }}>
//                   {coupon.name}
//                 </span>
//                 <p
//                   style={{
//                     margin: "2mm 0 0 0",
//                     fontSize: "9px",
//                   }}
//                 >
//                   {coupon.productName}
//                 </p>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div>No coupons available</div>
//         )}
//       </div>

//       <style>
//         {`
//           @media print {
//             @page {
//               size: 50mm 25mm;
//               margin: 0;
//             }
//             body {
//               margin: 0;
//               display: flex;
//               flex-direction: column;
//               align-items: center;
//               justify-content: center;
//             }
//             .parent-container {
//               display: flex;
//               flex-direction: column;
//               align-items: center;
//               width: 100%;
//             }
//             .coupon {
//               display: flex;
//               flex-direction: column;
//               justify-content: center;
//               align-items: center;
//               height: 25mm;
//               width: 50mm;
//               margin: 5mm 0;
//               page-break-after: always;
//             }
//           }
//         `}
//       </style>
//     </>
//   );
// }

//2 x 1 inch paper
// function ViewCoupons() {
//   const couponArr = useSelector((state) => state.coupon?.coupons || []);
//   const shuffleArray = (array) => {
//     return array.sort(() => Math.random() - 0.5);
//   };

//   return (
//     <>
//       <Link
//         to="/Coupon/Coupon-Create"
//         className="btn btn-secondary my-2 no-print"
//       >
//         <i className="fa fa-arrow-left"></i> Back
//       </Link>

//       <div className="parent-container">
//         {couponArr.length > 0 ? (
//           shuffleArray(couponArr).map((coupon) => (
//             <div
//               key={coupon._id}
//               className="coupon"
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "center",
//                 alignItems: "flex-end",
//                 height: "5cm",
//                 width: "10cm",
//                 margin: "0",
//                 marginRight: "70px",
//                 marginTop: "1.5cm",
//                 pageBreakAfter: "always",
//                 overflow: "visible",
//               }}
//             >
//               <QRCode
//                 value={coupon._id}
//                 style={{
//                   height: "1.2cm",
//                   width: "1.2cm",
//                   marginRight: "20px",
//                 }}
//                 viewBox="0 0 256 256"
//               />

//               <div
//                 className="text-content"
//                 style={{
//                   textAlign: "center",
//                   marginTop: "10px",
//                   overflow: "hidden",
//                   wordWrap: "break-word",
//                   width: "5cm",
//                 }}
//               >
//                 <span
//                   className="coupon-name"
//                   style={{
//                     display: "block",
//                     fontSize: "7px",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   {coupon.name}
//                 </span>

//                 <div
//                   style={{
//                     width: "5cm",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <p
//                     style={{
//                       textAlign: "center",
//                       textWrap: "balance",
//                       fontSize: "18px",
//                       margin: "0",
//                       overflow: "hidden",
//                       wordBreak: "break-word",
//                     }}
//                   >
//                     {coupon.productName}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div>No coupons available</div>
//         )}
//       </div>

//       <style>
//         {`
//         @media print {
//           @page {
//             size: 10cm 5cm;
//             margin: 0;
//           }
//           body {
//             margin: 0;
//             display: flex;
//             justify-content: flex-end;
//             align-items: center;
//             height: 100vh;
//           }
//           .parent-container {
//             display: flex;
//             flex-direction: column;
//             align-items: flex-end;
//             justify-content: center;
//             width: 100%;
//             height: 100%;
//           }
//           .coupon {
//             display: flex;
//             flex-direction: column;
//             justify-content: center;
//             align-items: flex-end;
//             height: 5cm;
//             width: 10cm;
//             margin: 0;
//             page-break-after: always;
//           }
//         }
//       `}
//       </style>
//     </>
//   );
// }

// export default ViewCoupons;




//4 x 1 inch paper
// import React from "react";
// import QRCode from "react-qr-code";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import "../../assets/style.css";

// function ViewCoupons() {
//   const couponArr = useSelector((state) => state.coupon?.coupons || []);

//   // Shuffle function remains unchanged
//   const shuffleArray = (array) => {
//     return array.sort(() => Math.random() - 0.5);
//   };

//   return (
//     <>
//       <Link
//         to="/Coupon/Coupon-Create"
//         className="btn btn-secondary my-2 no-print"
//       >
//         <i className="fa fa-arrow-left"></i> Back
//       </Link>

//       <div className="parent-container">
//         {couponArr.length > 0 ? (
//           shuffleArray(couponArr).map((coupon) => (
//             <div
//               key={coupon._id}
//               className="coupon"
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "center",
//                 alignItems: "flex-end",
//                 height: "5cm",
//                 width: "10cm",
//                 margin: "0",
//                 marginRight: "50px",
//                 marginTop: "2.8cm",
//                 pageBreakAfter: "always",
//                 overflow: "visible",
//               }}
//             >
//               <QRCode
//                 value={coupon._id}
//                 style={{
//                   height: "2.5cm",
//                   width: "2.5cm",
//                   marginRight: "23px",
//                 }}
//                 viewBox="0 0 256 256"
//               />

//               <div
//                 className="text-content"
//                 style={{
//                   textAlign: "center",
//                   marginTop: "10px",
//                   overflow: "visible",
//                   wordWrap: "break-word",
//                 }}
//               >
//                 <span className="coupon-name" style={{ display: "block" }}>
//                   {coupon.name}
//                 </span>

//                 <div
//                   style={{
//                     width: "5cm",
//                     lineHeight: "1",
//                     height: "1.5cm",
//                   }}
//                 >
//                   <p
//                     style={{
//                       textAlign: "center",
//                       textWrap: "break-word",
//                     }}
//                   >
//                     {coupon.productName}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div>No coupons available</div>
//         )}
//       </div>

//       <style>
//         {`
//           @media print {
//             @page {
//               size: 10cm 5cm;
//               margin: 0;
//             }
//             body {
//               margin: 0;
//               display: flex;
//               justify-content: flex-end;
//               align-items: center;
//               height: 100vh;
//             }
//             .parent-container {
//               display: flex;
//               flex-direction: column;
//               align-items: flex-end;
//               justify-content: center;
//               width: 100%;
//               height: 100%;
//             }
//             .coupon {
//               display: flex;
//               flex-direction: column;
//               justify-content: center;
//               align-items: flex-end;
//               height: 5cm;
//               width: 10cm;
//               margin: 0;
//               page-break-after: always;
//             }
//           }
//         `}
//       </style>
//     </>
//   );
// }


// export default ViewCoupons;


// function ViewCoupons() {
//   const couponArr = useSelector((state) => state.coupon?.coupons || []);
//   const [paperSize, setPaperSize] = useState("2x1"); // Default paper size

//   const shuffleArray = (array) => {
//     return array.sort(() => Math.random() - 0.5);
//   };

//   // Define styles based on selected paper size
//   const styles = {
//     "2x1": {
//       height: "5cm",
//       width: "10cm",
//       qrSize: "1.2cm",
//       qrMargin: "20px",
//       textFontSize: "10px",
//       productFontSize: "18px",
//       marginRight: "78px",
//       marginTop: "1.5cm",
//     },
//     "4x2": {
//       height: "10cm",
//       width: "20cm",
//       qrSize: "2.5cm",
//       qrMargin: "23px",
//       textFontSize: "12px",
//       productFontSize: "22px",
//       marginRight: "50px",
//       marginTop: "2.8cm",
//     },
//   };

//   const selectedStyle = styles[paperSize];

//   return (
//     <>
//       <Link
//         to="/Coupon/Coupon-Create"
//         className="btn btn-secondary my-2 no-print"
//       >
//         <i className="fa fa-arrow-left"></i> Back
//       </Link>

//       <div className="no-print">
//         <label>Select Paper Size: </label>
//         <select value={paperSize} onChange={(e) => setPaperSize(e.target.value)}>
//           <option value="2x1">2 x 1 inch</option>
//           <option value="4x2">4 x 2 inch</option>
//         </select>
//       </div>

//       <div className="parent-container">
//         {couponArr.length > 0 ? (
//           shuffleArray(couponArr).map((coupon) => (
//             <div
//               key={coupon._id}
//               className="coupon"
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "center",
//                 alignItems: "flex-end",
//                 height: selectedStyle.height,
//                 width: selectedStyle.width,
//                 margin: "0",
//                 marginRight: selectedStyle.marginRight,
//                 marginTop: selectedStyle.marginTop,
//                 pageBreakAfter: "always",
//                 overflow: "visible",
//               }}
//             >
//               <QRCode
//                 value={coupon._id}
//                 style={{
//                   height: selectedStyle.qrSize,
//                   width: selectedStyle.qrSize,
//                   marginRight: selectedStyle.qrMargin,
//                 }}
//                 viewBox="0 0 256 256"
//               />

//               <div
//               className="text-content"
//               style={{
//                 textAlign: "center",
//                 marginTop: "10px",
//                 width: "5cm",
//                 wordWrap: "break-word",
//               }}
//             >
//               {/* Coupon Name */}
//               <span
//                 className="coupon-name"
//                 style={{
//                   display: "block",
//                   fontSize: selectedStyle.textFontSize || "14px",
//                   fontWeight: "bold",
//                   whiteSpace: "normal", // Allow multi-line wrapping
//                   wordBreak: "break-word",
//                   overflowWrap: "break-word",
//                 }}
//               >
//                 {coupon.name}
//               </span>
            
//               {/* Product Name */}
//               <div
//                 style={{
//                   width: "100%", // Take full width of container
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   flexWrap: "wrap", // Allow text wrapping
//                 }}
//               >
//                 <p
//                   style={{
//                     textAlign: "center",
//                     fontSize: selectedStyle.productFontSize || "12px",
//                     margin: "0",
//                     overflowWrap: "break-word", // Better text breaking
//                     whiteSpace: "normal",
//                     width: "100%",
//                   }}
//                 >
//                   {coupon.productName}
//                 </p>
//               </div>
//             </div>
            
//             </div>
//           ))
//         ) : (
//           <div>No coupons available</div>
//         )}
//       </div>

//       <style>
//         {`
//         @media print {
//           @page {
//             size: ${selectedStyle.width} ${selectedStyle.height};
//             margin: 0;
//           }
//           body {
//             margin: 0;
//             display: flex;
//             justify-content: flex-end;
//             align-items: center;
//             height: 100vh;
//           }
//           .parent-container {
//             display: flex;
//             flex-direction: column;
//             align-items: flex-end;
//             justify-content: center;
//             width: 100%;
//             height: 100%;
//           }
//           .coupon {
//             display: flex;
//             flex-direction: column;
//             justify-content: center;
//             align-items: flex-end;
//             height: ${selectedStyle.height};
//             width: ${selectedStyle.width};
//             margin: 0;
//             page-break-after: always;
//           }
//         }
//       `}
//       </style>
//     </>
//   );
// }










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



