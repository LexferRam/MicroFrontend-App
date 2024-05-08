import React from "react";
import { styled } from "@mui/material/styles"
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import styles from "./buttonStyle.js";

const NewButton = styled(Button)(({ theme, ownerState }) => {
  const { color, round, fullWidth,  disabled, simple, size, block, link, justIcon, className, customClass } = ownerState

  return {
    ...styles.button,
    ...(color && styles[color]),
    ...(fullWidth && styles.fullWidth),
    ...(disabled && styles.disabled),
    ...(simple && styles.simple),
    ...(simple && color && styles.simpleTextColor[color]),
    ...(size && styles[size]),
    ...(block && styles.block),
    ...(link && styles.link),
    ...(justIcon && styles.justIcon),
    ...(round && styles.round),
    ...(className !== undefined && className),
    ...(customClass !== undefined && customClass),
  }

})

export default function RegularButton(props) {
  const {
    color,
    round,
    children,
    fullWidth,
    disabled,
    simple,
    size,
    block,
    link,
    justIcon,
    className,
    muiClasses,
    customClass,
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
      className: className,
      customClass: customClass,
    }} {...rest} classes={muiClasses} disabled={disabled}  >
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
  className: PropTypes.object,
  muiClasses: PropTypes.object,
  children: PropTypes.node
};
