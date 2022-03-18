import React, { useState } from "react";
import { scaleOrdinal, arc, pie, schemeTableau10 } from "d3"
import LAXData from "./output-2.js";

const Pie = ({ width = 600, height = 600 }) => {
  const radius = Math.min(width, height) / 2;
  const color = scaleOrdinal(schemeTableau10); //[LAXData.length]
  const [terminal, setTerminal] = useState("T1");
  const chosenTerminal = LAXData.filter(dat => dat.Terminal == terminal)[0];
  const avgPassenger = chosenTerminal.Avg_Passenger_Count;
  const numPassenger = chosenTerminal.Passenger_Count;
  const pieGenerator = pie()
    .sort(null)
    .value((d) => {
      return d.Avg_Passenger_Count;
    });
  const path = arc()
    .outerRadius(radius - 50)
    .innerRadius(0);
  const arcLabel = arc()
    .outerRadius(radius - 100)
    .innerRadius(radius - 100);
  const _pieShapeData = pieGenerator(LAXData)
  return (
    <div>
      <h3>Average Share of Passenger at Los Angeles Intl. Airport</h3>
      <p>Click on a slice to show information.</p>
      <div className="fields" style={{ display: "flex", justifyContent: "center" }}>
      <svg width={width} height={height}>
        <g transform={`translate(${width / 2},${height / 2})`}>
          {_pieShapeData.map((pieSlice, i) => {
            return (
              <g key={i} fontSize={10} onClick={() => setTerminal(pieSlice.data.Terminal)}>
                <path d={path(pieSlice)} fill={color(i)} />
                <text
                  transform={`translate(${arcLabel.centroid(pieSlice)})`}
                  fill={pieSlice.data.Terminal == terminal ? "white": "#000"}
                >
                  <tspan fontWeight={700} x={0}>
                    {pieSlice.data.Terminal}
                  </tspan>
                  <tspan x={0} y={`${1.1}em`}>
                    {pieSlice.data.Avg_Passenger_Count}
                  </tspan>
                </text>
              </g>
            );
          })}

        </g>
      </svg>
      <div style={{marginTop: "3rem", textAlign: "left" }}>

          <h3>{terminal} Terminal Information</h3>
          <p>
              <tspan>
                Average Number of Passengers: {avgPassenger} passengers
              </tspan><br></br>
              <tspan>
                Total Number of Passengers (2006-2021): {numPassenger} passengers
              </tspan><br></br>
          </p>
      </div>
      </div>
    </div>
  );
};
export default Pie;