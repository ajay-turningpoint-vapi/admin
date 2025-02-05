import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { DashboardTable } from "../Utility/DashboardBox";
import {
  getContestsJoinedByUser,
  getContestsWonByUser,
  getUserActivityAnalysis,
} from "../../services/users.service";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import NotificationAddIcon from "@mui/icons-material/NotificationAdd";
import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
function UserActivityAnalysis() {
  const navigate = useNavigate();
  const [usersArr, setUsersArr] = useState([]);
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [originalUsersArr, setOriginalUsersArr] = useState([]);
  const [usersArrTotal, setUsersArrTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserName, setSelectedUserName] = useState(null);
  const [dialogType, setDialogType] = useState("joined");
  const handleDoubleClickContest = async (row) => {
    try {
      setLoading(true); // Start loading state
      const response = await getContestsJoinedByUser(row._id);

      if (response?.data?.contests && Array.isArray(response.data.contests)) {
        setSelectedUserName(row.name);
        setSelectedUser(response.data.contests);
        setDialogType("joined");
      } else {
        setSelectedUser([]); // Ensure empty array if no contests are found
      }

      setOpenDialog(true);
    } catch (error) {
      console.error("Error fetching contests:", error);

      // Optional: Show an alert or toast notification
      alert("Failed to fetch contest details. Please try again later.");

      setSelectedUser([]); // Ensure selected user data is cleared on error
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  const handleDoubleClickContestWin = async (row) => {
    try {
      setLoading(true); // Start loading state
      const response = await getContestsWonByUser(row._id);

      if (response?.data?.contests && Array.isArray(response.data.contests)) {
        setSelectedUserName(row.name);
        setSelectedUser(response.data.contests);
        setDialogType("won");
      } else {
        setSelectedUser([]); // Ensure empty array if no contests are found
      }

      setOpenDialog(true);
    } catch (error) {
      console.error("Error fetching contests:", error);

      // Optional: Show an alert or toast notification
      alert("Failed to fetch contest details. Please try again later.");

      setSelectedUser([]); // Ensure selected user data is cleared on error
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUserName(null);
    setSelectedUser(null);
  };

  const conditionalRowStyles = [
    {
      when: (row) =>
        row.reelsLikeCount === 0 &&
        row.contestJoinCount === 0 &&
        row.contestWinCount === 0,
      style: {
        backgroundColor: "#f0c6c6",
      },
    },
  ];

  const handleDoubleClick = (row) => {
    const confirmRedirect = window.confirm(
      `Are you sure you want to view scanned coupons?`
    );
    if (confirmRedirect) {
      if (confirmRedirect) {
        navigate("/scanned-coupons", { state: { couponData: row.email } });
      }
    }
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
      width: "13%",
    },
    {
      name: "EMAIL",
      cell: (row) => <p>{row.email}</p>,
      width: "20%",
    },
    {
      name: "PHONE",
      cell: (row) => <p>{row.phone}</p>,
      width: "11%",
    },
    {
      name: "ROLE",
      sortable: true,
      selector: (row) => row.role,
      width: "10%",
    },
    {
      name: "Reel View Qty",
      sortable: true,
      selector: (row) => <span>{row.reelsLikeCount}</span>,
      width: "10%",
    },
    {
      name: "Coupon Qty",
      sortable: true,
      selector: (row) => (
        <Tooltip title={`Double Click to View on Map`} arrow>
          <span
            onDoubleClick={() => handleDoubleClick(row)}
            style={{ cursor: "pointer" }}
          >
            {row.totalScannedCoupon}
          </span>
        </Tooltip>
      ),
      width: "9%",
    },
    {
      name: "Contest Join Qty",
      sortable: true,
      selector: (row) => (
        <Tooltip title={`Double Click to View User Contest`} arrow>
          <span
            onDoubleClick={() => handleDoubleClickContest(row)}
            style={{ cursor: "pointer" }}
          >
            {row.contestJoinCount}
          </span>
        </Tooltip>
      ),
      width: "11%",
    },
    {
      name: "Contest Win Qty",
      sortable: true,
      selector: (row) => (
        <Tooltip title={`Double Click to View User Won Contest`} arrow>
          <span
            onDoubleClick={() => handleDoubleClickContestWin(row)}
            style={{ cursor: "pointer" }}
          >
            {row.contestWinCount}
          </span>
        </Tooltip>
      ),
      width: "11%",
    },
  ];

  const handleGetAllUsers = async (query) => {
    setLoading(true);
    const { data: response } = await getUserActivityAnalysis(query);
    setUsersArrTotal(response);
    setUsersArr(response.data);
    setOriginalUsersArr(response.data);
    setLoading(false);
  };

  useEffect(() => {
    if (dateRange !== null) {
      const startDate = dateRange[0]
        ? dayjs(dateRange[0]).format("YYYY-MM-DD")
        : null;
      const endDate = dateRange[1]
        ? dayjs(dateRange[1]).format("YYYY-MM-DD")
        : null;
      const query =
        startDate && endDate
          ? `?startDate=${startDate}&endDate=${endDate}`
          : "";
      handleGetAllUsers(query);
    }
  }, [dateRange]);

  const handleSearch = (q) => {
    setSearch(q);
    if (q) {
      const searchArr = usersArr.filter(
        (el) =>
          `${el.name}`.toLowerCase().includes(`${q}`.toLowerCase()) ||
          `${el.phone}`.toLowerCase().includes(`${q}`.toLowerCase())
      );
      setUsersArr(searchArr);
    } else {
      setUsersArr(originalUsersArr);
    }
  };

  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <div className="d-flex align-items-center justify-content-between"></div>
          <DashboardTable>
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h5 className="blue-1 m-0">Active Customer Analysis</h5>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                In-Active-Users
                <div
                  style={{
                    backgroundColor: "#f0c6c6",
                    width: "50px",
                    height: "20px",
                    marginLeft: "10px",
                  }}
                ></div>
              </div>
              <div className="d-flex align-items-center gap-3">
                <label>Select Date</label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateRangePicker
                    startText="Start Date"
                    endText="End Date"
                    value={dateRange}
                    onChange={(newDateRange) => {
                      setDateRange(newDateRange);
                    }}
                    renderInput={(startProps, endProps) => (
                      <>
                        <TextField {...startProps} />
                        <TextField {...endProps} />
                      </>
                    )}
                  />
                </LocalizationProvider>
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
                        onChange={(e) => {
                          handleSearch(e.target.value);
                        }}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                marginBottom: "10px",
                alignContent: "center",
                justifyContent: "flex-end",
              }}
            >
              <Card style={{ marginRight: "20px" }}>
                <CardContent>
                  <Typography variant="body2" color="#415094" component="h1">
                    Total Reel View Qty (
                    <b>{usersArrTotal.totalReelsLikeCount}</b>)
                  </Typography>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <Typography variant="body2" color="#415094" component="h1">
                    Total Contest Join Qty (
                    <b>{usersArrTotal.totalContestJoinCount}</b>)
                  </Typography>
                </CardContent>
              </Card>
            </div>
            {loading ? (
              <div className="text-center">Loading...</div>
            ) : (
              <DataTable
                paginationPerPage={10}
                columns={users_columns}
                data={usersArr}
                pagination
                conditionalRowStyles={conditionalRowStyles}
              />
            )}
          </DashboardTable>
        </div>
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            {selectedUserName || "User Contest Details"}
          </DialogTitle>

          <DialogContent>
            {selectedUser && (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <strong>Contest Name</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Date</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Time</strong>
                      </TableCell>
                      <TableCell>
                        <strong>
                          {dialogType === "joined" ? "Join Count" : "Rank"}
                        </strong>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedUser.map((contest, index) => (
                      <TableRow key={index}>
                        <TableCell>{contest.name}</TableCell>
                        <TableCell>
                          {new Date(contest.endDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{contest.endTime}</TableCell>
                        <TableCell>
                          {dialogType === "joined"
                            ? contest.count
                            : contest.rank}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </section>
    </main>
  );
}

export default UserActivityAnalysis;
