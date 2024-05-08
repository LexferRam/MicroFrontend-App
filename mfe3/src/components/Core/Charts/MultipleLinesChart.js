import React from 'react';
//GUSMEN Libreria no soporta React 18 import ChartistGraph from "react-chartist";
import { colouredLinesChart } from "data/charts.js";

export default function MultipleLinesChart(props){

  const {data} = props;

  return(
    <>
    <div> Libreria react-chartist no soporta React 18 </div>
     { 
     /*GUSMEN Libreria no soporta React 18
     <ChartistGraph
        data={data}
        type="Line"
        options={colouredLinesChart.options}
        listener={colouredLinesChart.animation}
     />*/}
    </>
  )
}