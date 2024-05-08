import React from "react";
import PropTypes from "prop-types";
import { styled} from '@mui/system';
import styles from "./blinkTextStyle";

const NewDiv = styled("div")(({ theme, ownerState }) => {
  const { color, shadow, border} = ownerState
  return {
    ...styles.basic,
    ...(shadow && styles.shadow),
    ...(border && styles.borderDef),
    ...(color  && styles[color]),
  }
})

export default function BlinkText(props) {
  const { color, shadow, border, children } = props;
  
  return (
    <NewDiv ownerState={{
      color: color,
      shadow: shadow,
      border: border
    }} >
      {children}
    </NewDiv>
  );
}

BlinkText.propTypes = {
    color: PropTypes.oneOf([
        "primary",
        "warning",
        "danger",
        "success",
        "info",
        "rose",
        "gray",
      ]),
    children: PropTypes.string
};
