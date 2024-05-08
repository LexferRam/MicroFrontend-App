import React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles"
import styles from "./cardFooterStyle.js";

const NewCardFooter = styled("div")(({ theme, ownerState }) => {
  const { plain, pricing, testimonial, className} = ownerState
  return { 
    ...styles.cardFooter,
    ...(plain && styles.cardFooterPlain),   
    ...(pricing && styles.cardFooterPricing),
    ...(testimonial && styles.cardFooterTestimonial),
    ...(className !== undefined && className)
   }
})

export default function CardFooter(props) {
  const {
    className,
    children,
    plain,
    profile,
    pricing,
    testimonial,
    ...rest
  } = props;
  
  return (
    <NewCardFooter ownerState={{
      plain: plain, 
      profile: profile, 
      pricing: pricing, 
      testimonial: testimonial, 
      className: className
    }} title={children} {...rest}/>
  );
}

CardFooter.propTypes = {
  className: PropTypes.object,
  plain: PropTypes.bool,
  profile: PropTypes.bool,
  pricing: PropTypes.bool,
  testimonial: PropTypes.bool,
  children: PropTypes.node
};
