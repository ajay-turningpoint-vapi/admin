import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { url } from "../../services/url.service"; // Make sure this is your base URL

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const DailyKycBarChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get(`${url}/users/getUsersAnalytics`);
        const data = response.data.data;

        // Format dates like "Jul 5"
        const labels = data.map(entry => {
          const date = new Date(entry._id);
          return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });
        });

        const counts = data.map(entry => entry.count);

        setChartData({
          labels,
          datasets: [
            {
              label: "Daily KYC Approved Users",
              data: counts,
              backgroundColor: "rgba(54, 162, 235, 0.6)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
          ],
        });
      } catch (err) {
        console.error("Error fetching KYC analytics", err);
      }
    };

    fetchAnalytics();
  }, []);

  if (!chartData) return <p>Loading chart...</p>;

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "1rem" }}>
      <h2>📊 Daily KYC Approved Users</h2>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { position: "top" },
            tooltip: { enabled: true },
          },
          scales: {
            x: {
              title: { display: true, text: "Date" },
              ticks: {
                autoSkip: true,
                maxTicksLimit: 10,
                maxRotation: 45,
                minRotation: 45,
              },
            },
            y: {
              beginAtZero: true,
              title: { display: true, text: "Number of Users" },
              ticks: {
                stepSize: 1,
              },
            },
          },
        }}
      />
    </div>
  );
};

export default DailyKycBarChart;
