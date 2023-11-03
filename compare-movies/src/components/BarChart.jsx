import React from "react";
import { Bar } from "react-chartjs-2";
import {Chart as ChartJS} from "chart.js/auto"


function BarChart({ chartData }) {
  function CleanData() {
    const labels = chartData.map((movie) => movie.title);
    const data = chartData.map((movie) => movie.domestic);

    return {
      labels: labels,
      datasets: [
        {
          label: "Domestic Gains",
          data: data,
        },
      ],
    };
  }

  return (
    <Bar data={CleanData()} />
  );
}

export default BarChart;