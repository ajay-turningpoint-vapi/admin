import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import CustomButton from "../Utility/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  TRANSACTIONGet,
  TransactionUpdateStatus,
} from "../../redux/actions/Transcaction/Transaction.actions";
import { getById } from "../../services/users.service";
import { Modal, Box, Pagination } from "@mui/material";
import SearchBox from "../Utility/SearchBox";
import { DashboardBox, DashboardTable } from "../Utility/DashboardBox";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import moment from "moment";

export const Transactions = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [ModalBox, setModalBox] = useState(false);
  const [modalData, setModalData] = useState(null);
  const transactionArr = useSelector((state) => state.transaction.transaction);
  const transactionArrTotalPages = useSelector(
    (state) => state.transaction.totalPages
  );
  const [transactionAllArr, setTransactionAllArr] = useState([]);
  const [successTransactionArr, setSuccessUsersArr] = useState([]);
  const [pendingTransactionArr, setPendingTransactionArr] = useState([]);
  const [rejectTransactionArr, setRejectTransactionArr] = useState("");
  const [pageLimit, setPageLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [reason, setReason] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [transactionId, setTransactionId] = useState("");
  useEffect(() => {
    handleGet();
  }, []);

  const handleGet = () => {
    let query = "transactions=true";
    if (page) {
      query += `&page=${page}`;
    }

    if (pageLimit) {
      query += `&limit=${pageLimit}`;
    }
    if (search) {
      query += `&q=${search}`;
    }
    if (statusFilter) {
      query += `&status=${statusFilter}`;
    }
    // if (statusFilter) {
    query += `&sort=createdAt`;
    query += `&order=desc`;
    // }
    console.log("GET CALLED", query);
    dispatch(TRANSACTIONGet(query)).then(() => setLoading(false));
  };

  useEffect(() => {
    handleGet();
  }, [page, search, statusFilter]);
  const handleModalSet = async (e, row) => {
    e.preventDefault();
    setModalBox(true);
    try {
      setModalData(row);
      setStatus(row?.status);
      setReason(row?.reason ? row?.reason : "");
      setTransactionId(row?._id);
    } catch (err) {
      if (err.response.data.message) {
        console.error(err.response.data.message);
        alert(err.response.data.message);
      } else {
        console.error(err.message);
        alert(err.message);
      }

      setModalBox(false);
    }
  };

  const handleStatusUpdate = () => {
    try {
      let obj = {
        status: status,
        reason,
      };
      console.log(transactionId, "transactionId");
      dispatch(TransactionUpdateStatus(obj, transactionId));
      setModalBox(false);
      handleGet();
    } catch (err) {
      if (err.response.data.message) {
        console.error(err.response.data.message);
        alert(err.response.data.message);
      } else {
        console.error(err.message);
        alert(err.message);
      }

      setModalBox(false);
    }
  };

  const transaction_columns = [
    {
      name: "Transaction Id",
      cell: (row) => <p>{row.transactionId}</p>,

      sortable: true,
      width: "12%",
    },
    {
      name: "Mobile",
      cell: (row) => <p>{row?.user?.phone} </p>,
      width: "10%",
    },
    {
      name: "Transfer",
      selector: (row) => row?.additionalInfo?.transferType,
      width: "7%",
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
      width: "7%",
    },
    {
      name: "Description",
      cell: (row) => <p>{row.description}</p>,
      width: "25%",
    },
    {
      name: "Status",
      selector: (row) =>
        row.status == "success" ? (
          <CustomButton greenBtn btnName="Success" />
        ) : (
          <CustomButton redBtn btnName={row.status} />
        ),
      width: "10%",
    },

    {
      name: "Date Time",
      selector: (row) => `${moment(row.createdAt).format("YYYY-MM-DD, HH:mm")}`,
      width: "15%",
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
        </>
      ),
      width: "10%",
    },
  ];

  const [tabList, setTabList] = useState([
    {
      tabName: "All Transactions",
      status: "",
      active: true,
    },
    {
      tabName: "Pending Transactions",
      status: "pending",
      active: false,
    },
    {
      tabName: "Success Transactions",
      status: "success",
      active: false,
    },
    {
      tabName: "Reject Transactions",
      status: "reject",
      active: false,
    },
  ]);

  useEffect(() => {
    console.log(transactionAllArr, "transactionAllArr");
  }, [transactionAllArr]);

  useEffect(() => {
    if (transactionArr) {
      let tempArr = transactionArr;
      setTransactionAllArr([...tempArr]);
      // console.log(tempArr, "transactionArr")
      setSuccessUsersArr(tempArr.filter((el) => el.status == "success"));
      setPendingTransactionArr(tempArr.filter((el) => el.status == "pending"));
      setRejectTransactionArr(tempArr.filter((el) => el.status == "reject"));
    }
  }, [transactionArr, page, pageLimit]);

  const tabClick = (i, tabList, settabList) => {
    let temp = tabList.map((item, index) => {
      if (i === index) {
        item.active = true;
        // if (item.status) {
        setStatusFilter(item.status);
        // }
      } else {
        item.active = false;
      }

      return item;
    });

    settabList([...temp]);
  };
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const handleGetTselectedTable = () => {
    let arr = [];
    if (tabList.filter((el) => el.active)[0].tabName == "All Transactions") {
      arr = transactionAllArr;
    } else if (
      tabList.filter((el) => el.active)[0].tabName == "Success Transactions"
    ) {
      arr = successTransactionArr;
    } else if (
      tabList.filter((el) => el.active)[0].tabName == "Reject Transactions"
    ) {
      arr = rejectTransactionArr;
    } else {
      arr = pendingTransactionArr;
    }
    console.log(
      transactionAllArr.map((el) => el.status),
      arr.map((el) => el.status),
      tabList.filter((el) => el.active)[0].tabName == "All Transactions"
    );
    return arr;
  };

  return (
    <main>
      <section className="product-category" style={{ minHeight: "75vh" }}>
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h5 className="blue-1 m-0">Transactions</h5>
                <div className="d-flex gap-3">
                  <ul className="dashboard-filter filters">
                    {tabList.map((item, i) => {
                      return (
                        <li key={`${item.type}_${i}`}>
                          <CustomButton
                            navPills
                            btnName={item.tabName}
                            changeClass="filtering"
                            pillActive={item.active ? true : false}
                            ClickEvent={() => tabClick(i, tabList, setTabList)}
                          />
                        </li>
                      );
                    })}
                  </ul>

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
                "Loading..."
              ) : (
                <DashboardTable>
                  <DataTable
                    columns={transaction_columns}
                    data={transactionArr?.length ? transactionArr : []}
                  />
                  <div className="d-flex align-items-center justify-content-between mt-4">
                    <h5 className="blue-1 m-0"></h5>
                    <Pagination
                      count={transactionArrTotalPages}
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

      <Modal
        open={ModalBox}
        onClose={() => setModalBox(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal-box customer-modal">
          <div className="modal-container" style={{ width: 600 }}>
            <div className="modal-header">
              <h5>Transaction</h5>
              <CustomButton
                isBtn
                btntype="button"
                iconName="ion-close-circled text-white"
                changeClass="border-0 bg-transparent rounded-circle modal-close"
                ClickEvent={(e) => {
                  e.preventDefault();
                  setModalBox(false);
                }}
              />
            </div>
            <div className="modal-body">
              <section className="product-category">
                <div className="container-fluid p-0">
                  {modalData && (
                    <DashboardBox className="mb-5">
                      <h5 className="blue-1 mb-4">Customer Profile</h5>
                      <div className="row">
                        <div className="col-12 col-md-12">
                          <div className="customer-profile">
                            <h6 className="blue-1 text-capitalize my-3">
                              {modalData?.user?.firstName}
                            </h6>
                            <ul className="blue-1 fs-14">
                              <li>
                                <span className="fw-600">
                                  Name <span>:</span>
                                </span>
                                {modalData?.user?.name}
                              </li>
                              <li>
                                <span className="fw-600">
                                  Email <span>:</span>
                                </span>
                                {modalData?.user?.email}
                              </li>
                              <li>
                                <span className="fw-600">
                                  Phone <span>:</span>
                                </span>
                                {modalData?.user?.phone}
                              </li>
                              {modalData.additionalInfo?.transferDetails
                                ?.couponCode && (
                                <li>
                                  <span className="fw-600">
                                    Coupon Code <span>:</span>
                                  </span>
                                  {
                                    modalData.additionalInfo?.transferDetails
                                      ?.couponCode
                                  }
                                </li>
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                      <h5 className="blue-1 my-4">Transaction Information</h5>
                      <div className="row">
                        <div className="col-12 col-md-12">
                          <div>
                            <ul className="blue-1 fs-14">
                              {modalData.additionalInfo && (
                                <>
                                  <li>
                                    <li>
                                      <span className="fw-600">
                                        TransferType <span>:</span>
                                      </span>
                                      {modalData.additionalInfo?.transferType}
                                    </li>
                                  </li>
                                  {(() => {
                                    switch (
                                      modalData.additionalInfo?.transferType
                                    ) {
                                      case "CASH":
                                        return;
                                      case "BANK":
                                        return (
                                          <>
                                            <span className="fw-600">
                                              Bank :
                                              {
                                                modalData.additionalInfo
                                                  ?.transferDetails?.bank
                                              }
                                            </span>
                                            <br />
                                            <span className="fw-600">
                                              Account No :
                                              {
                                                modalData.additionalInfo
                                                  ?.transferDetails?.accountNo
                                              }
                                            </span>
                                            <br />
                                            <span className="fw-600">
                                              Account Name :
                                              {
                                                modalData.additionalInfo
                                                  ?.transferDetails?.accountName
                                              }
                                            </span>
                                            <br />
                                            <span className="fw-600">
                                              IFSC Code :
                                              {
                                                modalData.additionalInfo
                                                  ?.transferDetails?.ifsc
                                              }
                                            </span>
                                            <br />
                                          </>
                                        );

                                      case "UPI":
                                        return (
                                          <span className="fw-600">
                                            UPI Id :
                                            {
                                              modalData.additionalInfo
                                                ?.transferDetails?.upiId
                                            }
                                          </span>
                                        );
                                      default:
                                        return null;
                                    }
                                  })()}
                                  <li>
                                    <span className="fw-600">
                                      Tranfer Information <span>:</span>
                                    </span>
                                    {modalData?.user?.email}
                                  </li>
                                  {/* {
                                    modalData?.status != 'success' && ( */}
                                  <>
                                    <li>
                                      <span className="fw-600">
                                        Update Status <span>:</span>
                                      </span>
                                      {modalData?.status}
                                      <select
                                        className="form-control my-2"
                                        value={status}
                                        onChange={(e) =>
                                          setStatus(e.target.value)
                                        }
                                      >
                                        <option>Select Status</option>
                                        <option value="success">Success</option>
                                        <option value="reject">Reject</option>
                                      </select>
                                    </li>
                                    <li>
                                      <span className="fw-600">
                                        Reason <span>:</span>
                                      </span>
                                      {modalData?.reason}
                                      <input
                                        value={reason}
                                        className="form-control mb-3"
                                        onChange={(e) =>
                                          setReason(e.target.value)
                                        }
                                      />
                                    </li>
                                    <button
                                      className="btn btn-success"
                                      onClick={handleStatusUpdate}
                                    >
                                      Update
                                    </button>
                                  </>
                                  {/* )
                                  } */}
                                </>
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </DashboardBox>
                  )}
                </div>
              </section>
            </div>
          </div>
        </Box>
      </Modal>
    </main>
  );
};
