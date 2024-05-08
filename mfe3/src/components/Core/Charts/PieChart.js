import React from 'react';
// GUSMEN esta libreria no soporta React 18 import ChartistGraph from "react-chartist";
import { pieChart } from "data/charts.js";

export default function BarChart(props){

  const {data} = props;

  return(
    <>
      <div> Libreria react-chartist no soporta React 18 </div>
      {/* GUSMEN Libreria no soporta React 18
      <ChartistGraph
        data={data}
        type="Pie"
        options={pieChart.options}
        responsiveOptions={pieChart.responsiveOptions}
        listener={pieChart.animation}
  />*/}
    </>
  )
}