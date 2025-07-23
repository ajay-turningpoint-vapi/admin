import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import ActionIcon from "../Utility/ActionIcon";
import SendIcon from "@mui/icons-material/Send";
import { DashboardTable } from "../Utility/DashboardBox";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Loader from "../Utility/Loader.jsx";
import {
  createPromotion,
  deletePromotion,
  fetchPromotions,
  updatePromotion,
} from "../../redux/actions/Promotion/Promotions.actions.jsx";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { url } from "../../services/url.service.js";
import axios from "axios";
import toast from "react-hot-toast";
import { sendPromotion } from "../../services/promotions.service.js";
import { set } from "lodash";
import JobManager from "./JobManager.jsx";

const Promotions = () => {
  const dispatch = useDispatch();
  const { promotions, loading, error } = useSelector(
    (state) => state.promotions
  );

  const [newPromotion, setNewPromotion] = useState({
    title: "",
    message: "",
    imageUrl: "",
    videoUrl: "",
  });
  const [selectedRoles, setSelectedRoles] = React.useState({});

  const [selectedPromotionId, setSelectedPromotionId] = useState(null);
  const [jobModalOpen, setJobModalOpen] = useState(false);
  const [notifyLoading, setNotifyLoading] = useState(false);
  const [open, setOpen] = useState(false); // State to control the modal visibility
  const [editingPromotion, setEditingPromotion] = useState(null); // State to manage editing
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    dispatch(fetchPromotions());
  }, [dispatch]);

  // Handle form input changes
  const handleChange = (e) => {
    setNewPromotion({ ...newPromotion, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const formData = new FormData();
      formData.append("images", selectedFile); // Use correct field name

      try {
        setIsUploading(true);
        const response = await axios.post(`${url}/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const [generatedUrl] = response.data;
        console.log("Generated URL:", generatedUrl);

        setPreviewUrl(generatedUrl); // Set preview URL after upload

        const fileType = selectedFile.type.startsWith("video")
          ? "videoUrl"
          : "imageUrl";

        handleChange({
          target: { name: fileType, value: generatedUrl },
        });
      } catch (error) {
        console.log(error.response?.data); // Log exact error
        console.error(
          "Error uploading file:",
          error.response?.data || error.message
        );
        alert("File upload failed. Please try again.");
      } finally {
        setIsUploading(false); // Stop loader
      }
    }
  };

  // Handle form submission for creating a new promotion
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newPromotion.title.trim()) {
      toast.error("Title is required.");
      return;
    }
    if (!newPromotion.message.trim()) {
      toast.error("Message is required.");
      return;
    }
    if (!editingPromotion && !previewUrl) {
      toast.error("An image/video is required for new promotions.");
      return;
    }

    if (editingPromotion) {
      dispatch(updatePromotion(editingPromotion._id, { ...newPromotion }));
    } else {
      dispatch(createPromotion(newPromotion));
    }
    setNewPromotion({ title: "", message: "", imageUrl: "", videoUrl: "" });
    setFile(null); // Reset file state
    setPreviewUrl(null);
    setOpen(false); // Close modal after submission
  };

  // Handle deletion of a promotion
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this promotion?")) {
      dispatch(deletePromotion(id));
    }
  };

  // Handle editing of a promotion
  const handleEdit = (promotion) => {
    setEditingPromotion(promotion);
    setNewPromotion({
      title: promotion.title,
      message: promotion.message,
      imageUrl: promotion.imageUrl,
      videoUrl: promotion.videoUrl,
    });
    setOpen(true); // Open the modal for editing
  };

  // Handle modal close
  const handleClose = () => {
    setOpen(false);
    setEditingPromotion(null);
    setNewPromotion({ title: "", message: "", imageUrl: "" });
    setFile(null);
    setPreviewUrl("");
  };

  const columns = [
    {
      name: "ID",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "7%",
    },
    {
      name: "Image/Video",
      cell: (row) => {
        console.log("Row Data:", row); // Log the entire row data

        return row?.imageUrl ? (
          <img
            src={row.imageUrl}
            alt={row.title}
            width={100}
            height={100}
            style={{ objectFit: "cover" }}
          />
        ) : row?.videoPromotion?.fileUrl ? ( // Ensure fileUrl exists inside videoPromotion
          <video
            src={row.videoPromotion.fileUrl}
            controls
            width={100}
            height={100}
            style={{ objectFit: "cover" }}
          />
        ) : (
          <p>No Media</p>
        );
      },
      width: "10%",
    },

    {
      name: "Title",
      cell: (row) => <p>{row.title}</p>,
      width: "15%",
    },
    {
      name: "Message",
      cell: (row) => (row?.message ? <p>{row.message}</p> : <p>No Message</p>),
      width: "15%",
    },

    {
      name: "Created At",
      cell: (row) => <p>{new Date(row.createdAt).toDateString()}</p>,
      width: "10%",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: "16px",
            width: "100%",
          }}
        >
          {/* Radio Buttons and Send Button */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <div style={{ display: "flex", gap: "8px" }}>
              <label>
                <input
                  type="radio"
                  name={`role-${row._id}`}
                  value="All"
                  checked={
                    selectedRoles[row._id] === "All" || !selectedRoles[row._id]
                  } // Default to "All" if not set
                  onChange={() => handleRadioChange(row._id, "All")}
                />
                All
              </label>
              <label>
                <input
                  type="radio"
                  name={`role-${row._id}`}
                  value="CONTRACTOR"
                  checked={selectedRoles[row._id] === "CONTRACTOR"}
                  onChange={() => handleRadioChange(row._id, "CONTRACTOR")}
                />
                Contractor
              </label>
              <label>
                <input
                  type="radio"
                  name={`role-${row._id}`}
                  value="CARPENTER"
                  checked={selectedRoles[row._id] === "CARPENTER"}
                  onChange={() => handleRadioChange(row._id, "CARPENTER")}
                />
                Carpenter
              </label>
            </div>
            <IconButton
              onClick={() => handleSend(row)}
              sx={{
                backgroundColor: "#edeae8",
                color: "black",
                borderRadius: "50px",
                fontSize: "small",
                padding: "8px",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              <SendIcon fontSize="small"/>
            </IconButton>
          </div>

          {/* Action Icons */}
          <div style={{ display: "flex", gap: "16px", marginLeft: "50px" }}>
            <IconButton
              onClick={() => handleEdit(row)}
              sx={{
                backgroundColor: "#edeae8",
                borderRadius: "50%",
                width: 40,
                height: 40,
                fontSize: "small",
                color: "black",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                },
              }}
              aria-label="edit"
            >
              <EditIcon fontSize="small"/>
            </IconButton>
            <IconButton
              onClick={() => handleDelete(row._id)}
              sx={{
                backgroundColor: "#edeae8",
                borderRadius: "50%",
                width: 40,
                height: 40,
                fontSize: "small",
                color: "black",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                },
              }}
              aria-label="delete"
            >
              <DeleteIcon fontSize="small"/>
            </IconButton>
          </div>

          <div>
            <IconButton
              onClick={() => {
                setSelectedPromotionId({ id: row._id, title: row.title });
                setJobModalOpen(true);
              }}
              sx={{
                backgroundColor: "#edeae8",
                borderRadius: "50%",
                width: 40,
                height: 40,
                fontSize: "small",
                color: "black",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                },
              }}
              aria-label="manage job"
            >
              <i className="fa-solid fa-clock-rotate-left fa-lg"  ></i>
            </IconButton>
          </div>
        </div>
      ),
      width: "40%",
    },
  ];

  const handleRadioChange = (rowId, value) => {
    setSelectedRoles((prev) => ({
      ...prev,
      [rowId]: value, // Update only the specific row's role
    }));
    console.log(`Selected role for row ${rowId}: ${value}`);
  };

  const handleSend = async (row) => {
    const selectedRole = selectedRoles[row._id] || "All"; // Default to "All" if not set
    const { title, message, imageUrl, videoPromotion } = row;
    const formData = {
      title,
      message,
      imageUrl,
      videoPromotion,
      role: selectedRole !== "All" ? selectedRole : undefined, // Include role if not "All"
    };
    setNotifyLoading(true);

    try {
      const response = await sendPromotion(formData);
      toast.success(response.data.message);
    } catch (error) {
      console.error(
        "Error sending promotion:",
        error.response?.data || error.message
      );
      toast.error("Failed to send promotion. Please try again.");
    } finally {
      setNotifyLoading(false); // Stop loading no matter what
    }
  };

  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="blue-1 m-0">Promotions list</h5>
                {notifyLoading && <Loader />}
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#0a0a0a",
                    color: "#fff",
                    borderRadius: "10px",
                    fontFamily: "sans-serif",
                  }}
                  startIcon={<i className="fa-solid fa-plus"></i>}
                  onClick={() => setOpen(true)}
                >
                  ADD NEW Promotion
                </Button>
              </div>
              {isUploading && <p>Uploading file, please wait...</p>}

              {loading ? (
                <Loader />
              ) : error ? (
                <p>{error}</p>
              ) : (
                <DashboardTable>
                  <DataTable columns={columns} data={promotions} pagination />
                </DashboardTable>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Create/Edit Promotion Modal */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingPromotion ? "Edit Promotion" : "Create New Promotion"}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              margin="normal"
              name="title"
              value={newPromotion.title}
              onChange={handleChange}
              required
            />
            <TextField
              label="Message"
              variant="outlined"
              fullWidth
              margin="normal"
              name="message"
              value={newPromotion.message}
              onChange={handleChange}
              required
              multiline
              rows={4}
            />
            <Box mt={2}>
              <Typography variant="subtitle1" gutterBottom>
                Upload Image/Video:
              </Typography>
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleFileChange}
                style={{ marginBottom: 16 }}
              />
              {previewUrl && (
                <Box mt={2} textAlign="center">
                  {previewUrl.match(/\.(jpeg|jpg|png|webp)$/i) ? (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      style={{
                        width: "100%",
                        maxHeight: 200,
                        objectFit: "contain",
                      }}
                    />
                  ) : previewUrl.match(/\.(mp4|webm|ogg|mkv|mov)$/i) ? (
                    <video
                      src={previewUrl}
                      controls
                      style={{
                        width: "100%",
                        maxHeight: 200,
                        objectFit: "contain",
                      }}
                    />
                  ) : (
                    <p>Unsupported file format</p>
                  )}
                </Box>
              )}
            </Box>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ color: "black" }}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            style={{
              backgroundColor: "#0a0a0a",
              color: "#fff",
              fontFamily: "sans-serif",
            }}
            onClick={handleSubmit}
          >
            {editingPromotion ? "Update Promotion" : "Create Promotion"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={jobModalOpen}
        onClose={() => setJobModalOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Manage Cron Job</DialogTitle>
        <DialogContent>
          <JobManager promotionId={selectedPromotionId} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setJobModalOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </main>
  );
};

export default Promotions;
