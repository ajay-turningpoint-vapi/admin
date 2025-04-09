import React, { useCallback, useEffect, useState } from "react";
import { images } from "../Images/Images";
import CustomButton from "../Utility/Button";
import { DashboardBox, DashboardTable } from "../Utility/DashboardBox";

import { useDispatch, useSelector } from "react-redux";

import { generateFilePath } from "../Utility/utils";

import { updateUserKycStatus } from "../../services/users.service";
import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import "../../assets/style.css";
import { usersGet } from "../../redux/actions/Users/users.actions";

function CustomerDetail({ customerData }) {
  const [kycStatus, setKycStatus] = useState(customerData.kycStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    setKycStatus(customerData.kycStatus);
    let query = "?role=CARPENTER";
    dispatch(usersGet(query));
  }, [customerData.kycStatus, dispatch]);

  const handleChangeKycStatus = useCallback(async (id, value) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to change the KYC status?"
    );

    if (!userConfirmed) {
      return;
    }

    try {
      setKycStatus(value);
      let { data: res } = await updateUserKycStatus(id, { kycStatus: value });
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
      alert(err.message);
    }
  }, []);

  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <DashboardBox className="mb-5">
            <h5 className="blue-1 mb-4">Customer Profile</h5>
            <div className="row">
              <div className="col-12 col-md-12">
                <CustomerProfile customerData={customerData} />
              </div>
              <div className="col-12 col-md-7 mt-5 row">
                <KycDetails
                  customerData={customerData}
                  kycStatus={kycStatus}
                  handleChangeKycStatus={handleChangeKycStatus}
                />
              </div>
            </div>
          </DashboardBox>
        </div>
      </section>
    </main>
  );
}

function CustomerProfile({ customerData }) {
  return (
    <div className="customer-profile">
      <a
        href={
          typeof customerData.image === "string" &&
          customerData.image.startsWith("https://")
            ? customerData.image
            : generateFilePath(customerData.image) || "#"
        }
      >
        <img
          src={
            typeof customerData.image === "string" &&
            customerData.image.startsWith("https://")
              ? customerData.image
              : generateFilePath(customerData.image) || images.customer
          }
          alt=""
        />
      </a>
      <h6 className="blue-1 text-capitalize my-3">{customerData.firstName}</h6>
      <ul className="blue-1 fs-14">
        <li>
          <span className="fw-600">
            Name <span>:</span>
          </span>
          {customerData.name}
        </li>
        <li>
          <span className="fw-600">
            Email <span>:</span>
          </span>
          {customerData.email}
        </li>
        <li>
          <span className="fw-600">
            Phone <span>:</span>
          </span>
          {customerData.phone}
        </li>
        <li>
          <span className="fw-600">
            Business Name <span>:</span>
          </span>
          {customerData.shopName || "No Business"}
        </li>
        <li>
          <span className="fw-600">
            Points <span>:</span>
          </span>
          {customerData.points ?? 0}
        </li>
        <li>
          <span className="fw-600">
            Registered Date <span>:</span>
          </span>
          {new Date(customerData.createdAt).toDateString()}
        </li>
        <li>
          <span className="fw-600">
            Active Status <span>:</span>
          </span>
          <CustomButton greenBtn btnName="Active" />
        </li>
      </ul>
    </div>
  );
}

function KycDetails({ customerData, kycStatus, handleChangeKycStatus }) {
  return (
    <>
      <h5 className="blue-1 mb-4">KYC Details</h5>
      <ul className="blue-1 fs-14">
        <li>
          <span className="fw-600">
            Id Front Image <span>:</span>
          </span>
          <br />
          <a href={generateFilePath(customerData.idFrontImage)}>
            <img
              src={generateFilePath(customerData?.idFrontImage)}
              alt=""
              style={{ height: 100, width: 100 }}
            />
          </a>
        </li>
        <li>
          <span className="fw-600">
            Id Back Image <span>:</span>
          </span>
          <br />
          <a href={generateFilePath(customerData.idBackImage)}>
            <img
              src={generateFilePath(customerData?.idBackImage)}
              alt=""
              style={{ height: 100, width: 100 }}
            />
          </a>
        </li>
        <li style={{ display: "flex" }}>
          <span className="fw-600" style={{ marginRight: "20px" }}>
            KYC status <span>:</span>
          </span>
          <RadioGroup
            aria-label="kycStatus"
            name="kycStatus"
            value={kycStatus}
            onChange={(e) =>
              handleChangeKycStatus(customerData._id, e.target.value)
            }
          >
            <FormControlLabel
              value="pending"
              control={<Radio />}
              label="Pending"
            />
            <FormControlLabel
              value="submitted"
              control={<Radio />}
              label="Submitted"
            />
            <FormControlLabel
              value="approved"
              control={<Radio />}
              label="Approved"
            />
            <FormControlLabel
              value="rejected"
              control={<Radio />}
              label="Rejected"
            />
          </RadioGroup>
        </li>
        {customerData?.bankDetails?.length > 0 &&
          customerData.bankDetails.map((bank, i) => (
            <React.Fragment key={i}>
              <li>
                <span className="fw-600">
                  Bank Name <span>:</span>
                </span>
                {bank.bank}
              </li>
              <li>
                <span className="fw-600">
                  Bank Type <span>:</span>
                </span>
                {capitalize(bank.banktype)}
              </li>
              <li>
                <span className="fw-600">
                  Account Number <span>:</span>
                </span>
                {bank.accountNo}
              </li>
              <li>
                <span className="fw-600">
                  Account Name <span>:</span>
                </span>
                {bank.accountName}
              </li>
              <li>
                <span className="fw-600">
                  IFSC Code <span>:</span>
                </span>
                {bank.ifsc}
              </li>
            </React.Fragment>
          ))}
      </ul>
    </>
  );
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default CustomerDetail;
