import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Import chartjs-plugin-zoom for zoom and pan functionality
import zoomPlugin from 'chartjs-plugin-zoom';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin // Register the zoom plugin
);

const Dashboard = () => {
  const dispatch = useDispatch();
  const [userAnalytics, setUserAnalytics] = useState([
    150, 120, 170, 200, 250, 180, 220, 260, 230, 210, 240, 280, // Dummy data for each month (Jan to Dec)
  ]);
  const [detailedData, setDetailedData] = useState([]);

  // Dummy data for demonstration
  const fetchDetailedDataForMonth = (monthIndex) => {
    const dummyData = {
      0: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125, 130, 135, 140, 145, 150, 155],
      1: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57, 60, 63, 66, 69, 72, 75, 78, 81, 84, 87, 90, 93],
      2: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250, 260, 270, 280, 290, 300, 310],
      3: [7, 14, 21, 28, 35, 42, 49, 56, 63, 70, 77, 84, 91, 98, 105, 112, 119, 126, 133, 140, 147, 154, 161, 168, 175, 182, 189, 196, 203, 210, 217],
      4: [4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80, 84, 88, 92, 96, 100, 104, 108, 112, 116, 120, 124],
      5: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62],
      6: [8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96, 104, 112, 120, 128, 136, 144, 152, 160, 168, 176, 184, 192, 200, 208, 216, 224, 232, 240, 248],
      7: [6, 12, 18, 24, 30, 36, 42, 48, 54, 60, 66, 72, 78, 84, 90, 96, 102, 108, 114, 120, 126, 132, 138, 144, 150, 156, 162, 168, 174, 180, 186],
      8: [9, 18, 27, 36, 45, 54, 63, 72, 81, 90, 99, 108, 117, 126, 135, 144, 153, 162, 171, 180, 189, 198, 207, 216, 225, 234, 243, 252, 261, 270, 279],
      9: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47, 49, 51, 53, 55, 57, 59, 61],
      10: [0, 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125, 130, 135, 140, 145],
      11: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57, 60, 63, 66, 69, 72, 75, 78, 81, 84, 87, 90, 93],
    };

    return dummyData[monthIndex] || [];
  };

  const handleZoom = (chart) => {
    const xAxis = chart.scales.x;
    const minIndex = Math.ceil(xAxis.min);
    const maxIndex = Math.floor(xAxis.max);

    if (minIndex === maxIndex && userAnalytics[minIndex]) {
      const monthData = fetchDetailedDataForMonth(minIndex); // Fetch detailed data for the month
      setDetailedData(monthData);
    } else {
      setDetailedData([]); // Reset to default
    }
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      zoom: {
        pan: {
          enabled: true,
          mode: 'x',
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'x',
          onZoom: (chart) => handleZoom(chart), // Handle zoom events
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Months',
        },
      },
      y: {
        title: {
          display: true,
          text: 'User Count',
        },
        beginAtZero: true,
      },
    },
  };

  const labels = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];

  const data = {
    labels,
    datasets: [
      {
        label: 'User Registered',
        data: detailedData.length > 0 ? detailedData : userAnalytics,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <section>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-4 mb-5" style={{ width: '100%', height: '400px' }}>
            <div>
              <h5 className="blue-1 mb-4">All Users</h5>
              <Bar options={options} data={data} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
