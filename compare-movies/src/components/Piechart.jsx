import React from "react";
import { Pie } from "react-chartjs-2";
import {Chart as ChartJS} from "chart.js/auto"


function PieChart({ chartData }) {
  function CleanData() {
    const labels = chartData.map((movie) => movie.title);
    let joined = {}
    chartData.forEach(movie => {
        if(movie.genre in joined){
            joined[movie.genre] += movie.domestic
        }else {
            joined[movie.genre] = movie.domestic
        }
    });
    console.log(joined)
    const data = chartData.map((movie) => movie.domestic);

    return {
      labels: Object.keys(joined),
      datasets: [
        {
          label: "Domestic Gains",
          data: Object.keys(joined).map((key) => joined[key]),
        },
      ],
    };
  }

  return (
    <Pie data={CleanData()} />
  );
}

export default PieChart;