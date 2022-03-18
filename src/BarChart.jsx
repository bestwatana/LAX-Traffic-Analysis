import React, { useEffect, useRef, useState } from "react";
import {
    select,
    scaleBand,
    axisBottom,
    axisLeft,
    scaleLinear,
    stack,
    max
  } from "d3";
import data from "./output-2.js";

/**
 * Component that renders a StackedBarChart
 */

const StackedBarGraph = ({ datasets, keys, colors }) => {
    const [data, setData] = useState(datasets);
    const svgRef = useRef();
    const wrapperRef = useRef();
  
    useEffect(() => {
      const svg = select(svgRef.current);
      let { width, height } = wrapperRef.current.getBoundingClientRect();
      const stackGenerator = stack().keys(keys);
      const layers = stackGenerator(data);
      const extent = [
        0,
        max(layers, (layer) => max(layer, (sequence) => sequence[1]))
      ];
      const yScale = scaleLinear().domain(extent).range([height, 0]);
  
      const x0Scale = scaleBand()
        .domain(data.map((d) => d.Terminal))
        .range([0, width * 0.7])
        // .padding(0.46);
    //   const x1Scale = scaleBand()
    //     .domain(data.map((d) => d.type))
    //     .rangeRound([0, x0Scale.bandwidth()])
    //     .padding(0.12);
  
      const xAix = axisBottom(x0Scale);
      const yAix = axisLeft(yScale);
  
      svg
        .select(".x-axis")
        .attr("transform", `translate(70, ${height})`)
        .call(xAix);
    
      svg
        .append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width * 0.4)
        .attr("y", height + 35)
        .text("Terminal");
      svg
        .select(".y-axis")
        .attr("transform", `translate(70, 0 )`)
        .call(yAix);

      svg
        .append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", 0)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("Number of Passengers");
  
      svg
        .selectAll(".layer")
        .data(layers)
        .join("g")
        .attr("class", "layer")
        .attr("fill", (layer) => colors[layer.key])
        .selectAll("rect")
        .data((layer) => layer)
        .join("rect")
        .attr(
          "x",
          (sequence) => x0Scale(sequence.data.Terminal)
        //    + x1Scale(sequence.data.type)
        )
        .attr("width", 50)
        .attr("y", (sequence) => yScale(sequence[1]))
        .attr("height", (sequence) => yScale(sequence[0]) - yScale(sequence[1]))
        .attr("transform", `translate(${width * 0.07}, 0 )`);
      svg
        .select(".x-axis")
        .selectAll(".tick")
        .on("click", (e) => {
          const filteredD = data.map((d) => {
            return {
              Terminal: d.Terminal,
              Avg_Domestic: d.Terminal === e ? 0 : d.Avg_Domestic,
              Avg_International: d.Terminal === e ? 0 : d.Avg_International
            };
          });
          setData(filteredD);
        });
    }, [data, keys, colors]);
    return (
        <>
          <div
            ref={wrapperRef}
            style={{ width: "100%", height: "400px", marginBottom: "5rem" }}
          >
            <svg ref={svgRef} style={{ width: "80%", height: "110%", margin: "3rem" }}>
              <g className="x-axis" />
              <g className="y-axis" />
            </svg>
          </div>
        </>
      );
    };

const allKeys = [
    "Avg_Domestic", 
    "Avg_International"
];

const colors = {
    // Avg_Passenger_Count: "rgba(69, 0, 0, 0.8)",
    Avg_Domestic: "rgba(240, 72, 19, 0.8)",
    Avg_International: "rgba(280, 190, 100, 1.9)"
};
export const D3BarGraph = () => {
    const [keys, setKeys] = useState(allKeys);
  
    return (
      <div style={{marginBottom: "2rem" }}>
        <h3>Average Domestic vs International Passenger at LAX</h3>
        <StackedBarGraph datasets={data} colors={colors} keys={keys} />
        <div style={{marginLeft: "10rem" }}>
        <div className="fields" style={{ display: "flex" }}>
          {allKeys.map((key) => (
            <div key={key} className="field" style={{ display: "flex" }}>
              <input
                id={key}
                type="checkbox"
                checked={keys.includes(key)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setKeys(Array.from(new Set([...keys, key])));
                  } else {
                    setKeys(keys.filter((_key) => _key !== key));
                  }
                }}
              />
              <label htmlFor={key} style={{ color: colors[key] }}>
                {key}
              </label>
            </div>
          ))}
        </div>
        </div>
      </div>
    );
  };