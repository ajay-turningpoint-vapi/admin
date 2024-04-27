import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { DashboardTable } from "../Utility/DashboardBox";
import { getUserActivityAnalysis } from "../../services/users.service";
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
  TextField,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
function UserActivityAnalysis() {
  const [usersArr, setUsersArr] = useState([]);
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [originalUsersArr, setOriginalUsersArr] = useState([]);
  const [usersArrTotal, setUsersArrTotal] = useState(0);
  const conditionalRowStyles = [
    {
      when: (row) =>
        row.reelsLikeCount === 0 &&
        row.contestJoinCount === 0 &&
        row.contestWinCount === 0,
      style: {
        backgroundColor: "#f0c6c6", // Light green background for online rows
      },
    },
  ];
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
      width: "15%",
    },
    {
      name: "EMAIL",
      cell: (row) => <p>{row.email}</p>,
      width: "20%",
    },
    {
      name: "PHONE",
      cell: (row) => <p>{row.phone}</p>,
      width: "15%",
    },
    {
      name: "ROLE",
      selector: (row) => row.role,
      width: "10%",
    },
    {
      name: "Reel View Qty",
      selector: (row) => (
        <span>
          {row.reelsLikeCount} <i className="fa-solid fa-plus text-success"></i>
        </span>
      ),
      width: "10%",
    },
    {
      name: "Contest Join Qty",
      selector: (row) => (
        <span>
          {row.contestJoinCount} <i className="fa-solid fa-minus text-danger"></i>
        </span>
      ),
      width: "10%",
    },
    {
      name: "Contest Win Qty",
      selector: (row) => row.contestWinCount,
      width: "10%",
    },
  ];

  const handleGetAllUsers = async (query) => {
    const { data: response } = await getUserActivityAnalysis(query);
    console.log(response);
    setUsersArrTotal(response);
    setUsersArr(response.data);
    setOriginalUsersArr(response.data);
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
      // If search query is not empty, filter the users
      let searchArr = usersArr.filter(
        (el) =>
          `${el.name}`.toLowerCase().includes(`${q}`.toLowerCase()) ||
          `${el.phone}`.toLowerCase().includes(`${q}`.toLowerCase())
      );
      console.log(searchArr, "searchArr");
      setUsersArr(searchArr);
    } else {
      // If search query is empty, show all users
      setUsersArr(originalUsersArr);
    }
  };

  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <div className="d-flex align-items-center justify-content-between "></div>
          <DashboardTable>
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h5 className="blue-1 m-0">Active Customer Analysis</h5>{" "}
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
                    Total Reel View Qty ( <b>{usersArrTotal.totalReelsLikeCount}</b>{" "}
                    )
                  </Typography>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <Typography variant="body2" color="#415094" component="h1">
                    Total Contest Join Qty ({" "}
                    <b>{usersArrTotal.totalContestJoinCount}</b> )
                  </Typography>
                </CardContent>
              </Card>
            </div>
            <DataTable
              paginationPerPage={10}
              columns={users_columns}
              data={usersArr}
              pagination
              conditionalRowStyles={conditionalRowStyles}
            />
          </DashboardTable>
        </div>
      </section>
    </main>
  );
}

export default UserActivityAnalysis;
