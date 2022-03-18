import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import Pie from './Pie.jsx'
import { D3BarGraph } from './BarChart.jsx'
import { LineChart } from './LineChart.jsx'
import LAXData from "./output-3.js";
import LineChart2 from './LineChart2.jsx'
import Pie2 from './Pie2.jsx'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Los Angeles International Airport Traffic Visualization</h1>
      </header>
      <h2>Overview</h2>
        <p>Los Angeles International Airport (LAX) is the busiest airport in the United States’ west coast. With 9 main passenger terminals, LAX handles nearly 90 million passengers back in 2019. This webpage aims to provide some insights and visualization on how this massive airport handles passenger traffic.</p>
        <Pie/>
        <p>This interactive pie chart showcases the share of passenger traffic at LAX by terminal. Overall, Terminal 1 receives the most passengers traffic by monthly average followed by TBIT (Tom Bradley International Terminal). Once you click into the details, however, you will realize that TBIT actually handles more passengers than T1 in total (172 million vs 139 million respectively). In fact, even Terminal 4 beats out Terminal 1 at 151 million passengers.</p>
        <D3BarGraph/>
        <p>Here is an interactive stacked bar chart that aims to visualize how each terminal at LAX handles domestic and international traffic. When it comes to domestic traffic, Terminal 1 and 4 lead the pack handling the most domestic traffic out of all the terminals. International traffic, however, is handled mostly by TBIT terminal as expected. It is important to note that Terminal 2 handles a fair share of both international and domestic traffic likely because it is used as Delta Airlines’ main terminal at LAX and the airline served both international and domestic flights. </p>
      <h2>COVID-19 Impact</h2>
        <p>COVID-19 pandemic has majorly impacted air travel. Closed borders, quarantine mandates, and travel restrictions have all contributed to a major decline in air traffic across the globe, including here at LAX. How much exactly does COVID-19 impacted LAX passenger traffic? These visualizations showcase a glimpse of the drastic change of the airport’s passenger numbers. </p>
        <h3>Number of Passenger at LAX by Year</h3>
        <LineChart2/>
        <p>In 2019, LAX handled nearly 90 million passengers. In 2020, the number dropped down all the way to around 30 million passengers. That’s only 33% of the typical passenger number. The number has yet to fully increase back as of 2021 data.</p>
        <Pie2/>
        <p>This pie chart comparison may let us understand the impact of COVID-19 pandemic on air travel a little better. The size of the pie represents the total amount of passenger. It is also clear that the ratio of international to domestic passenger has shifted due to border closures in countries outside of the US. Less than a quarter of the passengers at LAX in 2020 were international passengers.</p>
      <h3>End of Analysis</h3>
      <a href="https://github.com/bestwatana/LAX-Traffic-Analysis.git">
        Link to GitHub Repo
      </a>

        {/* <LineChart/> */}

        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.jsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p> */}
    </div>
  )
}

export default App
