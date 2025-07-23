import React, { useContext, useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
import CustomButton from "../Utility/Button";
import tabClick from "../Utility/TabClick";
import { useDispatch, useSelector } from "react-redux";

import {
  DashboardBox,
  DashboardChart,
  DashboardTable,
} from "../Utility/DashboardBox";
import { ReelsGet } from "../../redux/actions/Reels/reels.actions";
import { usersGet } from "../../redux/actions/Users/users.actions";
import { COUPONGet } from "../../redux/actions/Coupon/Coupon.actions";
import { TRANSACTIONGet } from "../../redux/actions/Transcaction/Transaction.actions";
import { CONTESTGet } from "../../redux/actions/Contest/Contest.actions";
import { Link } from "react-router-dom";
import { getTransactionCount } from "../../services/transaction.service";
import {
  getAllCouponsAnalytics,
  getCouponsCount,
} from "../../services/Coupons.service";
import {
  getDashboardCount,
  getUsersAnalytics,
  getUsersKycAnalytics,
} from "../../services/users.service";
import {
  getReelsAnalytics,
  getReelsLikeAnalytics,
} from "../../services/reels.service";
import { getAllJoinedUserContest } from "../../services/contest.service";
import { getProductsCount } from "../../services/product.service";
import DailyKycBarChart from "./DailyKycBarChart";
import DrilldownBarChart from "../DrilldownBarChart";
import { url } from "../../services/url.service";
import TopUsersSideBySide from "../Coupons/Top50Coupons";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// **Helper function to aggregate and sum data by month**
const aggregateAndSumDataByMonth = (data) => {
  return labels.reduce((acc, month, index) => {
    acc[month] = Array.isArray(data[index])
      ? data[index].reduce((sum, val) => sum + val, 0)
      : data[index] || 0;
    return acc;
  }, {});
};

function Dashboard() {
  const dispatch = useDispatch();
  const [dashboardData, setDashboardData] = useState({});

  const [reelLikeUserAnalytics, setReelLikeUserAnalytics] = useState([]);
  const [couponAnalytics, setCouponAnalytics] = useState([]);
  const [reelsAnalytics, setReelsAnalytics] = useState([]);
  const [userContestLabel, setUserContestLabel] = useState([]);
  const [userContestCount, setUserContestCount] = useState([]);

  const fetchDashboardCounts = async () => {
    try {
      const response = await getDashboardCount();
      setDashboardData(response.data?.data || {});
    } catch (error) {
      console.error("Error fetching dashboard counts:", error);
    }
  };

  const fetchAnalyticsData = async () => {
    try {
      const [
        reelsLikeAnalyticsData,
        couponAnalyticsData,
        reelsAnalyticsData,
        userContestData,
      ] = await Promise.allSettled([
        getReelsLikeAnalytics(),
        getAllCouponsAnalytics(),
        getReelsAnalytics(),
        getAllJoinedUserContest(),
      ]);

      if (reelsLikeAnalyticsData.status === "fulfilled")
        setReelLikeUserAnalytics(reelsLikeAnalyticsData.value.data?.data || []);
      if (couponAnalyticsData.status === "fulfilled")
        setCouponAnalytics(couponAnalyticsData.value.data?.data || []);
      if (reelsAnalyticsData.status === "fulfilled")
        setReelsAnalytics(reelsAnalyticsData.value.data?.data || []);
      if (userContestData.status === "fulfilled") {
        setUserContestLabel(userContestData.value.data?.contestNames || []);
        setUserContestCount(userContestData.value.data?.userCounts || []);
      }
    } catch (error) {
      console.error("Error fetching analytics data:", error);
    }
  };

  useEffect(() => {
    fetchDashboardCounts();
    fetchAnalyticsData();
  }, []);

  const aggregatedReelLikeData = useMemo(
    () => aggregateAndSumDataByMonth(reelLikeUserAnalytics),
    [reelLikeUserAnalytics]
  );
  const aggregatedReelsData = useMemo(
    () => aggregateAndSumDataByMonth(reelsAnalytics),
    [reelsAnalytics]
  );
  const aggregatedKYCData = useMemo(
    () => aggregateAndSumDataByMonth(reelsAnalytics),
    [reelsAnalytics]
  );

  const chartData = (label, aggregatedData, bgColor) => ({
    labels: Object.keys(aggregatedData),
    datasets: [
      { label, data: Object.values(aggregatedData), backgroundColor: bgColor },
    ],
  });

  const data1 = chartData(
    "User Reels Like",
    aggregatedReelLikeData,
    "rgba(255, 99, 132, 0.5)"
  );
  const data2 = chartData(
    "Reels Upload",
    aggregatedReelsData,
    "rgba(255, 159, 64, 1)"
  );

  const data3 = {
    labels: userContestLabel || ["Dummy"],
    datasets: [
      {
        label: "Participants",
        data: userContestCount || [0],
        backgroundColor: "rgba(75, 192, 192)",
      },
    ],
  };

  const couponChartData = {
    labels: ["Used Coupons", "Unused Coupons"],
    datasets: [
      {
        label: "Coupons",
        data: couponAnalytics || [0, 0],
        backgroundColor: ["rgba(75, 192, 192, 0.2)", "rgba(255, 206, 86, 0.2)"],
        borderColor: ["rgba(75, 192, 192)", "rgba(255, 206, 86, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <main>
      <section className="dashboard-head mb-5">
        <div className="container-fluid d-flex align-items-center justify-content-between">
          <h5 className="blue-1 mb-0">Dashboard</h5>
        </div>
      </section>

      <section className="mb-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-md-6">
              <Link to="/Reels/View">
                <DashboardBox className="dashboard-summary">
                  <h5 className="blue-1">Total Reels</h5>
                  <h4 className="text-dark mb-0">
                    {dashboardData.reelsCount || 0}
                  </h4>
                </DashboardBox>
              </Link>
            </div>
            <div className="col-12 col-md-6">
              <Link to="/Users-list">
                <DashboardBox className="dashboard-summary">
                  <h5 className="blue-1">Total Customer</h5>
                  <h4 className="text-dark mb-0">
                    {dashboardData.userCount || 0}
                  </h4>
                </DashboardBox>
              </Link>
            </div>

            <div className="col-12 col-md-6">
              <Link to="/Contests">
                <DashboardBox className="dashboard-summary">
                  <h5 className="blue-1">Total Contests</h5>
                  <h4 className="text-dark mb-0">
                    {dashboardData.contestCount || 0}
                  </h4>
                </DashboardBox>
              </Link>
            </div>
            <div className="col-12 col-md-6">
              <Link to="/transactions">
                <DashboardBox className="dashboard-summary">
                  <h5 className="blue-1">Transactions</h5>
                  <h4 className="text-dark mb-0">
                    {dashboardData.pointHistoryCount || 0}
                  </h4>
                </DashboardBox>
              </Link>
            </div>
            <div className="col-12 col-md-6">
              <Link to="/Product-list">
                <DashboardBox className="dashboard-summary">
                  <h5 className="blue-1">Total Products</h5>
                  <h4 className="text-dark mb-0">
                    {dashboardData.productCount || 0}
                  </h4>
                </DashboardBox>
              </Link>
            </div>
            <div className="col-12 col-md-6">
              <Link to="/Coupons">
                <DashboardBox className="dashboard-summary">
                  <h5 className="blue-1">Total Coupons</h5>
                  <h4 className="text-dark mb-0">
                    {dashboardData.couponsCount || 0}
                  </h4>
                </DashboardBox>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-md-4 mb-5" style={{ width: "auto" }}>
              <DashboardChart>
                <h5 className="blue-1 mb-4">Registered Users</h5>
                <DrilldownBarChart
                  apiBaseUrl={`${url}/users/getUsersAnalytics`}
                  titlePrefix="User Registrations"
                />
              </DashboardChart>
            </div>

            <div className="col-12 col-md-4 mb-5" style={{ width: "auto" }}>
              <DashboardChart>
                <h5 className="blue-1 mb-4">User KYC Approvals</h5>
                <DrilldownBarChart
                  apiBaseUrl={`${url}/users/getUsersKycAnalytics`}
                  titlePrefix="User KYC Approvals"
                  color="rgb(241, 62, 12)"
                />
              </DashboardChart>
            </div>

            <div className="col-12 col-md-4 mb-5" style={{ width: "auto" }}>
              <DashboardChart>
                <h5 className="blue-1 mb-4">Contest participants</h5>
                <Bar options={options} data={data3} />
              </DashboardChart>
            </div>
            <div className="col-12 col-md-4 mb-5" style={{ width: "auto" }}>
              <DashboardChart>
                <h5 className="blue-1 mb-4">Reels Like</h5>
                <Bar options={options} data={data1} />
              </DashboardChart>
            </div>
            <div className="col-12 col-md-4 mb-5" style={{ width: "auto" }}>
              <DashboardChart>
                <h5 className="blue-1 mb-4">Reels Upload</h5>
                <Bar options={options} data={data2} />
              </DashboardChart>
            </div>

            <div className="col-12 col-md-4 mb-5" style={{ width: "auto" }}>
              <DashboardChart>
                <h5 className="blue-1 mb-4">Coupons Qty</h5>
                <Doughnut data={couponChartData} />
              </DashboardChart>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
