import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import data from "./output-3.js";

function main() {
  const ref = useRef(null);
  // append the svg object to the body of the page

  useEffect(() => {
    let margin = { top: 10, right: 30, bottom: 30, left: 60 },
        width = 1000 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    let svg = d3
    .select(ref.current)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // Add X axis --> it is a date format
  let x = d3.scaleLinear().domain([2006, 2021]).range([0, width]);
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

svg
    .append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width * 0.5)
    .attr("y", height)
    .text("Year");
  // Add Y axis
  let y = d3.scaleLinear().domain([0, 100000000]).range([height, 0]);
  svg.append("g").call(d3.axisLeft(y));

  svg
        .append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", 0)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("Number of Passengers");

  // This allows to find the closest X index of the mouse:
  let bisect = d3.bisector(function (d) {
    return d.ReportPeriod;
  }).left;

  // Create the circle that travels along the curve of chart
  let focus = svg
    .append("g")
    .append("circle")
    .style("fill", "none")
    .attr("stroke", "black")
    .attr("r", 8.5)
    .style("opacity", 0);

  // Create the text that travels along the curve of chart
  let focusText = svg
    .append("g")
    .append("text")
    .style("opacity", 0)
    .attr("text-anchor", "left")
    .attr("alignment-baseline", "middle");

  // Add the line
  svg
    .append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr(
      "d",
      d3
        .line()
        .x(function (d) {
          return x(d.ReportPeriod);
        })
        .y(function (d) {
          return y(d.Passenger_Count);
        })
    );       
        // // Create a rect on top of the svg area: this rectangle recovers mouse position
        // svg
        //   .append("rect")
        //   .style("fill", "none")
        //   .style("pointer-events", "all")
        //   .attr("width", width)
        //   .attr("height", height)
        //   .on("mouseover", mouseover)
        //   .on("mousemove", mousemove)
        //   .on("mouseout", mouseout);
          
        //   // What happens when the mouse move -> show the annotations at the right positions.
        //   function mouseover() {
        //     focus.style("opacity", 1);
        //     focusText.style("opacity", 1);
        //   }
        
        //   function mousemove() {
        //     // recover coordinate we need
        //     let x0 = x.invert(d3.pointer(MouseEvent)[0]);
        //     let i = bisect(data, x0, 1);
        //     let selectedData = data[i];
        //     focus
        //       .attr("cx", x((selectedData.ReportPeriod - 2006)))
        //       .attr("cy", y(selectedData.Passenger_Count));
        //     focusText
        //       .html(
        //         "x:" +
        //           selectedData.ReportPeriod +
        //          "  -  " +
        //           "y:" +
        //           selectedData.Passenger_Count
        //       )
        //       .attr("x", x(selectedData.ReportPeriod) + 15)
        //       .attr("y", y(selectedData.Passenger_Count));
        //   }
        //   function mouseout() {
        //     focus.style("opacity", 0);
        //     focusText.style("opacity", 0);
        //   }
}, [])




  return <div ref={ref} style={{width: "100%", height:"100%"}}></div>;
}

export default main;
