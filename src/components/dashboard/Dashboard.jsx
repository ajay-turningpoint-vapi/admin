import React, { useEffect, useState } from "react";
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
import { getUsersAnalytics } from "../../services/users.service";
import {
  getReelsAnalytics,
  getReelsLikeAnalytics,
} from "../../services/reels.service";
import { getAllJoinedUserContest } from "../../services/contest.service";
import { getProductsCount } from "../../services/product.service";

function Dashboard() {
  const dispatch = useDispatch();

  const userArr = useSelector((state) => state.users.users);
  const couponArr = useSelector((state) => state.coupon.coupons);
  const contestArr = useSelector((state) => state.contest.Contests);
  const transactionArr = useSelector(
    (state) => state.transaction.transactionCount
  );
  const reelsArr = useSelector((state) => state.reels.reels);

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalCoupons, setTotalCoupons] = useState(0);
  const [totalContest, setTotalContest] = useState(0);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalReels, setTotalReels] = useState(0);
  const [userAnalytics, setUserAnalytics] = useState(0);
  const [reelLikeAnalytics, setReelLikeUserAnalytics] = useState(0);
  const [couponAnalytics, setCouponAnalytics] = useState(0);
  const [reelsAnalytics, setReelsAnalytics] = useState(0);
  const [userContestLabel, setUserContestLabel] = useState(0);
  const [userContestCount, setUserContestCount] = useState(0);

  const handleTransactionCount = async () => {
    let { data: response } = await getTransactionCount();
    let { data: response1 } = await getCouponsCount();
    let { data: response2 } = await getUsersAnalytics();
    let { data: response3 } = await getReelsLikeAnalytics();
    let { data: response4 } = await getAllCouponsAnalytics();
    let { data: response5 } = await getReelsAnalytics();
    let { data: response6 } = await getAllJoinedUserContest();
    let { data: response7 } = await getProductsCount();
    setUserAnalytics(response2.data);
    if (response) {
      setTotalTransactions(response);
    }
    if (response1) {
      setTotalCoupons(response1);
    }
    if (response3) {
      setReelLikeUserAnalytics(response3.data);
    }
    if (response4) {
      setCouponAnalytics(response4.data);
    }
    if (response5) {
      setReelsAnalytics(response5.data);
    }
    if (response6) {
      setUserContestLabel(response6.contestNames);
      setUserContestCount(response6.userCounts);
    }
    if (response7) {
      setTotalProducts(response7);
    }
  };

  useEffect(() => {
    if (userArr) {
      setTotalUsers(userArr.length > 0 ? userArr?.length : 0);
    }

    if (couponArr) {
      setTotalCoupons(couponArr.length > 0 ? couponArr?.length : 0);
    }

    if (contestArr) {
      setTotalContest(contestArr.length > 0 ? contestArr?.length : 0);
    }

    if (reelsArr) {
      setTotalReels(reelsArr.length > 0 ? reelsArr?.length : 0);
    }
  }, [userArr, couponArr, contestArr, transactionArr, reelsArr]);

  useEffect(() => {
    handleTransactionCount();
    let query = "";
    query += "?role=CARPENTER";
    dispatch(usersGet(query));
    dispatch(ReelsGet());
    dispatch(CONTESTGet("admin=true"));
  }, []);

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

  // Aggregate data for each month
  const aggregateDataByMonth = () => {
    const monthData = {};
    for (let i = 0; i < labels.length; i++) {
      const month = labels[i];
      monthData[month] = userAnalytics[i];
    }
    return monthData;
  };
  const aggregateDataByMonthforReelsLike = () => {
    const monthData = {};
    for (let i = 0; i < labels.length; i++) {
      const month = labels[i];
      monthData[month] = reelLikeAnalytics[i];
    }
    return monthData;
  };

  const aggregateDataByMonthforReels = () => {
    const monthData = {};
    for (let i = 0; i < labels.length; i++) {
      const month = labels[i];
      monthData[month] = reelsAnalytics[i];
    }
    return monthData;
  };

  // Generate aggregated data for each month
  const aggregatedData = userAnalytics && aggregateDataByMonth();
  const aggregatedData1 =
    reelLikeAnalytics && aggregateDataByMonthforReelsLike();
  const aggregatedData2 = reelsAnalytics && aggregateDataByMonthforReels();
  // Sum up data for each month
  const sumDataByMonth = () => {
    const aggregatedMonthData = {};
    for (const month in aggregatedData) {
      const monthValues = aggregatedData[month];
      const sum = monthValues.reduce((acc, curr) => acc + curr, 0);
      aggregatedMonthData[month] = sum;
    }
    return aggregatedMonthData;
  };
  const sumDataByMonthReelsLike = () => {
    const aggregatedMonthData = {};
    for (const month in aggregatedData1) {
      const monthValues = aggregatedData1[month];
      const sum = monthValues.reduce((acc, curr) => acc + curr, 0);
      aggregatedMonthData[month] = sum;
    }
    return aggregatedMonthData;
  };
  const sumDataByMonthReels = () => {
    const aggregatedMonthData = {};
    for (const month in aggregatedData2) {
      const monthValues = aggregatedData2[month];
      const sum = monthValues.reduce((acc, curr) => acc + curr, 0);
      aggregatedMonthData[month] = sum;
    }
    return aggregatedMonthData;
  };
  // Generate final data for the chart
  const aggregatedMonthData = sumDataByMonth();
  const aggregatedMonthDataReelLike = sumDataByMonthReelsLike();
  const aggregatedMonthDataReels = sumDataByMonthReels();
  const data = {
    labels: Object.keys(aggregatedMonthData),
    datasets: [
      {
        label: "User Registered",
        data: Object.values(aggregatedMonthData),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  const data1 = {
    labels: Object.keys(aggregatedMonthDataReelLike),
    datasets: [
      {
        label: "User Reels Like",
        data: Object.values(aggregatedMonthDataReelLike),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  const data2 = {
    labels: Object.keys(aggregatedMonthDataReels),
    datasets: [
      {
        label: "Reels Upload",
        data: Object.values(aggregatedMonthDataReels),
        backgroundColor: "rgba(255, 159, 64, 1)",
      },
    ],
  };

  const data3 = {
    labels: userContestLabel || "dummy",
    datasets: [
      {
        label: "Participants",
        data: userContestCount || 0,
        backgroundColor: "rgba(75, 192, 192)",
      },
    ],
  };

  const couponChartData = {
    labels: ["All Coupons", "Used Coupons", "Unused Coupons"],
    datasets: [
      {
        label: "Coupons",
        data: couponAnalytics || [0, 0, 0],
        backgroundColor: [
          "rgba(54, 162, 235, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(54, 162, 235)",
          "rgba(75, 192, 192)",
          "rgba(255, 206, 86, 1)",
        ],
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
                  <h4 className="text-dark mb-0">{totalReels}</h4>
                </DashboardBox>
              </Link>
            </div>
            <div className="col-12 col-md-6">
              <Link to="/Users-list">
                <DashboardBox className="dashboard-summary">
                  <h5 className="blue-1">Total Customer</h5>
                  <h4 className="text-dark mb-0">{totalUsers}</h4>
                </DashboardBox>
              </Link>
            </div>
            <div className="col-12 col-md-6">
              <Link to="/Contests">
                <DashboardBox className="dashboard-summary">
                  <h5 className="blue-1">Total Contests</h5>
                  <h4 className="text-dark mb-0">{totalContest}</h4>
                </DashboardBox>
              </Link>
            </div>
            <div className="col-12 col-md-6">
              <Link to="/transactions">
                <DashboardBox className="dashboard-summary">
                  <h5 className="blue-1">Transactions</h5>
                  <h4 className="text-dark mb-0">{totalTransactions}</h4>
                </DashboardBox>
              </Link>
            </div>
            <div className="col-12 col-md-6">
              <Link to="/Product-list">
                <DashboardBox className="dashboard-summary">
                  <h5 className="blue-1">Total Products</h5>
                  <h4 className="text-dark mb-0">{totalProducts}</h4>
                </DashboardBox>
              </Link>
            </div>
            <div className="col-12 col-md-6">
              <Link to="/Coupons">
                <DashboardBox className="dashboard-summary">
                  <h5 className="blue-1">Total Coupons</h5>
                  <h4 className="text-dark mb-0">{totalCoupons}</h4>
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
                <h5 className="blue-1 mb-4">All Users</h5>
                <Bar options={options} data={data} />
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
                <h5 className="blue-1 mb-4">Coupons</h5>
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
