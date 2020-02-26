import React from "react";
import "./App.css";
import PathfindingVisualizer from "./components/PathfindingVisualizer/PathfindingVisualizer";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-5xl m-4 text-center">
          <span className="text-5xl m-4 text-center">Algorithm Visualizer</span>
          <span className="text-lg text-center">By Arpan Gupta</span>
        </h1>
        <PathfindingVisualizer />
      </header>
    </div>
  );
}

export default App;
