import React from "react";

// nodejs library to set properties for components
import PropTypes from "prop-types";

import ButtonRoot from "./ButtonRoot";

const CustomButton = React.forwardRef(
  (
    {
      color,
      round,
      fullWidth,
      disabled,
      textColor,
      simple,
      size,
      block,
      link,
      justIcon,
      fileButton,
      className,
      children,
      ...rest
    },
    ref
  ) => {
    return (
      <ButtonRoot
        {...rest}
        ref={ref}
        ownerState={{
          color,
          round,
          fullWidth,
          disabled,
          textColor,
          simple,
          size,
          block,
          link,
          justIcon,
          fileButton,
          className,
        }}
      >
        {children}
      </ButtonRoot>
    );
  }
);

CustomButton.propTypes = {
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
    "transparent",
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
  className: PropTypes.object,
};

export default CustomButton;
