import React from "react";
import ReactDOM from "react-dom";
import BasicTable from 'MFE1/BasicTable'
import MFE1_Button from 'MFE1/Button'
import MFE2_BasicTabs from 'MFE2/BasicTabs'

import SomeComponent from 'remote/SomeComponent'
import Home from 'remote/Home'
// import HomeGatsby from 'myGatsbyRemote/HomeGatsby'


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

      <MFE1_Button />
      <BasicTable />
      <MFE2_BasicTabs />

      <SomeComponent />
    <>
      <Home />
    </>

    {/* <HomeGatsby /> */}

    <div>Name: host</div>
    <div>Framework: react</div>
    <div>Language: JavaScript</div>
    <div>CSS: Empty CSS</div>
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
