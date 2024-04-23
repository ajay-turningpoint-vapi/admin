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
import { Pagination } from "@mui/material";
import "../../assets/scss/main.css";

function UserContestDashboard() {
  // ======================================================================================
  const dispatch = useDispatch();
  let { contestId } = useParams();
  const [pageLimit, setPageLimit] = useState(10);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageLose, setPageLose] = useState(1);
  const [userContArr, setUserContArr] = useState("");
  const [userContArrLose, setUserContArrLose] = useState("");
  const [userContArrTotalPage, setUserContArrTotalPage] = useState("");
  const [userContArrTotalPageLose, setUserContArrTotalPageLose] = useState("");
  const [search, setSearch] = useState("");

  const [count, setCount] = useState("");
  const [activeDiv, setActiveDiv] = useState(null);

  const handleUserContest = async (contestId) => {
    let query = "";
    query += `contestId=${contestId}`;
    if (page) {
      query += `&page=${page}`;
    }

    if (pageLimit) {
      query += `&limit=${pageLimit}`;
    }
    if (search) {
      query += `&q=${search}`;
    }
    const response = await getUserContestsReport(query);
    setUserContArrLose("");
    setUserContArrTotalPageLose("");
    setLoading(false);
    setUserContArr(response.data);
    setUserContArrTotalPage(response.data.totalPage);

    const response1 = await getUserContestsCount();
    setCount(response1.data.totalJoinCount);
  };
  const handleUserConestLose = async (contestId) => {
    let query = "";
    query += `contestId=${contestId}`;
    if (pageLose) {
      query += `&page=${pageLose}`;
    }
    const response = await getUserContestsReportLose(query);
    setUserContArr("");
    setUserContArrTotalPage("");
    setLoading(false);
    setUserContArrLose(response.data);
    setUserContArrTotalPageLose(response.data.totalPage);
  };

  useEffect(() => {
    handleUserContest(contestId);
  }, [search, page]);
  useEffect(() => {
    handleUserConestLose(contestId);
  }, [pageLose]);

  const handleDivClick = (divId) => {
    setActiveDiv(divId);
  };
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const handlePageChangeLose = (event, value) => {
    setPageLose(value);
  };
  const points_columns = [
    {
      name: "Sr No.",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "7%",
    },
    {
      name: "Contest ",
      selector: (row) => row.contestObj?.name,
      sortable: true,
      width: "20%",
    },
    {
      name: "Name",
      selector: (row) => row.userObj?.name,
      sortable: true,
      width: "20%",
    },

    {
      name: "Join Date",
      width: "15%",
      selector: (row) => (
        <p>{`${moment.utc(row?.createdAt).format("DD-MM-YYYY")}-${moment
          .utc(row?.createdAt)
          .format("HH:mm A")}`}</p>
      ),
    },
    {
      name: "Number Of Time Joined",
      selector: (row) => (row.joinCount === undefined ? "-" : row.joinCount),
      width: "15%",
    },
    {
      name: "Status",
      width: "10%",
      selector: (row) => row?.status,
    },
    {
      name: "Rank",
      width: "10%",
      selector: (row) => row?.rank,
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

  return (
    <main>
      <section className="product-category" style={{ minHeight: "75vh" }}>
        <div className="container-fluid p-0">
          <h5 className="blue-1 mb-4">User Contest Dashboard</h5>
          <div className="row mb-3">
            <div className="col-3 gap-2 mb-3">
              <div className="row mx-1 ">
                <div className="col-12 py-4 border rounded bg-white usercontestactivediv">
                  <h6 className="blue-1 mb-4">Users Join Count</h6>
                  <div>{count !== "" ? count : 0}</div>
                </div>
              </div>
            </div>
            <div className="col-3 gap-2 mb-3">
              <div
                className="row mx-1 "
                onClick={() => {
                  setSearch("winners");
                  handleDivClick("div1");
                }}
              >
                <div className="col-12 py-4 border rounded bg-white usercontestactivediv">
                  <h6 className="blue-1 mb-4">Winners</h6>
                  <div
                    className={`div ${
                      activeDiv === "div1" ? "usercontestactive" : ""
                    }`}
                  >
                    Click to view
                  </div>
                </div>
              </div>
            </div>
            <div className="col-3 gap-2 mb-3">
              <div
                className="row mx-1 "
                onClick={() => {
                  handleUserConestLose(contestId);
                  handleDivClick("div2");
                }}
              >
                <div className="col-12 py-4 border rounded bg-white usercontestactivediv">
                  <h6 className="blue-1 mb-4">Losers</h6>
                  <div
                    className={`div ${
                      activeDiv === "div2" ? "usercontestactive" : ""
                    }`}
                  >
                    Click to view
                  </div>
                </div>
              </div>
            </div>
            <div className="col-3 gap-2 mb-3">
              <div
                className="row mx-1 "
                onClick={() => {
                  setSearch("");
                  handleDivClick("div3");
                }}
              >
                <div className="col-12 py-4 border rounded bg-white usercontestactivediv">
                  <h6 className="blue-1 mb-4">Date and Time of Joining</h6>
                  <div
                    className={`div ${
                      activeDiv === "div3" ? "usercontestactive" : ""
                    }`}
                  >
                    Click to View
                  </div>
                </div>
              </div>
            </div>
          </div>
          {loading == true ? (
            "Loading..."
          ) : (
            <DashboardTable>
              {userContArr.data && (
                <>
                  <DataTable columns={points_columns} data={userContArr.data} />
                  <div className="d-flex align-items-center justify-content-between mt-4">
                    <h5 className="blue-1 m-0"></h5>
                    <Pagination
                      count={userContArrTotalPage}
                      onChange={handlePageChange}
                      showFirstButton
                      showLastButton
                    />
                  </div>
                </>
              )}
              {userContArrLose.data && (
                <>
                  <DataTable
                    columns={points_columns}
                    data={userContArrLose.data}
                  />
                  <div className="d-flex align-items-center justify-content-between mt-4">
                    <h5 className="blue-1 m-0"></h5>
                    <Pagination
                      count={userContArrTotalPageLose}
                      onChange={handlePageChangeLose}
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
