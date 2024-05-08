import React from "react";
import { styled } from "@mui/material/styles"

import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import styles from "./buttonStyle.js";


const NewButton = styled(Button)(({ theme, ownerState }) => {
  const { color, round, fullWidth, disabled, simple, size, block, link, justIcon, fileButton, className } = ownerState

  return {
    ...styles.button,
    ...(size && styles[size]),
    ...(color && styles[color]),
    ...(round && styles.round),
    ...(fullWidth && styles.fullWidth),
    ...(disabled && styles.disabled),
    ...(simple && styles.simple),
    ...(simple && color && styles.simpleTextColor[color]),
    ...(block && styles.block),
    ...(link && styles.link),
    ...(justIcon && styles.justIcon),
    ...(fileButton && styles.fileButton),
    ...(className !== undefined && className)
  }

})


  export default function RegularButton(props) {
  const {
    color, round, children, fullWidth, disabled, simple, size, block, link,  justIcon, fileButton, className,
    ...rest
  } = props;
  
  return (
    <NewButton ownerState={{
      color: color,
      round: round,
      fullWidth: fullWidth,
      disabled: disabled,
      simple: simple,
      size: size,
      block: block,
      link: link,
      justIcon: justIcon,
      fileButton:fileButton,
      className: className
    }}  {...rest}  >
      {children}
    </NewButton>
  );
};

RegularButton.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "danger",
    "rose",
    "white",
    "twitter",
    "facebook",
    "google",
    "linkedin",
    "pinterest",
    "youtube",
    "tumblr",
    "github",
    "behance",
    "dribbble",
    "reddit",
    "instagram",
    "transparent"
  ]),
  size: PropTypes.oneOf(["sm", "lg"]),
  simple: PropTypes.bool,
  round: PropTypes.bool,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  block: PropTypes.bool,
  link: PropTypes.bool,
  justIcon: PropTypes.bool,
  fileButton: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.object
};

