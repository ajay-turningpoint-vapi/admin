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
import Loader from "../Utility/Loader.jsx";

// function UserContestDashboard() {
//   const dispatch = useDispatch();
//   let { contestId } = useParams();
//   const [pageLimit, setPageLimit] = useState(10);
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(1);
//   const [pageLose, setPageLose] = useState(1);
//   const [userContArr, setUserContArr] = useState("");
//   const [userContArrLose, setUserContArrLose] = useState("");
//   const [userContArrTotalPage, setUserContArrTotalPage] = useState("");
//   const [userContArrTotalPageLose, setUserContArrTotalPageLose] = useState("");
//   const [search, setSearch] = useState("");

//   const [count, setCount] = useState("");
//   const [activeDiv, setActiveDiv] = useState(null);

//   const handleUserContest = async (contestId) => {
//     setLoading(true);
//     let query = "";
//     query += `contestId=${contestId}`;
//     if (page) query += `&page=${page}`;
//     if (pageLimit) query += `&limit=${pageLimit}`;
//     if (search) query += `&q=${search}`;
    
//     try {
//       const response = await getUserContestsReport(query);
//       setUserContArrLose("");
//       setUserContArrTotalPageLose("");
//       setUserContArr(response.data);


//       console.log("response",response.data);
      
//       setUserContArrTotalPage(response.data.totalPage);

//       const response1 = await getUserContestsCount(contestId);
//       setCount(response1.data.totalJoinCount);
//     } catch (error) {
//       console.error("Error fetching user contests:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUserConestLose = async (contestId) => {
//     setLoading(true);
//     let query = "";
//     query += `contestId=${contestId}`;
//     if (pageLose) query += `&page=${pageLose}`;
    
//     try {
//       const response = await getUserContestsReportLose(query);
//       setUserContArr("");
//       setUserContArrTotalPage("");
//       setUserContArrLose(response.data);
//       setUserContArrTotalPageLose(response.data.totalPage);
//     } catch (error) {
//       console.error("Error fetching user contests (lose):", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     handleUserContest(contestId);
//   }, [search, page]);

//   useEffect(() => {
//     handleUserConestLose(contestId);
//   }, [pageLose]);

//   const handleDivClick = (divId) => {
//     setActiveDiv(divId);
//   };

//   const handlePageChange = (event, value) => {
//     setLoading(true)
//     setPage(value);
//   };

//   const handlePageChangeLose = (event, value) => {
//     setLoading(true)
//     setPageLose(value);
//   };

//   const points_columns = [
//     {
//       name: "Sr No.",
//       selector: (row, index) => index + 1,
//       sortable: true,
//       width: "7%",
//     },
//     {
//       name: "Contest",
//       selector: (row) => row.contestObj?.name,
//       sortable: true,
//       width: "20%",
//     },
//     {
//       name: "Name",
//       selector: (row) => row.userObj?.name,
//       sortable: true,
//       width: "20%",
//     },
//     {
//       name: "Join Date",
//       width: "15%",
//       selector: (row) => (
//         <p>{`${moment(row?.createdAt).format("DD-MM-YYYY")} - ${moment(row?.createdAt).format("HH:mm A")}`}</p>
//       ),
//     },
//     {
//       name: "Number Of Time Joined",
//       selector: (row) => (row.joinCount === undefined ? "-" : row.joinCount),
//       width: "15%",
//     },
//     {
//       name: "Status",
//       width: "10%",
//       selector: (row) => row?.status,
//     },
//     {
//       name: "Rank",
//       width: "10%",
//       selector: (row) => row?.rank,
//     },
//   ];

