import React, { useState } from "react";
import { scaleOrdinal, arc, pie, schemeTableau10 } from "d3"

const nineteenData = [
    {
      Type: "Domestic",
      Passenger_Count: 62371691,
    },
    {
      Type: "International",
      Passenger_Count: 25696322,
    }
]
const twentyData = [
    {
      Type: "Domestic",
      Passenger_Count: 22357785,
    },
    {
      Type: "International",
      Passenger_Count: 6421742,
    }
]

// total passenger count of 2019 and 2020 respectively
const totalPax = [88068013, 28779527]
const difference = totalPax[1] / totalPax[0]

const Pie2 = ({ width = 600, height = 600, width2 = width * difference, height2 = height * difference }) => {
  const radius = Math.min(width, height) / 2;
  const radius2 = Math.min(width2, height2) / 2;
  const color = scaleOrdinal(schemeTableau10);
  const pieGenerator = pie()
    .sort(null)
    .value((d) => {
      return d.Passenger_Count;
    });
  const path = arc()
    .outerRadius(radius - 30)
    .innerRadius(0);
  const path2 = arc()
    .outerRadius(radius2 - 30)
    .innerRadius(0);
  const arcLabel = arc()
    .outerRadius(radius - 180)
    .innerRadius(radius - 180);
  const _pieShapeData = pieGenerator(nineteenData)
  const _pieShapeData2 = pieGenerator(twentyData)
  console.log(difference)
  return (
<div>
    <h3>Domestic vs International Passenger (2019 and 2020)</h3>
<div className="fields" style={{ display: "flex", justifyContent: "center" }}>
    <div>
      <h3>2019</h3>
      <svg width={width} height={height}>
        <g transform={`translate(${width / 2},${height / 2})`}>
          {_pieShapeData.map((pieSlice, i) => {
            return (
              <g key={i} fontSize={10}>
                <path d={path(pieSlice)} fill={color(i)} />
                <text
                  transform={`translate(${arcLabel.centroid(pieSlice)})`}
                  fill={"#000"}
                >
                  <tspan fontWeight={700} x={0}>
                    {pieSlice.data.Type}
                  </tspan>
                  <tspan x={0} y={`${1.1}em`}>
                    {pieSlice.data.Passenger_Count}
                  </tspan>
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
    <div>
    <h3>2020</h3>
    <svg width={width} height={height}>
      <g transform={`translate(${width / 2},${height / 2})`}>
        {_pieShapeData2.map((pieSlice, i) => {
          return (
            <g key={i} fontSize={10}>
              <path d={path2(pieSlice)} fill={color(i)} />
              <text
                transform={`translate(${arcLabel.centroid(pieSlice)})`}
                fill={"#000"}
              >
                <tspan fontWeight={700} x={0}>
                  {pieSlice.data.Type}
                </tspan>
                <tspan x={0} y={`${1.1}em`}>
                  {pieSlice.data.Passenger_Count}
                </tspan>
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  </div>
</div>
</div>
  );
};
export default Pie2;