import React, { useEffect, useState } from "react";
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
function PointHistory() {
  // ======================================================================================
  const dispatch = useDispatch();
  let { userId } = useParams();
  const [pointHistoriesArr, setPointHistoriesArr] = useState([]);
  const [pageLimit, setPageLimit] = useState(10);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [activeDiv, setActiveDiv] = useState(null);
  const [totalPagesCount, settTotalPagesCount] = useState("");
  const pointHistoryArr = useSelector(
    (state) => state.users.pointHistoryByUserObj
  );

  const [userPointsReportsData, setUserPointsReportsData] = useState({});
  const handleGetAllUserPointHistoryByUserId = (userId) => {
    dispatch(userPointHistory(userId));
  };

  const handlePointHistory = async () => {
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
    const response = await getUserPointHistoryById(query);
    setPointHistoriesArr(response.data.data);
    settTotalPagesCount(response.data.totalPages);
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
  }, [search, page]);
  const HandleGetUserStatsReport = async (userIdValue) => {
    try {
      console.log(userIdValue);
      let { data: res } = await getUserStatsReport(userIdValue);
      if (res.data) {
        console.log(res.data, "stats");
        setUserPointsReportsData(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const points_columns = [
    {
      name: "TransactionId",
      selector: (row) => row.transactionId,
      sortable: true,
      width: "15%",
    },
    {
      name: "Type",
      selector: (row) => row.type,
      width: "10%",
    },
    {
      name: "Amount",
      selector: (row) =>
        row.type == "CREDIT" ? (
          <span className="text-success">
            <i className="fa fa-arrow-up "> </i> {row.amount}{" "}
          </span>
        ) : (
          <span className="text-danger">
            <i className="fa fa-arrow-down "> </i> {row.amount}
          </span>
        ),
      width: "10%",
    },
    {
      name: "Description",
      selector: (row) => row.description,
      width: "20%",
    },
    {
      name: "Status",
      selector: (row) => row.status,
      width: "10%",
    },
    {
      name: "Date Time",
      selector: (row) => `${moment(row.createdAt).format("YYYY-MM-DD, HH:mm")}`,
      width: "15%",
    },
    // {
    //   name: "IS ACTIVE",
    //   button: true,
    //   cell: (row) => <Switch onChange={(e) => handleChangeActiveStatus(row._id, e.target.checked)} checked={row.isActive} />,
    //   width: "10%",
    // },

    // {
    //   name: "Action",
    //   cell: (row) => (
    //     <>
    //       <CustomButton btntype="button" ClickEvent={(e) => handleModalSet(e, row)} isBtn iconName="fa-solid fa-check" btnName="View" />
    //       <Link to={`/user-point-history/${row?._id}`} className="btn btn-secondary ms-2 text-white">Point History</Link>
    //       {selectedData && <EditModal ModalBox={ModalBox} data={selectedData} setModalBox={setModalBox} name={ModalName} ModalType={ModalType} width="max-content" />}
    //     </>
    //   ),
    //   width: "20%",
    // },
  ];
  const handleDivClick = (divId) => {
    setActiveDiv(divId);
  };
  // ======================================================================================

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
                  setSearch("Coupon");
                  handleDivClick("div2");
                }}
              >
                <div className="col-12 py-4 border rounded bg-white usercontestactivediv">
                  <h6 className="blue-1 mb-4">Points from products</h6>
                  <div
                    className={`div ${
                      activeDiv === "div2" ? "usercontestactive" : ""
                    }`}
                  >
                    {userPointsReportsData.totalPointsRedeemedForProducts
                      ? userPointsReportsData.totalPointsRedeemedForProducts
                      : 0}
                  </div>
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
                  </div>
                </div>
              </div>
            </div>
            <div className="col-3 gap-2 mb-3">
              <div className="row mx-1 ">
                <div className="col-12 py-4 border rounded bg-white usercontestactivediv ">
                  <h6 className="blue-1 mb-4">Points redeemed in cash</h6>
                  <div>
                    {userPointsReportsData.totalPointsRedeemedInCash
                      ? userPointsReportsData.totalPointsRedeemedInCash
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
                  <h6 className="blue-1 mb-4 ">Points red. for contest</h6>
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
          </div>
          <DashboardTable>
            <DataTable columns={points_columns} data={pointHistoriesArr} />{" "}
            <div className="d-flex align-items-center justify-content-between mt-4">
              <h5 className="blue-1 m-0"></h5>
              <Pagination
                count={totalPagesCount}
                onChange={handlePageChange}
                showFirstButton
                showLastButton
              />
            </div>
          </DashboardTable>
        </div>
      </section>
    </main>
  );
}

export default PointHistory;
