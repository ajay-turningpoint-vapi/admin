import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Pagination, Switch } from "@mui/material";
import ActionIcon from "../Utility/ActionIcon";
import CustomButton from "../Utility/Button";
import SearchBox from "../Utility/SearchBox";
import { DashboardTable } from "../Utility/DashboardBox";
import { useDispatch, useSelector } from "react-redux";
import { generateFilePath } from "../Utility/utils";
import { getUserContests } from "../../redux/actions/Users/users.actions";
import ExpandableComponent from "./ExpandableComponent";
import moment from "moment";

const UserContests = () => {
  const dispatch = useDispatch();
  const contestArr = useSelector((state) => state.users.userContests);
  const userContestTotalPages = useSelector(
    (state) => state.users.userContestTotalPages
  );
  const [pageLimit, setPageLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  useEffect(() => {
    let query = "";
    if (page) {
      query += `&page=${page}`;
    }

    if (pageLimit) {
      query += `&limit=${pageLimit}`;
    }
    if (search) {
      query += `&q=${search}`;
    }
    dispatch(getUserContests(query)).then(() => setLoading(false));
  }, [page, search]);

  const conditionalCellStyles = [
    {
      when: (row) => row.rank !== "0",
      style: {
        color: "green",
        fontWeight: "bolder",
      },
    },
  ];
  const contest_columns = [
    {
      name: "Sr No.",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "7%",
    },
    {
      name: "Constest Name",
      selector: (row) => row?.contestObj?.name,
      width: "14%",
    },
    {
      name: "Cont. Start Date",
      selector: (row) => (
        <p>{`${new Date(row?.contestObj?.startDate).toDateString()}-${
          row?.contestObj?.startTime
        }`}</p>
      ),
      width: "15%",
    },
    {
      name: "Cont. End Date",
      selector: (row) => (
        <p>{`${new Date(row?.contestObj?.endDate).toDateString()}-${
          row?.contestObj?.endTime
        }`}</p>
      ),
      width: "15%",
    },

    {
      name: "Participant Name",
      width: "15%",
      selector: (row) => row?.userObj?.name,
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
      name: "Count",
      width: "6%",
      selector: (row) => row?.joinCount,
    },
    {
      name: "Status",
      width: "6%",
      selector: (row) => row?.status,
      conditionalCellStyles: conditionalCellStyles,
    },
    {
      name: "Rank",
      width: "5%",
      selector: (row) => row?.rank,
      conditionalCellStyles: conditionalCellStyles,
    },

  ];
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <main>
      <section className="product-category" style={{ minHeight: "75vh" }}>
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h5 className="blue-1 m-0">User Contest List</h5>
                <div className="d-flex gap-3">
                  {" "}
                  <div className="search-field">
                    <form action="#" className="form">
                      <div className="input-group bg-white">
                        <div className="input-group-text">
                          <i className="ion-ios-search-strong blue-1"></i>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search"
                          onChange={(e) => {
                            setSearch(e.target.value);
                          }}
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              {loading ? (
                "Loading...."
              ) : (
                <DashboardTable>
                  <DataTable
                    columns={contest_columns}
                    data={contestArr && contestArr.length > 0 ? contestArr : []}
                    // expandableRows
                    // expandableRowsComponent={
                    //   <ExpandableComponent data={contestArr} />
                    // }
                  />
                  <div className="d-flex align-items-center justify-content-between mt-4">
                    <h5 className="blue-1 m-0"></h5>
                    <Pagination
                      count={userContestTotalPages}
                      onChange={handlePageChange}
                      showFirstButton
                      showLastButton
                    />
                  </div>
                </DashboardTable>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default UserContests;
