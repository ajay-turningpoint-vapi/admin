import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import ActionIcon from "../Utility/ActionIcon";
import { DashboardTable } from "../Utility/DashboardBox";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userPointHistory } from "../../redux/actions/Users/users.actions";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import moment from "moment";
import {
  bulkupdateWinnersBlockStatus,
  getUserContestsCount,
  getUserContestsReport,
  getUserContestsReportLose,
  getUserPointHistoryById,
  getUserStatsReport,
} from "../../services/users.service";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import {
  FormControlLabel,
  IconButton,
  Input,
  Pagination,
  Switch,
  Typography,
} from "@mui/material";
import "../../assets/scss/main.css";
import Loader from "../Utility/Loader.jsx";
import NoteModal from "./NoteModal.jsx";
import { addUserContestNote } from "../../services/contest.service.js";
import toast from "react-hot-toast";
import { use } from "react";
import { useDebounce } from "use-debounce";
function UserContestDashboard() {
  const dispatch = useDispatch();
  const { contestId } = useParams();

  // States
  const [pageLimit] = useState(10);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [userContArr, setUserContArr] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [count, setCount] = useState(0);
  const [totalUsersJoined, setTotalUsersJoined] = useState(0);
  const [viewMode, setViewMode] = useState("winners");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
   const [debouncedSearch] = useDebounce(filter, 500);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isBlocked, setIsBlocked] = useState(false);
  const [enableMode, setEnableMode] = useState(false);

  // Fetch winners or losers based on viewMode
  const handleDataFetch = async () => {
    setLoading(true);
    let query = `contestId=${contestId}&page=${page}&limit=${pageLimit}`;
    if (search) query += `&q=${search}`;
    if (filter) query += `&f=${debouncedSearch}`;

    try {
      if (viewMode === "winners") {
        const response = await getUserContestsReport(query);
        setTotalUsersJoined(response.data.totalUsersJoined);
        setUserContArr(response.data);
        if (response.data.data?.length > 0) {
          setIsBlocked(response.data.data[0].userObj.isBlocked);
        }

        setTotalPages(response.data.totalPage);
      }
      const countResponse = await getUserContestsCount(contestId);
      setCount(countResponse.data.totalJoinCount);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when page, search, or viewMode changes
  useEffect(() => {
    handleDataFetch();
  }, [page, search, viewMode, debouncedSearch]);

  // Pagination handler
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // View mode switch handler
  const handleFilterClick = (mode) => {
    setViewMode(mode);
    setEnableMode(true);
    setPage(1);
    setSearch(mode === "winners" ? "winners" : "");
  };

  const handleAddNote = (row) => {
    setSelectedRow(row);
    setIsNoteModalOpen(true);
  };

  const handleToggle = async () => {
    const confirmAction = window.confirm(
      `Are you sure you want to ${isBlocked ? "unblock" : "block"} all winners?`
    );
    if (!confirmAction) return;

    try {
      const newBlockedStatus = !isBlocked;

      const updateData = {
        contestId: userContArr?.data?.[0]?.contestId,
        isBlocked: newBlockedStatus,
      };

      if (!updateData.contestId) {
        console.error("Error: contestId is missing.");
        alert("Error: Contest ID is missing.");
        return;
      }

      await bulkupdateWinnersBlockStatus(updateData);
      setIsBlocked(newBlockedStatus);
      alert(
        `Winners have been ${
          newBlockedStatus ? "blocked" : "unblocked"
        } successfully.`
      );
    } catch (error) {
      console.error("Error updating block status:", error.message);
      alert("Failed to update block status. Please try again.");
    }
  };

  const handleSaveNote = async (note) => {
    try {
      if (!selectedRow?.contestId || !selectedRow?.userId) {
        toast.error("Invalid contest or user selection.");
        return;
      }
      if (!note.text.trim()) {
        toast.error("Note text cannot be empty.");
        return;
      }

      await addUserContestNote({
        _id: selectedRow._id,
        ...note,
      });

      toast.success("Note saved successfully!");
    } catch (error) {
      console.error("Error saving note:", error);
      toast.error(
        error.response?.data?.message || error.message || "Failed to save note."
      );
    }
  };
  const ExpandedComponent = ({ data }) => (
    <div style={{ padding: "10px", background: "#f9f9f9" }}>
      <p>
        <strong>ID:</strong> {data._id}
      </p>

      {/* Add any other data fields you want to show */}
    </div>
  );
  // Columns configuration
  const points_columns = [
    {
      name: "Rank",
      selector: (row) => row.rankAsNumber,
      sortable: true,
      width: "10%",
      cell: (row) =>
        row.status === "win" ? (
          <span style={{ color: "green", fontWeight: "bold" }}>
            {row.rankAsNumber}
          </span>
        ) : (
          "-"
        ), // Show "-" if status is not "win"
    },
    // {
    //   name: "Contest",
    //   selector: (row) => row.contestObj?.name,
    //   sortable: true,
    //   width: "15%",
    // },

    {
      name: "Name",
      selector: (row) => row.userObj?.name,
      sortable: true,
      width: "20%",
    },
    {
      name: "Phone",
      selector: (row) => row.userObj?.phone,
      sortable: true,
      width: "15%",
    },

    {
      name: "Join Date",
      width: "15%",
      selector: (row) => (
        <p>{`${moment(row?.createdAt).format("DD-MM-YYYY")} - ${moment(
          row?.createdAt
        ).format("hh:mm A")}`}</p>
      ),
    },

    {
      name: "Status",
      width: "10%",
      selector: (row) => row?.status,
    },

    {
      name: "BLOCK",
      button: true,

      cell: (row) => <Switch checked={row?.userObj?.isBlocked} color="error" />,
      width: "10%",
    },

    {
      name: "Add Note",
      width: "15%",
      cell: (row) => {
        if (row.note && row.note.length > 0) {
          return (
            <IconButton onClick={() => handleAddNote(row)} color="secondary">
              <FormatListBulletedIcon />
            </IconButton>
          );
        } else if (row.status === "win") {
          return (
            <IconButton onClick={() => handleAddNote(row)} color="primary">
              <AddCircleIcon />
            </IconButton>
          );
        }
        return null; // Hides the column content for other statuses
      },
    },
  ];

  return (
    <main>
      <section className="product-category" style={{ minHeight: "75vh" }}>
        <div className="container-fluid p-0">
          <h5 className="blue-1 mb-4">Contest: ({`${userContArr?.data[0]?.contestObj.name}` ||"User Contest Dashboard"})</h5>
          <div className="row mb-3">
            <div className="col-3 gap-2 mb-3">
              <div className="row mx-1">
                <div className="col-12 py-4 border rounded bg-white usercontestactivediv">
                  <h6 className="blue-1 mb-4">Users Join Count</h6>
                  <div>{count || 0}</div>
                </div>
              </div>
            </div>
            <div className="col-3 gap-2 mb-3">
              <div className={`row mx-1 ${""}`}>
                <div className="col-12 py-4 border rounded bg-white usercontestactivediv">
                  <h6 className="blue-1 mb-4">Users Enrolled</h6>
                  <div>{totalUsersJoined || 0}</div>
                </div>
              </div>
            </div>
            <div className="col-3 gap-2 mb-3">
              <div
                className={`row mx-1 ${
                  viewMode === "winners" ? "usercontestactive" : ""
                }`}
                onClick={() => handleFilterClick("winners")}
              >
                <div className="col-12 py-4 border rounded bg-white usercontestactivediv">
                  <h6 className="blue-1 mb-4">Winners</h6>

                  <div>Click to View</div>
                </div>
              </div>
            </div>
            <div className="col-3 gap-2 mb-3">
              {enableMode === true && (
                <div
                  className={`row mx-1 ${
                    viewMode === "losers" ? "usercontestactive" : ""
                  }`}
                >
                  <div className="col-12 py-4 border rounded bg-white usercontestactivediv">
                    <h6 className="blue-1 mb-2">Block/Unblock Users</h6>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={isBlocked}
                          onChange={handleToggle}
                          color="error"
                        />
                      }
                      label={
                        <Typography
                          style={{
                            color: isBlocked ? "red" : "green",
                            fontWeight: "bold",
                          }}
                        >
                          {isBlocked ? "(Blocked)" : "(Active)"}
                        </Typography>
                      }
                    />
                  </div>
                </div>
              )}
            </div>

            {enableMode === true && (
              <div
                className="col-3 gap-2 mb-3"
                style={{ display: "flex", alignSelf: "flex-end" }}
              >
                <Input
                  type="text"
                  placeholder="Search..."
                  style={{ width: "70%" }}
                  onChange={(e) => setFilter(e.target.value)}
                />

              </div>
            )}
          </div>
          {loading ? (
            <Loader />
          ) : (
            <DashboardTable>
              {viewMode === "winners" && userContArr?.data && (
                <>
                  <DataTable
                    columns={points_columns}
                    data={userContArr.data}
                    expandableRows
                    expandableRowsComponent={ExpandedComponent}
                  />
                  <div className="d-flex align-items-center justify-content-between mt-4">
                    <Pagination
                      count={totalPages}
                      onChange={handlePageChange}
                      page={page}
                      showFirstButton
                      showLastButton
                    />
                  </div>
                </>
              )}
            </DashboardTable>
          )}
        </div>
        <NoteModal
          isOpen={isNoteModalOpen}
          onClose={() => setIsNoteModalOpen(false)}
          onSave={handleSaveNote}
          data={selectedRow}
        />
      </section>
    </main>
  );
}

export default UserContestDashboard;
