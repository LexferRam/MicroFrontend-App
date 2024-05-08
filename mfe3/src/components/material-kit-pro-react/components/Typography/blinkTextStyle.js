import { keyframes } from "@emotion/react";
import {
  blackColor,
  whiteColor,
  roseColor,
  primaryColor,
  successColor,
  dangerColor,
  warningColor,
  infoColor,
  hexToRgb
} from "../../material-kit-pro-react";

const blinkKeyFrame = keyframes`
    0% { opacity: 1.0; }
    50% { opacity: 0.0; }
    100% { opacity: 1.0; }`;


const blinkStyle = {
  basic: {
    animation: ` ${blinkKeyFrame} 3s linear infinite `,
    background: whiteColor,
    width: "100%",
    textAlign: "center",
    padding: "0.4em",
    fontWeight: "bold",
    fontSize: ".875rem",
    // some jss/css to make the cards look a bit better on Internet Explorer
    "@media all and (-ms-high-contrast: none), (-ms-high-contrast: active)": {
      display: "inline-block !important"
    }
  },

  borderDef: {
    borderWidth: 1,
    borderStyle: "solid",
  },

  shadow:{
    boxShadow: "5px 5px 5px 5px rgba(" + hexToRgb(blackColor) + ", 0.18)",
  },
  
  primary: {
    color: primaryColor[1],
    borderColor: `${primaryColor[2]}`
  },
  info: {
    color: infoColor[1],
    borderColor: `${infoColor[2]}`
  },
  success: {
    color: successColor[1],
    borderColor: `${successColor[2]}`
  },
  warning: {
    color: warningColor[1],
    borderColor: `${warningColor[2]}`
  },
  danger: {
    color: dangerColor[1],
    borderColor: `${dangerColor[2]}`
  },
  rose: {
    color: roseColor[1],
    borderColor: `${roseColor[2]}`
  }
};

export default blinkStyle;
