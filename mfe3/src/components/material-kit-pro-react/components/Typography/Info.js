import React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles"
import styles from "./typographyStyle";

const NewDiv = styled("div")(({ theme}) => {
  return {
    ...styles.defaultFontStyle,
    ...styles.infoText
  }
})

export default function Info(props) {
  const { children } = props;

  return (
    <NewDiv >
      {children}
    </NewDiv>
  );
}

Info.propTypes = {
  children: PropTypes.node
};
