import React, { useEffect } from 'react'
import DataTable from "react-data-table-component";
import { Switch } from "@mui/material";
import ActionIcon from "../Utility/ActionIcon";
import CustomButton from "../Utility/Button";
import SearchBox from "../Utility/SearchBox";
import { DashboardTable } from "../Utility/DashboardBox";
import { useDispatch, useSelector } from "react-redux";
import { generateFilePath } from "../Utility/utils";
import { getUserContests } from '../../redux/actions/Users/users.actions';

const UserContests = () => {

  const dispatch = useDispatch();
  const contestArr = useSelector((state) => state.users.userContests);
  useEffect(() => {
    dispatch(getUserContests());
  }, []);






  const contest_columns = [
    {
      name: "Sr No.",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "20%",
    },
    {
      name: "Constest Name",
      selector: (row) => row?.contestObj?.name,
      width: "20%",
    },
    {
      name: "User Name",
      width: "20%",
      selector: (row) => row?.userObj?.name,
    },
    {
      name: "Join Date",
      width: "20%",
      selector: (row) => new Date(row?.createdAt).toDateString(),
    },
    {
      name: "Status",
      selector: (row) => row?.status
    },
    {
      name: "Rank",
      selector: (row) => row?.rank
    },
    // {
    //   name: "Action",
    //   width: "20%",
    //   cell: (row) => <ActionIcon isRedirected={true} onEditClick={() => handleEdit(row)} editPath="/contest/contest-create" onDeleteClick={() => {
    //     const confirmBox = window.confirm(
    //       "Do you really want to delete this Item?"
    //     )
    //     if (confirmBox === true) {
    //       handleDelete(row._id)
    //     }
    //   }
    //   } deletePath="/Contests" remove edit Uniquekey={row.id} />,
    // },
  ];
  const contest_data = [
    {
      id: "1",
      Seq: "1",
      title: "Beauty Treatmen...",
      author: "Super Admin",
      published: "Fri, May 20, 2022 4:18 PM",
    },
    {
      id: "2",
      Seq: "2",
      title: "Beauty Treatmen...",
      author: "Super Admin",
      published: "Fri, May 20, 2022 4:18 PM",
    },
    {
      id: "3",
      Seq: "3",
      title: "Beauty Treatmen...",
      author: "Super Admin",
      published: "Fri, May 20, 2022 4:18 PM",
    },
    {
      id: "4",
      Seq: "4",
      title: "Beauty Treatmen...",
      author: "Super Admin",
      published: "Fri, May 20, 2022 4:18 PM",
    },
    {
      id: "5",
      Seq: "5",
      title: "Beauty Treatmen...",
      author: "Super Admin",
      published: "Fri, May 20, 2022 4:18 PM",
    },
    {
      id: "6",
      Seq: "6",
      title: "Beauty Treatmen...",
      author: "Super Admin",
      published: "Fri, May 20, 2022 4:18 PM",
    },
    {
      id: "7",
      Seq: "7",
      title: "Beauty Treatmen...",
      author: "Super Admin",
      published: "Fri, May 20, 2022 4:18 PM",
    },
    {
      id: "8",
      Seq: "8",
      title: "Beauty Treatmen...",
      author: "Super Admin",
      published: "Fri, May 20, 2022 4:18 PM",
    },
    {
      id: "9",
      Seq: "9",
      title: "Beauty Treatmen...",
      author: "Super Admin",
      published: "Fri, May 20, 2022 4:18 PM",
    },
    {
      id: "10",
      Seq: "10",
      title: "Beauty Treatmen...",
      author: "Super Admin",
      published: "Fri, May 20, 2022 4:18 PM",
    },
  ];

  return (
    <main>
      <section className="product-category" style={{ minHeight: "75vh" }}>
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h5 className="blue-1 m-0">User Contest List</h5>
                <div className="d-flex gap-3">

                </div>
              </div>
              <DashboardTable>
                <DataTable paginationPerPage={100} columns={contest_columns} data={contestArr && contestArr.length > 0 ? contestArr : []} pagination />
              </DashboardTable>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}



export default UserContests;