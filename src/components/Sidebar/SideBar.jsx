import React from "react";
import { images } from "../Images/Images";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

function SideBar() {
  let location = useLocation();
  const [sidebar_item, setsidebar_item] = useState([
    {
      isrotated: true,
      active: true,
      name: "dashboard",
      path: "/Dashboard",
      icon: "ion-grid",
      children: [],
    },
    // {
    //   isrotated: false,
    //   active: false,
    //   name: "products",
    //   path: "/Dashboard",
    //   icon: "fa-brands fa-product-hunt",
    //   children: [
    //     {
    //       name: "Category",
    //       path: "/Product/Category",
    //       active: false,
    //     },
    //     {
    //       name: "Brand",
    //       path: "/Product/Brand",
    //       active: false,
    //     },
    //     {
    //       name: "Attribute",
    //       path: "/Product/Attribute",
    //       active: false,
    //     },
    //     {
    //       name: "Add New Product",
    //       path: "/Product/AddProduct",
    //       active: false,
    //     },
    //     {
    //       name: "Bulk Product Upload",
    //       path: "/Product/Bulk-Product-Upload",
    //       active: false,
    //     },
    //     {
    //       name: "Product List",
    //       path: "/Product/Product-List",
    //       active: false,
    //     },
    //     {
    //       name: "Recent View Config",
    //       path: "/Product/Config",
    //       active: false,
    //     },
    //   ],
    // },
    // {
    //   isrotated: false,
    //   active: false,
    //   name: "shipping",
    //   path: "/Dashboard",
    //   icon: "fa-solid fa-money-bill-1",
    //   children: [
    //     {
    //       name: "Carriers",
    //       path: "/Dashboard",
    //       active: false,
    //     },
    //     {
    //       name: "Shipping Rates",
    //       path: "/Dashboard",
    //       active: false,
    //     },
    //     {
    //       name: "Pickup Locations",
    //       path: "/Dashboard",
    //       active: false,
    //     },
    //     {
    //       name: "Shipping Orders",
    //       path: "/Dashboard",
    //       active: false,
    //     },
    //     {
    //       name: "Configuration",
    //       path: "/Dashboard",
    //       active: false,
    //     },
    //   ],
    // },
    // {
    //   isrotated: false,
    //   active: false,
    //   name: "Order Manage",
    //   path: "/Dashboard",
    //   icon: "ion-android-cart",
    //   children: [
    //     {
    //       name: "Total Order",
    //       path: "/Order/Total-Order",
    //       active: false,
    //     },
    //     {
    //       name: "Inhouse Orders",
    //       path: "/Order/Inhouse-Order",
    //       active: false,
    //     },
    //     {
    //       name: "delivery Process",
    //       path: "/Order/Delivery-Process",
    //       active: false,
    //     },
    //     {
    //       name: "Cancel Reason",
    //       path: "/Order/Cancle-Reason",
    //       active: false,
    //     },
    //     {
    //       name: "Track order Config",
    //       path: "/Order/Track-Order",
    //       active: false,
    //     },
    //   ],
    // },
    {
      isrotated: false,
      active: false,
      name: "Users",
      path: "/Dashboard",
      icon: "fa-solid fa-users",
      children: [
        {
          name: "All Users",
          path: "/Users-list",
          active: false,
        },
        {
          name: "All Users Activity Analysis",
          path: "/Users-Activity-Analysis",
          active: false,
        },
        {
          name: "Referrals",
          path: "/referrals",
          active: false,
        },
      ],
    },
    {
      isrotated: false,
      active: false,
      name: "Contractors",
      path: "/All-Contractors",
      icon: "fa-solid fa-user",
      children: [],
    },
    {
      isrotated: false,
      active: false,
      name: "Not Listed Contractors",
      path: "/No-Listed-Contractor",
      icon: "fa-solid fa-user-circle",
      children: [],
    },
    {
      isrotated: false,
      active: false,
      name: "Product",
      path: "/Dashboard",
      icon: "fa-solid fa-shopping-cart",
      children: [
        {
          name: "All Product",
          path: "/Product-list",
          active: false,
        },
      ],
    },
    {
      isrotated: false,
      active: false,
      name: "Coupons",
      path: "/Dashboard",
      icon: "fa-solid fa-credit-card",
      children: [
        {
          name: "View Coupons",
          path: "/Coupons",
          active: false,
        },
      ],
    },
    {
      isrotated: false,
      active: false,
      name: "Contest",
      path: "/Dashboard",
      icon: "fa-solid fa-list",
      children: [
        {
          name: "View Contest",
          path: "/Contests",
          active: false,
        },
      ],
    },
    // {
    //   isrotated: false,
    //   active: false,
    //   name: "User Contests",
    //   path: "/user-contests/:contestId",
    //   icon: "fa-solid fa-list-alt ",
    //   children: [],
    // },
    {
      isrotated: false,
      active: false,
      name: "Transactions",
      path: "/transactions",
      icon: "fa-solid fa-money-bill-1",
      children: [],
    },
    {
      isrotated: false,
      active: false,
      name: "Reels",
      path: "/Reels/View",
      icon: "fa-solid fa-video-camera",
      children: [],
    },
    {
      isrotated: false,
      active: false,
      name: "Map",
      path: "/GeoFencing",
      icon: "fa-solid fa-map",
      children: [],
    },

    // {
    //   isrotated: false,
    //   active: false,
    //   name: "Appearance",
    //   path: "/Dashboard",
    //   icon: "ion-grid",
    //   children: [
    //     {
    //       name: "Themes",
    //       path: "/Dashboard",
    //       active: false,
    //     },
    //     {
    //       name: "Color Scheme",
    //       path: "/Dashboard",
    //       active: false,
    //     },
    //     {
    //       name: "Menu",
    //       path: "/Dashboard",
    //       active: false,
    //     },
    //     {
    //       name: "Header",
    //       path: "/Dashboard",
    //       active: false,
    //     },
    //     {
    //       name: "Dashboard Setup",
    //       path: "/Dashboard",
    //       active: false,
    //     },
    //     {
    //       name: "Dashboard Color",
    //       path: "/Dashboard",
    //       active: false,
    //     },
    //     {
    //       name: "Preloader Setting",
    //       path: "/Dashboard",
    //       active: false,
    //     },
    //   ],
    // },
    // {
    //   isrotated: false,
    //   active: false,
    //   name: "Blog",
    //   path: "/Dashboard",
    //   icon: "fa-solid fa-users",
    //   children: [
    //     {
    //       name: "Blog",
    //       path: "/Blog/post",
    //       active: false,
    //     },
    //     {
    //       name: "blog category",
    //       path: "/Blog/Category",
    //       active: false,
    //     },
    //   ],
    // },
    // {
    //   isrotated: false,
    //   active: false,
    //   name: "Menus",
    //   path: "/Menus",
    //   icon: "ion-navicon-round",
    //   children: [],
    // },
    // {
    //   isrotated: false,
    //   active: false,
    //   name: "Review",
    //   path: "/Dashboard",
    //   icon: "fa-solid fa-user",
    //   children: [
    //     {
    //       name: "Product Review",
    //       path: "/Review/Product-Review",
    //       active: false,
    //     },
    //     {
    //       name: "Company Review ",
    //       path: "/Review/Product-Review",
    //       active: false,
    //     },
    //     {
    //       name: "Review Configuration",
    //       path: "/Review/Review-Configuration",
    //       active: false,
    //     },
    //   ],
    // },
    // {
    //   isrotated: false,
    //   active: false,
    //   name: "Contact Request",
    //   path: "/Dashboard",
    //   icon: "fa-solid fa-user",
    //   children: [
    //     {
    //       name: "Contact Mail",
    //       path: "/Contact-Mail",
    //       active: false,
    //     },
    //   ],
    // },
    // {
    //   isrotated: false,
    //   active: false,
    //   name: "Payment Gateways",
    //   path: "/Payment-Gateway",
    //   icon: "fa-solid fa-money-bill-1",
    //   children: [],
    // },
    // {
    //   isrotated: false,
    //   active: false,
    //   name: "GST/VAT/TAX Setup",
    //   path: "/GST-SETUP",
    //   icon: "ion-settings",
    //   children: [
    //     {
    //       name: "GST/VAT/TAX List",
    //       path: "/GST-SETUP",
    //       active: false,
    //     },
    //     {
    //       name: "Configuration",
    //       path: "/GST-Configuation",
    //       active: false,
    //     },
    //   ],
    // },
    // {
    //   isrotated: false,
    //   active: false,
    //   name: "Setup",
    //   path: "/",
    //   icon: "ion-settings",
    //   children: [
    //     {
    //       name: "Currency List",
    //       path: "/SetUp/Currency-List",
    //       active: false,
    //     },
    //     {
    //       name: "Location",
    //       path: "/SetUp/Location",
    //       active: false,
    //     },
    //     {
    //       name: "Tags",
    //       path: "/SetUp/Tags",
    //       active: false,
    //     },
    //   ],
    // },
    // {
    //   isrotated: false,
    //   active: false,
    //   name: "System Settings",
    //   path: "/",
    //   icon: "ion-gear-b",
    //   children: [
    //     {
    //       name: "Company Information",
    //       path: "/Company-Information",
    //       active: false,
    //     },
    //   ],
    // },
  ]);

  const isRotating = (i) => {
    let temp_array = sidebar_item.map((el, index) => {
      if (index === i) {
        el.isrotated = !el.isrotated;
        el.active = true;
      } else {
        el.active = false;
      }
      return el;
    });
    setsidebar_item([...temp_array]);
  };

  const childActive = (i) => {
    let temp_array = sidebar_item.map((el, index) => {
      if (el.children.length > 0) {
        el.children.map((item, childIndex) => {
          if (childIndex === i) {
            item.active = true;
          } else {
            item.active = false;
          }
          return item;
        });
      }
      return el;
    });
    setsidebar_item([...temp_array]);
  };

  return (
    <div id="sidebar" className="no-print">
      <div className="main-logo">
        <img src={images.logo} alt="" />
        <br />
        <span>Beta v1.0.0</span>
      </div>
      <ul className="sidebar-menu" id="sidebarMenu">
        {sidebar_item.map((item, i) => {
          if (typeof array === "undefined" && item.children.length === 0) {
            return (
              <li key={`sidebar_item_${i}`}>
                <Link
                  to={item.path}
                  className={item.active ? "active" : ""}
                  onClick={() => isRotating(i)}
                >
                  <i className={item.icon}></i>
                  <p className="mb-0">{item.name}</p>
                </Link>
              </li>
            );
          } else {
            return (
              <li key={`sidebar_item_${i}`}>
                <Link
                  to={`#sidebar_item_children_${i}`}
                  className={
                    item.active || location === item.path ? "active" : ""
                  }
                  data-bs-toggle="collapse"
                  aria-expanded={item.active}
                  aria-controls={`sidebar_item_children_${i}`}
                  role="button"
                  onClick={() => isRotating(i)}
                >
                  <i className={item.icon}></i>
                  <p className="mb-0">
                    {item.name}
                    {item.isrotated ? (
                      <i className="ion-arrow-up-b pe-3"></i>
                    ) : (
                      <i className="ion-arrow-down-b pe-3"></i>
                    )}
                  </p>
                </Link>
                <ul
                  className="collapse"
                  id={`sidebar_item_children_${i}`}
                  data-bs-parent="#sidebarMenu"
                >
                  {item.children.map((child, index) => {
                    return (
                      <li key={`${child.name}_${index}`}>
                        <Link
                          to={child.path}
                          className={
                            child.active || location === child.path
                              ? "active"
                              : ""
                          }
                          onClick={() => childActive(index)}
                        >
                          {child.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}

export default SideBar;
