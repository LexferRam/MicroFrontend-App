import React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles"
import CardContent from '@mui/material/CardContent';
import styles from "./cardBodyStyle.js";


const NewCardContent = styled("div")(({ theme, ownerState }) => {
  const {className, background,  plain,  formHorizontal,  pricing,  signup,  color } = ownerState
  return { 
    ...styles.cardBody,
    ...(background && styles.cardBodyBackground),
    ...(plain && styles.cardBodyPlain),
    ...(formHorizontal && styles.cardBodyFormHorizontal),
    ...(pricing && styles.cardPricing),
    ...(signup && styles.cardSignup),
    ...(color && styles.cardBodyColor),
    ...((className !== undefined) && className)
  }
})

export default function CardBody(props) {
  const {
    className,
    children,
    background,
    plain,
    formHorizontal,
    pricing,
    signup,
    color,
    ...rest
  } = props;

  return (
    <NewCardContent ownerState={{
      className: className,
      background: background,
      plain: plain,
      formHorizontal:formHorizontal,
      color: color,
      pricing: pricing,
      signup:signup,
      
    }} {...rest}>
      {children}
    </NewCardContent>
  );
}

CardBody.propTypes = {
  className: PropTypes.object,
  background: PropTypes.bool,
  plain: PropTypes.bool,
  formHorizontal: PropTypes.bool,
  pricing: PropTypes.bool,
  signup: PropTypes.bool,
  color: PropTypes.bool,
  children: PropTypes.node
};
