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
  const [totalReels, setTotalReels] = useState(0);
  const [userAnalytics, setUserAnalytics] = useState(0);
  const [reelLikeAnalytics, setReelLikeUserAnalytics] = useState(0);
  const [couponAnalytics, setCouponAnalytics] = useState(0);
  const [reelsAnalytics, setReelsAnalytics] = useState(0);
  const [userContestLabel, setUserContestLabel] = useState(0);
  const [userContestCount, setUserContestCount] = useState(0);
  console.log("contestArr", contestArr);

  const handleTransactionCount = async () => {
    let { data: response } = await getTransactionCount();
    let { data: response1 } = await getCouponsCount();
    let { data: response2 } = await getUsersAnalytics();
    let { data: response3 } = await getReelsLikeAnalytics();
    let { data: response4 } = await getAllCouponsAnalytics();
    let { data: response5 } = await getReelsAnalytics();
    let { data: response6 } = await getAllJoinedUserContest();
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
      console.log(response6);
      setUserContestLabel(response6.contestNames);
      setUserContestCount(response6.userCounts);
    }
  };

  useEffect(() => {
    console.log(userArr, "userArr");
    if (userArr) {
      setTotalUsers(userArr.length > 0 ? userArr?.length : 0);
    }
    console.log(couponArr, "couponArr");
    if (couponArr) {
      setTotalCoupons(couponArr.length > 0 ? couponArr?.length : 0);
    }
    console.log(contestArr, "contestArr");
    if (contestArr) {
      setTotalContest(contestArr.length > 0 ? contestArr?.length : 0);
    }
    // console.log(transactionArr, "transactionArr");
    // if (transactionArr) {
    //   setTotalTransactions(transactionArr || 0);
    // }
    console.log(reelsArr, "reelsArr");
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

  const [dashboardBoxValue, setdashboardBox] = useState([
    {
      heading: "Total Reels",
      today: totalReels,
      week: "11",
      month: "11",
      year: "11",
    },
    {
      heading: "Total Customer",
      today: totalUsers,
      week: "2",
      month: "2",
      year: "2",
    },
    {
      heading: "Total Coupons",
      today: totalCoupons,
      week: "82",
      month: "239",
      year: "1048",
    },
    {
      heading: "Total Constests",
      today: totalContest,
      week: "82",
      month: "239",
      year: "1048",
    },
    {
      heading: "Transactions",
      today: totalTransactions,
      week: "82",
      month: "239",
      year: "1048",
    },
  ]);

  const [filter, setfilter] = useState([
    {
      name: "Today",
      active: true,
      type: "today",
    },
    {
      name: "This Week",
      active: false,
      type: "week",
    },
    {
      name: "This Month",
      active: false,
      type: "month",
    },
    {
      name: "This Year",
      active: false,
      type: "year",
    },
  ]);

  const product_columns = [
    {
      name: "SL",
      selector: (row) => row.sl,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Brand ",
      selector: (row) => row.brand,
    },
    {
      name: "Total Sale ",
      selector: (row) => row.sale,
    },
  ];

  const product_data = [
    {
      sl: "1",
      name: "EYELINER SUPER BLACK",
      brand: "",
      sale: "0",
    },
    {
      sl: "2",
      name: "EYELINER SUPER BLACK",
      brand: "",
      sale: "0",
    },
    {
      sl: "3",
      name: "EYELINER SUPER BLACK",
      brand: "",
      sale: "0",
    },
    {
      sl: "4",
      name: "EYELINER SUPER BLACK",
      brand: "",
      sale: "0",
    },
    {
      sl: "5",
      name: "EYELINER SUPER BLACK",
      brand: "",
      sale: "0",
    },
    {
      sl: "6",
      name: "EYELINER SUPER BLACK",
      brand: "",
      sale: "0",
    },
    {
      sl: "7",
      name: "EYELINER SUPER BLACK",
      brand: "",
      sale: "0",
    },
    {
      sl: "8",
      name: "EYELINER SUPER BLACK",
      brand: "",
      sale: "0",
    },
    {
      sl: "9",
      name: "EYELINER SUPER BLACK",
      brand: "",
      sale: "0",
    },
  ];
  const quality_columns = [
    {
      name: "SL",
      selector: (row) => row.sl,
      sortable: true,
    },
    {
      name: "Category Name",
      selector: (row) => row.category,
    },
    {
      name: "Product Quantity",
      selector: (row) => row.quantity,
    },
  ];

  const quality_data = [
    {
      sl: "1",
      category: "EYELINER SUPER BLACK",
      quantity: "0",
      sortable: true,
    },
    {
      sl: "2",
      category: "EYELINER SUPER BLACK",
      quantity: "0",
      sortable: true,
    },
    {
      sl: "3",
      category: "EYELINER SUPER BLACK",
      quantity: "0",
      sortable: true,
    },
    {
      sl: "4",
      category: "EYELINER SUPER BLACK",
      quantity: "0",
      sortable: true,
    },
    {
      sl: "5",
      category: "EYELINER SUPER BLACK",
      quantity: "0",
      sortable: true,
    },
  ];
  const product_sale_columns = [
    {
      name: "SL",
      selector: (row) => row.sl,
      sortable: true,
    },
    {
      name: "Category Name",
      selector: (row) => row.category,
    },
    {
      name: "NO. OF SALE",
      selector: (row) => row.quantity,
    },
  ];

  const product_sale_data = [
    {
      sl: "1",
      category: "Nails",
      quantity: "0",
    },
    {
      sl: "2",
      category: "Eyes",
      quantity: "0",
    },
    {
      sl: "3",
      category: "Face",
      quantity: "0",
    },
    {
      sl: "4",
      category: "Lips",
      quantity: "0",
    },
    {
      sl: "5",
      category: "Nail polish",
      quantity: "0",
    },
    {
      sl: "6",
      category: "Perfect Finish box(Nail P...",
      quantity: "0",
    },
    {
      sl: "7",
      category: "Foundation",
      quantity: "0",
    },
    {
      sl: "8",
      category: "LIQUID SINDOOR",
      quantity: "0",
    },
    {
      sl: "9",
      category: "BEAUTY POP BOX LIP COLOR",
      quantity: "0",
    },
    {
      sl: "10",
      category: "LIPSTIC A & B",
      quantity: "0",
    },
  ];

  const coupon_sale_columns = [
    {
      name: "SL",
      selector: (row) => row.sl,
      sortable: true,
    },
    {
      name: "TYPE",
      selector: (row) => row.category,
    },
    {
      name: "COUPON",
      selector: (row) => row.quantity,
    },
    {
      name: "TOTAL DISCOUNT",
      selector: (row) => row.category,
    },
    {
      name: "NUM OF USES",
      selector: (row) => row.quantity,
    },
  ];

  const coupon_sale_data = ["No data available in table"];

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
  const OrderChartData = {
    labels: ["Total", "Complete", "Processing", "pending"],
    datasets: [
      {
        label: "Orders Summary",
        data: [3, 0, 0, 0],
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)", //green
          "rgba(54, 162, 235, 0.2)", //blue
          "rgba(255, 206, 86, 0.2)", //yellow
          "rgba(153, 102, 255, 0.2)", //purple
        ],
        borderColor: [
          "rgba(75, 192, 192)",
          "rgba(54, 162, 235)",
          "rgba(255, 206, 86)",
          "rgba(153, 102, 255)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const GuestRegisterChart = {
    labels: ["In Cart", "Registered", "guest"],
    datasets: [
      {
        label: "Guest/Authorized Order Today",
        data: [10, 5, 8],
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)", //green
          "rgba(54, 162, 235, 0.2)", //blue
          "rgba(255, 206, 86, 0.2)", //yellow
        ],
        borderColor: [
          "rgba(75, 192, 192)",
          "rgba(54, 162, 235)",
          "rgba(255, 206, 86)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const TodayOrderChart = {
    labels: ["Total", "Complete", "Processing", "pending"],
    datasets: [
      {
        label: "Orders Summary",
        data: [20, 7, 10, 3],
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)", //green
          "rgba(54, 162, 235, 0.2)", //blue
          "rgba(255, 206, 86, 0.2)", //yellow
          "rgba(153, 102, 255, 0.2)", //purple
        ],
        borderColor: [
          "rgba(75, 192, 192)",
          "rgba(54, 162, 235)",
          "rgba(255, 206, 86)",
          "rgba(153, 102, 255)",
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
          {/* <ul className="dashboard-filter filters">
            {filter.map((item, i) => {
              return (
                <li key={`${item.type}_${i}`}>
                  <CustomButton
                    navPills
                    btnName={item.name}
                    changeClass="filtering"
                    pillActive={item.active ? true : false}
                    data-type={item.type}
                    ClickEvent={() => tabClick(i, filter, setfilter)}
                  />
                </li>
              );
            })}
          </ul> */}
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
              <Link to="/Coupons">
                <DashboardBox className="dashboard-summary">
                  <h5 className="blue-1">Total Coupons</h5>
                  <h4 className="text-dark mb-0">{totalCoupons}</h4>
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
