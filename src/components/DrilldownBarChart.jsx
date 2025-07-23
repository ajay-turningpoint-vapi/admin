// components/DrilldownBarChart.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import toast from "react-hot-toast";
import { url } from "../services/url.service";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const DrilldownBarChart = ({
  apiBaseUrl = `${url}/users/getUsersAnalytics`,
  titlePrefix = "User Signups",
  additionalParams = {},
  color = "rgba(53, 162, 235, 0.5)",
}) => {
  const [level, setLevel] = useState("month");
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);

      const params = {
        level,
        ...additionalParams,
      };

      if (level === "week" && selectedMonth) {
        params.month = selectedMonth;
      }
      if (level === "day" && selectedMonth && selectedWeek) {
        params.month = selectedMonth;
        params.week = selectedWeek;
      }

      const query = new URLSearchParams(params).toString();
      const res = await axios.get(`${apiBaseUrl}?${query}`);
      setChartData(res.data.data || []);
    } catch (err) {
      toast.error("Error fetching chart data:", err);
      console.error("Error fetching chart data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [level, selectedMonth, selectedWeek]);

  const handleBarClick = (elems) => {
    if (!elems.length) return;
    const clickedIndex = elems[0].index;
    const clickedItem = chartData[clickedIndex];

    if (level === "month") {
      setSelectedMonth(clickedItem.label);
      setLevel("week");
    } else if (level === "week") {
      setSelectedWeek(clickedItem.isoWeek); // Use isoWeek to drill into days
      setLevel("day");
    }
  };

  const getTitle = () => {
    if (level === "month") return `Monthly ${titlePrefix}`;
    if (level === "week") return `Weekly ${titlePrefix} - ${selectedMonth}`;
    if (level === "day")
      return `Daily ${titlePrefix} - Week ${selectedWeek} of ${selectedMonth}`;
    return titlePrefix;
  };

  const handleBack = () => {
    if (level === "day") {
      setLevel("week");
      setSelectedWeek(null);
    } else if (level === "week") {
      setLevel("month");
      setSelectedMonth(null);
    }
  };

  return (
    <div style={{ width: "100%", maxWidth: "700px", margin: "40px auto" }}>
      <h6 style={{ color: "#303641" }}>{getTitle()}</h6>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <Bar
          data={{
            labels: chartData.map((item) => item.label),
            datasets: [
              {
                label: titlePrefix,
                data: chartData.map((item) => item.value),
                backgroundColor: color,
              },
            ],
          }}
          options={{
            onClick: (_, elems) => handleBarClick(elems),
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                callbacks: {
                  label: (context) => `${titlePrefix}: ${context.parsed.y}`,
                },
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Count",
                },
              },
              x: {
                title: {
                  display: true,
                  text:
                    level === "month"
                      ? "Months"
                      : level === "week"
                      ? "Weeks"
                      : "Days",
                },
              },
            },
          }}
        />
      )}

      {level !== "month" && (
       <button
  onClick={handleBack}
  style={{
    marginTop: "10px",
    padding: "4px 10px",
    fontSize: "12px",
    border: "none",
    backgroundColor: "#303641",
    color: "white",
    cursor: "pointer",
    borderRadius: "3px",
  }}
>
  ⬅️ Back
</button>

      )}
    </div>
  );
};

export default DrilldownBarChart;
