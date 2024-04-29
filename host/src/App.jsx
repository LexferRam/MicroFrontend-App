import React from "react";
import ReactDOM from "react-dom";
import BasicTable from 'MFE1/BasicTable'
import MFE1_Button from 'MFE1/Button'
import MFE2_BasicTabs from 'MFE2/BasicTabs'

import "./index.css";

// const MFE1_Button =
//   React.lazy(() =>
//     import('MFE1/Button')
//   );

  // const MFE2_BasicTabs =
  // React.lazy(() =>
  //   import('MFE2/BasicTabs')
  // );

const App = () => (
  <div className="container">
    {/* <React.Suspense fallback='Loading Button'>
      <MFE2_BasicTabs />
    </React.Suspense> */}
      <MFE1_Button />
      <BasicTable />
      <MFE2_BasicTabs />

    <div>Name: host</div>
    <div>Framework: react</div>
    <div>Language: JavaScript</div>
    <div>CSS: Empty CSS</div>
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
