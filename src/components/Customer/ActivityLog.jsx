import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import CustomButton from "../Utility/Button";
import { DashboardTable } from "../Utility/DashboardBox";
import tabClick from "../Utility/TabClick";
import { useDispatch, useSelector } from "react-redux";
import {
  userActivityLog,
  usersGet,
} from "../../redux/actions/Users/users.actions";
import { Link, useParams } from "react-router-dom";

function ActivityLog() {
  let { userId } = useParams();
  const dispatch = useDispatch();
  const [usersArr, setUsersArr] = useState([]);
  const userArr = useSelector((state) => state.users.users);
  const [search, setSearch] = useState("");
  const useractivityArr = useSelector((state) => state.users.userActivtyLog);
  useEffect(() => {
    dispatch(userActivityLog(userId));
  }, [userId]);

  const users_columns = [
    {
      name: "ID",
      cell: (row, index) => <p>{row.logId}</p>,
      sortable: true,
      width: "20%",
    },

    {
      name: "ACITIVTY NAME",
      cell: (row) => <p>{row.type}</p>,
      width: "20%",
    },

    {
      name: "DATE",
      cell: (row) => (
        <CustomButton greenBtn btnName={row.timestamp.slice(0, 9)} />
      ),
      width: "20%",
    },
    {
      name: "TIME",
      cell: (row) => (
        <CustomButton redBtn btnName={row.timestamp.slice(10, 22)} />
      ),
      width: "20%",
    },
  ];

  const [tabList, settabList] = useState([
    {
      tabName: "All Logs",
      active: true,
    },
  ]);

  const handleGetAllUsers = () => {
    let query = "";
    query += "?role=CARPENTER";
    dispatch(usersGet(query));
  };
  useEffect(() => {
    if (useractivityArr && useractivityArr.length) {
      setUsersArr(useractivityArr);
    }
  }, [userArr]);

  useEffect(() => {
    handleGetAllUsers();
  }, []);

  const handleSearch = (q) => {
    console.log(search, "search", q);
    console.log(useractivityArr, "activeUsersArr");
    setSearch(q);
    if (q) {
      let searchArr = useractivityArr.filter(
        (el) =>
          `${el.type}`.toLowerCase().includes(`${q}`.toLowerCase()) ||
          `${el.timestamp.slice(0, 9)}`
            .toLowerCase()
            .includes(`${q}`.toLowerCase()) ||
          `${el.timestamp.slice(10, 22)}`
            .toLowerCase()
            .includes(`${q}`.toLowerCase())
      );
      console.log(searchArr, "searchArr");
      setUsersArr(searchArr);
    }
  };
  const handleGetTselectedTable = () => {
    if (tabList.filter((el) => el.active)[0].tabName == "All Logs") {
      return (
        <DataTable
          paginationPerPage={10}
          columns={users_columns}
          data={usersArr}
          pagination
        />
      );
    }
  };

  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <ul
              className="nav nav-pills dashboard-pills justify-content-end"
              id="pills-tab"
              role="tablist"
            >
              {tabList.map((item, i) => {
                return (
                  <li key={i}>
                    <CustomButton
                      navPills
                      btnName={item.tabName}
                      pillActive={item.active ? true : false}
                      path={item.path}
                      extraClass={item.extraClass}
                      ClickEvent={() => {
                        tabClick(i, tabList, settabList);
                      }}
                    />
                  </li>
                );
              })}
            </ul>
            {/* <CustomButton isLink iconName="fa-solid fa-plus" btnName="Create Customer" path="/Customer-Create" /> */}
          </div>
          <DashboardTable>
            <div className="d-flex align-items-center justify-content-between mb-5">
              <h5 className="blue-1 m-0">
                {useractivityArr[0]?.name || "Activity Logs"}
              </h5>
            </div>

            {handleGetTselectedTable()}
          </DashboardTable>
        </div>
      </section>
    </main>
  );
}

export default ActivityLog;
