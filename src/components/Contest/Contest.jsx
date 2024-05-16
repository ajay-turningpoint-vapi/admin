import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Switch } from "@mui/material";
import ActionIcon from "../Utility/ActionIcon";
import CustomButton from "../Utility/Button";
import SearchBox from "../Utility/SearchBox";
import { DashboardTable } from "../Utility/DashboardBox";
import { useDispatch, useSelector } from "react-redux";
import {
  CONTESTGet,
  SetCONTESTObj,
  CONTESTDelete,
} from "../../redux/actions/Contest/Contest.actions";
import { generateFilePath } from "../Utility/utils";
import { Link } from "react-router-dom";
import PrizeModal from "../Utility/PrizeModal";

const Contest = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const contestArr = useSelector((state) => state.contest.Contests);
  useEffect(() => {
    dispatch(CONTESTGet("admin=true"));
  }, []);

  const handleEdit = (row) => {
    dispatch(SetCONTESTObj(row));
  };

  const handleDelete = (id) => {
    dispatch(CONTESTDelete(id));
  };
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const contest_columns = [
    {
      name: "ID",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "5%",
    },
    {
      name: "Image",
      grow: 0,
      width: "6%",
      cell: (row) => (
        <img height="84px" width="56px" alt={row.name} src={row.image} />
      ),
    },
    {
      name: "Name",
      selector: (row) => row.name,
      width: "15%",
    },
    {
      name: "Joining Points",
      selector: (row) => row.points,
      width: "9%",
    },
    {
      name: "Start Date",
      selector: (row) => new Date(row?.startDate).toDateString(),
      width: "10%",
    },
    {
      name: "End Date",
      selector: (row) => new Date(row?.endDate).toDateString(),
      width: "11%",
    },
    {
      name: "Start Time",
      selector: (row) => row?.startTime,
      width: "8%",
    },
    {
      name: "End Time",
      selector: (row) => row?.endTime,
      width: "7%",
    },
    {
      name: "Status",
      button: true,
      width: "7%",
      cell: (row) => <CustomButton greenBtn btnName={row.status} />,
    },

    {
      name: "Action",
      width: "24%",
      cell: (row) => {
        if (row.status === "INACTIVE") {
          return (
            <>
              {isModalOpen && (
                <PrizeModal
                  handleClose={toggleModal}
                  data={row.prizeArr} // Pass row specific prizeArr data
                />
              )}
              <Link
                to={`/user-contests/${row?._id}`}
                className="btn btn-secondary ms-2 text-white"
              >
                Report
              </Link>
            </>
          );
        } else {
          return (
            <>
              {isModalOpen && (
                <PrizeModal
                  handleClose={toggleModal}
                  data={row.prizeArr} // Pass row specific prizeArr data
                />
              )}
              <Link
                to={`/user-contests/${row?._id}`}
                className="btn btn-secondary ms-2 text-white"
                style={{ marginRight: "10px" }}
              >
                Report
              </Link>
              <ActionIcon
                isRedirected={true}
                onEditClick={() => handleEdit(row)}
                editPath="/contest/contest-create"
                onDeleteClick={() => {
                  const confirmBox = window.confirm(
                    "Do you really want to delete this Item?"
                  );
                  if (confirmBox === true) {
                    handleDelete(row._id);
                  }
                }}
                deletePath="/Contests"
                remove={true}
                edit={true}
                Uniquekey={row.id}
              />
            </>
          );
        }
      },
    },
  ];

  return (
    <main>
      <section className="product-category" style={{ minHeight: "75vh" }}>
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h5 className="blue-1 m-0">Contest List</h5>
                <div className="d-flex gap-3">
                  <CustomButton
                    isLink
                    iconName="fa-solid fa-plus"
                    btnName="ADD NEW Contest"
                    path="/contest/contest-create"
                  />
                  {/* <SearchBox extraClass="bg-white" /> */}
                </div>
              </div>
              <DashboardTable>
                <DataTable
                  paginationPerPage={20}
                  columns={contest_columns}
                  data={contestArr && contestArr.length > 0 ? contestArr : []}
                  pagination
                />
              </DashboardTable>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contest;
