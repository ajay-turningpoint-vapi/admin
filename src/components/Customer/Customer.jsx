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
  TextField,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import React, { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import CustomButton from "../Utility/Button";
import { DashboardTable } from "../Utility/DashboardBox";
import { useDispatch, useSelector } from "react-redux";
import { usersGet } from "../../redux/actions/Users/users.actions";
import DiamondIcon from "@mui/icons-material/Diamond";

import {
  addNotes,
  blockUser,
  getAllContractorsUserProfile,
  getNotesByUser,
  getOnlineUsersCount,
  updateUserKycStatus,
  updateUserProfileAdmin,
  updateUserStatus,
} from "../../services/users.service";
import "../../assets/style.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VerifiedIcon from "@mui/icons-material/Verified";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { generateFilePath } from "../Utility/utils";
import Swal from "sweetalert2";
import Slide from "@mui/material/Slide";
import noImg from "../../assets/images/noImg.png";
import SingleFileUpload from "../Utility/SingleFileUpload";
import toast from "react-hot-toast";
import moment from "moment";
import { debounce } from "lodash";
import Select from "react-select";
import AddNote from "./AddNote";
import ScheduleSelector from "./ScheduleSelector";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { url } from "../../services/url.service";
import { useDebounce } from "use-debounce";
import useAdminStatus from "../../hooks/useAdminStatus";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});
function Customer() {
  const isAdmin = useAdminStatus();

  const dispatch = useDispatch();
  const callCount = useRef(0);
  const navigate = useNavigate();
  const location = useLocation();
  const [onlineCount, setOnlineCount] = useState(0);
  const [openAddNote, setOpenAddNote] = useState(false);
  const [addScheduler, setAddScheduler] = useState(false);
  const [selectedAction, setSelectedAction] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [usersArr, setUsersArr] = useState([]);
  const userArr = useSelector((state) => state.users.users);
  const loading = useSelector((state) => state.users.loading);
  const [selectedData, setSelectedData] = useState(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [userKycStatus, setUserKycStatus] = useState(null);
  const [kycStatus, setKycStatus] = useState("");
  const [menuRow, setMenuRow] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [currentPage, setCurrentPage] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [userNote, setUserNote] = useState([]);
  const [note, setNote] = useState("");
  const [allContractor, setAllContractor] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchData = async () => {
    try {
      const response = await getAllContractorsUserProfile();

      setAllContractor(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchOnlineUserCount = async () => {
    try {
      const response = await getOnlineUsersCount();

      setOnlineCount(response.data?.onlineUsers);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const currentPage = parseInt(params.get("page") || "1", 10);

    if (page !== currentPage) {
      setPage(currentPage);
    }
  }, [location.search]);

  useEffect(() => {
    if (selectedData) {
      fetchData();
      fetchNotesofUser(selectedData._id);
      setEditedData(selectedData);
    }
  }, [selectedData]);

  const handleGetAllUsers = () => {
    callCount.current += 1;
    console.log(`handleGetAllUsers called ${callCount.current} times`);

    const params = new URLSearchParams();
    if (debouncedSearch) params.append("search", debouncedSearch);
    if (page) params.append("page", page);
    if (limit) params.append("limit", limit);
    if (sortBy) params.append("sortBy", sortBy);
    if (sortOrder) params.append("sortOrder", sortOrder);
    if (userKycStatus) params.append("kycStatus", userKycStatus);
    if (startDate && endDate) {
      params.append("startDate", startDate);
      params.append("endDate", endDate);
    }

    const queryString = params.toString();
    const finalURL = queryString ? `?${queryString}` : "";

    dispatch(usersGet(finalURL));
  };

  useEffect(() => {
    handleGetAllUsers();
    fetchOnlineUserCount();
  }, [
    debouncedSearch,
    page,
    limit,
    sortBy,
    sortOrder,
    userKycStatus,
    startDate,
    endDate,
  ]);

  useEffect(() => {
    if (userArr?.data) {
      setUsersArr(userArr.data);
      setTotalRows(userArr.total || 0);
    }
  }, [userArr]);

  // const handlePageChange = (newPage) => {
  //   setPage(newPage);
  // };

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(location.search);

    if (newPage === 1) {
      params.delete("page"); // clean URL
    } else {
      params.set("page", newPage);
    }

    const newUrl = params.toString()
      ? `${location.pathname}?${params.toString()}`
      : location.pathname;

    navigate(newUrl, { replace: false });
  };

  const handleRowsPerPageChange = (newPerPage, newPage) => {
    setLimit(newPerPage);
    setPage(newPage);
  };

  const handleSort = (column, direction) => {
    if (!column?.selector) {
      setSortBy("createdAt");
      return;
    }

    setSortBy(column.selector);
    setSortOrder(direction);
  };

  const fetchNotesofUser = async (userId) => {
    try {
      const response = await getNotesByUser(userId);

      setUserNote(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEditChange = (field, value, bankIndex = null) => {
    setEditedData((prev) => {
      if (bankIndex !== null) {
        const updatedBankDetails = [...prev.bankDetails];
        updatedBankDetails[bankIndex] = {
          ...updatedBankDetails[bankIndex],
          [field]: value,
        };
        return { ...prev, bankDetails: updatedBankDetails };
      }
      return { ...prev, [field]: value };
    });
  };

  const handleFileSet = (field, fileData) => {
    // Extract the fileUrl from the fileData object
    const fileUrl = fileData.fileUrl;

    setEditedData((prev) => ({
      ...prev,
      [field]: fileUrl, // Only update with the file URL
    }));
  };

  const handleSave = async () => {
    if (!note) {
      toast.error("Please enter a note before saving changes");
      return;
    }

    try {
      // Prepare user update data
      const { _id: userId, role, ...otherFields } = editedData;

      const dataToSend = {
        userId,
        role,
        ...otherFields,
        businessName: role === "CARPENTER" ? null : otherFields.businessName,
        contractor: role === "CONTRACTOR" ? null : otherFields.contractor,
        note: [],
      };

      // Execute both API calls concurrently
      const [userUpdateResponse, noteResponse] = await Promise.all([
        updateUserProfileAdmin(dataToSend),
        addNotes({ text: note, userId }),
      ]);

      if (userUpdateResponse?.data && noteResponse) {
        toast.success("Changes saved successfully");

        setNote(""); // Clear the note after saving
        setEditedData({});
        setIsEditMode(false);
        setDialogOpen(false);
        handleGetAllUsers();
      }
    } catch (error) {
      console.error("Error saving changes:", error);
      toast.error("Failed to save changes");
    }
  };

  const handleClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setMenuRow(row);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMenuRow(null);
  };

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
      setSelectedUser({ userId: id, isActive: value });

      setOpenAddNote(true);
      setSelectedUserId(id);
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
      setSelectedUser({ userId: id, isBlocked: value });

      setSelectedAction("blockedActivity"); // Mark as Active Status Change
      setOpenAddNote(true);
      setSelectedUserId(id);
    }
  };

  // const handleNoteSubmit = async () => {
  //   if (!selectedUser) return;

  //   try {
  //     handleGetAllUsers();
  //     setOpenAddNote(false);
  //     setSelectedUser(null);
  //     setSelectedAction("");
  //   } catch (err) {
  //     console.error(err.response?.data?.message || err.message);
  //     alert(err.response?.data?.message || err.message);
  //   }
  // };

  const handleNoteSubmit = async () => {
    if (!selectedUser) return;

    try {
      // Simulate update (you may call an API here if needed)

      // Update local user list to reflect the change
      setUsersArr((prevUsers) =>
        prevUsers.map((user) => {
          if (user._id === selectedUser.userId) {
            return {
              ...user,
              ...(selectedAction === "blockedActivity"
                ? { isBlocked: selectedUser.isBlocked }
                : { isActive: selectedUser.isActive }),
            };
          }
          return user;
        })
      );

      // Clear and close note dialog
      setOpenAddNote(false);
      setSelectedUser(null);
      setSelectedAction("");

      // You can still call handleGetAllUsers if necessary
      // handleGetAllUsers(); // Optional, for sync with backend
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
      alert(err.response?.data?.message || err.message);
    }
  };

  const handleDialogOpen = (row) => {
    console.log("row", row);
    setDialogOpen(true);
    setSelectedData(row);
    setKycStatus(row.kycStatus);
  };

  const handleDialogClose = () => {
    setNote("");
    setDialogOpen(false);
    setSelectedData(null);
    setIsEditMode(false);
  };

  const handleChangeKycStatus = async (id, value) => {
    setEditedData((prev) => ({
      ...prev,
      kycStatus: value,
    }));
  };

  const handleStartDateChange = (e) => setStartDate(e.target.value);
  const handleEndDateChange = (e) => setEndDate(e.target.value);

  const contractorOptions = allContractor.map((contractor) => ({
    value: contractor.phone, // Search by phone
    label: `${contractor.businessName} (${contractor.phone})`, // Show business name with phone
    businessName: contractor.businessName,
    name: contractor.name,
  }));

  const handleSelectChange = (selectedOption) => {
    const selectedBusiness = allContractor.find(
      (contractor) => contractor.phone === selectedOption.value
    );

    if (selectedBusiness) {
      handleEditChange("contractor", {
        ...editedData.contractor,
        businessName: selectedBusiness?.businessName,
        name: selectedBusiness.name,
        phone: selectedBusiness.phone,
      });
    }
  };

  // Ensure the selected value is properly formatted
  const selectedValue = contractorOptions.find(
    (option) => option.businessName === editedData.contractor?.businessName
  );

  const users_columns = [
    {
      name: "ID",
      cell: (row, index) => <p>{index + 1 + currentPage * 10}</p>,
      width: "5%",
    },
    {
      name: "NAME",
      cell: (row) => (
        <p>
          {row.isVerified && (
            <VerifiedIcon
              style={{
                marginRight: "5px",
                color: "#24C47B",
              }}
            />
          )}
          {row.name}
        </p>
      ),
      width: "17%",
    },
    {
      name: "EMAIL",
      cell: (row) => <p>{row.email ? row.email : "Iphone Signup"}</p>,
      width: "24%",
    },
    {
      name: "PHONE",
      cell: (row) => <p>{row.phone}</p>,
      width: "11%",
    },
    {
      name: "ROLE",
      sortable: true,
      selector: "role",
      cell: (row) => (
        <p
          style={{
            display: "inline-block",
            padding: "5px 10px",
            borderRadius: "15px",
            backgroundColor:
              row.role === "CONTRACTOR" ? "#ae6f2d" : "transparent",
            color: row.role === "CONTRACTOR" ? "white" : "inherit",

            textAlign: "center",
          }}
        >
          {row.role}
        </p>
      ),
      width: "11%",
    },

    {
      name: "IS ACTIVE",
      button: true,
      sortable: true,
      selector: "isActive",
      cell: (row) => (
        <Switch
          onChange={(e) => handleChangeActiveStatus(row._id, e.target.checked)}
          checked={row.isActive}
          disabled={!isAdmin}
        />
      ),
      width: "8%",
    },

    {
      name: "BLOCK",
      button: true,
      sortable: true,
      selector: "isBlocked",
      cell: (row) => (
        <Switch
          onChange={(e) => handleChangeBlockUser(row._id, e.target.checked)}
          checked={row.isBlocked}
          disabled={!isAdmin}
          color="error"
        />
      ),
      width: "8%",
    },

    {
      name: "KYC Status",
      cell: (row) => {
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
              {/* Other menu items */}
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
          <div className="d-flex align-items-center justify-content-end mb-3">
            <div style={{ marginRight: "30px" }}>
              <Button
                variant="contained"
                component="a"
                href={`${url}/users/getExcelReportOfUser`}
                download="users-report.xlsx"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  backgroundColor: "black",
                  color: "white",
                  "&:hover": { backgroundColor: "#333" },
                  borderRadius: "20px",
                  fontSize: "12px",
                  padding: "7px 18px",
                  textTransform: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <DownloadIcon sx={{ fontSize: 16 }} />
                EXCEL REPORT
              </Button>
            </div>

            {isAdmin && (
              <Button
                onClick={() => setAddScheduler((prev) => !prev)}
                sx={{
                  backgroundColor: (theme) =>
                    addScheduler
                      ? theme.palette.error.main
                      : theme.palette.primary.main,
                  color: "white",
                  borderRadius: "50px",
                  height: "35px",
                  minHeight: "35px",
                  padding: "0 20px",
                  fontSize: "12px",
                  "&:hover": {
                    backgroundColor: (theme) =>
                      addScheduler
                        ? theme.palette.error.dark
                        : theme.palette.primary.dark,
                  },
                }}
              >
                <AccessTimeIcon sx={{ fontSize: 18, marginRight: 1 }} />
                {addScheduler ? "Close Scheduler" : "Add Scheduler"}
              </Button>
            )}

            {addScheduler && (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <ScheduleSelector />
              </LocalizationProvider>
            )}
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
                      width: "70px",
                      height: "20px",
                      marginLeft: "10px",
                      display: "flex",
                      justifyContent: "center", // Centers horizontally
                      alignItems: "center", // Centers vertically
                    }}
                  >
                    {onlineCount}
                  </div>
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

                <input
                  className="form-control"
                  type={startDate ? "date" : "text"}
                  value={startDate}
                  style={{ width: "auto" }}
                  onChange={handleStartDateChange}
                  placeholder="Start Date"
                  onFocus={(e) => (e.target.type = "date")}
                />

                <input
                  className="form-control"
                  type={endDate ? "date" : "text"}
                  value={endDate}
                  style={{ width: "auto" }}
                  onChange={handleEndDateChange}
                  placeholder="End Date"
                  onFocus={(e) => (e.target.type = "date")}
                />

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
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
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
                {isAdmin && (
                  <Button
                    onClick={() => {
                      if (isEditMode) {
                        handleSave();
                      } else {
                        setIsEditMode(true);
                      }
                    }}
                    color="primary"
                    style={{ float: "right" }}
                  >
                    {isEditMode ? "Save" : "Edit"}
                  </Button>
                )}
              </DialogTitle>
              <DialogContent>
                <div className="dialog-content-flex">
                  <div className="customer-profile text-center">
                    {isEditMode ? (
                      <SingleFileUpload
                        onFileChange={(fileUrl) =>
                          handleFileSet("image", fileUrl)
                        }
                      />
                    ) : (
                      <span>
                        <a href={selectedData?.image} target="_blank">
                          <img
                            src={selectedData?.image}
                            alt=""
                            className="profile-img"
                            target="_blank"
                          />
                        </a>
                      </span>
                    )}

                    {isEditMode ? (
                      <input
                        type="text"
                        value={editedData?.name}
                        onChange={(e) =>
                          handleEditChange("name", e.target.value)
                        }
                        className="edit-input"
                      />
                    ) : (
                      <h6 className="blue-1 text-capitalize my-3">
                        {selectedData?.name}
                      </h6>
                    )}
                  </div>
                  <div className="details-container">
                    <ul className="blue-1 fs-14 details-column">
                      <li>
                        <span className="fw-600">Email: </span>

                        <span>{selectedData?.email}</span>
                      </li>
                      <li>
                        <span className="fw-600">Phone: </span>
                        {isEditMode ? (
                          <input
                            type="text"
                            value={editedData?.phone}
                            onChange={(e) =>
                              handleEditChange("phone", e.target.value)
                            }
                            className="edit-input"
                          />
                        ) : (
                          <span>{selectedData?.phone}</span>
                        )}
                      </li>

                      <li>
                        <span className="fw-600">Role: </span>
                        {isEditMode ? (
                          <select
                            value={editedData?.role || ""}
                            onChange={(e) => {
                              const newRole = e.target.value;

                              setEditedData((prev) => {
                                if (!prev) return prev;

                                return {
                                  ...prev,
                                  role: newRole,
                                  contractor:
                                    newRole === "CONTRACTOR"
                                      ? { name: "" }
                                      : prev.contractor,
                                  businessName:
                                    newRole === "CARPENTER"
                                      ? ""
                                      : prev.businessName,
                                };
                              });

                              console.log("Role changed to:", newRole);
                            }}
                            className="edit-input"
                          >
                            <option value="CONTRACTOR">CONTRACTOR</option>
                            <option value="CARPENTER">CARPENTER</option>
                          </select>
                        ) : (
                          <span>{selectedData?.role}</span>
                        )}
                      </li>

                      {/* Show Business Name field for CONTRACTOR role */}
                      {editedData.role === "CONTRACTOR" && (
                        <li>
                          <span className="fw-600">Business Name: </span>
                          {isEditMode ? (
                            <input
                              type="text"
                              value={editedData?.businessName || ""}
                              onChange={(e) =>
                                handleEditChange("businessName", e.target.value)
                              }
                              className="edit-input"
                            />
                          ) : (
                            <span>
                              {selectedData?.businessName || "No Business Name"}
                            </span>
                          )}
                        </li>
                      )}

                      {/* Show Contractor Name and Business Name fields for CARPENTER role */}
                      {editedData.role === "CARPENTER" && (
                        <div>
                          <li>
                            <span className="fw-600">Contractor Name: </span>
                            {isEditMode ? (
                              <input
                                type="text"
                                value={editedData?.contractor?.name || ""}
                                readOnly
                                className="edit-input"
                              />
                            ) : (
                              <span>
                                {selectedData?.contractor?.name ||
                                  "No Contractor"}
                              </span>
                            )}
                          </li>
                          <li>
                            <span className="fw-600">Business Name: </span>
                            {isEditMode ? (
                              <Select
                                options={contractorOptions}
                                value={selectedValue} // Ensures correct display of selected businessName
                                onChange={handleSelectChange}
                                getOptionLabel={(e) => e.label} // Show businessName (phone) in options
                              />
                            ) : (
                              <span>
                                {selectedData?.contractor?.businessName ||
                                  "No Business Name"}
                              </span>
                            )}
                          </li>

                          <li>
                            <span className="fw-600">Contractor Phone: </span>

                            <span>
                              {selectedData?.contractor?.phone ||
                                "No Contractor"}
                            </span>
                          </li>
                        </div>
                      )}

                      <li>
                        <span className="fw-600">Points: </span>
                        <span>{selectedData?.points ?? 0}</span>
                      </li>

                      <li>
                        <span className="fw-600">Diamond Points: </span>
                        <span>{selectedData?.accumulatedPoints ?? 0}</span>
                      </li>

                      <li>
                        <span className="fw-600">Diamonds: </span>
                        <span>
                          {selectedData?.diamonds ?? 0}{" "}
                          <DiamondIcon style={{ color: "#FFD700" }} />
                        </span>
                      </li>

                      <li>
                        <span className="fw-600">Registered Date: </span>
                        <span>
                          {moment(selectedData?.createdAt).format(
                            "DD-MM-YYYY hh:mm A"
                          )}
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

                      <li>
                        <span className="fw-600">Activated Date : </span>
                        <span>
                          {selectedData?.isActiveDate
                            ? moment(selectedData.isActiveDate).format(
                                "DD-MM-YYYY hh:mm A"
                              )
                            : "N/A"}
                        </span>
                      </li>
                      <li>
                        <span className="fw-600">Is Verified: </span>
                        {isEditMode ? (
                          <input
                            type="checkbox"
                            checked={editedData?.isVerified || false}
                            onChange={(e) =>
                              handleEditChange("isVerified", e.target.checked)
                            }
                          />
                        ) : (
                          <input
                            type="checkbox"
                            checked={selectedData?.isVerified || false}
                          />
                        )}
                      </li>
                    </ul>
                  </div>
                  <div className="details-container">
                    <ul className="blue-1 fs-14 details-column">
                      {editedData?.bankDetails?.map((bank, i) => (
                        <React.Fragment key={i}>
                          <li>
                            <span className="fw-600">Bank Type: </span>
                            {isEditMode ? (
                              <select
                                value={bank.banktype}
                                onChange={(e) =>
                                  handleEditChange(
                                    "banktype",
                                    e.target.value,
                                    i
                                  )
                                }
                                className="edit-select"
                              >
                                <option value="savings">Savings</option>
                                <option value="current">Current</option>
                              </select>
                            ) : (
                              <span>
                                {bank.banktype.charAt(0).toUpperCase() +
                                  bank.banktype.slice(1)}
                              </span>
                            )}
                          </li>
                          <li>
                            <span className="fw-600">Account Number: </span>
                            {isEditMode ? (
                              <input
                                type="text"
                                value={bank.accountNo}
                                onChange={(e) =>
                                  handleEditChange(
                                    "accountNo",
                                    e.target.value,
                                    i
                                  )
                                }
                                className="edit-input"
                              />
                            ) : (
                              <span>{bank.accountNo}</span>
                            )}
                          </li>
                          <li>
                            <span className="fw-600">Account Name: </span>
                            {isEditMode ? (
                              <input
                                type="text"
                                value={bank.accountName}
                                onChange={(e) =>
                                  handleEditChange(
                                    "accountName",
                                    e.target.value,
                                    i
                                  )
                                }
                                className="edit-input"
                              />
                            ) : (
                              <span>{bank.accountName}</span>
                            )}
                          </li>
                          <li>
                            <span className="fw-600">IFSC Code: </span>
                            {isEditMode ? (
                              <input
                                type="text"
                                value={bank.ifsc}
                                onChange={(e) =>
                                  handleEditChange("ifsc", e.target.value, i)
                                }
                                className="edit-input"
                              />
                            ) : (
                              <span>{bank.ifsc}</span>
                            )}
                          </li>
                        </React.Fragment>
                      ))}

                      <li>
                        <span className="fw-600">Id Front Image: </span>
                        {isEditMode ? (
                          <SingleFileUpload
                            onFileChange={(fileUrl) =>
                              handleFileSet("idFrontImage", fileUrl)
                            }
                          />
                        ) : selectedData?.idFrontImage ? (
                          <span>
                            <a
                              href={selectedData?.idFrontImage}
                              target="_blank"
                            >
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

                      {/* Id Back Image */}
                      <li>
                        <span className="fw-600">Id Back Image: </span>
                        {isEditMode ? (
                          <SingleFileUpload
                            onFileChange={(fileUrl) =>
                              handleFileSet("idBackImage", fileUrl)
                            }
                          />
                        ) : selectedData?.idBackImage ? (
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

                      {/* Selfie */}
                      <li>
                        <span className="fw-600">Selfie: </span>
                        {isEditMode ? (
                          <SingleFileUpload
                            onFileChange={(fileUrl) =>
                              handleFileSet("selfie", fileUrl)
                            }
                          />
                        ) : selectedData?.selfie ? (
                          <span>
                            <a href={selectedData?.selfie} target="_blank">
                              <img
                                src={selectedData?.selfie}
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
                        <span className="fw-600 kyc-status-label">
                          KYC status:
                        </span>
                        {isEditMode ? (
                          <RadioGroup
                            aria-label="kycStatus"
                            name="kycStatus"
                            value={editedData?.kycStatus}
                            onChange={(e) =>
                              handleChangeKycStatus(
                                selectedData._id,
                                e.target.value
                              )
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
                        ) : (
                          <span>
                            {selectedData?.kycStatus
                              ? selectedData.kycStatus.charAt(0).toUpperCase() +
                                selectedData.kycStatus.slice(1)
                              : "No Status"}
                          </span>
                        )}
                      </li>

                      <li>
                        <span className="fw-600">KYC Approved Date : </span>
                        <span>
                          {selectedData?.kycApprovedDate
                            ? moment(selectedData.kycApprovedDate).format(
                                "DD-MM-YYYY hh:mm A"
                              )
                            : "N/A"}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                {isEditMode && (
                  <div>
                    <TextField
                      label="Note (required to save changes)"
                      multiline
                      rows={4}
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      disabled={!isEditMode}
                    />
                  </div>
                )}
                <div>
                  <table style={{ width: "100%", fontSize: "14px" }}>
                    {userNote &&
                      userNote.map((note) => {
                        return (
                          <>
                            <tr style={{ borderBottom: "1px solid #ccc" }}>
                              <td style={{ fontSize: "12px", width: "32%" }}>
                                {moment(note.createdAt).format(
                                  "DD-MM-YYYY hh:mm A"
                                )}
                              </td>
                              <td>{note.text}</td>
                            </tr>
                          </>
                        );
                      })}
                  </table>
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDialogClose} color="primary">
                  Close
                </Button>
              </DialogActions>
            </Dialog>

            <div>
              {openAddNote && (
                <AddNote
                  open={openAddNote}
                  handleClose={() => setOpenAddNote(false)}
                  handleAddNote={handleNoteSubmit}
                  userId={selectedUserId}
                  selectedUser={selectedUser}
                />
              )}
            </div>
            <DataTable
              columns={users_columns}
              data={usersArr}
              pagination
              paginationServer
              paginationTotalRows={totalRows}
              onChangePage={handlePageChange}
              onChangeRowsPerPage={handleRowsPerPageChange}
              progressPending={loading}
              defaultSortAsc={false}
              sortServer
              onSort={handleSort}
              sortColumn={sortBy}
              sortDirection={sortOrder}
              conditionalRowStyles={conditionalRowStyles}
            />
          </DashboardTable>
        </div>
      </section>
    </main>
  );
}

export default Customer;
