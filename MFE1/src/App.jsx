import React from "react";
import ReactDOM from "react-dom";
import Button from './Button'; 
import BasicTable from './BasicTable';

import "./index.css";

const App = () => (
  <div className="container">
    <div>Name: MFE1</div>
    <div>Framework: react</div>
    <div>Language: JavaScript</div>
    <div>CSS: Empty CSS</div>
    <Button />
    <BasicTable />
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
