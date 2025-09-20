import * as React from "react";
import { userDeletionRequests } from "../../services/users.service";
import DataTable from "react-data-table-component";
import CustomButton from "../Utility/Button";
import { DashboardTable } from "../Utility/DashboardBox";
import {
  Box,
  Button,
  Card,
  CardContent,
  Modal,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import moment from "moment";
const conditionalRowStyles = [
  {
    when: (row) => row.isDeleted === true,
    style: {
      backgroundColor: "rgba(255, 0, 0, 0.1)",
      color: "red",
      fontWeight: "bold",
    },
  },
];
export default function DeleteUserRequest() {
  const [state, setState] = useState([]);

  const fetchData = async () => {
    try {
      const response = await userDeletionRequests();

      setState(response.data.data || []);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      name: "ID",
      cell: (row, index) => <p>{index + 1}</p>,
      sortable: true,
      width: "5%",
    },
    {
      name: "Name",
      cell: (row) => <p>{row.name || "N/A"}</p>,
      width: "15%",
    },
    {
      name: "Phone",
      cell: (row) => <p>{row.phone || "N/A"}</p>,
      width: "15%",
    },
    {
      name: "Email",
      cell: (row) => <p>{row.email || "N/A"}</p>,
      width: "20%",
    },

    {
    name: "Deletion Requested At",
    cell: (row) => (
      <p>
        {row.deletionRequestedAt
          ? moment(row.deletionRequestedAt).format("DD/MM/YY")
          : "—"}
      </p>
    ),
    width: "15%",
  },
  {
    name: "Account will be deleted At",
    cell: (row) => (
      <p>
        {row.deletionScheduledAt
          ? moment(row.deletionScheduledAt).format("DD/MM/YY")
          : "—"}
      </p>
    ),
    width: "15%",
  },
  ];

  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h5 className="blue-1">Users Deletion Requests</h5>
              </div>
              <DashboardTable>
                <DataTable columns={columns} data={state} pagination conditionalRowStyles={conditionalRowStyles} />
              </DashboardTable>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
