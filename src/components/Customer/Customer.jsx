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
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import CustomButton from "../Utility/Button";
import { DashboardTable } from "../Utility/DashboardBox";
import { useDispatch, useSelector } from "react-redux";
import { usersGet } from "../../redux/actions/Users/users.actions";
import {
  addNotes,
  blockUser,
  getAllContractors,
  getNotesByUser,
  updateUserKycStatus,
  updateUserProfileAdmin,
  updateUserStatus,
} from "../../services/users.service";
import "../../assets/style.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { Link } from "react-router-dom";
import { generateFilePath } from "../Utility/utils";
import Swal from "sweetalert2";
import Slide from "@mui/material/Slide";
import noImg from "../../assets/images/noImg.png";
import SingleFileUpload from "../Utility/SingleFileUpload";
import toast from "react-hot-toast";
import moment from "moment";
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
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedRowForNote, setSelectedRowForNote] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [userNote, setUserNote] = useState([]);
  const [note, setNote] = useState("");
  const [allContractor, setAllContractor] = useState([]);

  const fetchData = async () => {
    try {
      const response = await getAllContractors();
      setAllContractor(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchNotesofUser = async (userId) => {
    try {
      const response = await getNotesByUser(userId);
      console.log("response1", response.data);

      setUserNote(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (selectedData) {
      fetchData();
      fetchNotesofUser(selectedData._id);
      setEditedData(selectedData);
    }
  }, [selectedData]);

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

  const handleSaveOld = async () => {
    if (!note) {
      toast.error("Please enter a note");
      return;
    }
    try {
      // Check the role and set appropriate values to null
      const dataToSend = {
        userId: editedData._id,
        ...editedData,
      };

      if (dataToSend.role === "CARPENTER") {
        // If role is CARPENTER, set businessName to null
        dataToSend.businessName = null;
      } else if (dataToSend.role === "CONTRACTOR") {
        // If role is CONTRACTOR, set contractor to null
        dataToSend.contractor = null;
      }

      // Assuming updateUserProfileAdmin is an API function that expects userId and the entire editedData in the request body
      const response = await updateUserProfileAdmin(dataToSend);

      if (response.data) {
        handleGetAllUsers();
        toast.success(response.data.message);
        setEditedData({});
      }

      // Assuming response.data contains the updated user data or some confirmation message
      return response.data;
    } catch (error) {
      console.error("Error saving note:", error);
      toast.error("Failed to save note");
    }
  };

  const handleSave = async () => {
    if (!note) {
      toast.error("Please enter a note before saving changes");
      return;
    }

    try {
      // Prepare data to send
      const dataToSend = {
        userId: editedData._id,
        ...editedData,
      };

      if (dataToSend.role === "CARPENTER") {
        dataToSend.businessName = null;
      } else if (dataToSend.role === "CONTRACTOR") {
        dataToSend.contractor = null;
      }

      // Send updated user data
      const response = await updateUserProfileAdmin(dataToSend);

      if (response.data) {
        // Save the note if the user update is successful
        await addNotes({ text: note, userId: editedData._id });

        handleGetAllUsers();
        toast.success("Changes saved successfully");
        setNote(""); // Clear the note after saving
        setEditedData({});
      }

      return response.data;
    } catch (error) {
      console.error("Error saving note:", error);
      toast.error("Failed to save note");
    }
  };

  const handleOpenNoteEditor = (row) => {
    setSelectedRowForNote(row);
    setNote(row.note || ""); // Set the note content if any
  };

  const handleCloseNoteEditor = () => {
    setDialogOpen(false);
    setSelectedRowForNote(null);
  };

  const handleSaveNote = async (rowId) => {
    try {
      // Call API to save the note for the specific user
      await saveNoteForUser(rowId, note);
      handleGetAllUsers();
      setSelectedRowForNote(null); // Close the editor after saving
    } catch (err) {
      console.error(err);
      alert("Failed to save note");
    }
  };

  const saveNoteForUser = async (userId, noteData) => {
    try {
      // Assuming updateUserProfileAdmin is an API function that expects userId and noteData in the request body

      const response = await addNotes({ text: noteData, userId: userId });
      if (response.data) {
        toast.success("Note saved successfully");
        setNote(""); // Clear the note after saving
      }
      return response.data;
    } catch (error) {
      console.error("Error saving note:", error);
      toast.error("Failed to save note");
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
      cell: (row, index) => <p>{index + 1 + currentPage * 10}</p>,
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
      sortable: true,
      selector: (row) => (
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

              {/* Add Note Button */}
              <CustomButton
                btntype="button"
                ClickEvent={() => handleOpenNoteEditor(menuRow)}
                isBtn
                iconName="fa-solid fa-edit"
                btnName="Add Note"
              />
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
                <Button
                  onClick={() => {
                    if (isEditMode) {
                      handleSave(); // Call the save function when in edit mode
                    } else {
                      setIsEditMode(true); // Switch to edit mode when in view mode
                    }
                  }}
                  color="primary"
                  style={{ float: "right" }}
                >
                  {isEditMode ? "Save" : "Edit"}
                </Button>
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
                            value={editedData?.role}
                            onChange={(e) => {
                              const newRole = e.target.value;
                              handleEditChange("role", newRole); // Update the role
                              // If the role is changed, reset or update other fields accordingly
                              if (newRole === "CONTRACTOR") {
                                // Set businessName editable for contractor and reset contractor name
                                handleEditChange("contractor", {
                                  ...editedData.contractor,
                                  name: "",
                                });
                              } else if (newRole === "CARPENTER") {
                                // Set contractor name editable for carpenter and reset businessName
                                handleEditChange("businessName", ""); // Reset businessName
                              }
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
                              onChange={
                                (e) =>
                                  handleEditChange(
                                    "businessName",
                                    e.target.value
                                  ) // Allow editing of businessName
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
                              <select
                                value={
                                  editedData?.contractor?.businessName || ""
                                }
                                onChange={(e) => {
                                  // Find the selected business and update contractor name
                                  const selectedBusiness = allContractor.find(
                                    (contractor) =>
                                      contractor.businessName === e.target.value
                                  );
                                  if (selectedBusiness) {
                                    // Set both business name and contractor name in the state
                                    handleEditChange("contractor", {
                                      ...editedData.contractor,
                                      businessName: e.target.value,
                                      name: selectedBusiness.name, // Set the contractor name based on the business name
                                    });
                                  }
                                }}
                                className="edit-input"
                              >
                                <option value="">Select Business Name</option>
                                {allContractor.map((contractor) => (
                                  <option
                                    key={contractor.businessName}
                                    value={contractor.businessName}
                                  >
                                    {contractor.businessName}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <span>
                                {selectedData?.contractor?.businessName ||
                                  "No Business Name"}
                              </span>
                            )}
                          </li>
                        </div>
                      )}

                      <li>
                        <span className="fw-600">Points: </span>
                        <span>{selectedData?.points ?? 0}</span>
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
                        <span className="fw-600">Approved Date : </span>
                        <span>
                          {moment(selectedData?.updatedAt).format(
                            "DD-MM-YYYY hh:mm A"
                          )}
                        </span>
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
                          KYC status:{" "}
                        </span>
                        <RadioGroup
                          aria-label="kycStatus"
                          name="kycStatus"
                          value={kycStatus}
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
              <div>
                {selectedRowForNote && (
                  <div
                    className="note-editor"
                    style={{
                      padding: "20px",
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                    }}
                  >
                    <p>{selectedRowForNote?.name}</p>
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)} // Update note on change
                      rows={3}
                      placeholder="Enter your note..."
                      style={{ width: "100%", padding: "8px" }}
                    />
                    <div>
                      <button
                        onClick={() => handleSaveNote(selectedRowForNote)} // Save note for selected row
                        style={{
                          backgroundColor: "#4CAF50",
                          color: "white",
                          padding: "10px 15px",
                          marginRight: "10px",
                          borderRadius: "5px",
                          border: "none",
                        }}
                      >
                        Save Note
                      </button>
                      <button
                        onClick={handleCloseNoteEditor} // Close editor
                        style={{
                          backgroundColor: "#f44336",
                          color: "white",
                          padding: "10px 15px",
                          borderRadius: "5px",
                          border: "none",
                        }}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <DataTable
              paginationPerPage={10}
              columns={users_columns}
              data={usersArr}
              pagination
              onChangePage={(page) => setCurrentPage(page - 1)} // Update currentPage when page changes
              conditionalRowStyles={conditionalRowStyles}
              paginationRowsPerPageOptions={[10]}
            />
          </DashboardTable>
        </div>
      </section>
    </main>
  );
}

export default Customer;
