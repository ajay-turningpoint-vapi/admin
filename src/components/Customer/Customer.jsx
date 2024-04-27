import { Button, Menu, Switch } from "@mui/material";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { images } from "../Images/Images";
import ActionIcon from "../Utility/ActionIcon";
import CustomButton from "../Utility/Button";
import { downloadCSV } from "../Utility/CSV";
import { DashboardTable } from "../Utility/DashboardBox";
import SearchBox from "../Utility/SearchBox";
import tabClick from "../Utility/TabClick";
import { useDispatch, useSelector } from "react-redux";
import { usersGet } from "../../redux/actions/Users/users.actions";
import {
  updateUserKycStatus,
  updateUserStatus,
} from "../../services/users.service";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CustomerDetail from "./CustomerDetail";
import { EditModal } from "../Utility/Modal";
import { Link } from "react-router-dom";
import { generateFilePath } from "../Utility/utils";
function Customer() {
  const dispatch = useDispatch();
  const [ModalType, setModalType] = useState("");
  const [ModalName, setModalName] = useState("");
  const [ModalBox, setModalBox] = useState(false);
  const [displayUsersArr, setDisplayUsersArr] = useState([]);
  const [usersArr, setUsersArr] = useState([]);
  const [activeUsersArr, setActiveUsersArr] = useState([]);
  const [inActiveUsersArr, setInActiveUsersArr] = useState([]);
  const userArr = useSelector((state) => state.users.users);
  const [selectedData, setSelectedData] = useState(null);
  const [search, setSearch] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [userKycStatus, setUserKycStatus] = useState(null);
  const open = Boolean(anchorEl);
  const handleChangeActiveStatus = async (id, value) => {
    try {
      let { data: res } = await updateUserStatus(id, { status: value });
      if (res.message) {
        alert(res.message);
        handleGetAllUsers();
      }
    } catch (err) {
      if (err.response.data.message) {
        console.error(err.response.data.message);
        alert(err.response.data.message);
      } else {
        console.error(err.message);
        alert(err.message);
      }
    }
  };

  const handleModalSet = (e, row) => {
    e.preventDefault();
    setModalBox(true);
    setModalType("customer-detail");
    setModalName("Customer Information");
    setSelectedData(row);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const conditionalRowStyles = [
    {
      when: (row) => row.isOnline === true,
      style: {
        backgroundColor: "#c6efce", // Light green background for online rows
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
      width: "9%",
    },
    {
      name: "ROLE",
      selector: (row) => row.role,
      width: "9%",
    },

    {
      name: "IS ACTIVE",
      button: true,
      cell: (row) => (
        <Switch
          onChange={(e) => handleChangeActiveStatus(row._id, e.target.checked)}
          checked={row.isActive}
        />
      ),
      width: "6%",
    },
    {
      name: "KYC Status",
      selector: (row) => {
        let color;
        switch (row.kycStatus) {
          case "pending":
            color = "#FFBF00";
            break;
          case "submitted":
          case "rejected":
            color = "red";
            break;
          case "approved":
            color = "#097969";
            break;
          default:
            color = "black"; // or any other default color
            break;
        }
        return <p style={{ color }}>{row.kycStatus}</p>;
      },
      width: "8%",
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <CustomButton
            btntype="button"
            ClickEvent={(e) => handleModalSet(e, row)}
            isBtn
            iconName="fa-solid fa-check"
            btnName="View"
          />
          <Link
            to={`/user-point-history/${row?._id}`}
            className="btn btn-secondary ms-2 text-white"
          >
            Points
          </Link>
          <Link
            to={`/user-activity-log/${row?._id}`}
            className="btn btn-secondary ms-2 text-white"
          >
            Logs
          </Link>
          {selectedData && (
            <EditModal
              ModalBox={ModalBox}
              data={selectedData}
              setModalBox={setModalBox}
              name={ModalName}
              ModalType={ModalType}
              width="max-content"
            />
          )}
        </>
      ),
      width: "20%",
    },
  ];

  const [tabList, settabList] = useState([
    {
      tabName: "All Customer",
      active: true,
    },
    // {
    //   tabName: "Active Customer",
    //   active: false,
    // },
    // {
    //   tabName: "Inactive customer",
    //   active: false,
    // },
  ]);

  const handleGetAllUsers = () => {
    let query = "";
    query += "?role=CARPENTER";
    if (userKycStatus !== null) {
      query += `&kycStatus=${userKycStatus}`;
    }

    dispatch(usersGet(query));
  };
  useEffect(() => {
    if (userArr && userArr.length) {
      setUsersArr(userArr);
      setDisplayUsersArr(userArr);
      console.log(userArr, "userArr");
      setActiveUsersArr(usersArr.filter((el) => el.isActive));
      setInActiveUsersArr(usersArr.filter((el) => !el.isActive));
    }
  }, [userArr]);

  useEffect(() => {
    handleGetAllUsers();
  }, [userKycStatus]);

  console.log(userArr);

  const handleSearch = (q) => {
    console.log(search, "search", q);
    console.log(activeUsersArr, "activeUsersArr");
    setSearch(q);
    if (q) {
      let searchArr = userArr.filter(
        (el) =>
          `${el.name}`.toLowerCase().includes(`${q}`.toLowerCase()) ||
          `${el.phone}`.toLowerCase().includes(`${q}`.toLowerCase()) ||
          `${el.email}`.toLowerCase().includes(`${q}`.toLowerCase())
      );
      console.log(searchArr, "searchArr");
      setUsersArr(searchArr);
    }
  };

  const handleGetTselectedTable = () => {
    if (tabList.filter((el) => el.active)[0].tabName == "All Customer") {
      return (
        <DataTable
          paginationPerPage={10}
          columns={users_columns}
          data={usersArr}
          pagination
          conditionalRowStyles={conditionalRowStyles}
        />
      );
    } else if (
      tabList.filter((el) => el.active)[0].tabName == "Active Customer"
    ) {
      return (
        <DataTable
          paginationPerPage={10}
          columns={users_columns}
          data={activeUsersArr}
          pagination
          conditionalRowStyles={conditionalRowStyles}
        />
      );
    } else {
      return (
        <DataTable
          paginationPerPage={10}
          columns={users_columns}
          data={inActiveUsersArr}
          pagination
          conditionalRowStyles={conditionalRowStyles}
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
              <h5 className="blue-1 m-0">Active Customer</h5>
              <div className="d-flex align-items-center gap-3">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Online-Users
                  <div
                    style={{
                      backgroundColor: "#c6efce",
                      width: "50px",
                      height: "20px",
                      marginLeft: "10px",
                    }}
                  ></div>
                </div>

                <label>KYC</label>
                <select
                  className="form-control"
                  style={{ width: "auto" }}
                  value={userKycStatus}
                  onChange={(e) => {
                    setUserKycStatus(e.target.value);
                  }}
                >
                  <option value="">All</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="submitted">Submitted</option>
                </select>

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

                {/* <CustomButton isLink iconName="fa-solid fa-download" btnName="Customer CSV" path="/" small roundedPill downloadAble ClickEvent={() => downloadCSV(usersArr)} /> */}
              </div>
            </div>

            {handleGetTselectedTable()}
          </DashboardTable>
        </div>
      </section>
    </main>
  );
}

export default Customer;
