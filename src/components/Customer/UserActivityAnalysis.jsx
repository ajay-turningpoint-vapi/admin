import React, { useCallback, useEffect, useState } from "react";
import { DashboardTable } from "../Utility/DashboardBox";
import DataTable from "react-data-table-component";

import {
  getContestsJoinedByUser,
  getContestsWonByUser,
} from "../../services/users.service";

import Loader from "../Utility/Loader.jsx";
import { useDebounce } from "use-debounce";
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
import { url } from "../../services/url.service";
import axios from "axios";

const UserActivityAnalysis = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [debouncedSearch] = useDebounce(search, 500);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserName, setSelectedUserName] = useState(null);
  const [dialogType, setDialogType] = useState("");

  const fieldMap = {
    totalReelsLikeCount: "reelsLikeCount",
    totalContestJoinCount: "contestJoinCount",
    totalScannedCouponCount: "totalScannedCoupon",
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/users/getUserActivityAnalysis`, {
        params: {
          search,
          page,
          limit: 10,
          sortField,
          sortOrder,
          search: debouncedSearch,
        },
      });
      setData(response.data.data);
      setTotalRows(response.data.pagination.totalUsers);
    } catch (error) {
      console.error("Error fetching data", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [search, page, sortField, sortOrder, debouncedSearch]);

  const handleSort = (column, direction) => {
    const mappedField = fieldMap[column.selector] || column.selector;

    setSortField(mappedField);
    setSortOrder(direction);

    const sortedData = [...data].sort((a, b) => {
      const aValue = a[mappedField] ?? 0;
      const bValue = b[mappedField] ?? 0;
      return direction === "asc" ? aValue - bValue : bValue - aValue;
    });

    setData(sortedData);
  };

  const handleDoubleClick = (row) => {
    if (window.confirm("Are you sure you want to view scanned coupons?")) {
      navigate("/scanned-coupons", { state: { couponData: row.email } });
    }
  };

  const handleCloseDialog = useCallback(() => {
    setOpenDialog(false);
    setSelectedUserName(null);
    setSelectedUser(null);
  }, []);

  const handleDoubleClickContest = async (row) => {
    try {
      setLoading(true);
      const response = await getContestsJoinedByUser(row._id);
      setSelectedUser(response?.data?.contests || []);
      setSelectedUserName(row.name);
      setDialogType("joined");
      setOpenDialog(true);
    } catch (error) {
      console.error("Error fetching contests:", error);
      alert("Failed to fetch contest details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDoubleClickContestWin = async (row) => {
    try {
      setLoading(true);
      const response = await getContestsWonByUser(row._id);
      setSelectedUser(response?.data?.contests || []);
      setSelectedUserName(row.name);
      setDialogType("won");
      setOpenDialog(true);
    } catch (error) {
      console.error("Error fetching contests:", error);
      alert("Failed to fetch contest details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      name: "ID",
      cell: (row, index) => <p>{index + 1}</p>,
      width: "5%",
    },
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Phone", selector: (row) => row.phone },
    { name: "Email", selector: (row) => row.email },
    { name: "Role", selector: (row) => row.role },
    {
      name: "Reel View Qty",
      selector: (row) => "totalReelsLikeCount",
      cell: (row) => <p>{row.reelsLikeCount}</p>,
      sortable: true,
    },
    {
      name: "Contest Join Qty",
      selector: (row) => "totalContestJoinCount",
      cell: (row) => (
        <Tooltip title="Double Click to View User Contest" arrow>
          <span
            onDoubleClick={() => handleDoubleClickContest(row)}
            style={{ cursor: "pointer" }}
          >
            {row.contestJoinCount ?? 0}
          </span>
        </Tooltip>
      ),
      sortable: true,
    },
    {
      name: "Contest Win Qty",
      selector: "contestWinCount",
      sortable: true,
      cell: (row) => (
        <Tooltip title="Double Click to View User Won Contest" arrow>
          <span
            onDoubleClick={() => handleDoubleClickContestWin(row)}
            style={{ cursor: "pointer" }}
          >
            {row.contestWinCount ?? 0}
          </span>
        </Tooltip>
      ),
      width: "11%",
    },

    {
      name: "Coupon Qty",
      selector: (row) => "totalScannedCouponCount",
      cell: (row) => (
        <Tooltip title="Double Click to View on Map" arrow>
          <span
            onDoubleClick={() => handleDoubleClick(row)}
            style={{ cursor: "pointer" }}
          >
            {row.totalScannedCoupon ?? 0}
          </span>
        </Tooltip>
      ),
      sortable: true,
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <DashboardTable>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h5 className="blue-1 m-0">Active Customer Analysis</h5>
          <TextField
            label="Search..."
            variant="outlined"
            value={search}
            size="small"
            onChange={(e) => setSearch(e.target.value)}
            style={{ marginBottom: "10px", width: "300px" }}
          />
        </div>
        <DataTable
          columns={columns}
          data={data}
          progressPending={loading}
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          onChangePage={setPage}
          onSort={handleSort}
          sortServer
          defaultSortAsc={false}
          sortField={sortField}
          sortDirection={sortOrder}
          highlightOnHover
          persistTableHead
          conditionalRowStyles={[
            {
              when: (row) =>
                row.reelsLikeCount === 0 &&
                row.contestJoinCount === 0 &&
                row.contestWinCount === 0,
              style: { backgroundColor: "#f0c6c6" },
            },
          ]}
        />
      </DashboardTable>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{selectedUserName || "User Contest Details"}</DialogTitle>

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
                        {dialogType === "joined" ? contest.count : contest.rank}
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
    </div>
  );
};

export default UserActivityAnalysis;

