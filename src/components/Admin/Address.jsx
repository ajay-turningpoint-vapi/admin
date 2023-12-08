import React, { useState } from "react";
import DataTable from "react-data-table-component";
import Select from "react-select";
import CustomButton from "../Utility/Button";
import { DashboardTable } from "../Utility/DashboardBox";

function Profile({ addAddress }) {
  // ============================================================================================
  const [customAddressSet, setCustomAddressSet] = useState(addAddress);
  const [AddressDetail, setAddressDetail] = useState({
    name: "",
    address: "",
    country: "",
    state: "",
    city: "",
    email: "",
    contact: "",
    postal: "",
  });
  const address_columns = [
    {
      name: "Full Name",
      sortable: true,
      selector: (row) => row.name,
    },
    {
      name: "Address",
      selector: (row) => row.address,
    },
    {
      name: "Region",
      minWidth: "200px",
      maxWidth: "210px",
      selector: (row) => row.region,
    },
    {
      name: "Email",
      minWidth: "200px",
      maxWidth: "210px",
      selector: (row) => row.email,
    },
    {
      name: "Phone Number",
      minWidth: "200px",
      maxWidth: "210px",
      selector: (row) => row.contact,
    },
    {
      name: "Action",
      minWidth: "200px",
      maxWidth: "210px",
      button: true,
      cell: (row) => (
        <CustomButton
          greenBtn
          noIcon
          btnName="EDIT"
          ClickEvent={(e) => {
            e.preventDefault();
            fetchTableData(row);
            setCustomAddressSet(true);
          }}
        />
      ),
    },
  ];
  const [addressData, setaddressData] = useState([]);

  const fetchTableData = (row) => {
    let nameArr = row.region.split(',');
    const city = nameArr[0];
    const state = nameArr[1];
    const country = nameArr[2];
    // console.log(row,nameArr);
    setAddressDetail({
      name: row.name,
      address: row.address,
      country: country,
      state: state,
      city: city,
      email: row.email,
      contact: row.contact,
      postal: row.postal,
    })
  }

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

  const addDataToTable = () => {
    let temp = [""];
    if (
      AddressDetail.name !== "" ||
      AddressDetail.address !== "" ||
      AddressDetail.country !== "" ||
      AddressDetail.state !== "" ||
      AddressDetail.city !== "" ||
      AddressDetail.email !== "" ||
      AddressDetail.postal !== "" ||
      AddressDetail.contact !== ""
    ) {
      setCustomAddressSet(false);
      temp = [
        ...addressData,
        {
          name: AddressDetail.name,
          address: AddressDetail.address,
          region: `${AddressDetail.city},${AddressDetail.state},${AddressDetail.country}`,
          email: AddressDetail.email,
          contact: AddressDetail.contact,
          postal: AddressDetail.postal,
        },
      ];
    }
    return setaddressData([...temp]);
  };
  // ============================================================================================

  return (
    <DashboardTable>
      <div className="d-flex align-items-center justify-content-between">
        <h5 className="blue-1">Address</h5>
        <CustomButton
          isBtn
          iconName="fa-solid fa-plus"
          btnName="ADD NEW ADDRESS"
          ClickEvent={(e) => {
            e.preventDefault();
            setCustomAddressSet(true);
            console.log(addAddress);
          }}
        />
      </div>
      <p className="blue-1 mb-0">
        Make Default Shipping Address | Make Default Billing Address
      </p>
      {!customAddressSet && (
        <div className="mt-4">
          <DataTable
            paginationPerPage={100}
            columns={address_columns}
            data={addressData}
            pagination
            noDataComponent="There are no records to display"
          />
        </div>
      )}
      {customAddressSet && (
        <form action="#" className="form row mt-2">
          <div className="col-12 col-md-6">
            <label>
              Name <span className="red">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              value={AddressDetail.name}
              onChange={(e) =>
                setAddressDetail((previousState) => {
                  return {
                    ...previousState,
                    name: `${e.target.value}`,
                  };
                })
              }
            />
          </div>
          <div className="col-12 col-md-6">
            <label>
              EMAIL ADDRESS <span className="red">*</span>
            </label>
            <input
              type="email"
              className="form-control"
              value={AddressDetail.email}
              onChange={(e) =>
                setAddressDetail((previousState) => {
                  return {
                    ...previousState,
                    email: `${e.target.value}`,
                  };
                })
              }
            />
          </div>
          <div className="col-12 col-md-6">
            <label>
              PHONE NUMBER <span className="red">*</span>
            </label>
            <input
              type="tel"
              pattern="/^[0-9]+$/"
              minLength="10"
              maxLength="12"
              className="form-control"
              value={AddressDetail.contact}
              onChange={(e) =>
                setAddressDetail((previousState) => {
                  return {
                    ...previousState,
                    contact: `${e.target.value}`,
                  };
                })
              }
            />
          </div>
          <div className="col-12 col-md-6">
            <label>
              ADDRESS<span className="red">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              value={AddressDetail.address}
              onChange={(e) =>
                setAddressDetail((previousState) => {
                  return {
                    ...previousState,
                    address: `${e.target.value}`,
                  };
                })
              }
            />
          </div>
          <div className="col-12 col-md-3">
            <label>
              COUNTRY <span className="red">*</span>
            </label>
            <Select
              options={country}
              placeholder="Select from options"
              defaultInputValue={AddressDetail.country}
              onChange={(e) =>
                setAddressDetail((previousState) => {
                  return {
                    ...previousState,
                    country: `${e.label}`,
                  };
                })
              }
            />
          </div>
          <div className="col-12 col-md-3">
            <label>
              STATE <span className="red">*</span>
            </label>
            <Select
              options={state}
              placeholder="Select from options"
              defaultInputValue={AddressDetail.state}
              onChange={(e) =>
                setAddressDetail((previousState) => {
                  return {
                    ...previousState,
                    state: `${e.label}`,
                  };
                })
              }
            />
          </div>
          <div className="col-12 col-md-3">
            <label>
              CITY <span className="red">*</span>
            </label>
            <Select
              options={city}
              placeholder="Select from options"
              defaultInputValue={AddressDetail.city}
              onChange={(e) =>
                setAddressDetail((previousState) => {
                  return {
                    ...previousState,
                    city: `${e.label}`,
                  };
                })
              }
            />
          </div>
          <div className="col-12 col-md-3">
            <label>
              POSTAL CODE<span className="red">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              value={AddressDetail.postal}
              onChange={(e) =>
                setAddressDetail((previousState) => {
                  return {
                    ...previousState,
                    postal: `${e.target.value}`,
                  };
                })
              }
            />
          </div>
          <div className="col-12 mt-2">
            <CustomButton
              isBtn
              iconName="fa-solid fa-check"
              btnName="Save"
              ClickEvent={(e) => {
                e.preventDefault();
                addDataToTable();
              }}
            />
          </div>
        </form>
      )}
    </DashboardTable>
  );
}

export default Profile;
