import * as React from "react";
import { userReferrals } from "../../services/users.service";
import DataTable from "react-data-table-component";
import CustomButton from "../Utility/Button";
import { DashboardTable } from "../Utility/DashboardBox";
import { Card, CardContent, Typography } from "@mui/material";

export default function Referrals() {
  const [state, setState] = React.useState();
  const [total, setTotal] = React.useState(0);
  const fetchData = async () => {
    try {
      const response = await userReferrals();
      setState(response.data.usersReports);
      setTotal(response.data.grandTotalRewardPointsEarned);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  React.useEffect(() => {
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
      name: "NAME",
      cell: (row) => <p>{row.name}</p>,
      width: "12%",
    },
    {
      name: "Phone",
      cell: (row) => <p>{row.phone}</p>,
      width: "10%",
    },
    {
      name: "Email",
      cell: (row) => <p>{row.email}</p>,
      width: "18%",
    },
    {
      name: "Rewards Count",
      cell: (row) => <p>{row.referralRewardsTotal}</p>,
      width: "10%",
    },
    {
      name: "Applied Rewards Count",
      cell: (row) => <p>{row.appliedRewardsTotal}</p>,
      width: "13%",
    },
    {
      name: "Pending Rewards Count",
      cell: (row) => <p>{row.pendingRewardsTotal}</p>,
      width: "13%",
    },
    {
      name: "Total Reward Points Earned",
      cell: (row) => <p>{row.totalRewardPointsEarned}</p>,
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
                <DataTable
                  columns={columns}
                  data={state}
                  pagination
                ></DataTable>
              </DashboardTable>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
