import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Menu,
  MenuItem,
  Radio,
  RadioGroup,
  Switch,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import CustomButton from "../Utility/Button";
import { DashboardTable } from "../Utility/DashboardBox";
import { useDispatch, useSelector } from "react-redux";
import { usersGet } from "../../redux/actions/Users/users.actions";
import {
  blockUser,
  updateUserKycStatus,
  updateUserStatus,
} from "../../services/users.service";
import "../../assets/style.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { Link } from "react-router-dom";
import { generateFilePath } from "../Utility/utils";
import Swal from "sweetalert2";
import Slide from "@mui/material/Slide";
import noImg from "../../assets/images/noImg.png";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});
function Customer() {
  const dispatch = useDispatch();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [usersArr, setUsersArr] = useState([]);
  const userArr = useSelector((state) => state.users.users);
  const [selectedData, setSelectedData] = useState(null);
  const [search, setSearch] = useState("");
  const [userKycStatus, setUserKycStatus] = useState(null);
  const [kycStatus, setKycStatus] = useState("");
  const [menuRow, setMenuRow] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setMenuRow(row);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMenuRow(null);
  };

  useEffect(() => {
    handleGetAllUsers();
  }, [userKycStatus]);

  useEffect(() => {
    setUsersArr(userArr?.length ? userArr : []);
  }, [userArr]);

  const handleChangeActiveStatus = async (id, value) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to change isActive status!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!",
    });

    if (result.isConfirmed) {
      try {
        const { data: res } = await updateUserStatus(id, { status: value });
        if (res.message) handleGetAllUsers();
      } catch (err) {
        console.error(err.response?.data?.message || err.message);
        alert(err.response?.data?.message || err.message);
      }
    }
  };
  const handleChangeBlockUser = async (id, value) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to change block status!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!",
    });

    if (result.isConfirmed) {
      try {
        const { data: res } = await blockUser(id);
        if (res.message) handleGetAllUsers();
      } catch (err) {
        console.error(err.response?.data?.message || err.message);
        alert(err.response?.data?.message || err.message);
      }
    }
  };

  const handleDialogOpen = (row) => {
    setDialogOpen(true);
    setSelectedData(row);
    setKycStatus(row.kycStatus);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedData(null);
  };

  const handleChangeKycStatus = async (id, value) => {
    const confirmed = window.confirm(
      "Are you sure you want to update KYC status?"
    );
    if (!confirmed) return;

    try {
      await updateUserKycStatus(id, { kycStatus: value });
      setKycStatus(value);
      handleGetAllUsers();
    } catch (err) {
      console.error(err);
      alert("Failed to update KYC status");
    }
  };

  const handleSearch = (q) => {
    setSearch(q);
    setUsersArr(
      q
        ? userArr.filter(
            (el) =>
              el.name.toLowerCase().includes(q.toLowerCase()) ||
              el.phone.toLowerCase().includes(q.toLowerCase()) ||
              el.email.toLowerCase().includes(q.toLowerCase())
          )
        : userArr
    );
  };

  const handleGetAllUsers = () => {
    let query = "?role=CARPENTER";
    if (userKycStatus) query += `&kycStatus=${userKycStatus}`;
    dispatch(usersGet(query));
  };

  const users_columns = [
    {
      name: "ID",
      cell: (row, index) => <p>{index + 1}</p>,
      sortable: true,
      width: "5%",
    },
    {
      name: "NAME",
      cell: (row) => <p>{row.name}</p>,
      width: "17%",
    },
    {
      name: "EMAIL",
      cell: (row) => <p>{row.email}</p>,
      width: "24%",
    },
    {
      name: "PHONE",
      cell: (row) => <p>{row.phone}</p>,
      width: "11%",
    },
    {
      name: "ROLE",
      selector: (row) => row.role,
      width: "11%",
    },
    {
      name: "IS ACTIVE",
      button: true,
      cell: (row) => (
        <Switch
          onChange={(e) => handleChangeActiveStatus(row._id, e.target.checked)}
          checked={row.isActive}
        />
      ),
      width: "8%",
    },
    {
      name: "BLOCK",
      button: true,
      cell: (row) => (
        <Switch
          onChange={(e) => handleChangeBlockUser(row._id)}
          checked={row.isBlocked}
          color="error"
        />
      ),
      width: "8%",
    },
    {
      name: "KYC Status",
      selector: (row) => {
        const kycColors = {
          pending: "#FFBF00",
          submitted: "red",
          rejected: "red",
          approved: "#097969",
        };
        return (
          <p style={{ color: kycColors[row.kycStatus] || "black" }}>
            {row.kycStatus}
          </p>
        );
      },
      width: "10%",
    },
    {
      name: "Action",
      cell: (row) => (
        <Box>
          <IconButton
            aria-label="more"
            aria-controls="custom-menu"
            aria-haspopup="true"
            onClick={(event) => handleClick(event, row)}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="custom-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                padding: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
              },
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <CustomButton
                btntype="button"
                ClickEvent={() => {
                  handleDialogOpen(menuRow);
                  handleClose();
                }}
                isBtn
                iconName="fa-solid fa-check"
                btnName="View"
              />
              <Link
                to={`/user-point-history/${menuRow?._id}`}
                className="btn btn-secondary text-white"
                style={{
                  textDecoration: "none",
                  padding: "8px 16px",
                  borderRadius: "4px",
                }}
              >
                Points
              </Link>
              <Link
                to={`/user-activity-log/${menuRow?._id}`}
                className="btn btn-secondary text-white"
                style={{
                  textDecoration: "none",
                  padding: "8px 16px",
                  borderRadius: "4px",
                }}
              >
                Logs
              </Link>
            </Box>
          </Menu>
        </Box>
      ),
      width: "7%",
    },
  ];

  const conditionalRowStyles = [
    {
      when: (row) => row.isOnline,
      style: {
        backgroundColor: "#c6efce",
      },
    },
  ];

  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <ul
              className="nav nav-pills dashboard-pills justify-content-end"
              id="pills-tab"
              role="tablist"
            >
              <li>
                <CustomButton
                  navPills
                  btnName={"All Users"}
                  pillActive={true}
                  path={"Users"}
                  extraClass={"test"}
                />
              </li>
            </ul>
          </div>
          <DashboardTable>
            <div className="d-flex align-items-center justify-content-between mb-5">
              <h5 className="blue-1 m-0">Active Users</h5>
              <div className="d-flex align-items-center gap-3">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Online-Users
                  <div
                    style={{
                      backgroundColor: "#c6efce",
                      width: "50px",
                      height: "20px",
                      marginLeft: "10px",
                    }}
                  ></div>
                </div>
                <label>KYC</label>
                <select
                  className="form-control"
                  style={{ width: "auto" }}
                  value={userKycStatus}
                  onChange={(e) => setUserKycStatus(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="submitted">Submitted</option>
                </select>
                <div className="search-field">
                  <form action="#" className="form">
                    <div className="input-group">
                      <div className="input-group-text">
                        <i className="ion-ios-search-strong blue-1"></i>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search"
                        value={search}
                        onChange={(e) => handleSearch(e.target.value)}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <DataTable
              paginationPerPage={10}
              columns={users_columns}
              data={usersArr}
              pagination
              conditionalRowStyles={conditionalRowStyles}
            />
          </DashboardTable>
        </div>
      </section>
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        maxWidth="sm"
        fullWidth
        TransitionComponent={Transition}
        style={{ height: "700px" }}
      >
        <DialogTitle style={{ background: "#E5E4E2" }}>
          Customer Information
        </DialogTitle>
        <DialogContent>
          <div className="dialog-content-flex">
            <div className="customer-profile text-center">
              <a href={selectedData?.image} target="_blank">
                <img
                  src={selectedData?.image}
                  alt=""
                  className="profile-img"
                  target="_blank"
                />
              </a>
              <h6 className="blue-1 text-capitalize my-3">
                {selectedData?.name}
              </h6>
            </div>
            <div className="details-container">
              <ul className="blue-1 fs-14 details-column">
                <li>
                  <span className="fw-600">Email: </span>
                  <span>{selectedData?.email}</span>
                </li>
                <li>
                  <span className="fw-600">Phone: </span>
                  <span>{selectedData?.phone}</span>
                </li>
                <li>
                  <span className="fw-600">Business Name: </span>
                  <span>
                    {!selectedData?.shopName
                      ? "No Business"
                      : selectedData?.shopName}
                  </span>
                </li>

                <li>
                  <span className="fw-600">Points: </span>
                  <span>{selectedData?.points ?? 0}</span>
                </li>
                <li>
                  <span className="fw-600">Registered Date: </span>
                  <span>
                    {new Date(selectedData?.createdAt).toDateString()}
                  </span>
                </li>
                <li>
                  <span className="fw-600">Active Status: </span>
                  <span>
                    {selectedData?.isActive ? (
                      <CustomButton greenBtn btnName="Active" />
                    ) : (
                      <CustomButton redBtn btnName="InActive" />
                    )}
                  </span>
                </li>
              </ul>
            </div>
            <div className="details-container">
              <ul className="blue-1 fs-14 details-column">
                {selectedData?.bankDetails?.length > 0 &&
                  selectedData.bankDetails.map((bank, i) => (
                    <React.Fragment key={i}>
                      <li>
                        <span className="fw-600">Bank Name: </span>
                        {bank.bank}
                      </li>
                      <li>
                        <span className="fw-600">Bank Type: </span>
                        {bank.banktype.charAt(0).toUpperCase() +
                          bank.banktype.slice(1)}
                      </li>
                      <li>
                        <span className="fw-600">Account Number: </span>
                        {bank.accountNo}
                      </li>
                      <li>
                        <span className="fw-600">Account Name: </span>
                        {bank.accountName}
                      </li>
                      <li>
                        <span className="fw-600">IFSC Code: </span>
                        {bank.ifsc}
                      </li>
                    </React.Fragment>
                  ))}

                <li>
                  <span className="fw-600">Id Front Image: </span>
                  {selectedData?.idFrontImage ? (
                    <span>
                      <a href={selectedData?.idFrontImage} target="_blank">
                        <img
                          src={selectedData?.idFrontImage}
                          alt=""
                          className="kyc-img"
                        />
                      </a>
                    </span>
                  ) : (
                    <span>
                      <img
                        src={noImg}
                        alt="Dummy Image"
                        className="kyc-img"
                        style={{ height: "150px", width: "150px" }}
                      />
                    </span>
                  )}
                </li>
                <li>
                  <span className="fw-600">Id Front Image: </span>
                  {selectedData?.idBackImage ? (
                    <span>
                      <a href={selectedData?.idBackImage} target="_blank">
                        <img
                          src={selectedData?.idBackImage}
                          alt=""
                          className="kyc-img"
                        />
                      </a>
                    </span>
                  ) : (
                    <span>
                      <img
                        src={noImg}
                        alt="Dummy Image"
                        className="kyc-img"
                        style={{ height: "150px", width: "150px" }}
                      />
                    </span>
                  )}
                </li>
                <li className="kyc-status-container">
                  <span className="fw-600 kyc-status-label">KYC status: </span>
                  <RadioGroup
                    aria-label="kycStatus"
                    name="kycStatus"
                    value={kycStatus}
                    onChange={(e) =>
                      handleChangeKycStatus(selectedData._id, e.target.value)
                    }
                    className="kyc-radio-group"
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
              </ul>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </main>
  );
}

export default Customer;
