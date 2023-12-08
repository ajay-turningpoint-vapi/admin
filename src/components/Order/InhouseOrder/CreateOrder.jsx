import React, { useRef } from "react";
import Select from "react-select";
import { Alert } from "@mui/material";
import DataTable from "react-data-table-component";
import ActionIcon from "../../Utility/ActionIcon";
import CustomButton from "../../Utility/Button";
import { DashboardBox, DashboardTable } from "../../Utility/DashboardBox";

function AddProduct() {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const method = [{ value: "cod", label: "Cash On Delivery" }];

  const country = [
    { value: "Afghanistan", label: "Afghanistan" },
    { value: "Albania", label: "Albania" },
    { value: "Algeria", label: "Algeria" },
    { value: "American Samoa", label: "American Samoa" },
    { value: "Andorra", label: "Andorra" },
    { value: "Angola", label: "Angola" },
    { value: "Anguilla", label: "Anguilla" },
    { value: "Antarctica", label: "Antarctica" },
    { value: "Antigua And Barbuda", label: "Antigua And Barbuda" },
    { value: "Argentina", label: "Argentina" },
    { value: "Armenia", label: "Armenia" },
    { value: "Aruba", label: "Aruba" },
    { value: "Australia", label: "Australia" },
    { value: "Austria", label: "Austria" },
    { value: "Azerbaijan", label: "Azerbaijan" },
    { value: "Bahamas The", label: "Bahamas The" },
    { value: "Bahrain", label: "Bahrain" },
    { value: "Bangladesh", label: "Bangladesh" },
    { value: "Barbados", label: "Barbados" },
    { value: "Belarus", label: "Belarus" },
    { value: "Belgium", label: "Belgium" },
    { value: "Belize", label: "Belize" },
    { value: "Benin", label: "Benin" },
    { value: "Bermuda", label: "Bermuda" },
    { value: "Bhutan", label: "Bhutan" },
    { value: "Bolivia", label: "Bolivia" },
    { value: "Bosnia and Herzegovina", label: "Bosnia and Herzegovina" },
    { value: "Botswana", label: "Botswana" },
    { value: "Bouvet Island", label: "Bouvet Island" },
    { value: "Brazil", label: "Brazil" },
    {
      value: "British Indian Ocean Territory",
      label: "British Indian Ocean Territory",
    },
    { value: "Brunei", label: "Brunei" },
    { value: "Bulgaria", label: "Bulgaria" },
    { value: "Burkina Faso", label: "Burkina Faso" },
    { value: "Burundi", label: "Burundi" },
    { value: "Cambodia", label: "Cambodia" },
    { value: "Cameroon", label: "Cameroon" },
    { value: "Canada", label: "Canada" },
    { value: "Cape Verde", label: "Cape Verde" },
    { value: "Cayman Islands", label: "Cayman Islands" },
    { value: "Central African Republic", label: "Central African Republic" },
    { value: "Chad", label: "Chad" },
    { value: "Chile", label: "Chile" },
    { value: "China", label: "China" },
    { value: "Christmas Island", label: "Christmas Island" },
    { value: "Cocos (Keeling) Islands", label: "Cocos (Keeling) Islands" },
    { value: "Colombia", label: "Colombia" },
    { value: "Comoros", label: "Comoros" },
    { value: "Cook Islands", label: "Cook Islands" },
    { value: "Costa Rica", label: "Costa Rica" },
    {
      value: "Cote D'Ivoire (Ivory Coast)",
      label: "Cote D'Ivoire (Ivory Coast)",
    },
    { value: "Croatia (Hrvatska)", label: "Croatia (Hrvatska)" },
    { value: "Cuba", label: "Cuba" },
    { value: "Cyprus", label: "Cyprus" },
    { value: "Czech Republic", label: "Czech Republic" },
    {
      value: "Democratic Republic Of The Congo",
      label: "Democratic Republic Of The Congo",
    },
    { value: "Denmark", label: "Denmark" },
    { value: "Djibouti", label: "Djibouti" },
    { value: "Dominica", label: "Dominica" },
    { value: "Dominican Republic", label: "Dominican Republic" },
    { value: "East Timor", label: "East Timor" },
    { value: "Ecuador", label: "Ecuador" },
    { value: "Egypt", label: "Egypt" },
    { value: "El Salvador", label: "El Salvador" },
    { value: "Equatorial Guinea", label: "Equatorial Guinea" },
    { value: "Eritrea", label: "Eritrea" },
    { value: "Estonia", label: "Estonia" },
    { value: "Ethiopia", label: "Ethiopia" },
    {
      value: "External Territories of Australia",
      label: "External Territories of Australia",
    },
    { value: "Falkland Islands", label: "Falkland Islands" },
    { value: "Faroe Islands", label: "Faroe Islands" },
    { value: "Fiji Islands", label: "Fiji Islands" },
    { value: "Finland", label: "Finland" },
    { value: "France", label: "France" },
    { value: "French Guiana", label: "French Guiana" },
    { value: "French Polynesia", label: "French Polynesia" },
    {
      value: "French Southern Territories",
      label: "French Southern Territories",
    },
    { value: "Gabon", label: "Gabon" },
    { value: "Gambia The", label: "Gambia The" },
    { value: "Georgia", label: "Georgia" },
    { value: "Germany", label: "Germany" },
    { value: "Ghana", label: "Ghana" },
    { value: "Gibraltar", label: "Gibraltar" },
    { value: "Greece", label: "Greece" },
    { value: "Greenland", label: "Greenland" },
    { value: "Grenada", label: "Grenada" },
    { value: "Guadeloupe", label: "Guadeloupe" },
    { value: "Guam", label: "Guam" },
    { value: "Guatemala", label: "Guatemala" },
    { value: "Guernsey and Alderney", label: "Guernsey and Alderney" },
    { value: "Guinea", label: "Guinea" },
    { value: "Guinea-Bissau", label: "Guinea-Bissau" },
    { value: "Guyana", label: "Guyana" },
    { value: "Haiti", label: "Haiti" },
    {
      value: "Heard and McDonald Islands",
      label: "Heard and McDonald Islands",
    },
    { value: "Honduras", label: "Honduras" },
    { value: "Hong Kong S.A.R.", label: "Hong Kong S.A.R." },
    { value: "Hungary", label: "Hungary" },
    { value: "Iceland", label: "Iceland" },
    { value: "Indonesia", label: "Indonesia" },
    { value: "Iran", label: "Iran" },
    { value: "Iraq", label: "Iraq" },
    { value: "Ireland", label: "Ireland" },
    { value: "Israel", label: "Israel" },
    { value: "Italy", label: "Italy" },
    { value: "Jamaica", label: "Jamaica" },
    { value: "Japan", label: "Japan" },
    { value: "Jersey", label: "Jersey" },
    { value: "Jordan", label: "Jordan" },
    { value: "Kazakhstan", label: "Kazakhstan" },
    { value: "Kenya", label: "Kenya" },
    { value: "Kiribati", label: "Kiribati" },
    { value: "Korea North", label: "Korea North" },
    { value: "Korea South", label: "Korea South" },
    { value: "Kuwait", label: "Kuwait" },
    { value: "Kyrgyzstan", label: "Kyrgyzstan" },
    { value: "Laos", label: "Laos" },
    { value: "Latvia", label: "Latvia" },
    { value: "Lebanon", label: "Lebanon" },
    { value: "Lesotho", label: "Lesotho" },
    { value: "Liberia", label: "Liberia" },
    { value: "Libya", label: "Libya" },
    { value: "Liechtenstein", label: "Liechtenstein" },
    { value: "Lithuania", label: "Lithuania" },
    { value: "Luxembourg", label: "Luxembourg" },
    { value: "Macau S.A.R.", label: "Macau S.A.R." },
    { value: "Macedonia", label: "Macedonia" },
    { value: "Madagascar", label: "Madagascar" },
    { value: "Malawi", label: "Malawi" },
    { value: "Malaysia", label: "Malaysia" },
    { value: "Maldives", label: "Maldives" },
    { value: "Mali", label: "Mali" },
    { value: "Malta", label: "Malta" },
    { value: "Man (Isle of)", label: "Man (Isle of)" },
    { value: "Marshall Islands", label: "Marshall Islands" },
    { value: "Martinique", label: "Martinique" },
    { value: "Mauritania", label: "Mauritania" },
    { value: "Mauritius", label: "Mauritius" },
    { value: "Mayotte", label: "Mayotte" },
    { value: "Mexico", label: "Mexico" },
    { value: "Micronesia", label: "Micronesia" },
    { value: "Moldova", label: "Moldova" },
    { value: "Monaco", label: "Monaco" },
    { value: "Mongolia", label: "Mongolia" },
    { value: "Montserrat", label: "Montserrat" },
    { value: "Morocco", label: "Morocco" },
    { value: "Mozambique", label: "Mozambique" },
    { value: "Myanmar", label: "Myanmar" },
    { value: "Namibia", label: "Namibia" },
    { value: "Nauru", label: "Nauru" },
    { value: "Nepal", label: "Nepal" },
    { value: "Netherlands Antilles", label: "Netherlands Antilles" },
    { value: "Netherlands The", label: "Netherlands The" },
    { value: "New Caledonia", label: "New Caledonia" },
    { value: "New Zealand", label: "New Zealand" },
    { value: "Nicaragua", label: "Nicaragua" },
    { value: "Niger", label: "Niger" },
    { value: "Nigeria", label: "Nigeria" },
    { value: "Niue", label: "Niue" },
    { value: "Norfolk Island", label: "Norfolk Island" },
    { value: "Northern Mariana Islands", label: "Northern Mariana Islands" },
    { value: "Norway", label: "Norway" },
    { value: "Oman", label: "Oman" },
    { value: "Pakistan", label: "Pakistan" },
    { value: "Palau", label: "Palau" },
    {
      value: "Palestinian Territory Occupied",
      label: "Palestinian Territory Occupied",
    },
    { value: "Panama", label: "Panama" },
    { value: "Papua new Guinea", label: "Papua new Guinea" },
    { value: "Paraguay", label: "Paraguay" },
    { value: "Peru", label: "Peru" },
    { value: "Philippines", label: "Philippines" },
    { value: "Pitcairn Island", label: "Pitcairn Island" },
    { value: "Poland", label: "Poland" },
    { value: "Portugal", label: "Portugal" },
    { value: "Puerto Rico", label: "Puerto Rico" },
    { value: "Qatar", label: "Qatar" },
    { value: "Republic Of The Congo", label: "Republic Of The Congo" },
    { value: "Reunion", label: "Reunion" },
    { value: "Romania", label: "Romania" },
    { value: "Russia", label: "Russia" },
    { value: "Rwanda", label: "Rwanda" },
    { value: "Saint Helena", label: "Saint Helena" },
    { value: "Saint Kitts And Nevis", label: "Saint Kitts And Nevis" },
    { value: "Saint Lucia", label: "Saint Lucia" },
    { value: "Saint Pierre and Miquelon", label: "Saint Pierre and Miquelon" },
    {
      value: "Saint Vincent And The Grenadines",
      label: "Saint Vincent And The Grenadines",
    },
    { value: "Samoa", label: "Samoa" },
    { value: "San Marino", label: "San Marino" },
    { value: "Sao Tome and Principe", label: "Sao Tome and Principe" },
    { value: "Saudi Arabia", label: "Saudi Arabia" },
    { value: "Senegal", label: "Senegal" },
    { value: "Serbia", label: "Serbia" },
    { value: "Seychelles", label: "Seychelles" },
    { value: "Sierra Leone", label: "Sierra Leone" },
    { value: "Singapore", label: "Singapore" },
    { value: "Slovakia", label: "Slovakia" },
    { value: "Slovenia", label: "Slovenia" },
    {
      value: "Smaller Territories of the UK",
      label: "Smaller Territories of the UK",
    },
    { value: "Solomon Islands", label: "Solomon Islands" },
    { value: "Somalia", label: "Somalia" },
    { value: "South Africa", label: "South Africa" },
    { value: "South Georgia", label: "South Georgia" },
    { value: "South Sudan", label: "South Sudan" },
    { value: "Spain", label: "Spain" },
    { value: "Sri Lanka", label: "Sri Lanka" },
    { value: "Sudan", label: "Sudan" },
    { value: "Suriname", label: "Suriname" },
    {
      value: "Svalbard And Jan Mayen Islands",
      label: "Svalbard And Jan Mayen Islands",
    },
    { value: "Swaziland", label: "Swaziland" },
    { value: "Sweden", label: "Sweden" },
    { value: "Switzerland", label: "Switzerland" },
    { value: "Syria", label: "Syria" },
    { value: "Taiwan", label: "Taiwan" },
    { value: "Tajikistan", label: "Tajikistan" },
    { value: "Tanzania", label: "Tanzania" },
    { value: "Thailand", label: "Thailand" },
    { value: "Togo", label: "Togo" },
    { value: "Tokelau", label: "Tokelau" },
    { value: "Tonga", label: "Tonga" },
    { value: "Trinidad And Tobago", label: "Trinidad And Tobago" },
    { value: "Tunisia", label: "Tunisia" },
    { value: "Turkey", label: "Turkey" },
    { value: "Turkmenistan", label: "Turkmenistan" },
    { value: "Turks And Caicos Islands", label: "Turks And Caicos Islands" },
    { value: "Tuvalu", label: "Tuvalu" },
    { value: "Uganda", label: "Uganda" },
    { value: "Ukraine", label: "Ukraine" },
    { value: "United Arab Emirates", label: "United Arab Emirates" },
    { value: "United Kingdom", label: "United Kingdom" },
    { value: "United States", label: "United States" },
    {
      value: "United States Minor Outlying Islands",
      label: "United States Minor Outlying Islands",
    },
    { value: "Uruguay", label: "Uruguay" },
    { value: "Uzbekistan", label: "Uzbekistan" },
    { value: "Vanuatu", label: "Vanuatu" },
    {
      value: "Vatican City State (Holy See)",
      label: "Vatican City State (Holy See)",
    },
    { value: "Venezuela", label: "Venezuela" },
    { value: "Vietnam", label: "Vietnam" },
    { value: "Virgin Islands (British)", label: "Virgin Islands (British)" },
    { value: "Virgin Islands (US)", label: "Virgin Islands (US)" },
    { value: "Wallis And Futuna Islands", label: "Wallis And Futuna Islands" },
    { value: "Western Sahara", label: "Western Sahara" },
    { value: "Yemen", label: "Yemen" },
    { value: "Yugoslavia", label: "Yugoslavia" },
    { value: "Zambia", label: "Zambia" },
    { value: "Zimbabwe", label: "Zimbabwe" },
  ];

  const state = [
    {
      value: "Andaman and Nicobar Islands",
      label: "Andaman and Nicobar Islands",
    },
    { value: "Andhra Pradesh", label: "Andhra Pradesh" },
    { value: "Arunachal Pradesh", label: "Arunachal Pradesh" },
    { value: "Assam", label: "Assam" },
    { value: "Bihar", label: "Bihar" },
    { value: "Chandigarh", label: "Chandigarh" },
    { value: "Chhattisgarh", label: "Chhattisgarh" },
    { value: "Dadra and Nagar Haveli", label: "Dadra and Nagar Haveli" },
    { value: "Daman and Diu", label: "Daman and Diu" },
    { value: "Goa", label: "Goa" },
    { value: "Gujarat", label: "Gujarat" },
    { value: "Haryana", label: "Haryana" },
    { value: "Himachal Pradesh", label: "Himachal Pradesh" },
    { value: "Jammu and Kashmir", label: "Jammu and Kashmir" },
    { value: "Jharkhand", label: "Jharkhand" },
    { value: "Karnataka", label: "Karnataka" },
    { value: "Kenmore", label: "Kenmore" },
    { value: "Kerala", label: "Kerala" },
    { value: "Lakshadweep", label: "Lakshadweep" },
    { value: "Madhya Pradesh", label: "Madhya Pradesh" },
    { value: "Maharashtra", label: "Maharashtra" },
    { value: "Manipur", label: "Manipur" },
    { value: "Meghalaya", label: "Meghalaya" },
    { value: "Mizoram", label: "Mizoram" },
    { value: "Nagaland", label: "Nagaland" },
    { value: "Narora", label: "Narora" },
    { value: "Natwar", label: "Natwar" },
    { value: "Odisha", label: "Odisha" },
    { value: "Paschim Medinipur", label: "Paschim Medinipur" },
    { value: "Pondicherry", label: "Pondicherry" },
    { value: "Punjab", label: "Punjab" },
    { value: "Rajasthan", label: "Rajasthan" },
    { value: "Sikkim", label: "Sikkim" },
    { value: "Tamil Nadu", label: "Tamil Nadu" },
    { value: "Telangana", label: "Telangana" },
    { value: "Tripura", label: "Tripura" },
    { value: "Uttar Pradesh", label: "Uttar Pradesh" },
    { value: "Uttarakhand", label: "Uttarakhand" },
    { value: "Vaishali", label: "Vaishali" },
    { value: "West Bengal", label: "West Bengal" },
  ];

  const city = [
    { value: "Delhi", label: "Delhi" },
    { value: "New Delhi", label: "New Delhi" },
  ];

  const Order_package_columns = [
    {
      name: "Product Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Variation",
      selector: (row) => row.variation,
    },
    {
      name: "Price",
      cell: (row) => (
        <ul>
          <li>₹{row.org_price}</li>
          <li>
            <del>₹{row.del_price}</del>
          </li>
        </ul>
      ),
    },
    {
      name: "qty",
      cell: (row) => (
        <input
          type="number"
          min={0}
          max={10}
          value={row.qty}
          className="form-control"
          onChange={() => "hj"}
        />
      ),
    },
    {
      name: "Total Price",
      cell: (row) => <>₹{row.price}</>,
    },
    {
      name: "Remove",
      button: true,
      cell: (row) => <ActionIcon remove Uniquekey={row.id} />,
    },
  ];

  const Order_package_data = [
    {
      id: "1",
      name: "EYELINER SUPER BLACK",
      variation: "Single Product",
      qty: "2",
      price: "956.80 ",
      org_price: "478.40",
      del_price: "299",
    },
    {
      id: "2",
      name: "EYELINER SUPER BLACK",
      variation: "Single Product",
      qty: "6",
      price: "956.80 ",
      org_price: "478.40",
      del_price: "299",
    },
    {
      id: "3",
      name: "EYELINER SUPER BLACK",
      variation: "Single Product",
      qty: "1",
      price: "956.80 ",
      org_price: "478.40",
      del_price: "299",
    },
    {
      id: "4",
      name: "EYELINER SUPER BLACK",
      variation: "Single Product",
      qty: "4",
      price: "956.80 ",
      org_price: "478.40",
      del_price: "299",
    },
  ];
  const shippingAddress = useRef();
  const handleCheckbox = (checked) => {
    if (checked) {
      shippingAddress.current.classList.remove("d-none");
    } else {
      shippingAddress.current.classList.add("d-none");
    }
  };

  return (
    <main>
      <section className="mt-4">
        <div className="container-fluid p-0">
          <h5 className="blue-1 mb-4">Create New Order</h5>
          <DashboardBox>
            <form action="#" className="form">
              <div className="row">
                <div className="col-12 col-md-6">
                  <DashboardBox>
                    <div className="row">
                      <h5 className="blue-1 mb-3">Product Information</h5>
                      <div className="col-12 mb-3">
                        <label>
                          PRODUCT LIST<span className="red">*</span>
                        </label>
                        <Select options={options} />
                      </div>
                      <div className="col-12 mb-3">
                        <label>
                          PAYMENT METHOD <span className="red">*</span>
                        </label>
                        <Select options={method} />
                      </div>
                      <div className="col-12 mb-3">
                        <Alert
                          variant="filled"
                          severity="warning"
                          icon={false}
                          style={{ background: "#ffeeba", color: "#856404" }}
                          onClose={() => { }}
                        >
                          Please Save Customer Address Before Add Product
                        </Alert>
                      </div>
                    </div>
                  </DashboardBox>
                </div>
                <div className="col-12 col-md-6">
                  <DashboardBox className="row">
                    <div className="col-12">
                      <h5 className="blue-1 mb-3">Address Info</h5>
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                      <label>
                        Name <span className="red">*</span>
                      </label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                      <label>
                        EMAIL ADDRESS <span className="red">*</span>
                      </label>
                      <input type="email" className="form-control" />
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                      <label>
                        PHONE NUMBER <span className="red">*</span>
                      </label>
                      <input
                        type="tel"
                        pattern="/^[0-9]+$/"
                        minLength="10"
                        maxLength="12"
                        className="form-control"
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                      <label>
                        ADDRESS<span className="red">*</span>
                      </label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                      <label>
                        COUNTRY <span className="red">*</span>
                      </label>
                      <Select
                        options={country}
                        placeholder="Select from options"
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                      <label>
                        STATE <span className="red">*</span>
                      </label>
                      <Select
                        options={state}
                        placeholder="Select from options"
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                      <label>
                        CITY <span className="red">*</span>
                      </label>
                      <Select
                        options={city}
                        placeholder="Select from options"
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                      <label>
                        POSTAL CODE<span className="red">*</span>
                      </label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="col-12 mb-3">
                      <div className="form-check form-check-inline pointer">
                        <input
                          className="rounded-circle form-check-input"
                          type="checkbox"
                          name="category-status"
                          value="option1"
                          id="same-address"
                          onChange={(e) => {
                            handleCheckbox(e.target.checked);
                          }}
                        />
                        <label
                          className="form-check-label fs-14 pointer"
                          htmlFor="same-address"
                        >
                          Billing Address is not as same as Shipping Address
                        </label>
                      </div>
                    </div>
                    <div
                      className="row shipping-address d-none col-12 mb-0"
                      ref={shippingAddress}
                    >
                      <div className="col-12">
                        <h5 className="blue-1 mt-2 mb-1">Shipping Address</h5>
                      </div>
                      <div className="col-12 col-md-6 mb-3">
                        <label>
                          Name <span className="red">*</span>
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="col-12 col-md-6 mb-3">
                        <label>
                          EMAIL ADDRESS <span className="red">*</span>
                        </label>
                        <input type="email" className="form-control" />
                      </div>
                      <div className="col-12 col-md-6 mb-3">
                        <label>
                          PHONE NUMBER <span className="red">*</span>
                        </label>
                        <input
                          type="tel"
                          pattern="/^[0-9]+$/"
                          minLength="10"
                          maxLength="12"
                          className="form-control"
                        />
                      </div>
                      <div className="col-12 col-md-6 mb-3">
                        <label>
                          ADDRESS<span className="red">*</span>
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="col-12 col-md-6 mb-3">
                        <label>
                          COUNTRY <span className="red">*</span>
                        </label>
                        <Select
                          options={country}
                          placeholder="Select from options"
                        />
                      </div>
                      <div className="col-12 col-md-6 mb-3">
                        <label>
                          STATE <span className="red">*</span>
                        </label>
                        <Select
                          options={state}
                          placeholder="Select from options"
                        />
                      </div>
                      <div className="col-12 col-md-6 mb-3">
                        <label>
                          CITY <span className="red">*</span>
                        </label>
                        <Select
                          options={city}
                          placeholder="Select from options"
                        />
                      </div>
                      <div className="col-12 col-md-6 mb-3">
                        <label>
                          POSTAL CODE<span className="red">*</span>
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="col-12 mb-3">
                        <div className="form-check form-check-inline pointer">
                          <input
                            className="rounded-circle form-check-input"
                            type="checkbox"
                            name="category-status"
                            value="option1"
                            id="same-address"
                            onChange={(e) => {
                              handleCheckbox(e.target.checked);
                            }}
                          />
                          <label
                            className="form-check-label fs-14 pointer"
                            htmlFor="same-address"
                          >
                            Billing Address is not as same as Shipping Address
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 mt-2">
                      <CustomButton
                        isBtn
                        iconName="fa-solid fa-check"
                        btnName="Save"
                      />
                    </div>
                  </DashboardBox>
                </div>
                <div className="col-12 col-md-8">
                  <h5 className="blue-1 mb-4">Order Packages</h5>
                  <DashboardTable className="border p-0 border-dark">
                    <DataTable
                      paginationPerPage={100}
                      columns={Order_package_columns}
                      data={Order_package_data}
                    />
                  </DashboardTable>
                </div>
                <div className="col-12 col-md-4">
                  <h5 className="blue-1 mb-4">Summary</h5>
                  <DashboardBox>
                    <ul className="fs-14 bg-dark bg-opacity-10">
                      <li className="d-flex justify-content-between border-bottom border-dark border-opacity-25 pb-2 mb-2">
                        <span className="blue-1 fw-600">Total Quantity:</span>6
                      </li>
                      <li className="d-flex justify-content-between border-bottom border-dark border-opacity-25 pb-2 mb-2">
                        <span className="blue-1 fw-600">Sub Total:</span>₹ 598.00
                      </li>
                      <li className="d-flex justify-content-between border-bottom border-dark border-opacity-25 pb-2 mb-2">
                        <span className="blue-1 fw-600">Discount:</span>- ₹ 58.80
                      </li>
                      <li className="d-flex justify-content-between border-bottom border-dark border-opacity-25 pb-2 mb-2">
                        <span className="blue-1 fw-600">
                          Total Shipping Charge:
                        </span>
                        ₹ 200.00
                      </li>
                      <li className="d-flex justify-content-between border-bottom border-dark border-opacity-25 pb-2 mb-2">
                        <span className="blue-1 fw-600">Total TAX/GST:</span>₹
                        0.00
                      </li>
                      <li className="d-flex justify-content-between border-bottom border-dark border-opacity-25 pb-2 mb-2">
                        <span className="blue-1 fw-600">Grand total:</span>₹
                        1,156.80
                      </li>
                    </ul>
                  </DashboardBox>
                </div>
              </div>
            </form>
          </DashboardBox>
        </div>
      </section>
    </main>
  );
}

export default AddProduct;
