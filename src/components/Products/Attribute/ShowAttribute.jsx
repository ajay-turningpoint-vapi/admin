import React from "react";

function ShowAttribute() {
  return (
    <ul className="blue-1 fs-14 customer-profile p-3">
      <li>
        <span className="fw-600">
          Attribute Name<span>:</span>
        </span>
        Color
      </li>
      <li>
        <span className="fw-600">
          Description<span>:</span>
        </span>
        Color
      </li>
      <li>
        <span className="fw-600">
          Values<span>:</span>
        </span>
        black, red, white, #93c47d, #ffe000, #483c3c, #5b5b5b
      </li>
    </ul>
  );
}

export default ShowAttribute;
