import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import BasicTabs from "./BasicTabs";

const App = () => (
  <div className="container">
    <div>Name: MFE2</div>
    <div>Framework: react</div>
    <div>Language: JavaScript</div>
    <div>CSS: Empty CSS</div>
    <BasicTabs />
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
