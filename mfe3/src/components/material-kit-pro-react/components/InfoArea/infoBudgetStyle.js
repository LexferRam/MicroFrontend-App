import {
  primaryColor,
  warningColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor,
  grayColor,
  title
} from "../../material-kit-pro-react";

const infoStyle = {
  infoArea: {
    maxWidth: "360px",
    //margin: "0 auto",
    padding: "10px 0 10px",
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  iconWrapper: {
    float: "left",
    marginTop: "24px",
    marginRight: "10px"
  },
  primary: {
    color: primaryColor[0]
  },
  warning: {
    color: warningColor[0]
  },
  danger: {
    color: dangerColor[0]
  },
  success: {
    color: successColor[0]
  },
  info: {
    color: infoColor[0]
  },
  rose: {
    color: roseColor[0]
  },
  gray: {
    color: grayColor[0]
  },
  icon: {
    width: "2.25rem",
    height: "2.25rem",
    fontSize: "2.25rem"
  },
  descriptionWrapper: {
    color: grayColor[0],
    overflow: "hidden"
  },
  title: {
    ...title,
    textAlign: "left",
    margin: "1.75rem 0 0.875rem !important",
    minHeight: "unset"
  },
  description: {
    color: grayColor[0],
    overflow: "hidden",
    marginTop: "0px",
    textAlign: "left",
    "& p": {
      color: grayColor[0],
      fontSize: "14px"
    }
  },
  iconWrapperVertical: {
    float: "none"
  },
  iconVertical: {
    width: "61px",
    height: "61px"
  },
  p: {
    textAlign: 'justify',
  },
  titlecenter:{
    textAlign: 'center'
  },
  imgContainer: {
    "@media (max-width: 600px)": {
      textAlign: "center",
    },
  }
};

export default infoStyle;
