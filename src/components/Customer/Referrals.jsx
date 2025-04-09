import * as React from "react";
import { userReferrals } from "../../services/users.service";
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

export default function Referrals() {
  const [state, setState] = useState([]);
  const [total, setTotal] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedReferrals, setSelectedReferrals] = useState([]);

  const fetchData = async () => {
    try {
      const response = await userReferrals();
      setState(response.data.usersReports || []);
      setTotal(response.data.grandTotalRewardPointsEarned || 0);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenModal = (referrals) => {
    setSelectedReferrals(referrals || []);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedReferrals([]);
  };

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
      name: "Total Referrals",
      cell: (row) => <p>{row.totalReferrals || 0}</p>,
      width: "10%",
    },
    {
      name: "Referrals",
      cell: (row) => (
        <Button
          variant="contained"
          size="small"
          onClick={() => handleOpenModal(row.referrals)}
        >
          View Referrals
        </Button>
      ),
      width: "15%",
    },
    {
      name: "Total Reward Points Earned",
      cell: (row) => <p>{row.totalRewardPointsEarned || 0}</p>,
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
                <h5 className="blue-1">All Referrals</h5>
                <Card>
                  <CardContent>
                    <Typography variant="body2" color="#415094" component="h1">
                      Grand Total Reward Points Earned ( <b>{total}</b> )
                    </Typography>
                  </CardContent>
                </Card>
              </div>
              <DashboardTable>
                <DataTable columns={columns} data={state} pagination />
              </DashboardTable>
            </div>
          </div>
        </div>
      </section>

      {/* Modal for Viewing Referrals */}
      <Modal open={open} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            width: 400,
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            Referral Details
          </Typography>
          {selectedReferrals.length > 0 ? (
            selectedReferrals.map((ref, index) => (
              <Typography key={index} variant="body1">
                {index + 1}. {ref.name} ({ref.phone || "No Phone"})
              </Typography>
            ))
          ) : (
            <Typography>No Referrals</Typography>
          )}
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleCloseModal}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </main>
  );
}
