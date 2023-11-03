// import React from "react";
// import { ScatterPlot } from "react-chartjs-2";
// import {Chart as ChartJS} from "chart.js/auto"
import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';

function ScatterPlot({ chartData }) {
    const option = {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };
  function CleanData() {
    const critic = chartData.map((movie) =>  ({x : movie.criticScore, y : movie.domestic})) 
    console.log(critic)
    const audience = chartData.map((movie) =>  ({x : movie.audienceScore, y : movie.domestic}))


    return {
      datasets: [
        {
          label: "Audience Score",
          data: audience,
          backgroundColor: 'rgba(255, 99, 132, 1)',
        },
        {
          label: "Critic Score",
          data: critic,
          backgroundColor: 'rgba(75, 192, 192, 1)',
        }
      ],
    };
  }

  return (
    <Scatter data={CleanData()} options={option} />
  );
}

export default ScatterPlot;