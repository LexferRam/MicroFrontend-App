import React from "react";
import PropTypes from "prop-types";
import { styled} from '@mui/system';
import styles from "./typographyStyle";

const NewDiv = styled("div")(({ theme }) => {
  return {
    ...styles.defaultFontStyle,
    ...styles.dangerText
  }
})

export default function Danger(props) {
  const { children } = props;
  
  return (
    <NewDiv >
      {children}
    </NewDiv>
  );
}

Danger.propTypes = {
  children: PropTypes.node
};
