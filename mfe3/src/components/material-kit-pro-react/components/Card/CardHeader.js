import React from "react";


// nodejs library to set properties for components
import PropTypes from "prop-types";
// @mui components
import { styled } from "@mui/material/styles"
import CoreCardHeader from "@mui/material/CardHeader";

// core components
import styles from "./cardHeaderStyle.js";


const NewCardHeader = styled("div")  (({ theme, ownerState }) => {
  const { color, plain, image, contact, signup, noShadow, className} = ownerState
  return { 
    ...styles.cardHeader,
    ...(color && styles[color + "CardHeader"]),
    ...(plain && !image && styles.cardHeaderPlain),
    ...(image && styles.cardHeaderImage),
    ...(plain && image && styles.cardHeaderPlainImage),
    ...(contact && styles.cardHeaderContact),
    ...(signup && styles.cardHeaderSignup),
    ...(noShadow && styles.noShadow),
    ...(className !== undefined && className)
   }
})
export default function CardHeader(props) {
  const {
    className,
    children,
    color,
    plain,
    image,
    contact,
    signup,
    noShadow,
    ...rest
  } = props;
  
  return (
    <NewCardHeader ownerState={{
      color:color,
      plain: plain, 
      image: image, 
      contact: contact, 
      signup: signup, 
      noShadow: noShadow, 
      className: className
    }}  {...rest}>{children}</NewCardHeader>
  );
}

CardHeader.propTypes = {
  className: PropTypes.object,
  color: PropTypes.oneOf([
    "warning",
    "success",
    "danger",
    "info",
    "primary",
    "rose"
  ]),
  plain: PropTypes.bool,
  image: PropTypes.bool,
  contact: PropTypes.bool,
  signup: PropTypes.bool,
  noShadow: PropTypes.bool,
  children: PropTypes.node
};
