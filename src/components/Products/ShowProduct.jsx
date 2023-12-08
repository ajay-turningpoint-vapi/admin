import React from "react";
import { images } from "../Images/Images";
import { DashboardBox } from "../Utility/DashboardBox";

function ShowProduct() {
  return (
    <div className="row show-product">
      <div className="col-12 col-md-6">
        <div className="product-main-image">
          <img src={images.product} alt="" />
        </div>
        <h5 className="blue-1 my-3">Galary Image</h5>
        <ul className="d-flex gap-3">
          <li>
            <img src={images.product} alt="" />
          </li>
          <li>
            <img src={images.product} alt="" />
          </li>
          <li>
            <img src={images.product} alt="" />
          </li>
        </ul>
      </div>
      <div className="col-12 col-md-6">
        <ul className="blue-1 fs-14 customer-profile p-3">
          <li>
            <span className="fw-600">
              Product Name<span>:</span>
            </span>
            EYELINER SUPER BLACK
          </li>
          <li>
            <span className="fw-600">
              SKU<span>:</span>
            </span>
            GF EL01
          </li>
          <li>
            <span className="fw-600">
              Product Type<span>:</span>
            </span>
            1
          </li>
          <li>
            <span className="fw-600">
              Category<span>:</span>
            </span>
            Nails,
          </li>
          <li>
            <span className="fw-600">
              Brand<span>:</span>
            </span>
            My Glamm
          </li>
          <li>
            <span className="fw-600">
              Barcode Type<span>:</span>
            </span>
            C39
          </li>
          <li>
            <span className="fw-600">
              Minimum Order Qty<span>:</span>
            </span>
            1 /Items
          </li>
          <li>
            <span className="fw-600">
              Tax<span>:</span>
            </span>
            0%
          </li>
          <li>
            <span className="fw-600">
              Discount<span>:</span>
            </span>
            20%
          </li>
        </ul>
      </div>
      <DashboardBox className="col-12 bg-light p-4 mt-4">
        <h6 className="blue-1">Description:</h6>
        <p className="fs-14 m-0">
          Glam fam super balck liner is smudge-proof and waterproof long lasting
          eyeliner that last upto 24 hours. The long handle and brush tips
          applicator make it easy to create sharp precise lines for different
          looks. From simple lines to dramatic winged eyeliner, the Bold liner
          is perfect for daily use. The eyeliner dries within seconds to give
          you intense black strokes that do not fade away. The unique pigment
          technology ensures a smudge-proof wear, making it one of Glam Fam's
          best selling waterproof, long lasting liquid eyeliner.{" "}
        </p>
      </DashboardBox>
    </div>
  );
}

export default ShowProduct;