//   return (
//     <main>
//       <section className="product-category" style={{ minHeight: "75vh" }}>
//         <div className="container-fluid p-0">
//           <h5 className="blue-1 mb-4">User Contest Dashboard</h5>
//           <div className="row mb-3">
//             <div className="col-3 gap-2 mb-3">
//               <div className="row mx-1">
//                 <div className="col-12 py-4 border rounded bg-white usercontestactivediv">
//                   <h6 className="blue-1 mb-4">Users Join Count</h6>
//                   <div>{count !== "" ? count : 0}</div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-3 gap-2 mb-3">
//               <div
//                 className="row mx-1"
//                 onClick={() => {
//                   setSearch("winners");
//                   handleDivClick("div1");
//                 }}
//               >
//                 <div className="col-12 py-4 border rounded bg-white usercontestactivediv">
//                   <h6 className="blue-1 mb-4">Winners</h6>
//                   <div
//                     className={`div ${activeDiv === "div1" ? "usercontestactive" : ""}`}
//                   >
//                     Click to view
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-3 gap-2 mb-3">
//               <div
//                 className="row mx-1"
//                 onClick={() => {
//                   handleUserConestLose(contestId);
//                   handleDivClick("div2");
//                 }}
//               >
//                 <div className="col-12 py-4 border rounded bg-white usercontestactivediv">
//                   <h6 className="blue-1 mb-4">Losers</h6>
//                   <div
//                     className={`div ${activeDiv === "div2" ? "usercontestactive" : ""}`}
//                   >
//                     Click to view
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-3 gap-2 mb-3">
//               <div
//                 className="row mx-1"
//                 onClick={() => {
//                   setSearch("");
//                   handleDivClick("div3");
//                 }}
//               >
//                 <div className="col-12 py-4 border rounded bg-white usercontestactivediv">
//                   <h6 className="blue-1 mb-4">Date and Time of Joining</h6>
//                   <div
//                     className={`div ${activeDiv === "div3" ? "usercontestactive" : ""}`}
//                   >
//                     Click to View
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {loading ? (
//            <Loader />
//           ) : (
//             <DashboardTable>
//               {userContArr.data && (
//                 <>
//                   <DataTable columns={points_columns} data={userContArr.data} />
//                   <div className="d-flex align-items-center justify-content-between mt-4">
//                     <h5 className="blue-1 m-0"></h5>
//                     <Pagination
//                       count={userContArrTotalPage}
//                       onChange={handlePageChange}
//                       page={page}
//                       showFirstButton
//                       showLastButton
//                     />
//                   </div>
//                 </>
//               )}
//               {userContArrLose.data && (
//                 <>
//                   <DataTable columns={points_columns} data={userContArrLose.data} />
//                   <div className="d-flex align-items-center justify-content-between mt-4">
//                     <h5 className="blue-1 m-0"></h5>
//                     <Pagination
//                       count={userContArrTotalPageLose}
//                       onChange={handlePageChangeLose}
//                       page={pageLose}
//                       showFirstButton
//                       showLastButton
//                     />
//                   </div>
//                 </>
//               )}
//             </DashboardTable>
//           )}
//         </div>
//       </section>
//     </main>
//   );
// }

// export default UserContestDashboard;
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
  const [viewMode, setViewMode] = useState("winners"); // "winners" or "losers"
  const [search, setSearch] = useState("");

  // Fetch winners or losers based on viewMode
  const handleDataFetch = async () => {
    setLoading(true);
    let query = `contestId=${contestId}&page=${page}&limit=${pageLimit}`;
    if (search) query += `&q=${search}`;

    try {
      if (viewMode === "winners") {
        const response = await getUserContestsReport(query);
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
  }, [page, search, viewMode]);

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
      selector: (row, index) => index + 1,
      sortable: true,
      width: "7%",
    },
    {
      name: "Contest",
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
        <p>{`${moment(row?.createdAt).format("DD-MM-YYYY")} - ${moment(row?.createdAt).format("hh:mm A")}`}</p>
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
              <div
                className={`row mx-1 ${viewMode === "winners" ? "usercontestactive" : ""}`}
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
                className={`row mx-1 ${viewMode === "losers" ? "usercontestactive" : ""}`}
                onClick={() => handleFilterClick("losers")}
              >
                <div className="col-12 py-4 border rounded bg-white usercontestactivediv">
                  <h6 className="blue-1 mb-4">Losers</h6>
                  <div>Click to View</div>
                </div>
              </div>
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
                  <DataTable columns={points_columns} data={userContArrLose.data} />
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