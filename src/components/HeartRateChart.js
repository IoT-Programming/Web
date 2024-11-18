import React from 'react';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Chart.js 컴포넌트 등록
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const HeartRateChart = ({ data }) => {
  const chartData = {
    labels: data.map((point) => point.time),
    datasets: [
      {
        label: '심박수',
        data: data.map((point) => point.heartRate),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div style={{ height: '300px', width: '100%' }}>
      <Line data={chartData} />
    </div>
  );
};

export default HeartRateChart;
