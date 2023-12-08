import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import CustomButton from "../Utility/Button";
import tabClick from "../Utility/TabClick";
import { useDispatch, useSelector } from "react-redux";

import { DashboardBox, DashboardChart, DashboardTable } from "../Utility/DashboardBox";
import { ReelsGet } from "../../redux/actions/Reels/reels.actions";
import { usersGet } from "../../redux/actions/Users/users.actions";
import { COUPONGet } from "../../redux/actions/Coupon/Coupon.actions";
import { TRANSACTIONGet } from "../../redux/actions/Transcaction/Transaction.actions";
import { CONTESTGet } from "../../redux/actions/Contest/Contest.actions";
import { Link } from "react-router-dom";

function Dashboard() {

  const dispatch = useDispatch();

  const userArr = useSelector((state) => state.users.users);
  const couponArr = useSelector((state) => state.coupon.coupons);
  const contestArr = useSelector((state) => state.contest.Contests);
  const transactionArr = useSelector((state) => state.transaction.transaction);
  const reelsArr = useSelector((state) => state.reels.reels);

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalCoupons, setTotalCoupons] = useState(0);
  const [totalContest, setTotalContest] = useState(0);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [totalReels, setTotalReels] = useState(0);




  useEffect(() => {
    console.log(userArr, "userArr")
    if (userArr) {
      setTotalUsers(userArr.length > 0 ? userArr?.length : 0)
    }
    console.log(couponArr, "couponArr")
    if (couponArr) {
      setTotalCoupons(couponArr.length > 0 ? couponArr?.length : 0)
    }
    console.log(contestArr, "contestArr")
    if (contestArr) {
      setTotalContest(contestArr.length > 0 ? contestArr?.length : 0)
    }
    console.log(transactionArr, "transactionArr")
    if (transactionArr) {
      setTotalTransactions(transactionArr.length > 0 ? transactionArr?.length : 0)
    }
    console.log(reelsArr, "reelsArr")
    if (reelsArr) {
      setTotalReels(reelsArr.length > 0 ? reelsArr?.length : 0)
    }
  }, [
    userArr,
    couponArr,
    contestArr,
    transactionArr,
    reelsArr,
  ])



  useEffect(() => {
    dispatch(usersGet());
    dispatch(ReelsGet());
    dispatch(COUPONGet());
    dispatch(TRANSACTIONGet());
    dispatch(CONTESTGet());
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

  ChartJS.register(ArcElement, Tooltip, Legend);
  const productChartData = {
    labels: ["Published", "Total"],
    datasets: [
      {
        label: "Products",
        data: [50, 50],
        backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(75, 192, 192, 0.2)"],
        borderColor: ["rgba(54, 162, 235)", "rgba(75, 192, 192)"],
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
          <h5 className="blue-1 mb-0">Summary</h5>
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
              <Link to="/user-contests">
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

      {/* <section>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-md-4 mb-5">
              <DashboardChart>
                <h5 className="blue-1 mb-4">Products</h5>
                <Doughnut data={productChartData} />
              </DashboardChart>
            </div>
            <div className="col-12 col-md-4 mb-5">
              <DashboardChart>
                <h5 className="blue-1 mb-4">Orders Summary</h5>
                <Doughnut data={OrderChartData} />
              </DashboardChart>
            </div>
            <div className="col-12 col-md-4 mb-5">
              <DashboardChart>
                <h5 className="blue-1 mb-4">Guest/Authorized Order Today</h5>
                <Doughnut data={GuestRegisterChart} />
              </DashboardChart>
            </div>
            <div className="col-12 col-md-4 mb-5">
              <DashboardChart>
                <h5 className="blue-1 mb-4">Today Order summary</h5>
                <Doughnut data={TodayOrderChart} />
              </DashboardChart>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-md-6 mb-5">
              <DashboardTable>
                <h5 className="blue-1 mb-4">Top 10 Product</h5>
                <DataTable columns={product_columns} data={product_data} />
              </DashboardTable>
            </div>
            <div className="col-12 col-md-6 mb-5">
              <DashboardTable>
                <h5 className="blue-1 mb-4">Category Wise Product Qty</h5>
                <DataTable columns={quality_columns} data={quality_data} />
                <div className="text-center mt-4 mb-2">
                  <CustomButton
                    isLink
                    noIcon
                    btnName="SEE ALL"
                    path="/"
                    small
                    roundedPill
                  />
                </div>
              </DashboardTable>
            </div>
            <div className="col-12 col-md-6 mb-5">
              <DashboardTable>
                <h5 className="blue-1 mb-4">Category Wise Product Sale</h5>
                <DataTable
                  columns={product_sale_columns}
                  data={product_sale_data}
                />
                <div className="text-center mt-4 mb-2">
                  <CustomButton
                    isLink
                    noIcon
                    btnName="SEE ALL"
                    path="/"
                    small
                    roundedPill
                  />
                </div>
              </DashboardTable>
            </div>
            <div className="col-12 col-md-6 mb-5">
              <DashboardTable>
                <h5 className="blue-1 mb-4">Coupon Wise Sale</h5>
                <DataTable
                  columns={coupon_sale_columns}
                  data={coupon_sale_data}
                />
              </DashboardTable>
            </div>
          </div>
        </div>
      </section> */}
    </main>
  );
}

export default Dashboard;
