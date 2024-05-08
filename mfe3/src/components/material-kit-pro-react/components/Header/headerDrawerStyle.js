import {
    transition,
    boxShadow,
    drawerWidth
  } from "../../material-kit-pro-react"
  
  const headerDrawerStyle = {
    drawerPaper: {
        border: "none",
        bottom: "0",
        transitionProperty: "top, bottom, width",
        transitionDuration: ".2s, .2s, .35s",
        transitionTimingFunction: "linear, linear, ease",
        width: drawerWidth,
        ...boxShadow,
        position: "fixed",
        display: "block",
        top: "0",
        height: "100vh",
        right: "0",
        left: "auto",
        visibility: "visible",
        overflowY: "visible",
        borderTop: "none",
        textAlign: "left",
        paddingRight: "0px",
        paddingLeft: "0",
        ...transition
      }
  }

  export default headerDrawerStyle;