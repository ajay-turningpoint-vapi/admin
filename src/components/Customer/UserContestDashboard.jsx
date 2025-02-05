import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import ActionIcon from "../Utility/ActionIcon";
import { DashboardTable } from "../Utility/DashboardBox";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userPointHistory } from "../../redux/actions/Users/users.actions";
import moment from "moment";
import {
  getUserContestsCount,
  getUserContestsReport,
  getUserContestsReportLose,
  getUserPointHistoryById,
  getUserStatsReport,
} from "../../services/users.service";
import { Input, Pagination } from "@mui/material";
import "../../assets/scss/main.css";
import Loader from "../Utility/Loader.jsx";

function UserContestDashboard() {
  const dispatch = useDispatch();
  const { contestId } = useParams();

  // States
  const [pageLimit] = useState(10);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [userContArr, setUserContArr] = useState(null);
  const [userContArrLose, setUserContArrLose] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [count, setCount] = useState(0);
  const [totalUsersJoined, setTotalUsersJoined] = useState(0);
  const [viewMode, setViewMode] = useState("winners"); // "winners" or "losers"
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  // Fetch winners or losers based on viewMode
  const handleDataFetch = async () => {
    setLoading(true);
    let query = `contestId=${contestId}&page=${page}&limit=${pageLimit}`;
    if (search) query += `&q=${search}`;
    if (filter) query += `&f=${filter}`;

    try {
      if (viewMode === "winners") {
        const response = await getUserContestsReport(query);
        setTotalUsersJoined(response.data.totalUsersJoined);
        setUserContArr(response.data);
        setTotalPages(response.data.totalPage);
      } else {
        const response = await getUserContestsReportLose(query);
        setUserContArrLose(response.data);
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
  }, [page, search, viewMode, filter]);

  // Pagination handler
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // View mode switch handler
  const handleFilterClick = (mode) => {
    setViewMode(mode);
    setPage(1);
    setSearch(mode === "winners" ? "winners" : "");
  };

  // Columns configuration
  const points_columns = [
    {
      name: "Sr No.",
      selector: (row, index) => index + 1 + (page - 1) * 10,
      sortable: true,
      width: "10%",
    },
    {
      name: "Contest",
      selector: (row) => row.contestObj?.name,
      sortable: true,
      width: "20%",
    },
    {
      name: "Rank",
      selector: (row) => row.rankAsNumber,
      sortable: true,
      width: "7%",
      cell: (row) =>
        row.status === "win" ? (
          <span style={{ color: "green", fontWeight: "bold" }}>
            {row.rankAsNumber}
          </span>
        ) : (
          "-"
        ), // Show "-" if status is not "win"
    },

    {
      name: "Name",
      selector: (row) => row.userObj?.name,
      sortable: true,
      width: "15%",
    },
    {
      name: "Phone",
      selector: (row) => row.userObj?.phone,
      sortable: true,
      width: "15%",
    },

    {
      name: "Join Date",
      width: "20%",
      selector: (row) => (
        <p>{`${moment(row?.createdAt).format("DD-MM-YYYY")} - ${moment(
          row?.createdAt
        ).format("hh:mm A")}`}</p>
      ),
    },

    {
      name: "Status",
      width: "15%",
      selector: (row) => row?.status,
    },
    {
      name: "Rank",
      width: "15%",
      selector: (row) => row?.rank,
    },
  ];

  return (
    <main>
      <section className="product-category" style={{ minHeight: "75vh" }}>
        <div className="container-fluid p-0">
          <h5 className="blue-1 mb-4">User Contest Dashboard</h5>
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
              <div
                className={`row mx-1 ${
                  viewMode === "losers" ? "usercontestactive" : ""
                }`}
                onClick={() => handleFilterClick("losers")}
              >
                <div className="col-12 py-4 border rounded bg-white usercontestactivediv">
                  <h6 className="blue-1 mb-4">Losers</h6>
                  <div>Click to View</div>
                </div>
              </div>
            </div>

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
          </div>
          {loading ? (
            <Loader />
          ) : (
            <DashboardTable>
              {viewMode === "winners" && userContArr?.data && (
                <>
                  <DataTable columns={points_columns} data={userContArr.data} />
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
              {viewMode === "losers" && userContArrLose?.data && (
                <>
                  <DataTable
                    columns={points_columns}
                    data={userContArrLose.data}
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
      </section>
    </main>
  );
}

export default UserContestDashboard;
