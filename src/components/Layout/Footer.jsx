import React from "react";
import CustomButton from "../Utility/Button";

function Footer() {
  return (
    <footer>
      <div className="footer">
        <div className="container">
          <p className="no-print blue-1 text-center fw-light">
            Copyright © 2024. All rights reserved. Designed and developed by
            <CustomButton isLink path="https://ebslon.com/" changeClass='blue-1' btnName='Turning Point' />
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
