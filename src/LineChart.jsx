import React, { useState } from "react";
import { scaleLinear, scaleBand, extent, line } from "d3";
import { AxisLeft, AxisBottom,  } from "@visx/axis";
import {Text} from '@visx/text';
import LAXData from "./output-3.js";

export const LineChart = () => {
  const w = 500,
    h = 480;

  const margin = {
    top: 40,
    left: 80,
    right: 40,
    bottom: 40
  };

  const width = w - margin.right - margin.left,
    height = h - margin.top - margin.bottom;

  const data = LAXData;
//   const data = [
//     { x: 0, y: 20 },
//     { x: 150, y: 150 },
//     { x: 300, y: 100 },
//     { x: 450, y: 20 },
//     { x: 600, y: 130 }
//   ];

  const xScale = scaleLinear()
    .domain(extent(data, d => d.ReportPeriod))
    .range([0, width]);

  const yScale = scaleLinear()
    .domain(extent(data, d => d.Passenger_Count))
    .range([height, 0]);

  const lineFun = line()
    .x(d => xScale(d.ReportPeriod))
    .y(d => yScale(d.Passenger_Count));
  const white = 'rgba(0,0,0,1)';
  return (
    <div>
    <svg width={w} height={h}>
      <AxisLeft 
        strokeWidth={0} 
        left={80}
        scale={yScale}
        stroke={white}
        tickStroke={white}
        tickLabelProps={({ tick, index }) => ({
            dx:"-8em",
            fill: "white",
            fontSize: 8
            })}
        />
      <AxisBottom
        strokeWidth={0}
        top={480 - 40}
        left={80}
        scale={xScale}
        stroke={white}
        tickStroke={white}
        tickLabelProps={({ tick, index }) => ({
            dx:"-1em",
            fill: "white",
            fontSize: 8
            })}
        />
        <g transform={`translate(${margin.left},${margin.top})`}>
          <path
            d={lineFun(data)}
            style={{
              fill: "none",
              stroke: `white`,
              strokeWidth: 3
            }}
          />
        </g>
      </svg>
    </div>
  );
}


// export const LineChart = () => {
//     const [reportPeriod, setReportPeriod] = useState(2010);
//     const chosenPeriod = LAXData.filter(dat => dat.ReportPeriod == reportPeriod)[0];
//     const twentyTen = chosenPeriod.Passenger_Count;
//     console.log(twentyTen);
//     // const _extent = extent(LAXData.data.ReportPeriod);
//     const year = [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021];
//     console.log(year);
//     const _scaleY = scaleLinear()
//         .domain(year)
//         .range([470, 30]);

//     const _scaleDate = scaleBand()
//         .domain(year)
//         .range([0, 440]);
//     // const _scaleLine = scaleLinear()
//     //     .domain([0, 11])
//     //     .range([30, 470]);
//     // const cities = [];
//     // const _lineMaker = line()
//     //     .x((d, i) => {
//     //         return _scaleLine(i);
//     //     })
//     //     .y((d) => {
//     //         return _scaleY(d);
//     //     });
//     return (
//         <svg
//         width={500 + 200}
//         height={500}
//         key={"a"}
//         >
//         <AxisLeft 
//         strokeWidth={0} 
//         left={30} 
//         scale={_scaleY}
//         tickStroke={"#EEEEEE"}
//         />
//         <AxisBottom
//         strokeWidth={0}
//         top={500 - 30}
//         left={30}
//         scale={_scaleDate}
//         tickStroke={"#EEEEEE"}
//         tickValues={year}
//         />
//         {/* <text x="-170" y="45" transform="rotate(-90)" fontSize={10}>
//         Hours of sunshine per month
//         </text>
//         <text x="-170" y="60" transform="rotate(-90)" fontSize={10}>
//         avg. from 1981-2010
//         </text> */}
//         {/* <path
//             stroke={
//                 "rgba(0,0,0,1)"
//             }
//             strokeWidth={1}
//             // fill={"rgba(255,0,0,.3)"}
//             fill={"none"}
//             d={_lineMaker(LAXData.data.Passenger_Count)}
//         /> */}
//         </svg>
//   );
// };