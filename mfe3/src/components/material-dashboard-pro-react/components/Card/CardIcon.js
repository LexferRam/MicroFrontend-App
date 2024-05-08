import React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles"

import styles from "./cardIconStyle.js";

const NewDiv = styled("div")(({ theme, ownerState }) => {
  const { color, className } = ownerState
  return { ...styles.cardIcon,
    ...(color && styles[color + "CardHeader"]),
    ...(className !== undefined && className)
  }
})

export default function CardIcon(props) {
  
  const { className, children, color, ...rest } = props;
  
  return (
    <NewDiv 
    ownerState={{
      color: color,
      className: className,
    }}
     {...rest}>
      {children}
    </NewDiv>
  );
}

CardIcon.propTypes = {
  className: PropTypes.object,
  color: PropTypes.oneOf([
    "warning",
    "success",
    "danger",
    "info",
    "primary",
    "rose"
  ]),
  children: PropTypes.node
};
