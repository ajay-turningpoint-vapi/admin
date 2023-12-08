import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthorizedRoutes from "./AuthorizedRoutes";

import { useSelector } from "react-redux";
import UnauthorizedRoutes from "./UnauthorizedRoutes";
import ViewCoupons from "../components/Coupons/ViewCoupons";
export default function RootRouter() {
  const authObj = useSelector((state) => state.auth);
  const [hideAllOtherRoutes, setHideAllOtherRoutes] = useState(false);
  useEffect(() => {
    console.log(window.location.href, "window.location.href", window.location.href.includes("/Coupon/ViewCoupons"))
    if (window.location.href.includes("/Coupon/ViewCoupons")) {
      setHideAllOtherRoutes(true)
    }
    else {
      setHideAllOtherRoutes(false)
    }
  }, [window.location.href])

  useEffect(() => {

  }, [hideAllOtherRoutes])
  return <Router>
    <Routes>
      <Route exact path="/Coupon/ViewCoupons" element={<ViewCoupons />}>
      </Route>
      {/* <Route path="/*">
        
      </Route> */}
    </Routes>
    {/* {
      hideAllOtherRoutes === false && */}
    <div className="no-print">
      {authObj?.isAuthorized ? <AuthorizedRoutes /> : <UnauthorizedRoutes />}
    </div>
    {/* } */}

  </Router>;
}
