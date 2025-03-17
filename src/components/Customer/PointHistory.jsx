import React, { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import ActionIcon from "../Utility/ActionIcon";
import { DashboardTable } from "../Utility/DashboardBox";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userPointHistory } from "../../redux/actions/Users/users.actions";
import moment from "moment";
import {
  getUserPointHistoryById,
  getUserStatsReport,
} from "../../services/users.service";
import { Pagination } from "@mui/material";
import "../../assets/scss/main.css";
import Loader from "../Utility/Loader.jsx";
function PointHistory() {
  const dispatch = useDispatch();
  let { userId } = useParams();
  const [pointHistoriesArr, setPointHistoriesArr] = useState([]);
  const [pageLimit, setPageLimit] = useState(10);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [activeDiv, setActiveDiv] = useState(null);
  const [order, setOrder] = useState("desc");
  const [totalPagesCount, setTotalPagesCount] = useState("");
  const pointHistoryArr = useSelector(
    (state) => state.users.pointHistoryByUserObj
  );

  const [userPointsReportsData, setUserPointsReportsData] = useState({});

  const handleGetAllUserPointHistoryByUserId = (userId) => {
    dispatch(userPointHistory(userId));
  };

  const handlePointHistory = async () => {
    setLoading(true);
    let query = `userId=${userId}`;
    if (page) {
      query += `&page=${page}`;
    }
    if (pageLimit) {
      query += `&limit=${pageLimit}`;
    }
    if (search) {
      query += `&s=${search}`;
    }
    if (order) query += `&order=${order}`;
    if (sortBy) query += `&sortBy=${sortBy}`; // Include sorting
    if (startDate) query += `&startDate=${startDate}`; // Include startDate
    if (endDate) query += `&endDate=${endDate}`; // Include endDate
    const response = await getUserPointHistoryById(query);
    setPointHistoriesArr(response.data.data);
    setTotalPagesCount(response.data.totalPages);
    setLoading(false);
  };

  useEffect(() => {
    if (pointHistoryArr && pointHistoryArr.length) {
      setPointHistoriesArr(pointHistoryArr);
    }
  }, [pointHistoryArr]);

  useEffect(() => {
    handlePointHistory();
    HandleGetUserStatsReport(userId);
    handleGetAllUserPointHistoryByUserId(userId);
  }, [userId]);

  useEffect(() => {
    handlePointHistory();
  }, [search, page, sortBy, endDate]);

  const HandleGetUserStatsReport = async (userIdValue) => {
    try {
      let { data: res } = await getUserStatsReport(userIdValue);
      if (res.data) {
        setUserPointsReportsData(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handlePageChange = (event, value) => {
    setLoading(true);
    setPage(value);
  };

  const handleStartDateChange = (e) => setStartDate(e.target.value);
  const handleEndDateChange = (e) => setEndDate(e.target.value);

  const handleSort = (column, sortDirection) => {
    setSortBy(column.selector);
    setOrder(sortDirection === "asc" ? "1" : "-1");
  };

  const points_columns = [
    {
      name: "TransactionId",
      selector: (row) => row.transactionId,
      sortable: true,
      width: "15%",
    },

    {
      name: "Amount",
      selector: (row) => "amount",
      sortable: true,
      cell: (row) =>
        row.type === "CREDIT" ? (
          <span className="text-success">
            <i className="fa fa-arrow-up"> </i> {row.amount}{" "}
          </span>
        ) : (
          <span className="text-danger">
            <i className="fa fa-arrow-down"> </i> {row.amount}
          </span>
        ),
      width: "10%",
    },
    {
      name: "Description",
      selector: (row) => row.description,
      width: "50%",
    },
    {
      name: "Status",
      selector: (row) => row.status,
      width: "10%",
    },
    {
      name: "Date Time",
      selector: (row) =>
        `${moment(row.createdAt).format("DD-MM-YYYY, hh:mm A ")}`,
      width: "15%",
    },
  ];

  const handleDivClick = (divId) => {
    setActiveDiv(divId);
  };

  return (
    <main>
      <section className="product-category" style={{ minHeight: "75vh" }}>
        <div className="container-fluid p-0">
          <h5 className="blue-1 mb-4">User Point History</h5>
          <div className="row mb-3">
            <div className="col-3 gap-2 mb-3">
              <div className="row mx-1 ">
                <div className="col-12 py-4 border rounded bg-white ">
                  <h6 className="blue-1 mb-4">User Name</h6>
                  <div>{userPointsReportsData.userName}</div>
                </div>
              </div>
            </div>

            <div className="col-3 gap-2 mb-3">
              <div
                className="row mx-1 "
                onClick={() => {
                  setSearch("ReelsLike");
                  handleDivClick("div3");
                }}
              >
                <div className="col-12 py-4 border rounded bg-white usercontestactivediv">
                  <h6 className="blue-1 mb-4">Points From Reels</h6>
                  <div
                    className={`div ${
                      activeDiv === "div3" ? "usercontestactive" : ""
                    }`}
                  >
                    {userPointsReportsData.totalPointsRedeemedForLiking
                      ? userPointsReportsData.totalPointsRedeemedForLiking
                      : 0}

                    <span style={{ paddingLeft: "20px" }}>
                      Count: (
                      {userPointsReportsData.totalPointsRedeemedForLikingCount
                        ? userPointsReportsData.totalPointsRedeemedForLikingCount
                        : 0}
                      )
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-3 gap-2 mb-3">
              <div
                className="row mx-1 "
                onClick={() => {
                  setSearch("Coupon");
                  handleDivClick("div2");
                }}
              >
                <div className="col-12 py-4 border rounded bg-white usercontestactivediv">
                  <h6 className="blue-1 mb-4">Points from Coupons</h6>
                  <div
                    className={`div ${
                      activeDiv === "div2" ? "usercontestactive" : ""
                    }`}
                  >
                    {userPointsReportsData.totalPointsRedeemedForProducts
                      ? userPointsReportsData.totalPointsRedeemedForProducts
                      : 0}

                    <span style={{ paddingLeft: "20px" }}>
                      {" "}
                      Count: (
                      {userPointsReportsData.totalPointsRedeemedForProductsCount
                        ? userPointsReportsData.totalPointsRedeemedForProductsCount
                        : 0}
                      )
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-3 gap-2 mb-3">
              <div
                className="row mx-1 "
                onClick={() => {
                  setSearch("Referral");
                  handleDivClick("div5");
                }}
              >
                <div className="col-12 py-4 border rounded bg-white usercontestactivediv ">
                  <h6 className="blue-1 mb-4">Points from Referrals</h6>
                  <div
                    className={`div ${
                      activeDiv === "div5" ? "usercontestactive" : ""
                    }`}
                  >
                    {userPointsReportsData.totalPointsEarnedFormReferrals
                      ? userPointsReportsData.totalPointsEarnedFormReferrals
                      : 0}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-3 gap-2 mb-3">
              <div
                className="row mx-1 "
                onClick={() => {
                  setSearch("Redeem");
                  handleDivClick("div1");
                }}
              >
                <div className="col-12 py-4 border rounded bg-white usercontestactivediv ">
                  <h6 className="blue-1 mb-4">Total points redeemed</h6>
                  <div
                    className={`div ${
                      activeDiv === "div1" ? "usercontestactive" : ""
                    }`}
                  >
                    {userPointsReportsData.totalPointsRedeemed
                      ? userPointsReportsData.totalPointsRedeemed
                      : 0}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-3 gap-2 mb-3">
              <div
                className="row mx-1 "
                onClick={() => {
                  setSearch("Contest");
                  handleDivClick("div4");
                }}
              >
                <div className="col-12 py-4 border rounded bg-white usercontestactivediv">
                  <h6 className="blue-1 mb-4 ">Points redeemed for contest</h6>
                  <div
                    className={`div ${
                      activeDiv === "div4" ? "usercontestactive" : ""
                    }`}
                  >
                    {userPointsReportsData.totalPointsRedeemedInContest
                      ? userPointsReportsData.totalPointsRedeemedInContest
                      : 0}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-3 gap-2 mb-3">
              <div className="row mx-1 ">
                <div className="col-12 py-4 border rounded bg-white ">
                  <h6 className="blue-1 mb-4">User Joining Point</h6>
                  <div>100</div>
                </div>
              </div>
            </div>
            <div className="col-3 gap-2 mb-3">
              <div className="row mx-1 ">
                <div className="col-12 py-4 border rounded bg-white ">
                  <h6 className="blue-1 mb-4">User Balance</h6>
                  <div>
                    {userPointsReportsData.points
                      ? userPointsReportsData.points
                      : 0}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <DashboardTable>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                {" "}
                <input
                  className="form-control"
                  type={startDate ? "date" : "text"}
                  value={startDate}
                  style={{ width: "auto", marginRight: "10px" }}
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
              </div>

              <DataTable
                columns={points_columns}
                data={pointHistoriesArr}
                onSort={handleSort}
                sortServer
              />
              <div className="d-flex align-items-center justify-content-between mt-4">
                <h5 className="blue-1 m-0"></h5>
                <Pagination
                  count={totalPagesCount}
                  onChange={handlePageChange}
                  page={page}
                  showFirstButton
                  showLastButton
                />
              </div>
            </DashboardTable>
          )}
        </div>
      </section>
    </main>
  );
}

export default PointHistory;
