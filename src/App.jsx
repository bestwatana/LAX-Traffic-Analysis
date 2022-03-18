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
        <p>Hello, this is an explanation.</p>
        <Pie/>
        <p>Hello, this is an explanation.</p>
        <D3BarGraph/>
        <p>Hello, this is an explanation.</p>
      <h2>COVID-19 Impact</h2>
        <p>Hello, this is an explanation.</p>
        <h3>Number of Passenger at LAX by Year</h3>
        <LineChart2/>
        <p>Hello, this is an explanation.</p>
        <Pie2/>
        <p>Hello, this is an explanation.</p>
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
