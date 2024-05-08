import React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles"
import styles from "./typographyStyle";

const NewDiv = styled("div")(({ theme, className }) => {
  return {
    ...styles.defaultFontStyle,
    ...styles.successText
  }
})

export default function Success(props) {
  const { children } = props;

  return (
    <NewDiv>
      {children}
    </NewDiv>
  );
}

Success.propTypes = {
  children: PropTypes.node
};
