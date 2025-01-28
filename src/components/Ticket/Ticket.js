import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

import ActionIcon from "../Utility/ActionIcon";
import CustomButton from "../Utility/Button";
import {
  fetchTicketsAdmin,
  updateTicketStatus,
} from "../../redux/actions/Ticket/ticket.action";

import { DashboardTable } from "../Utility/DashboardBox";
import { useDispatch, useSelector } from "react-redux";

const Ticket = () => {
  const dispatch = useDispatch();

  const { tickets, loading, error } = useSelector((state) => state.tickets);
  const [selectedStatus, setSelectedStatus] = useState("Select");
  console.log("tickets", tickets);

  useEffect(() => {
    dispatch(fetchTicketsAdmin()); // Fetch tickets when component loads
  }, []);

  const handleStatusChange = (_id) => (event) => {
    const newStatus = event.target.value;
    const confirmed = window.confirm(
      `Are you sure you want to change the status to "${newStatus}"?`
    );
    if (!confirmed) return;

    dispatch(updateTicketStatus(_id, newStatus)); // Dispatch Redux action
  };

  const contest_columns = [
    {
      name: "ID",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "5%",
    },
    {
      name: "Title",
      selector: (row) => row.title,
      width: "15%",
    },
    {
      name: "Description",
      selector: (row) => row.description,
      width: "18%",
    },
    {
      name: "Creation Date",
      selector: (row) => new Date(row?.createdAt).toDateString(),
      width: "10%",
    },
    {
      name: "Created By Name",
      selector: (row) => row?.createdBy?.userName,
      width: "12%",
    },
    {
      name: "Created By Phone",
      selector: (row) => row?.createdBy?.phone,
      width: "12%",
    },
    {
      name: "Status",
      selector: (row) => row?.status,
      width: "10%",
    },

    {
      name: "Action",
      width: "15%",
      cell: (row) => {
        const statusOptions = ["Open", "In Progress", "Resolved", "Closed"];
        return (
          <select
            value={row.status}
            onChange={handleStatusChange(row._id)}
            className="form-select"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        );
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
                <h5 className="blue-1 m-0">All Tickets</h5>
              </div>
              <DashboardTable>
                <DataTable
                  paginationPerPage={20}
                  columns={contest_columns}
                  data={tickets}
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

export default Ticket;
