import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import "../assets/scss/main.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "../components/dashboard/Dashboard";
import SideBar from "../components/Sidebar/SideBar";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import Category from "../components/Products/Category/Category";
import Attribute from "../components/Products/Attribute/Attribute";
import BulkProductUpload from "../components/Products/BulkProductUpload";
import ProductList from "../components/Products/ProductList";
import Config from "../components/Products/Config";
import Profile from "../components/Admin/Profile";
import Blog from "../components/Blog/Blog";
import AddBlog from "../components/Blog/AddBlog";
import BlogCategory from "../components/Blog/BlogCategory";
import TotalOrder from "../components/Order/TotalOrder/TotalOrder";
import InHouse from "../components/Order/InhouseOrder/Inhouse";
import Brand from "../components/Products/Brand/Brand";
import AddBrand from "../components/Products/Brand/AddBrand";
import BulkBrandUpload from "../components/Products/Brand/BulkBrandUpload";
import BulkCategoryUpload from "../components/Products/Category/BulkCategoryUpload";
import AddProduct from "../components/Products/AddProduct/AddProduct";
import DeliveryProcess from "../components/Order/DeliveryProcess/DeliveryProcess";
import CancleReason from "../components/Order/CancleReason/CancleReason";
import TrackOrder from "../components/Order/TrackOrder/TrackOrder";
import ContactMail from "../components/ContactMail/ContactMail";
import ProductReview from "../components/Review/ProductReview";
import ReviewConfig from "../components/Review/ReviewConfig";
import CompanyInfo from "../components/CompanyInfo/CompanyInfo";
import Menus from "../components/Menus/Menus";
import AddMenu from "../components/Menus/AddMenu";
import EditMenu from "../components/Menus/EditMenu";
import MenuItem from "../components/Menus/MenuItem";
import PaymentGateway from "../components/PaymentGateway/PaymentGateway";
import Login from "../components/Auth/Login";
import GstSetup from "../components/Tax/GstSetup";
import GstConfig from "../components/Tax/GstConfig";
import Customer from "../components/Customer/Customer";
import AddCustomer from "../components/Customer/AddCustomer";
import CustomerDetail from "../components/Customer/CustomerDetail";
import PointHistory from "../components/Customer/PointHistory";
import Banners from "../components/Frontend-CMS/Banners/Banners";
import AddBanner from "../components/Frontend-CMS/Banners/AddBanner";
import ShowBlog from "../components/Blog/ShowBlog";
import SaleDetail from "../components/Order/Detail/SaleDetail";
import AttributeValue from "../components/Products/Attribute/AttributeValue";
import ShowContact from "../components/ContactMail/ShowContact";
import CurrencyList from "../components/SetUp/CurrencyList/CurrencyList";
import AddCurrency from "../components/SetUp/CurrencyList/AddCurrency";
import Location from "../components/SetUp/Location/Location";
import Tags from "../components/SetUp/Tags/Tags";
import Coupons from "../components/Coupons/Coupons";
import AddCoupons from "../components/Coupons/AddCoupons";
import Contest from "../components/Contest/Contest";
import AddContest from "../components/Contest/AddContest";
import { Transactions } from "../components/Transactions/Transactions";
import Reels from "../components/Reels/Reels";
import AddReels from "../components/Reels/AddReels";
import UserContests from "../components/Customer/UserContests";
import UpdateReel from "../components/Reels/UpdateReel";
import GeofenceForm from "../components/Map/GeofenceForm.jsx";
import ActivityLog from "../components/Customer/ActivityLog.jsx";
import UserContestDashboard from "../components/Customer/UserContestDashboard.jsx";
import UserActivityAnalysis from "../components/Customer/UserActivityAnalysis.jsx";
import Referrals from "../components/Customer/Referrals.jsx";
import NotListedContractors from "../components/Contractors/NotListedContractors.jsx";
import Contractors from "../components/Contractors/Contractors.jsx";
export default function AuthorizedRoutes() {
  return (
    <section style={{ backgroundColor: "#ebebeb" }}>
      <div className="row g-0">
        <div
          className="col-12 col-md-2 no-print"
          style={{ contain: "content" }}
        >
          <SideBar />
        </div>
        <div
          className="col-12 col-md-10"
          style={{ height: "100vh", overflow: "hidden scroll" }}
        >
          <Header />
          <Routes>
            <Route exact path="/" element={<Dashboard />}></Route>
            <Route exact path="/Dashboard" element={<Dashboard />}></Route>
            <Route
              exact
              path="/Product/Category"
              element={<Category />}
            ></Route>
            <Route exact path="/Product/Brand" element={<Brand />}></Route>
            <Route
              exact
              path="/Product/Brand-Create"
              element={<AddBrand />}
            ></Route>
            <Route
              exact
              path="/Product/Attribute"
              element={<Attribute />}
            ></Route>
            <Route
              exact
              path="/Product/Attribute-Value"
              element={<AttributeValue />}
            ></Route>
            <Route
              exact
              path="/Product/AddProduct"
              element={<AddProduct />}
            ></Route>
            <Route
              exact
              path="/Product/Bulk-Product-Upload"
              element={<BulkProductUpload />}
            ></Route>
            <Route
              exact
              path="/Product/Bulk-Category-Upload"
              element={<BulkCategoryUpload />}
            ></Route>
            <Route
              exact
              path="/Product/Bulk-Brand-Upload"
              element={<BulkBrandUpload />}
            ></Route>
            <Route exact path="/Product-List" element={<ProductList />}></Route>
            <Route exact path="/Product/Config" element={<Config />}></Route>
            <Route exact path="/Admin/Profile" element={<Profile />}></Route>
            <Route exact path="/Blog/post" element={<Blog />}></Route>
            <Route exact path="/Reels/View" element={<Reels />}></Route>
            <Route exact path="/Reels/Add" element={<AddReels />}></Route>
            <Route
              exact
              path="/Reels/Edit/:id"
              element={<UpdateReel />}
            ></Route>
            <Route exact path="/Blog/post/create" element={<AddBlog />}></Route>
            <Route
              exact
              path="/Blog/Category"
              element={<BlogCategory />}
            ></Route>
            <Route exact path="/Blog/View-Post" element={<ShowBlog />}></Route>
            <Route
              exact
              path="/Order/Total-Order"
              element={<TotalOrder />}
            ></Route>
            <Route
              exact
              path="/Order/Inhouse-Order"
              element={<InHouse />}
            ></Route>
            <Route
              exact
              path="/Order/Delivery-Process"
              element={<DeliveryProcess />}
            ></Route>
            <Route
              exact
              path="/Order/Cancle-Reason"
              element={<CancleReason />}
            ></Route>
            <Route
              exact
              path="/Order/Track-Order"
              element={<TrackOrder />}
            ></Route>
            <Route
              exact
              path="/Order/Sale-Detail"
              element={<SaleDetail />}
            ></Route>
            <Route exact path="/Contact-Mail" element={<ContactMail />}></Route>
            <Route exact path="/Contact-Info" element={<ShowContact />}></Route>
            <Route
              exact
              path="/Review/Product-Review"
              element={<ProductReview />}
            ></Route>
            <Route
              exact
              path="/Review/Review-Configuration"
              element={<ReviewConfig />}
            ></Route>
            <Route
              exact
              path="/Company-Information"
              element={<CompanyInfo />}
            ></Route>
            <Route exact path="/Menus" element={<Menus />}></Route>
            <Route
              exact
              path="/Menus/Menus-Create"
              element={<AddMenu />}
            ></Route>
            <Route
              exact
              path="/Menus/Menus-Edit"
              element={<EditMenu />}
            ></Route>
            <Route
              exact
              path="/Menus/Menus-Item"
              element={<MenuItem />}
            ></Route>
            <Route
              exact
              path="/Payment-Gateway"
              element={<PaymentGateway />}
            ></Route>
            <Route exact path="/GST-SETUP" element={<GstSetup />}></Route>
            <Route
              exact
              path="/GST-Configuation"
              element={<GstConfig />}
            ></Route>
            <Route exact path="/Users-list" element={<Customer />}></Route>
            <Route
              exact
              path="/Users-Activity-Analysis"
              element={<UserActivityAnalysis />}
            ></Route>
            <Route
              exact
              path="/No-Listed-Contractor"
              element={<NotListedContractors />}
            ></Route>
            <Route
              exact
              path="/All-Contractors"
              element={<Contractors />}
            ></Route>
            <Route exact path="/referrals" element={<Referrals />}></Route>
            <Route
              exact
              path="/user-point-history/:userId"
              element={<PointHistory />}
            ></Route>{" "}
            <Route
              exact
              path="/user-activity-log/:userId"
              element={<ActivityLog />}
            ></Route>
            <Route
              exact
              path="/Customer-Create"
              element={<AddCustomer />}
            ></Route>
            <Route
              exact
              path="/Customer-Detail"
              element={<CustomerDetail />}
            ></Route>
            <Route
              exact
              path="/Coupon/Coupon-Create"
              element={<AddCoupons />}
            ></Route>
            <Route exact path="/Coupons" element={<Coupons />}></Route>
            <Route exact path="/Contests" element={<Contest />}></Route>
            <Route
              exact
              path="/user-contests/:contestId"
              element={<UserContestDashboard />}
            ></Route>
            <Route
              exact
              path="/contest/contest-create"
              element={<AddContest />}
            ></Route>
            <Route
              exact
              path="/transactions"
              element={<Transactions />}
            ></Route>
            <Route exact path="/Banners" element={<Banners />}></Route>
            <Route
              exact
              path="/Banners/Banner-Create"
              element={<AddBanner />}
            ></Route>
            <Route
              exact
              path="/SetUp/Currency-List"
              element={<CurrencyList />}
            ></Route>
            <Route
              exact
              path="/SetUp/Currency-Create"
              element={<AddCurrency />}
            ></Route>
            <Route exact path="/SetUp/Location" element={<Location />}></Route>
            <Route exact path="/SetUp/Tags" element={<Tags />}></Route>
            <Route exact path="/GeoFencing" element={<GeofenceForm />}></Route>
          </Routes>
          <Footer />
        </div>
      </div>
    </section>
  );
}
